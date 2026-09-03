#!/usr/bin/env node
// One-shot decomposition of the oversized guideline documents.
// Idempotent by refusal: re-running after a split fails because the sections are gone.

import { splitGuideline } from "./lib/split-guideline.mjs";

const dir = "guidelines";

const PLANS = [
  {
    entry: "testing-guidelines.md",
    parentTitle: "Testing Guidelines",
    modules: [
      {
        file: "testing-cid-mantras.md",
        title: "Testing CID Framework & Mantras Module",
        intro: "Owns the Context-Intent-Directive framing for testing: the framework, the three-beat mantra form, and the directive table.",
        sections: ["Context—Intent—Directive (CID) Framework", "Three-Beat Mantra Form", "Context—Intent—Directive Table"],
      },
      {
        file: "testing-tdd-bdd.md",
        title: "Testing TDD & BDD Module",
        intro: "Owns the two development disciplines that drive test authoring: test-driven development and behavior-driven development.",
        sections: ["Test-Driven Development (TDD)", "Behavior-Driven Development (BDD)"],
      },
      {
        file: "testing-design-patterns.md",
        title: "Testing Design Patterns & Doubles Module",
        intro: "Owns how a test is structured and how its collaborators are stood in for: test design patterns and the test double taxonomy.",
        sections: ["Test Design Patterns", "Test Doubles"],
      },
      {
        file: "testing-organization.md",
        title: "Testing Naming & Organization Module",
        intro: "Owns where a test lives and what it is called: naming conventions and suite organization.",
        sections: ["Test Naming Conventions", "Test Organization"],
      },
      {
        file: "testing-workflow-maintenance.md",
        title: "Testing Workflow & Maintenance Module",
        intro: "Owns the lifecycle of a suite after it exists: workflow integration and long-run maintenance.",
        sections: ["Testing Workflow Integration", "Test Maintenance"],
      },
      {
        file: "testing-anti-patterns-examples.md",
        title: "Testing Anti-Patterns & Examples Module",
        intro: "Owns the prohibited patterns and the worked examples that show the guidance applied across domains.",
        sections: ["Testing Anti-Patterns", "Universal Application Examples"],
      },
    ],
  },
  {
    entry: "skill-guidelines.md",
    parentTitle: "Skill Guidelines",
    modules: [
      {
        file: "skill-repo-map.md",
        title: "Skill Repository Map & CID Module",
        intro: "Owns the multi-repo CID framing and the repository map that assigns responsibility per repository.",
        sections: ["CID Framework for Multi-Repo Development", "Repository Map and Responsibilities"],
      },
      {
        file: "skill-operating-workflow.md",
        title: "Skill Operating Principles & Workflow Module",
        intro: "Owns how work proceeds across repositories: operating principles, the standard workflow, and the cross-repo compatibility checklist.",
        sections: ["Operating Principles", "Standard Workflow", "Cross-Repo Compatibility Checklist"],
      },
      {
        file: "skill-patterns-scenarios.md",
        title: "Skill Patterns & Scenarios Module",
        intro: "Owns applied guidance: design pattern application, common scenarios, and worked examples.",
        sections: ["Design Pattern Application", "Common Scenarios and Patterns", "Universal Application Examples"],
      },
      {
        file: "skill-neutrality-verification.md",
        title: "Skill Neutrality & Verification Module",
        intro: "Owns the neutrality obligations and the proof obligations: neutrality principles, verification requirements, observability, and the neutrality checklist.",
        sections: [
          "Neutrality Principles for Multi-Repo Development",
          "Verification Requirements",
          "Observability for Multi-Repo Changes",
          "Neutrality Validation Checklist",
        ],
      },
      {
        file: "skill-configuration-reference.md",
        title: "Skill Configuration Reference Module",
        intro: "Owns the lookup surfaces: the quick reference and the full configuration reference.",
        sections: ["Quick Reference", "Configuration Reference"],
      },
    ],
  },
  {
    entry: "system-design-guidelines.md",
    parentTitle: "System Design Guidelines",
    modules: [
      {
        file: "system-design-mantras.md",
        title: "System Design Mantras Module",
        intro: "Owns the three-beat mantra form for system design.",
        sections: ["Three-Beat Mantra Form"],
      },
      {
        file: "system-design-cid-table.md",
        title: "System Design CID Table Module",
        intro: "Owns the alphabetical Context-Intent-Directive lookup table for system design.",
        sections: ["Context—Intent—Directive Table"],
      },
      {
        file: "system-design-domain-directives.md",
        title: "System Design Domain Directives Module",
        intro: "Owns the per-domain directive sets: core, frontend performance, architecture patterns, data, API, security, and observability.",
        sections: [
          "Core Directives",
          "Frontend Performance & Visualization Directives",
          "System Architecture Patterns Directives",
          "Data Architecture Directives",
          "API Design Principles Directives",
          "Security Architecture Directives",
          "Observability Requirements Directives",
        ],
      },
    ],
  },
  {
    entry: "project-rules.md",
    parentTitle: "Project Rules",
    modules: [
      {
        file: "project-rules-mantras.md",
        title: "Project Rules Mantras Module",
        intro: "Owns the three-beat mantra form for project rules.",
        sections: ["Three-Beat Mantra Form"],
      },
      {
        file: "project-rules-cid-table.md",
        title: "Project Rules CID Table Module",
        intro: "Owns the alphabetical Context-Intent-Directive lookup table for project rules.",
        sections: ["Context—Intent—Directive Table"],
      },
    ],
  },
  {
    entry: "webpage-markdown-guidelines.md",
    parentTitle: "Webpage Markdown Guidelines",
    modules: [
      {
        file: "webpage-markdown-mantras.md",
        title: "Webpage Markdown Mantras & CID Table Module",
        intro: "Owns the three-beat mantra form and the alphabetical directive table for webpage markdown extraction.",
        sections: ["Three-Beat Mantra Form", "Context—Intent—Directive Table"],
      },
      {
        file: "webpage-markdown-structure.md",
        title: "Webpage Markdown Structure & Schema Module",
        intro: "Owns the shape of the produced document: structure standard, syntax standards, and metadata schema.",
        sections: ["Document Structure Standard", "Markdown Syntax Standards", "Metadata Schema"],
      },
      {
        file: "webpage-markdown-extraction.md",
        title: "Webpage Markdown Extraction Module",
        intro: "Owns the extraction act itself: implementation principles, extraction patterns, output formats, neutrality, accessibility, version control, and the prompt template.",
        sections: [
          "Implementation Principles",
          "Universal Extraction Patterns",
          "Output Format Specifications",
          "Neutrality Validation",
          "Accessibility Preservation",
          "Version Control",
          "Prompt Template",
        ],
      },
    ],
  },
  {
    entry: "documentation-guidelines.md",
    parentTitle: "Documentation Guidelines",
    modules: [
      {
        file: "documentation-sections-templates.md",
        title: "Documentation Sections & Templates Module",
        intro: "Owns what a document must contain and the templates that supply it: required sections, the component template, and flow-pattern documentation.",
        sections: ["Required Document Sections", "Component Documentation Template", "Flow Patterns Documentation"],
      },
      {
        file: "documentation-provenance-quality.md",
        title: "Documentation Provenance & Quality Module",
        intro: "Owns where documented claims come from and how they stay true: provenance, quality metrics, schema and API documentation, and maintenance.",
        sections: ["Provenance and Traceability", "Quality Metrics Documentation", "Schema and API Documentation", "Maintenance Documentation"],
      },
      {
        file: "documentation-cid-matrix.md",
        title: "Documentation CID Matrix & Guards Module",
        intro: "Owns the directive lookup surface and the prohibited-pattern guards.",
        sections: ["CID Directive Matrix", "Anti-Pattern Guards"],
      },
    ],
  },
  {
    entry: "mcp-guidelines.md",
    parentTitle: "MCP Guidelines",
    modules: [
      {
        file: "mcp-process-flows.md",
        title: "MCP Process & Flow Patterns Module",
        intro: "Owns the phase-gated server creation process and the flow patterns that describe server behaviour.",
        sections: ["From 0 to 1: MCP Server Creation Process", "Flow Patterns"],
      },
      {
        file: "mcp-contracts.md",
        title: "MCP Contracts Module",
        intro: "Owns the four contract surfaces: tool contract authoring, transport, server lifecycle, and harness integration.",
        sections: ["Tool Contract Authoring", "Transport Contract", "Server Lifecycle Contract", "Harness Integration"],
      },
      {
        file: "mcp-economics-testing.md",
        title: "MCP Economics & Testing Module",
        intro: "Owns token economics for tool surfaces and the testing and drift-detection obligations.",
        sections: ["Token Economics", "Testing and Drift Detection"],
      },
      {
        file: "mcp-cid-matrix.md",
        title: "MCP CID Matrix & Checklist Module",
        intro: "Owns the directive lookup surface, the prohibited-pattern guards, and the validation checklist.",
        sections: ["CID Directive Matrix", "Anti-Pattern Guards", "Validation Checklist"],
      },
    ],
  },
  {
    entry: "markdown-slide-styling-guidelines.md",
    parentTitle: "Markdown Slide Styling Guidelines",
    modules: [
      {
        file: "markdown-slide-text-structure.md",
        title: "Markdown Slide Text & Structure Module",
        intro: "Owns the prose-level features: frontmatter configuration, text styling, lists, footnotes, headings, tables, blockquotes, rules, links, and images.",
        sections: [
          "Frontmatter Configuration (fully supported in Agentic Graph viewer)",
          "Text Styling (fully supported)",
          "Lists (fully supported)",
          "Footnotes (fully supported)",
          "Headings and IDs (fully supported)",
          "Tables (fully supported)",
          "Blockquotes (fully supported)",
          "Horizontal Rules (fully supported)",
          "Links (fully supported)",
          "Images (fully supported)",
        ],
      },
      {
        file: "markdown-slide-code-math.md",
        title: "Markdown Slide Code & Math Module",
        intro: "Owns code presentation and mathematical notation on slides.",
        sections: [
          "Code Blocks (fully supported as static code)",
          "Code: Line Highlighting (structural only today)",
          "Code: Advanced Features (structural only today)",
          "Math: LaTeX (structural only today)",
        ],
      },
      {
        file: "markdown-slide-layout.md",
        title: "Markdown Slide Layout Module",
        intro: "Owns spatial arrangement: slide separation, column layouts, layout types, backgrounds, aspect ratio, absolute positioning, and grids.",
        sections: [
          "Slide Separation and Reordering in Agentic Graph",
          "Two-Column Layout: HTML (structural only)",
          "Two-Column Layout: Native (fully supported)",
          "Layout Types (partially supported)",
          "Background Control (fully supported)",
          "Aspect Ratio Configuration (fully supported)",
          "Absolute Positioning (fully supported where expressed via HTML classes)",
          "Grid Layouts (fully supported where expressed via HTML classes)",
        ],
      },
      {
        file: "markdown-slide-animation.md",
        title: "Markdown Slide Animation & Navigation Module",
        intro: "Owns time-based and interaction-based behaviour: progressive disclosure, inline markers, slide directives, transitions, fragments, speaker notes, keyboard navigation, and drawing mode.",
        sections: [
          "Click-Based Progressive Disclosure (fully supported in Agentic Graph viewer)",
          "Inline Text Markers (partially supported in Agentic Graph viewer)",
          "Slide-Specific Directives (partially supported)",
          "Transition Effects (structural only today)",
          "Fragment Animations (fully supported in Agentic Graph viewer)",
          "Speaker Notes (partially supported)",
          "Keyboard Navigation (partially supported)",
          "Drawing Mode (structural only today)",
        ],
      },
      {
        file: "markdown-slide-theming-extensibility.md",
        title: "Markdown Slide Theming & Extensibility Module",
        intro: "Owns appearance and extension surfaces: diagrams, custom CSS, scoped styling, embedded components, fonts, export, localisation, themes, plugins, and configuration inheritance.",
        sections: [
          "Diagrams: Mermaid (fully supported)",
          "Diagrams: PlantUML (structural only today)",
          "Custom CSS Classes (fully supported where expressed via HTML and CSS classes)",
          "Scoped Styling (structural only today)",
          "Embedded Components (structural only today)",
          "Font Configuration (structural only today)",
          "Export Configuration (framework-dependent, structural only)",
          "Multi-language Support (structural only today)",
          "Theme Customization (structural only today)",
          "Plugin System (framework-dependent, structural only)",
          "Configuration Inheritance (framework-dependent, structural only)",
        ],
      },
    ],
  },
];

let ok = 0;
for (const plan of PLANS) {
  const res = splitGuideline({ dir, ...plan });
  console.log(`${res.entry} -> ${res.entryLines} lines`);
  for (const m of res.modules) console.log(`    ${m.file} ${m.lines} lines`);
  ok += 1;
}
console.log(`\nsplit ${ok} entry documents`);
