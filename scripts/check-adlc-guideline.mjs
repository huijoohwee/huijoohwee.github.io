import { readAdlcFiles, checkAdlcMigration, loadAdlcSources } from "./lib/adlc-contract-input.mjs";
import { checkAuthoringContract } from "./lib/adlc-authoring-contract.mjs";
import { checkCollaborationContract } from "./lib/adlc-collaboration-contract.mjs";
import { checkExecutionContract } from "./lib/adlc-execution-contract.mjs";

const files = readAdlcFiles();
const metadata = checkAdlcMigration(files);
const sources = loadAdlcSources(files);
checkAuthoringContract(sources);
checkCollaborationContract(sources);
checkExecutionContract(sources);
console.log(`ADLC guideline contract ok (14 canonical modules; ${metadata.frontmatterCount} parsed frontmatter records; local ${metadata.localRungs.join(",")}; delivered ${metadata.deliveredRungs.join(",")}; execution ${sources.guidelineLogicalLineCount} lines)`);
