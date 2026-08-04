import { finding, insideRanges, referenceImplementationRanges } from "./content.mjs";

const VENDOR_TERMS = Object.freeze(["GitHub", "Cloudflare", "Knowgrph", "huijoohwee", "airvio.co", "npm", "Node.js", "yjs/yjs"]);

export function checkNeutrality(document) {
  const ranges = referenceImplementationRanges(document);
  const findings = [];
  for (let index = 0; index < document.lines.length; index += 1) {
    const lineNumber = index + 1;
    if (insideRanges(lineNumber, ranges)) continue;
    for (const term of VENDOR_TERMS) {
      const column = document.lines[index].toLowerCase().indexOf(term.toLowerCase());
      if (column < 0) continue;
      findings.push(finding({ ruleId: "lane-topology--admission#13", type: "vendor-coupling", severity: "major", path: document.sourcePath, line: lineNumber, column: column + 1, message: `Concrete term outside a reference implementation block: ${term}` }));
    }
  }
  return findings;
}
