import assert from "node:assert/strict";
import test from "node:test";
import { readAdlcFiles, checkAdlcMigration, loadAdlcSources } from "../lib/adlc-contract-input.mjs";

const files = readAdlcFiles();
const legacyStem = ["agentic", "sdlc"].join("-");

function mutate(path, change) {
  const candidate = new Map(files);
  candidate.set(path, change(candidate.get(path)));
  return candidate;
}

test("canonical ADLC graph and enrolled CI context remain usable", () => {
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

test("renaming a workflow label cannot strand the enrolled required check", () => {
  const candidate = mutate(".github/workflows/guideline-contract.yml", source =>
    source.replaceAll("name: agentic-sdlc-policy-contract", "name: adlc-policy-contract"));
  assert.throws(() => checkAdlcMigration(candidate), /must emit the enrolled CI compatibility context exactly once/);
});

test("removing the enrolled repository context requires a separate migration", () => {
  const candidate = mutate(".agentic-os.json", source => {
    const profile = JSON.parse(source);
    profile.requiredChecks = ["adlc-policy-contract"];
    return JSON.stringify(profile);
  });
  assert.throws(() => checkAdlcMigration(candidate), /retain the enrolled CI compatibility context/);
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
