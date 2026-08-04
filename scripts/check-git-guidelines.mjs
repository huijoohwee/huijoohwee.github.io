#!/usr/bin/env node

import path from "node:path";
import { fileURLToPath } from "node:url";

import { checkAntipatterns } from "./lib/git-guidelines/antipattern.mjs";
import { checkArtifacts } from "./lib/git-guidelines/artifact-schema.mjs";
import { checkBoundary } from "./lib/git-guidelines/boundary.mjs";
import { checkChecklist } from "./lib/git-guidelines/checklist.mjs";
import { checkCommitAttribution } from "./lib/git-guidelines/commit-attribution.mjs";
import { checkContentContract, finding, parseDocument } from "./lib/git-guidelines/content.mjs";
import { checkDivergence } from "./lib/git-guidelines/divergence.mjs";
import { checkFindingsTable } from "./lib/git-guidelines/findings-table.mjs";
import { checkFrontmatter } from "./lib/git-guidelines/frontmatter.mjs";
import { resolveInputs } from "./lib/git-guidelines/input-resolver.mjs";
import { checkLineBudget } from "./lib/git-guidelines/line-budget.mjs";
import { checkNeutrality } from "./lib/git-guidelines/neutrality.mjs";
import { checkRegistrations } from "./lib/git-guidelines/registration.mjs";
import { buildReport } from "./lib/git-guidelines/report.mjs";
import { buildRuleIndex } from "./lib/git-guidelines/rule-registry.mjs";
import { checkStructure } from "./lib/git-guidelines/structure.mjs";

const startedAt = Date.now();
let verdict = "not-conformant";
const argumentsList = process.argv.slice(2);
const scriptRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const options = {
  repositoryRoot: readOption("repository") || scriptRoot,
  documentPath: readOption("document") || undefined,
  acosRoot: readOption("acos-root") || undefined,
  probeRemote: argumentsList.includes("--probe-remote"),
};
let report;

try {
  const inputs = resolveInputs(options);
  const findings = inputs.problems.map(problem => finding({
    ruleId: "findings--rule-identity#2", type: "evidence-without-run", path: problem.path,
    message: `Required ${problem.kind} input is ${problem.condition}: ${problem.message}`,
  }));
  const document = parseDocument(inputs.document || "", inputs.documentPath);
  const frontmatter = checkFrontmatter(document);
  const ruleIndex = buildRuleIndex(document);
  findings.push(...frontmatter.findings, ...ruleIndex.findings);
  const families = [
    ["structure", () => checkStructure(document)],
    ["line-budget", () => checkLineBudget(document, frontmatter.parsed)],
    ["boundary", () => checkBoundary(document)],
    ["divergence", () => checkDivergence(document, inputs.owners)],
    ["neutrality", () => checkNeutrality(document)],
    ["content", () => checkContentContract(document, ruleIndex)],
    ["artifacts", () => checkArtifacts(document, inputs.artifacts)],
    ["findings-table", () => checkFindingsTable(document, ruleIndex)],
    ["checklist", () => checkChecklist(document, ruleIndex)],
    ["commit-attribution", () => checkCommitAttribution(document, inputs.gitFacts)],
    ["anti-pattern", () => checkAntipatterns(document)],
  ];
  for (const [name, run] of families) {
    try { findings.push(...run()); }
    catch (error) { findings.push(finding({ ruleId: "findings--rule-identity#2", type: "unimplemented-guideline", path: inputs.documentPath, message: `Checker family ${name} failed internally: ${error.message}` })); }
  }
  let registration = { findings: [], ready: false };
  try { registration = checkRegistrations(document, inputs.registrations, frontmatter.parsed); findings.push(...registration.findings); }
  catch (error) { findings.push(finding({ ruleId: "findings--rule-identity#2", type: "unimplemented-guideline", path: inputs.documentPath, message: `Registration family failed internally: ${error.message}` })); }
  let forcedExitStatus = null;
  if (options.probeRemote && inputs.gitFacts.remote.state !== "online") {
    findings.push(finding({ ruleId: "verification-gates#1", type: "evidence-without-run", path: inputs.documentPath, message: `Configured remote was unreachable within 10 seconds: ${inputs.gitFacts.remote.remote || "origin"}` }));
    forcedExitStatus = 3;
  }
  if (Date.now() - startedAt > 60_000) forcedExitStatus = 3;
  report = buildReport({ findings, inputStatus: inputs.problems.length > 0 ? "degraded" : "ready", registrationReady: registration.ready, forcedExitStatus });
  verdict = report.verdict;
} catch (error) {
  report = buildReport({
    findings: [finding({ ruleId: "findings--rule-identity#2", type: "unimplemented-guideline", path: options.documentPath || "git-guidelines.md", message: `Checker initialization failed: ${error.message}` })],
    inputStatus: "degraded", registrationReady: false, forcedExitStatus: 2,
  });
}

if (verdict !== report.verdict) throw new Error("Verdict state diverged from the report.");
process.stdout.write(`${JSON.stringify(report, null, 2)}\n`);
process.exitCode = report.exitStatus;

function readOption(name) {
  const prefix = `--${name}=`; const value = argumentsList.find(argument => argument.startsWith(prefix));
  return value ? value.slice(prefix.length) : null;
}
