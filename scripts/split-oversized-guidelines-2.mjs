#!/usr/bin/env node
// Second decomposition pass: the PRD/TAD document and the phase-structured reference guide.

import { splitGuideline } from "./lib/split-guideline.mjs";

const dir = "guidelines";

const PLANS = [
  {
    dir: "docs/documents",
    entry: "agentic-graph-animatic-prd-tad.md",
    parentTitle: "Agentic Graph Animatic PRD/TAD",
    modules: [
      {
        file: "agentic-graph-animatic-prd-epics.md",
        title: "Agentic Graph Animatic Epics & User Stories Module",
        intro: "Owns the epic and user-story decomposition with its acceptance criteria. This is the requirements payload of the PRD.",
        sections: ["Epics & User Stories"],
      },
      {
        file: "agentic-graph-animatic-prd-scope.md",
        title: "Agentic Graph Animatic Problem & Scope Module",
        intro: "Owns problem discovery, the author journey, scope boundaries, implementation constraints, and open questions.",
        sections: [
          "Phase 0 — Problem Discovery",
          "User Journey — Content Author: Author → Playback → Edit",
          "Scope Boundaries",
          "Implementation Constraints",
          "Decisions & Open Questions",
        ],
      },
      {
        file: "agentic-graph-animatic-tad-components.md",
        title: "Agentic Graph Animatic Components Module",
        intro: "Owns the architecture overview, the journey-to-system mapping, the component specifications, and the integration contracts.",
        sections: ["Architecture Overview", "Journey → System Mapping", "Component Specifications", "Integration Contracts"],
      },
      {
        file: "agentic-graph-animatic-tad-flows.md",
        title: "Agentic Graph Animatic Flows & Diagrams Module",
        intro: "Owns the runtime behaviour views: the two workflows, the data flows, and the architecture diagrams.",
        sections: ["Workflow: Beat Drag-to-Move", "Workflow: Validator Script Run", "Data Flows", "Architecture Diagrams"],
      },
      {
        file: "agentic-graph-animatic-adr.md",
        title: "Agentic Graph Animatic Decisions & Attributes Module",
        intro: "Owns the architectural decision records, the quality attribute scenarios, and the deployment strategy.",
        sections: ["Architectural Decisions", "Quality Attributes", "Deployment Strategy"],
      },
    ],
  },
  {
    entry: "python-reference-guide.md",
    parentTitle: "Python Reference Guide",
    modules: [
      {
        file: "python-reference-setup-eda.md",
        title: "Python Reference: Setup & EDA Module",
        intro: "Owns the early phases: data acquisition, environment setup, data loading and validation, exploratory analysis, and feature engineering.",
        sections: [
          "Phase 0: Setup & Data Acquisition",
          "Phase 1: Environment Setup & Configuration",
          "Phase 2: Data Loading & Initial Validation",
          "Phase 3: Exploratory Data Analysis",
          "Phase 4: Feature Engineering & Preprocessing",
        ],
      },
      {
        file: "python-reference-modelling.md",
        title: "Python Reference: Model Development Module",
        intro: "Owns model development and training: splitting, baselines, cross-validation, tuning, importance, and class balance.",
        sections: ["Phase 5: Model Development & Training"],
      },
      {
        file: "python-reference-evaluation.md",
        title: "Python Reference: Model Evaluation Module",
        intro: "Owns evaluation and error analysis: confusion matrices, confidence stratification, ROC and PR curves, and threshold selection.",
        sections: ["Phase 6: Model Evaluation & Analysis"],
      },
      {
        file: "python-reference-productionization.md",
        title: "Python Reference: Productionization Module",
        intro: "Owns pipeline productionization: entry points, artefact persistence, and run metadata.",
        sections: ["Phase 7: Pipeline Productionization"],
      },
      {
        file: "python-reference-documentation.md",
        title: "Python Reference: Documentation & Handover Module",
        intro: "Owns documentation and knowledge transfer, including the project README scaffold and handover surfaces.",
        sections: [
          "Phase 8: Documentation & Knowledge Transfer",
          "Quick Start",
          "Project Structure",
          "Usage",
          "Contact",
          "Prompt_202601161200",
        ],
      },
    ],
  },
];

for (const plan of PLANS) {
  const res = splitGuideline({ dir, ...plan });
  console.log(`${res.entry} -> ${res.entryLines} lines`);
  for (const m of res.modules) console.log(`    ${m.file} ${m.lines} lines`);
}
