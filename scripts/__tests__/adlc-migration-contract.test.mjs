import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { chmodSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import test from "node:test";
import yaml from "js-yaml";
import { readAdlcFiles, checkAdlcMigration, loadAdlcSources } from "../lib/adlc-contract-input.mjs";

const files = readAdlcFiles();
const legacyStem = ["agentic", "sdlc"].join("-");

function nativeJob(workflow) {
  const jobs = Object.values(workflow.jobs);
  assert.equal(jobs.filter(job => job.name === `${legacyStem}-policy-contract`).length, 0,
    "legacy check producers must be retired");
  const nativeJobs = jobs.filter(job => job.name === "adlc-policy-contract");
  assert.equal(nativeJobs.length, 1, "emit exactly one native check");
  return nativeJobs[0];
}

test("ordinary native check fails closed without rerunning validation", () => {
  const native = nativeJob(yaml.load(files.get(".github/workflows/guideline-contract.yml")));
  assert.deepEqual(native.needs, ["guideline-contract-check"]);
  assert.equal(native.if, "${{ always() }}");
  assert.equal(native.steps.length, 1);
  const [step] = native.steps;
  assert.equal(step.uses, undefined);
  assert.deepEqual(step.env, { CONTRACT_RESULT: "${{ needs.guideline-contract-check.result }}" });
  for (const result of ["success", "failure", "cancelled", "skipped", ""]) {
    const execution = spawnSync("/bin/sh", ["-eu", "-c", step.run], {
      env: { CONTRACT_RESULT: result }, encoding: "utf8", timeout: 2_000,
    });
    assert.ifError(execution.error);
    assert.equal(execution.status === 0, result === "success", `native result must fail closed for ${result || "absent"}`);
  }
});

test("native refresh stops on each failed contract without a redundant rollup", () => {
  const workflow = yaml.load(files.get(".github/workflows/protected-head-refresh-ci.yml"));
  const native = nativeJob(workflow);
  assert.equal(native, workflow.jobs["protected-head-refresh"]);
  assert.equal(native.needs, undefined);
  assert.equal(native.if, undefined);
  assert.notEqual(native["continue-on-error"], true);
  for (const step of native.steps) assert.notEqual(step["continue-on-error"], true);
  const step = native.steps.find(candidate => candidate.name === "Verify deterministic candidate contracts");
  assert.equal(step.if, undefined);
  const commands = ["run adlc:policy:check", "run agenticrag:guidelines-map:check", "run git-guidelines:test"];
  const directory = mkdtempSync(join(tmpdir(), "adlc-refresh-contract-"));
  const log = join(directory, "commands.log");
  try {
    writeFileSync(join(directory, "npm"), '#!/bin/sh\nprintf "%s\\n" "$*" >> "$COMMAND_LOG"\n[ "$*" != "$FAIL_COMMAND" ]\n');
    chmodSync(join(directory, "npm"), 0o755);
    for (const failed of ["", ...commands]) {
      writeFileSync(log, "");
      const execution = spawnSync("/bin/bash", ["-e", "-o", "pipefail", "-c", step.run], {
        env: { PATH: `${directory}:/usr/bin:/bin`, COMMAND_LOG: log, FAIL_COMMAND: failed },
        encoding: "utf8", timeout: 2_000,
      });
      assert.ifError(execution.error);
      assert.equal(execution.status === 0, failed === "");
      assert.deepEqual(readFileSync(log, "utf8").trim().split("\n"),
        failed ? commands.slice(0, commands.indexOf(failed) + 1) : commands);
    }
  } finally { rmSync(directory, { recursive: true, force: true }); }
});

function mutate(path, change) {
  const candidate = new Map(files);
  candidate.set(path, change(candidate.get(path)));
  return candidate;
}

test("canonical ADLC graph and native CI context remain usable", () => {
  assert.doesNotThrow(() => checkAdlcMigration(files));
});

test("an absent module fails before a dangling link can be accepted", () => {
  const candidate = new Map(files);
  candidate.delete("guidelines/adlc-upstream-dependency-admission.md");
  assert.throws(() => checkAdlcMigration(candidate), /adlc-upstream-dependency-admission.md must exist/);
});

test("a present but unreachable module is rejected", () => {
  const candidate = new Map([...files].map(([path, source]) => [path,
    source.replaceAll("./adlc-upstream-dependency-admission.md", "#upstream-dependency-admission")]));
  assert.throws(() => checkAdlcMigration(candidate), /every canonical ADLC module must be reachable/);
});

test("an unknown ADLC module link is rejected", () => {
  const candidate = mutate("guidelines/adlc-guidelines.md", source =>
    source.replaceAll("./adlc-upstream-dependency-admission.md", "./adlc-missing-module.md"));
  assert.throws(() => checkAdlcMigration(candidate), /links an unknown ADLC module/);
});

test("retained legacy module files are rejected", () => {
  const candidate = new Map(files);
  candidate.set(`guidelines/${legacyStem}-guidelines.md`, "obsolete copy");
  assert.throws(() => checkAdlcMigration(candidate), /legacy guideline files must be removed/);
});

test("consumer links cannot silently return to a removed path", () => {
  const candidate = mutate("index.html", source =>
    source.replaceAll("guidelines/adlc-guidelines.md", `guidelines/${legacyStem}-guidelines.md`));
  assert.throws(() => checkAdlcMigration(candidate), /index.html contains a legacy guideline path/);
});

test("a workflow cannot fall back to the retired required check", () => {
  const candidate = mutate(".github/workflows/guideline-contract.yml", source =>
    source.replaceAll("name: adlc-policy-contract", `name: ${legacyStem}-policy-contract`));
  assert.throws(() => checkAdlcMigration(candidate), /must emit the native CI context exactly once/);
});

test("the repository profile cannot retain a legacy required context", () => {
  const candidate = mutate(".agentic-os.json", source => {
    const profile = JSON.parse(source);
    profile.requiredChecks.push(`${legacyStem}-policy-contract`);
    return JSON.stringify(profile);
  });
  assert.throws(() => checkAdlcMigration(candidate), /require only the native CI context/);
});

test("the public command resolves the renamed checker", () => {
  const candidate = mutate("package.json", source => {
    const pkg = JSON.parse(source);
    pkg.scripts["adlc:policy:check"] = `node scripts/check-${legacyStem}-guideline.mjs`;
    return JSON.stringify(pkg);
  });
  assert.throws(() => checkAdlcMigration(candidate), { name: "AssertionError" });
});

test("a new valid version does not require checker source edits", () => {
  const candidate = mutate("guidelines/adlc-guidelines.md", source =>
    source.replace(/^version: .*$/m, 'version: "12.34.56"'));
  assert.doesNotThrow(() => checkAdlcMigration(candidate));
});

test("malformed versions fail for both execution and authoring owners", () => {
  for (const path of ["guidelines/adlc-guidelines.md", "guidelines/prd-tad-adr-guidelines.md"]) {
    for (const version of ["next", "01.0.0", "1.0.0-01"]) {
      const candidate = mutate(path, source => source.replace(/^version: .*$/m, `version: "${version}"`));
      assert.throws(() => path.includes("prd-tad-adr") ? loadAdlcSources(candidate) : checkAdlcMigration(candidate),
        /must declare a semantic version/);
    }
  }
});

test("module and checker growth stay within the declared bounds", () => {
  const candidate = mutate("guidelines/adlc-guidelines.md", source => source + "\n".repeat(600));
  assert.throws(() => checkAdlcMigration(candidate), /must remain below 600 lines/);
  const oversizedChecker = mutate("scripts/check-adlc-guideline.mjs", source => source + " ".repeat(500_000));
  assert.throws(() => checkAdlcMigration(oversizedChecker), /must remain below 500000 bytes/);
});

for (const [name, before, after, expected] of [
  ["duplicate keys", 'title: "ADLC Guidelines"', 'title: "ADLC Guidelines"\ntitle: "Duplicate"', /Duplicate frontmatter key/],
  ["malformed YAML", 'owner: "Orchestrator function"', 'owner: [unterminated', /closing bracket is absent/],
  ["string booleans", "universal_scope: true", 'universal_scope: "true"', /must be a YAML boolean true/],
  ["non-scalar owner", 'owner: "Orchestrator function"', 'owner: ["Orchestrator function"]', /owner must name one accountable function/],
  ["impossible date", 'date: "2026-09-05"', 'date: "2026-02-30"', /date must be a valid YYYY-MM-DD string/],
  ["unknown readiness rung", 'local_rung: "spec-complete"', 'local_rung: "ready"', /must be a declared readiness rung/],
  ["unsupported runtime claim", 'local_rung: "spec-complete"', 'local_rung: "runtime-ready"', /unsupported local runtime readiness claim/],
  ["unsupported production claim", 'delivered_rung: "undocumented"', 'delivered_rung: "production-verified"', /unsupported delivered readiness claim/],
  ["weakened readiness policy", 'runtime_readiness_policy: "fail-closed"', 'runtime_readiness_policy: "open"', /must be fail-closed/],
  ["static agent provenance", 'owner: "Orchestrator function"', 'owner: "Orchestrator function"\nagent_id: "orchestrator"', /undeclared frontmatter key agent_id/],
]) {
  test(`frontmatter rejects ${name}`, () => {
    const candidate = mutate("guidelines/adlc-guidelines.md", source => {
      assert.ok(source.includes(before), "mutation must exercise the intended field");
      return source.replace(before, after);
    });
    assert.throws(() => checkAdlcMigration(candidate), expected);
  });
}

test("companion metadata cannot silently reference an obsolete parent revision", () => {
  const candidate = mutate("guidelines/prd-tad-adr-diagram-canvas-render.companion.md", source =>
    source.replace(/^parent_version: .*$/m, 'parent_version: "0.0.0"'));
  assert.throws(() => checkAdlcMigration(candidate), /parent_version must match the current owning document/);
});
