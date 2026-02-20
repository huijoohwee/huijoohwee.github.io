---
title: "Scaffold-to-Production: Step-by-Step Implementation Guide"
graphId: md:scaffolding-implementation-guidelines
theme: academic
background: /cover.jpg
class: text-center
transition: slide-left
layout: cover
aspectRatio: 16/9
lang: en-US
authors:
  - joohwee
tags: [EDA, MLP, Test]
date: "2026-01-13"
institution: "Module Development Guidelines"
mermaidAnchorsOnly: true
mermaid: |
  graph TB
    Start([Start: Module Development]) --> Phase1

    subgraph Phase1["PHASE 1: FILE CREATION & IMPORTS (5-10 min)"]
        direction TB
        P1_Start[1.0.0 File Creation & Imports]
        
        P1_Step1[1.1.0 Create Module File]
        P1_Step1_1[1.1.1 Determine File Location]
        P1_Step1_2[1.1.2 Name File Descriptively]
        P1_Step1_3[1.1.3 Verify File Creation]
        
        P1_Step2[1.2.0 Add Essential Imports]
        P1_Step2_1[1.2.1 Import Standard Library]
        P1_Step2_2[1.2.2 Import Third-Party Dependencies]
        P1_Step2_3[1.2.3 Import Configuration Manager]
        
        P1_Step3[1.3.0 Validate Imports]
        P1_Step3_1[1.3.1 Run Syntax Check]
        P1_Step3_2[1.3.2 Check Import Resolution]
        P1_Step3_3[1.3.3 Document Import Purposes]
        
        P1_Start --> P1_Step1
        P1_Step1 --> P1_Step1_1
        P1_Step1_1 --> P1_Step1_2
        P1_Step1_2 --> P1_Step1_3
        
        P1_Step1_3 --> P1_Step2
        P1_Step2 --> P1_Step2_1
        P1_Step2_1 --> P1_Step2_2
        P1_Step2_2 --> P1_Step2_3
        
        P1_Step2_3 --> P1_Step3
        P1_Step3 --> P1_Step3_1
        P1_Step3_1 --> P1_Step3_2
        P1_Step3_2 --> P1_Step3_3
        
        P1_Step3_3 --> P1_Complete[Phase 1 Complete]
    end

    subgraph Phase2["PHASE 2: STUB DEFINITIONS (15-30 min)"]
        direction TB
        P2_Start[2.0.0 Stub Definitions]
        
        P2_Step1[2.1.0 Identify Required Functions]
        P2_Step1_1[2.1.1 Map Requirements to Functions]
        P2_Step1_2[2.1.2 Name Functions Descriptively]
        P2_Step1_3[2.1.3 Order Functions Logically]
        
        P2_Step2[2.2.0 Write Function Signatures]
        P2_Step2_1[2.2.1 Define Input Parameters]
        P2_Step2_2[2.2.2 Define Return Types]
        P2_Step2_3[2.2.3 Add Default Parameter Values]
        
        P2_Step3[2.3.0 Write Comprehensive Docstrings]
        P2_Step3_1[2.3.1 Write One-Line Summary]
        P2_Step3_2[2.3.2 Write Detailed Description]
        P2_Step3_3[2.3.3 Document Args Section]
        P2_Step3_4[2.3.4 Document Returns Section]
        P2_Step3_5[2.3.5 Document Raises Section]
        P2_Step3_6[2.3.6 Add Usage Example]
        
        P2_Step4[2.4.0 Add Placeholder Implementation]
        P2_Step4_1[2.4.1 Choose Placeholder Strategy]
        P2_Step4_2[2.4.2 Add TODO Comments]
        
        P2_Step5[2.5.0 Validate Stubs]
        P2_Step5_1[2.5.1 Import Module]
        P2_Step5_2[2.5.2 Call Stub Functions]
        P2_Step5_3[2.5.3 Check Docstring Rendering]
        
        P2_Start --> P2_Step1
        P2_Step1 --> P2_Step1_1
        P2_Step1_1 --> P2_Step1_2
        P2_Step1_2 --> P2_Step1_3
        
        P2_Step1_3 --> P2_Step2
        P2_Step2 --> P2_Step2_1
        P2_Step2_1 --> P2_Step2_2
        P2_Step2_2 --> P2_Step2_3
        
        P2_Step2_3 --> P2_Step3
        P2_Step3 --> P2_Step3_1
        P2_Step3_1 --> P2_Step3_2
        P2_Step3_2 --> P2_Step3_3
        P2_Step3_3 --> P2_Step3_4
        P2_Step3_4 --> P2_Step3_5
        P2_Step3_5 --> P2_Step3_6
        
        P2_Step3_6 --> P2_Step4
        P2_Step4 --> P2_Step4_1
        P2_Step4_1 --> P2_Step4_2
        
        P2_Step4_2 --> P2_Step5
        P2_Step5 --> P2_Step5_1
        P2_Step5_1 --> P2_Step5_2
        P2_Step5_2 --> P2_Step5_3
        
        P2_Step5_3 --> P2_Complete[Phase 2 Complete]
    end

    subgraph Phase3["PHASE 3: MINIMAL IMPLEMENTATION (30-60 min)"]
        direction TB
        P3_Start[3.0.0 Minimal Implementation]
        
        P3_Step1[3.1.0 Implement Primary Function]
        P3_Step1_1[3.1.1 Read Configuration Parameters]
        P3_Step1_2[3.1.2 Implement Core Algorithm]
        P3_Step1_3[3.1.3 Return Result]
        
        P3_Step2[3.2.0 Implement Supporting Functions]
        P3_Step2_1[3.2.1 Order Implementation by Dependency]
        P3_Step2_2[3.2.2 Keep Functions Focused]
        
        P3_Step3[3.3.0 Add Minimal Logging]
        P3_Step3_1[3.3.1 Log Function Entry]
        P3_Step3_2[3.3.2 Log Key Intermediate States]
        P3_Step3_3[3.3.3 Log Function Exit]
        
        P3_Step4[3.4.0 Verify Logic Correctness]
        P3_Step4_1[3.4.1 Check Variable Initialization]
        P3_Step4_2[3.4.2 Check Loop Logic]
        P3_Step4_3[3.4.3 Check Conditional Logic]
        
        P3_Step5[3.5.0 Document Implementation Decisions]
        P3_Step5_1[3.5.1 Comment Complex Algorithms]
        P3_Step5_2[3.5.2 Document Magic Numbers]
        
        P3_Start --> P3_Step1
        P3_Step1 --> P3_Step1_1
        P3_Step1_1 --> P3_Step1_2
        P3_Step1_2 --> P3_Step1_3
        
        P3_Step1_3 --> P3_Step2
        P3_Step2 --> P3_Step2_1
        P3_Step2_1 --> P3_Step2_2
        
        P3_Step2_2 --> P3_Step3
        P3_Step3 --> P3_Step3_1
        P3_Step3_1 --> P3_Step3_2
        P3_Step3_2 --> P3_Step3_3
        
        P3_Step3_3 --> P3_Step4
        P3_Step4 --> P3_Step4_1
        P3_Step4_1 --> P3_Step4_2
        P3_Step4_2 --> P3_Step4_3
        
        P3_Step4_3 --> P3_Step5
        P3_Step5 --> P3_Step5_1
        P3_Step5_1 --> P3_Step5_2
        
        P3_Step5_2 --> P3_Complete[Phase 3 Complete]
    end

    subgraph Phase4["PHASE 4: INCREMENTAL TESTING (20-45 min)"]
        direction TB
        P4_Start[4.0.0 Incremental Testing]
        
        P4_Step1[4.1.0 Create Representative Fixtures]
        P4_Step1_1[4.1.1 Identify Representative Cases]
        P4_Step1_2[4.1.2 Create Fixture Data Files]
        P4_Step1_3[4.1.3 Document Fixture Characteristics]
        
        P4_Step2[4.2.0 Create Test Configuration]
        P4_Step2_1[4.2.1 Define Test Parameters]
        P4_Step2_2[4.2.2 Externalize Test Config]
        
        P4_Step3[4.3.0 Write Test Scripts]
        P4_Step3_1[4.3.1 Test Each Function Independently]
        P4_Step3_2[4.3.2 Follow Arrange-Act-Assert Pattern]
        P4_Step3_3[4.3.3 Name Tests Descriptively]
        
        P4_Step4[4.4.0 Write Assertions]
        P4_Step4_1[4.4.1 Assert Output Not Null]
        P4_Step4_2[4.4.2 Assert Output Structure]
        P4_Step4_3[4.4.3 Assert Output Values]
        P4_Step4_4[4.4.4 Assert Output Type]
        
        P4_Step5[4.5.0 Run Tests and Fix Failures]
        P4_Step5_1[4.5.1 Run Tests in Isolation]
        P4_Step5_2[4.5.2 Debug Failed Tests]
        P4_Step5_3[4.5.3 Fix Implementation Bugs]
        P4_Step5_4[4.5.4 Re-run Tests]
        
        P4_Decision{All Tests Pass?}
        
        P4_Step6[4.6.0 Validate Test Coverage]
        P4_Step6_1[4.6.1 Check Line Coverage]
        P4_Step6_2[4.6.2 Check Branch Coverage]
        
        P4_Start --> P4_Step1
        P4_Step1 --> P4_Step1_1
        P4_Step1_1 --> P4_Step1_2
        P4_Step1_2 --> P4_Step1_3
        
        P4_Step1_3 --> P4_Step2
        P4_Step2 --> P4_Step2_1
        P4_Step2_1 --> P4_Step2_2
        
        P4_Step2_2 --> P4_Step3
        P4_Step3 --> P4_Step3_1
        P4_Step3_1 --> P4_Step3_2
        P4_Step3_2 --> P4_Step3_3
        
        P4_Step3_3 --> P4_Step4
        P4_Step4 --> P4_Step4_1
        P4_Step4_1 --> P4_Step4_2
        P4_Step4_2 --> P4_Step4_3
        P4_Step4_3 --> P4_Step4_4
        
        P4_Step4_4 --> P4_Step5
        P4_Step5 --> P4_Step5_1
        P4_Step5_1 --> P4_Step5_2
        P4_Step5_2 --> P4_Step5_3
        P4_Step5_3 --> P4_Step5_4
        
        P4_Step5_4 --> P4_Decision
        P4_Decision -->|No| P4_Step5_2
        P4_Decision -->|Yes| P4_Step6
        
        P4_Step6 --> P4_Step6_1
        P4_Step6_1 --> P4_Step6_2
        
        P4_Step6_2 --> P4_Complete[Phase 4 Complete]
    end

    subgraph Phase5["PHASE 5: VALIDATION ADDITION (30-60 min)"]
        direction TB
        P5_Start[5.0.0 Validation Addition]
        
        P5_Step1[5.1.0 Identify Validation Requirements]
        P5_Step1_1[5.1.1 List Input Constraints]
        P5_Step1_2[5.1.2 List Output Constraints]
        P5_Step1_3[5.1.3 Identify Validation Points]
        
        P5_Step2[5.2.0 Implement Input Validation Functions]
        P5_Step2_1[5.2.1 Validate for Null/Missing]
        P5_Step2_2[5.2.2 Validate Data Types]
        P5_Step2_3[5.2.3 Validate Data Structure]
        P5_Step2_4[5.2.4 Validate Value Ranges]
        P5_Step2_5[5.2.5 Validate Data Quality]
        
        P5_Step3[5.3.0 Implement Output Validation Functions]
        P5_Step3_1[5.3.1 Validate Output Structure]
        P5_Step3_2[5.3.2 Validate Output Constraints]
        
        P5_Step4[5.4.0 Add Validation to Main Functions]
        P5_Step4_1[5.4.1 Add Input Validation Calls]
        P5_Step4_2[5.4.2 Add Output Validation Calls]
        
        P5_Step5[5.5.0 Define Clear Error Messages]
        P5_Step5_1[5.5.1 Include Context in Errors]
        P5_Step5_2[5.5.2 Use Appropriate Exception Types]
        P5_Step5_3[5.5.3 Document Validation Errors]
        
        P5_Step6[5.6.0 Test Validation Functions]
        P5_Step6_1[5.6.1 Test Null Input Handling]
        P5_Step6_2[5.6.2 Test Invalid Type Handling]
        P5_Step6_3[5.6.3 Test Schema Mismatch]
        P5_Step6_4[5.6.4 Test Value Range Violations]
        
        P5_Start --> P5_Step1
        P5_Step1 --> P5_Step1_1
        P5_Step1_1 --> P5_Step1_2
        P5_Step1_2 --> P5_Step1_3
        
        P5_Step1_3 --> P5_Step2
        P5_Step2 --> P5_Step2_1
        P5_Step2_1 --> P5_Step2_2
        P5_Step2_2 --> P5_Step2_3
        P5_Step2_3 --> P5_Step2_4
        P5_Step2_4 --> P5_Step2_5
        
        P5_Step2_5 --> P5_Step3
        P5_Step3 --> P5_Step3_1
        P5_Step3_1 --> P5_Step3_2
        
        P5_Step3_2 --> P5_Step4
        P5_Step4 --> P5_Step4_1
        P5_Step4_1 --> P5_Step4_2
        
        P5_Step4_2 --> P5_Step5
        P5_Step5 --> P5_Step5_1
        P5_Step5_1 --> P5_Step5_2
        P5_Step5_2 --> P5_Step5_3
        
        P5_Step5_3 --> P5_Step6
        P5_Step6 --> P5_Step6_1
        P5_Step6_1 --> P5_Step6_2
        P5_Step6_2 --> P5_Step6_3
        P5_Step6_3 --> P5_Step6_4
        
        P5_Step6_4 --> P5_Complete[Phase 5 Complete]
    end

    subgraph Phase6["PHASE 6: ERROR HANDLING (45-90 min)"]
        direction TB
        P6_Start[6.0.0 Error Handling]
        
        P6_Step1[6.1.0 Identify Error Scenarios]
        P6_Step1_1[6.1.1 Categorize Error Types]
        P6_Step1_2[6.1.2 Define Error Handling Strategy]
        
        P6_Step2[6.2.0 Wrap Risky Operations in Try-Catch]
        P6_Step2_1[6.2.1 Identify Risky Operations]
        P6_Step2_2[6.2.2 Add Try Blocks]
        P6_Step2_3[6.2.3 Add Specific Catch Blocks]
        
        P6_Step3[6.3.0 Implement Error Logging]
        P6_Step3_1[6.3.1 Log Error Details]
        P6_Step3_2[6.3.2 Log Error Context]
        P6_Step3_3[6.3.3 Set Appropriate Log Levels]
        
        P6_Step4[6.4.0 Implement Error Transformation]
        P6_Step4_1[6.4.1 Define Custom Exceptions]
        P6_Step4_2[6.4.2 Transform Exceptions]
        P6_Step4_3[6.4.3 Chain Exceptions]
        
        P6_Step5[6.5.0 Add Cleanup in Finally Blocks]
        P6_Step5_1[6.5.1 Identify Cleanup Needs]
        P6_Step5_2[6.5.2 Add Finally Blocks]
        P6_Step5_3[6.5.3 Use Context Managers]
        
        P6_Step6[6.6.0 Implement Retry Logic]
        P6_Step6_1[6.6.1 Identify Retryable Operations]
        P6_Step6_2[6.6.2 Implement Exponential Backoff]
        P6_Step6_3[6.6.3 Set Retry Limits]
        
        P6_Step7[6.7.0 Add Error Recovery Mechanisms]
        P6_Step7_1[6.7.1 Define Fallback Strategies]
        P6_Step7_2[6.7.2 Implement Graceful Degradation]
        
        P6_Step8[6.8.0 Test Error Handling Paths]
        P6_Step8_1[6.8.1 Test Validation Error Paths]
        P6_Step8_2[6.8.2 Test Resource Error Paths]
        P6_Step8_3[6.8.3 Test Cleanup Execution]
        P6_Step8_4[6.8.4 Test Retry Logic]
        
        P6_Start --> P6_Step1
        P6_Step1 --> P6_Step1_1
        P6_Step1_1 --> P6_Step1_2
        
        P6_Step1_2 --> P6_Step2
        P6_Step2 --> P6_Step2_1
        P6_Step2_1 --> P6_Step2_2
        P6_Step2_2 --> P6_Step2_3
        
        P6_Step2_3 --> P6_Step3
        P6_Step3 --> P6_Step3_1
        P6_Step3_1 --> P6_Step3_2
        P6_Step3_2 --> P6_Step3_3
        
        P6_Step3_3 --> P6_Step4
        P6_Step4 --> P6_Step4_1
        P6_Step4_1 --> P6_Step4_2
        P6_Step4_2 --> P6_Step4_3
        
        P6_Step4_3 --> P6_Step5
        P6_Step5 --> P6_Step5_1
        P6_Step5_1 --> P6_Step5_2
        P6_Step5_2 --> P6_Step5_3
        
        P6_Step5_3 --> P6_Step6
        P6_Step6 --> P6_Step6_1
        P6_Step6_1 --> P6_Step6_2
        P6_Step6_2 --> P6_Step6_3
        
        P6_Step6_3 --> P6_Step7
        P6_Step7 --> P6_Step7_1
        P6_Step7_1 --> P6_Step7_2
        
        P6_Step7_2 --> P6_Step8
        P6_Step8 --> P6_Step8_1
        P6_Step8_1 --> P6_Step8_2
        P6_Step8_2 --> P6_Step8_3
        P6_Step8_3 --> P6_Step8_4
        
        P6_Step8_4 --> P6_Complete[Phase 6 Complete]
    end

    subgraph Phase7["PHASE 7: DOCUMENTATION REFINEMENT (30-60 min)"]
        direction TB
        P7_Start[7.0.0 Documentation Refinement]
        
        P7_Step1[7.1.0 Update Function Docstrings]
        P7_Step1_1[7.1.1 Verify Summary Accuracy]
        P7_Step1_2[7.1.2 Expand Detailed Description]
        P7_Step1_3[7.1.3 Document Configuration Options]
        P7_Step1_4[7.1.4 Update Raises Section]
        P7_Step1_5[7.1.5 Add Performance Notes]
        P7_Step1_6[7.1.6 Add Thread-Safety Notes]
        
        P7_Step2[7.2.0 Add Comprehensive Examples]
        P7_Step2_1[7.2.1 Add Basic Usage Example]
        P7_Step2_2[7.2.2 Add Advanced Usage Example]
        P7_Step2_3[7.2.3 Add Error Handling Example]
        P7_Step2_4[7.2.4 Add Integration Example]
        
        P7_Step3[7.3.0 Document Module-Level Information]
        P7_Step3_1[7.3.1 Write Module Summary]
        P7_Step3_2[7.3.2 List Module Contents]
        P7_Step3_3[7.3.3 Document Module Dependencies]
        P7_Step3_4[7.3.4 Add Module Usage Example]
        
        P7_Step4[7.4.0 Create README Documentation]
        P7_Step4_1[7.4.1 Write Installation Instructions]
        P7_Step4_2[7.4.2 Write Quickstart Guide]
        P7_Step4_3[7.4.3 Document Configuration]
        P7_Step4_4[7.4.4 Add Troubleshooting Section]
        
        P7_Step5[7.5.0 Add Inline Comments]
        P7_Step5_1[7.5.1 Comment Algorithm Implementations]
        P7_Step5_2[7.5.2 Comment Workarounds]
        P7_Step5_3[7.5.3 Comment Magic Numbers]
        P7_Step5_4[7.5.4 Add TODO Comments for Future Work]
        
        P7_Step6[7.6.0 Generate API Documentation]
        P7_Step6_1[7.6.1 Set Up Documentation Generator]
        P7_Step6_2[7.6.2 Generate HTML Documentation]
        P7_Step6_3[7.6.3 Review Generated Docs]
        
        P7_Step7[7.7.0 Create Responsibility Table]
        P7_Step7_1[7.7.1 List All Functions]
        P7_Step7_2[7.7.2 Document Dependencies]
        P7_Step7_3[7.7.3 Document Outputs]
        
        P7_Start --> P7_Step1
        P7_Step1 --> P7_Step1_1
        P7_Step1_1 --> P7_Step1_2
        P7_Step1_2 --> P7_Step1_3
        P7_Step1_3 --> P7_Step1_4
        P7_Step1_4 --> P7_Step1_5
        P7_Step1_5 --> P7_Step1_6
        
        P7_Step1_6 --> P7_Step2
        P7_Step2 --> P7_Step2_1
        P7_Step2_1 --> P7_Step2_2
        P7_Step2_2 --> P7_Step2_3
        P7_Step2_3 --> P7_Step2_4
        
        P7_Step2_4 --> P7_Step3
        P7_Step3 --> P7_Step3_1
        P7_Step3_1 --> P7_Step3_2
        P7_Step3_2 --> P7_Step3_3
        P7_Step3_3 --> P7_Step3_4
        
        P7_Step3_4 --> P7_Step4
        P7_Step4 --> P7_Step4_1
        P7_Step4_1 --> P7_Step4_2
        P7_Step4_2 --> P7_Step4_3
        P7_Step4_3 --> P7_Step4_4
        
        P7_Step4_4 --> P7_Step5
        P7_Step5 --> P7_Step5_1
        P7_Step5_1 --> P7_Step5_2
        P7_Step5_2 --> P7_Step5_3
        P7_Step5_3 --> P7_Step5_4
        
        P7_Step5_4 --> P7_Step6
        P7_Step6 --> P7_Step6_1
        P7_Step6_1 --> P7_Step6_2
        P7_Step6_2 --> P7_Step6_3
        
        P7_Step6_3 --> P7_Step7
        P7_Step7 --> P7_Step7_1
        P7_Step7_1 --> P7_Step7_2
        P7_Step7_2 --> P7_Step7_3
        
        P7_Step7_3 --> P7_Complete[Phase 7 Complete]
    end

    subgraph Validation["PRODUCTION-READY VALIDATION"]
        direction TB
        V_Start[Validation Checklist]
        
        V_Code[Code Quality Check]
        V_Code_1[All Functions Documented?]
        V_Code_2[No Hardcoded Config?]
        V_Code_3[No Code Duplication?]
        V_Code_4[Single Responsibility?]
        V_Code_5[Follows Style Guide?]
        
        V_Test[Testing Check]
        V_Test_1[>80% Coverage?]
        V_Test_2[Error Paths Tested?]
        V_Test_3[Tests Pass Consistently?]
        
        V_Error[Error Handling Check]
        V_Error_1[External Operations Protected?]
        V_Error_2[Clear Error Messages?]
        V_Error_3[Resources Cleaned Up?]
        
        V_Docs[Documentation Check]
        V_Docs_1[README Complete?]
        V_Docs_2[Functions Documented?]
        V_Docs_3[Configuration Explained?]
        
        V_Decision{Production Ready?}
        V_Deploy[Deploy to Production]
        V_Iterate[Iterate on Failures]
        
        V_Start --> V_Code
        V_Code --> V_Code_1
        V_Code_1 --> V_Code_2
        V_Code_2 --> V_Code_3
        V_Code_3 --> V_Code_4
        V_Code_4 --> V_Code_5
        
        V_Code_5 --> V_Test
        V_Test --> V_Test_1
        V_Test_1 --> V_Test_2
        V_Test_2 --> V_Test_3
        
        V_Test_3 --> V_Error
        V_Error --> V_Error_1
        V_Error_1 --> V_Error_2
        V_Error_2 --> V_Error_3
        
        V_Error_3 --> V_Docs
        V_Docs --> V_Docs_1
        V_Docs_1 --> V_Docs_2
        V_Docs_2 --> V_Docs_3
        
        V_Docs_3 --> V_Decision
        V_Decision -->|Yes| V_Deploy
        V_Decision -->|No| V_Iterate
    end

    %% Phase connections
    P1_Complete --> Phase2
    P2_Complete --> Phase3
    P3_Complete --> Phase4
    P4_Complete --> Phase5
    P5_Complete --> Phase6
    P6_Complete --> Phase7
    P7_Complete --> Validation

    %% Final outcome
    V_Deploy --> End([Production Deployment])
    V_Iterate -.->|Fix Issues| Phase3

    %% Mermaid → Markdown jump targets
    click P1_Start "#phase-1-file-creation-imports" "Open Phase 1"
    click P2_Start "#phase-2-stub-definitions" "Open Phase 2"
    click P3_Start "#phase-3-minimal-implementation" "Open Phase 3"
    click P4_Start "#phase-4-incremental-testing" "Open Phase 4"
    click P5_Start "#phase-5-validation-addition" "Open Phase 5"
    click P6_Start "#phase-6-error-handling" "Open Phase 6"
    click P7_Start "#phase-7-documentation-refinement" "Open Phase 7"
    click V_Start "#summary-phase-completion-checklist" "Open Summary"

    %% Styling for priority levels
    style P1_Step1 fill:#ff6b6b,stroke:#c92a2a,stroke-width:3px
    style P1_Step1_1 fill:#ff6b6b,stroke:#c92a2a,stroke-width:2px
    style P1_Step1_3 fill:#ff6b6b,stroke:#c92a2a,stroke-width:2px
    style P1_Step2 fill:#ff6b6b,stroke:#c92a2a,stroke-width:3px
    style P1_Step2_2 fill:#ff6b6b,stroke:#c92a2a,stroke-width:2px
    style P1_Step3 fill:#ff6b6b,stroke:#c92a2a,stroke-width:3px
    style P1_Step3_1 fill:#ff6b6b,stroke:#c92a2a,stroke-width:2px
    style P1_Step3_2 fill:#ff6b6b,stroke:#c92a2a,stroke-width:2px
    
    style P2_Step1 fill:#ff6b6b,stroke:#c92a2a,stroke-width:3px
    style P2_Step2 fill:#ff6b6b,stroke:#c92a2a,stroke-width:3px
    style P2_Step2_1 fill:#ff6b6b,stroke:#c92a2a,stroke-width:2px
    style P2_Step3 fill:#ff6b6b,stroke:#c92a2a,stroke-width:3px
    style P2_Step3_3 fill:#ff6b6b,stroke:#c92a2a,stroke-width:2px
    style P2_Step3_4 fill:#ff6b6b,stroke:#c92a2a,stroke-width:2px
    style P2_Step4 fill:#ff6b6b,stroke:#c92a2a,stroke-width:3px
    style P2_Step5 fill:#ff6b6b,stroke:#c92a2a,stroke-width:3px
    style P2_Step5_1 fill:#ff6b6b,stroke:#c92a2a,stroke-width:2px
    
    style P3_Step1 fill:#ff6b6b,stroke:#c92a2a,stroke-width:3px
    style P3_Step1_1 fill:#ff6b6b,stroke:#c92a2a,stroke-width:2px
    style P3_Step1_2 fill:#ff6b6b,stroke:#c92a2a,stroke-width:2px
    style P3_Step1_3 fill:#ff6b6b,stroke:#c92a2a,stroke-width:2px
    style P3_Step2_1 fill:#ff6b6b,stroke:#c92a2a,stroke-width:2px
    style P3_Step4 fill:#ff6b6b,stroke:#c92a2a,stroke-width:3px
    style P3_Step4_1 fill:#ff6b6b,stroke:#c92a2a,stroke-width:2px
    style P3_Step4_2 fill:#ff6b6b,stroke:#c92a2a,stroke-width:2px
    
    style P4_Step1 fill:#ff6b6b,stroke:#c92a2a,stroke-width:3px
    style P4_Step1_1 fill:#ff6b6b,stroke:#c92a2a,stroke-width:2px
    style P4_Step2 fill:#ff6b6b,stroke:#c92a2a,stroke-width:3px
    style P4_Step3 fill:#ff6b6b,stroke:#c92a2a,stroke-width:3px
    style P4_Step3_1 fill:#ff6b6b,stroke:#c92a2a,stroke-width:2px
    style P4_Step4 fill:#ff6b6b,stroke:#c92a2a,stroke-width:3px
    style P4_Step4_1 fill:#ff6b6b,stroke:#c92a2a,stroke-width:2px
    style P4_Step4_2 fill:#ff6b6b,stroke:#c92a2a,stroke-width:2px
    style P4_Step5 fill:#ff6b6b,stroke:#c92a2a,stroke-width:3px
    style P4_Step5_1 fill:#ff6b6b,stroke:#c92a2a,stroke-width:2px
    style P4_Step5_2 fill:#ff6b6b,stroke:#c92a2a,stroke-width:2px
    style P4_Step5_3 fill:#ff6b6b,stroke:#c92a2a,stroke-width:2px
    style P4_Step5_4 fill:#ff6b6b,stroke:#c92a2a,stroke-width:2px
    
    style P5_Step1 fill:#ff6b6b,stroke:#c92a2a,stroke-width:3px
    style P5_Step1_1 fill:#ff6b6b,stroke:#c92a2a,stroke-width:2px
    style P5_Step2 fill:#ff6b6b,stroke:#c92a2a,stroke-width:3px
    style P5_Step2_1 fill:#ff6b6b,stroke:#c92a2a,stroke-width:2px
    style P5_Step2_2 fill:#ff6b6b,stroke:#c92a2a,stroke-width:2px
    style P5_Step2_3 fill:#ff6b6b,stroke:#c92a2a,stroke-width:2px
    style P5_Step4 fill:#ff6b6b,stroke:#c92a2a,stroke-width:3px
    style P5_Step4_1 fill:#ff6b6b,stroke:#c92a2a,stroke-width:2px
    style P5_Step5 fill:#ff6b6b,stroke:#c92a2a,stroke-width:3px
    style P5_Step5_1 fill:#ff6b6b,stroke:#c92a2a,stroke-width:2px
    style P5_Step6 fill:#ff6b6b,stroke:#c92a2a,stroke-width:3px
    style P5_Step6_1 fill:#ff6b6b,stroke:#c92a2a,stroke-width:2px
    style P5_Step6_2 fill:#ff6b6b,stroke:#c92a2a,stroke-width:2px
    style P5_Step6_3 fill:#ff6b6b,stroke:#c92a2a,stroke-width:2px
    
    style P6_Step1 fill:#ff6b6b,stroke:#c92a2a,stroke-width:3px
    style P6_Step2 fill:#ff6b6b,stroke:#c92a2a,stroke-width:3px
    style P6_Step2_1 fill:#ff6b6b,stroke:#c92a2a,stroke-width:2px
    style P6_Step3 fill:#ff6b6b,stroke:#c92a2a,stroke-width:3px
    style P6_Step3_1 fill:#ff6b6b,stroke:#c92a2a,stroke-width:2px
    style P6_Step5_1 fill:#ff6b6b,stroke:#c92a2a,stroke-width:2px
    style P6_Step8 fill:#ff6b6b,stroke:#c92a2a,stroke-width:3px
    style P6_Step8_1 fill:#ff6b6b,stroke:#c92a2a,stroke-width:2px
    style P6_Step8_2 fill:#ff6b6b,stroke:#c92a2a,stroke-width:2px
    
    style Start fill:#4CAF50,stroke:#2E7D32,stroke-width:4px
    style End fill:#4CAF50,stroke:#2E7D32,stroke-width:4px
    
    style P1_Complete fill:#2196F3,stroke:#1565C0,stroke-width:3px
    style P2_Complete fill:#2196F3,stroke:#1565C0,stroke-width:3px
    style P3_Complete fill:#2196F3,stroke:#1565C0,stroke-width:3px
    style P4_Complete fill:#2196F3,stroke:#1565C0,stroke-width:3px
    style P5_Complete fill:#2196F3,stroke:#1565C0,stroke-width:3px
    style P6_Complete fill:#2196F3,stroke:#1565C0,stroke-width:3px
    style P7_Complete fill:#2196F3,stroke:#1565C0,stroke-width:3px
    
    style P4_Decision fill:#FFC107,stroke:#F57F17,stroke-width:3px
    style V_Decision fill:#FFC107,stroke:#F57F17,stroke-width:3px
    
    style V_Deploy fill:#4CAF50,stroke:#2E7D32,stroke-width:4px
    style V_Iterate fill:#FF9800,stroke:#E65100,stroke-width:3px
---

# Scaffold-to-Production: Step-by-Step Implementation Guide

**Purpose**: Step-by-step implementation roadmap with LOD patterns for zero-experience candidates  
**Format**: Hierarchical tasks (m.n.o) with reasoning, outcomes, and excellent practices  
**Context**: Last-shot to make it production-ready

> [!info] Navigation
> Click any phase node in the diagram above to jump directly to that section.  
> Jump links: [[#Phase 1: File Creation & Imports]] · [[#Phase 2: Stub Definitions]] · [[#Phase 3: Minimal Implementation]] · [[#Phase 4: Incremental Testing]] · [[#Phase 5: Validation Addition]] · [[#Phase 6: Error Handling]] · [[#Phase 7: Documentation Refinement]]

---

## How to Use This Guide

> [!note] Numbering System
> - **m**: Phase number (1–7)
> - **n**: Step number within phase
> - **o**: Sub-step number within step (0 = main step)

> [!tip] Priority Levels
> - 🔴 **CRITICAL**: Blocks all downstream work; must complete correctly
> - 🟡 **HIGH**: Required for production; causes failures if skipped
> - 🟢 **MEDIUM**: Improves quality and maintainability
> - ⚪ **LOW**: Nice to have; optimize later

> [!warning] Work in Order
> Complete each phase before moving to the next. Don't skip steps.

---

<a id="phase-1-file-creation-imports"></a>
## Phase 1: File Creation & Imports (5–10 minutes)

| # | Phase/Step/Sub-step | Reasoning (Key Concepts) | Outcome | Notes (Do/Don't) | Priority |
|---|---------------------|--------------------------|---------|------------------|----------|
| **1.0.0** | **File Creation & Imports** | Establish module structure and dependency foundation before writing any logic | Module exists with valid imports | Complete this phase before writing any functions | 🔴 |
| 1.1.0 | Create module file | File must exist in correct location for imports to work | Empty file created in proper directory structure | **DO**: Use project naming conventions<br>**DON'T**: Create file in root directory | 🔴 |
| 1.1.1 | Determine file location | Follow project structure conventions (e.g., `src/`, `lib/`, `module/`) | File path matches project architecture | **DO**: Check existing project structure<br>**DON'T**: Invent new directory structure | 🔴 |
| 1.1.2 | Name file descriptively | Filename should indicate module purpose (e.g., `data_loader.py`, `model_trainer.py`) | Filename clearly communicates responsibility | **DO**: Use snake_case for Python, camelCase for JavaScript<br>**DON'T**: Use vague names like `utils.py` | 🟡 |
| 1.1.3 | Verify file creation | Confirm file exists and is accessible to import system | File can be imported without errors | **DO**: Try importing immediately: `import module.file`<br>**DON'T**: Assume file is accessible | 🔴 |
| 1.2.0 | Add essential imports | Import only libraries needed for core functionality; avoid premature imports | Import statements at top of file | **DO**: Group imports by type (stdlib, third-party, local)<br>**DON'T**: Import unused libraries | 🔴 |
| 1.2.1 | Import standard library | Add language built-in libraries needed (e.g., `import os`, `import json`) | Standard library imports present | **DO**: Import specific functions if needed: `from os import path`<br>**DON'T**: Use `from module import *` | 🟡 |
| 1.2.2 | Import third-party dependencies | Add external libraries (e.g., `import pandas`, `import torch`) | Third-party imports present | **DO**: Verify library is installed: `pip list \| grep pandas`<br>**DON'T**: Import without checking installation | 🔴 |
| 1.2.3 | Import configuration manager | Add config handling library or module | Configuration accessible in module | **DO**: Use project-standard config approach<br>**DON'T**: Hardcode config in imports | 🟡 |
| 1.3.0 | Validate imports | Ensure all imports resolve without errors | Module runs without ImportError | **DO**: Run linter or type checker<br>**DON'T**: Skip validation step | 🔴 |
| 1.3.1 | Run syntax check | Execute `python -m py_compile module/file.py` or equivalent | No syntax errors reported | **DO**: Fix errors immediately<br>**DON'T**: Proceed with syntax errors | 🔴 |
| 1.3.2 | Check import resolution | Try importing in REPL or test script | All imports resolve successfully | **DO**: Test in clean environment<br>**DON'T**: Assume imports work without testing | 🔴 |
| 1.3.3 | Document import purposes | Add comments explaining why each import is needed | Imports are self-documenting | **DO**: Comment non-obvious imports<br>**DON'T**: Over-comment obvious imports | 🟢 |

Continue to: [[#Phase 2: Stub Definitions]] ^phase-1-complete

---

<a id="phase-2-stub-definitions"></a>
## Phase 2: Stub Definitions (15–30 minutes)

| # | Phase/Step/Sub-step | Reasoning (Key Concepts) | Outcome | Notes (Do/Don't) | Priority |
|---|---------------------|--------------------------|---------|------------------|----------|
| **2.0.0** | **Stub Definitions** | Define function interfaces before implementation to clarify contracts and enable incremental testing | All function signatures stubbed with docstrings | Stubs serve as executable specification | 🔴 |
| 2.1.0 | Identify required functions | Analyze requirements to determine needed functions based on single-responsibility principle | List of function names and purposes | **DO**: One function per responsibility<br>**DON'T**: Create monolithic "do everything" function | 🔴 |
| 2.1.1 | Map requirements to functions | For each requirement, determine which function handles it | Requirements-to-functions mapping | **DO**: Write mapping on paper/whiteboard first<br>**DON'T**: Skip planning step | 🟡 |
| 2.1.2 | Name functions descriptively | Use verb-noun pattern (e.g., `load_data`, `validate_schema`, `train_model`) | Function names clearly communicate intent | **DO**: Use action verbs: load, validate, compute, transform<br>**DON'T**: Use vague verbs: process, handle, do | 🟡 |
| 2.1.3 | Order functions logically | Arrange functions in execution order or by responsibility grouping | Functions ordered for readability | **DO**: Public functions first, private helpers last<br>**DON'T**: Random ordering | 🟢 |
| 2.2.0 | Write function signatures | Define function name, parameters, and return type for each function | Complete function signatures | **DO**: Use type hints: `def load_data(path: str) -> DataFrame`<br>**DON'T**: Skip type annotations | 🔴 |
| 2.2.1 | Define input parameters | Identify what data and configuration each function needs | Parameter list for each function | **DO**: Group related params in config object<br>**DON'T**: Create functions with 5+ parameters | 🔴 |
| 2.2.2 | Define return types | Specify what each function returns | Return type for each function | **DO**: Return structured data (objects, dataframes)<br>**DON'T**: Return tuples without named fields | 🟡 |
| 2.2.3 | Add default parameter values | Provide sensible defaults for optional parameters | Optional parameters have defaults | **DO**: Use `None` for optional objects<br>**DON'T**: Use mutable defaults: `def func(data=[])` | 🟢 |
| 2.3.0 | Write comprehensive docstrings | Document function purpose, parameters, returns, and exceptions before implementation | Every function has complete docstring | **DO**: Follow standard format (Google, NumPy, Sphinx style)<br>**DON'T**: Write vague descriptions | 🔴 |
| 2.3.1 | Write one-line summary | Start docstring with concise function purpose | Clear one-line description | **DO**: "Load data from SQLite database"<br>**DON'T**: "This function loads data" | 🟡 |
| 2.3.2 | Write detailed description | Explain what function does, how it works, and key algorithms used | 2–4 sentence detailed explanation | **DO**: Explain non-obvious behavior<br>**DON'T**: Repeat parameter descriptions | 🟡 |
| 2.3.3 | Document Args section | List each parameter with type and purpose | Complete parameter documentation | **DO**: Specify expected structure: "config: dict with 'query' key"<br>**DON'T**: Just list parameter names | 🔴 |
| 2.3.4 | Document Returns section | Describe return value structure and semantics | Return value fully documented | **DO**: Specify structure: "DataFrame with columns: id, name, score"<br>**DON'T**: Just say "Returns data" | 🔴 |
| 2.3.5 | Document Raises section | List all exceptions function can raise and conditions | All exceptions documented | **DO**: Specify conditions: "ValueError: if path does not exist"<br>**DON'T**: List exceptions without conditions | 🟡 |
| 2.3.6 | Add usage example | Include concrete example showing function call | Working example in docstring | **DO**: Use realistic example data<br>**DON'T**: Use placeholder values: `example_data` | 🟢 |
| 2.4.0 | Add placeholder implementation | Use `pass`, `raise NotImplementedError`, or return placeholder value | Function is syntactically valid | **DO**: Return correct type: `return []` for list<br>**DON'T**: Leave function body empty (syntax error) | 🔴 |
| 2.4.1 | Choose placeholder strategy | Decide between `pass`, `NotImplementedError`, or dummy return | Consistent placeholder approach | **DO**: Use `raise NotImplementedError("TODO: implement")` for clarity<br>**DON'T**: Mix strategies in same module | 🟢 |
| 2.4.2 | Add TODO comments | Mark implementation locations with TODO or FIXME | Clear markers for incomplete work | **DO**: Include ticket number: `# TODO(PROJ-123): implement validation`<br>**DON'T**: Use vague TODOs: `# TODO: finish this` | 🟢 |
| 2.5.0 | Validate stubs | Ensure all stubs are importable and callable | Module loads without errors | **DO**: Import module and call stubs in REPL<br>**DON'T**: Skip validation | 🔴 |
| 2.5.1 | Import module | Try importing stubbed module in REPL or test script | Module imports successfully | **DO**: `import module; help(module.function)`<br>**DON'T**: Assume imports work | 🔴 |
| 2.5.2 | Call stub functions | Invoke each stub with dummy arguments | Stubs callable without syntax errors | **DO**: Call with minimal args: `func(None, {})`<br>**DON'T**: Skip calling stubs | 🟡 |
| 2.5.3 | Check docstring rendering | View generated documentation for clarity | Docstrings render correctly | **DO**: Use `help(function)` or docs generator<br>**DON'T**: Assume docstrings formatted correctly | 🟢 |

Continue to: [[#Phase 3: Minimal Implementation]] ^phase-2-complete

---

<a id="phase-3-minimal-implementation"></a>
## Phase 3: Minimal Implementation (30–60 minutes)

| # | Phase/Step/Sub-step | Reasoning (Key Concepts) | Outcome | Notes (Do/Don't) | Priority |
|---|---------------------|--------------------------|---------|------------------|----------|
| **3.0.0** | **Minimal Implementation** | Implement simplest version that satisfies core requirement to validate approach before adding complexity | Core logic works for happy path | Focus on correctness, not optimization | 🔴 |
| 3.1.0 | Implement primary function | Write minimal logic for main function without error handling | Function executes successfully with valid input | **DO**: Focus on single happy path<br>**DON'T**: Handle edge cases yet | 🔴 |
| 3.1.1 | Read configuration parameters | Extract needed values from config object | Configuration values accessible | **DO**: Use descriptive variable names: `transformation_type = config.transformation_type`<br>**DON'T**: Use magic indexes: `value = config[2]` | 🔴 |
| 3.1.2 | Implement core algorithm | Write essential logic that transforms input to output | Core transformation works | **DO**: Use existing libraries when possible<br>**DON'T**: Reinvent the wheel | 🔴 |
| 3.1.3 | Return result | Package output in expected format and return | Function returns correct type | **DO**: Match return type from signature<br>**DON'T**: Return different type than documented | 🔴 |
| 3.2.0 | Implement supporting functions | Write minimal versions of helper functions called by primary function | Helper functions work | **DO**: Keep helpers simple<br>**DON'T**: Add unnecessary abstraction | 🟡 |
| 3.2.1 | Order implementation by dependency | Implement leaf functions first, then functions that call them | No undefined function calls | **DO**: Bottom-up implementation order<br>**DON'T**: Try implementing caller before callee | 🔴 |
| 3.2.2 | Keep functions focused | Each helper does one thing well | Functions maintain single responsibility | **DO**: Split if function does multiple things<br>**DON'T**: Create do-everything helper | 🟡 |
| 3.3.0 | Add minimal logging | Include basic logging for debugging during development | Debug output available | **DO**: Use proper logging library: `logging.info()`<br>**DON'T**: Use print statements in production code | 🟢 |
| 3.3.1 | Log function entry | Record when function starts execution | Function execution traceable | **DO**: `logger.debug(f"Starting {func_name} with {params}")`<br>**DON'T**: Log sensitive data (passwords, PII) | 🟢 |
| 3.3.2 | Log key intermediate states | Record important intermediate values | Execution flow visible | **DO**: Log at key decision points<br>**DON'T**: Log every variable | 🟢 |
| 3.3.3 | Log function exit | Record successful completion | Function completion traceable | **DO**: `logger.debug(f"Completed {func_name}")`<br>**DON'T**: Log in hot loops | 🟢 |
| 3.4.0 | Verify logic correctness | Review implementation for logical errors | Logic follows requirements | **DO**: Walk through code line by line<br>**DON'T**: Skip manual code review | 🔴 |
| 3.4.1 | Check variable initialization | Ensure all variables initialized before use | No undefined variable errors | **DO**: Initialize at declaration: `result = []`<br>**DON'T**: Assume variables exist | 🔴 |
| 3.4.2 | Check loop logic | Verify loops iterate correctly and terminate | Loops work as intended | **DO**: Check loop bounds: `for i in range(len(data))`<br>**DON'T**: Create infinite loops | 🔴 |
| 3.4.3 | Check conditional logic | Verify if/else branches execute correctly | Conditions handle all cases | **DO**: Consider all branches: if, elif, else<br>**DON'T**: Forget else clause for error case | 🟡 |
| 3.5.0 | Document implementation decisions | Add comments explaining non-obvious choices | Code is maintainable | **DO**: Explain *why*, not *what*<br>**DON'T**: Comment obvious code | 🟢 |
| 3.5.1 | Comment complex algorithms | Explain difficult logic sections | Complex code understandable | **DO**: Reference algorithm source: "Using Floyd-Warshall algorithm"<br>**DON'T**: Just describe what code does | 🟢 |
| 3.5.2 | Document magic numbers | Explain meaning of numeric constants | Constants are understandable | **DO**: `threshold = 0.5  # Minimum confidence score`<br>**DON'T**: Use unexplained numbers: `if score > 0.5` | 🟡 |

Continue to: [[#Phase 4: Incremental Testing]] ^phase-3-complete

---

<a id="phase-4-incremental-testing"></a>
## Phase 4: Incremental Testing (20–45 minutes)

| # | Phase/Step/Sub-step | Reasoning (Key Concepts) | Outcome | Notes (Do/Don't) | Priority |
|---|---------------------|--------------------------|---------|------------------|----------|
| **4.0.0** | **Incremental Testing** | Validate each function with representative data to catch bugs early and verify requirements | All functions tested and passing | Test-driven validation prevents rework | 🔴 |
| 4.1.0 | Create representative fixtures | Build realistic test data that resembles production data | Fixture dataset created | **DO**: Use real-world-like data structure<br>**DON'T**: Use trivial toy data that hides bugs | 🔴 |
| 4.1.1 | Identify representative cases | Determine typical input scenarios from requirements | List of test cases | **DO**: Include normal, boundary, and edge cases<br>**DON'T**: Test only perfect inputs | 🔴 |
| 4.1.2 | Create fixture data files | Save fixture data to files or generate programmatically | Fixture data accessible | **DO**: Use `fixtures/` directory with descriptive names<br>**DON'T**: Hardcode fixture data in test code | 🟡 |
| 4.1.3 | Document fixture characteristics | Describe what each fixture tests | Fixture purpose clear | **DO**: README in fixtures dir: "sample_100.csv: 100 rows, balanced classes"<br>**DON'T**: Use fixtures without documentation | 🟢 |
| 4.2.0 | Create test configuration | Build configuration objects for tests | Test configs defined | **DO**: Mirror production config structure<br>**DON'T**: Use arbitrary test config format | 🔴 |
| 4.2.1 | Define test parameters | Specify values for all config parameters | Complete test configuration | **DO**: Use realistic parameter values<br>**DON'T**: Use extreme values unless testing limits | 🟡 |
| 4.2.2 | Externalize test config | Save test configs to files (JSON, YAML) | Test configs reusable | **DO**: `test_configs/basic.json`, `test_configs/advanced.json`<br>**DON'T**: Hardcode config in test scripts | 🟢 |
| 4.3.0 | Write test scripts | Create executable tests for each function | Test scripts runnable | **DO**: Use testing framework: pytest, unittest, jest<br>**DON'T**: Write custom test harness from scratch | 🔴 |
| 4.3.1 | Test each function independently | Write unit test for each function in isolation | Every function has unit test | **DO**: Mock dependencies when testing function<br>**DON'T**: Test multiple functions together initially | 🔴 |
| 4.3.2 | Follow Arrange-Act-Assert pattern | Structure tests: setup data, call function, verify result | Tests follow standard pattern | **DO**: Clear sections: `# Arrange`, `# Act`, `# Assert`<br>**DON'T**: Mix setup and verification | 🟡 |
| 4.3.3 | Name tests descriptively | Use pattern: `test_<function>_<scenario>_<expected>` | Test names self-documenting | **DO**: `test_load_data_missing_file_raises_error`<br>**DON'T**: `test1`, `test2` | 🟡 |
| 4.4.0 | Write assertions | Define expected outcomes and verify actual results match | Assertions verify correctness | **DO**: Test multiple aspects: type, value, structure<br>**DON'T**: Test only one thing per function | 🔴 |
| 4.4.1 | Assert output is not null | Verify function returns value | Function produces output | **DO**: `assert result is not None`<br>**DON'T**: Skip null check | 🔴 |
| 4.4.2 | Assert output structure | Verify return value has expected shape/schema | Output structure correct | **DO**: `assert result.shape == (100, 10)` for DataFrame<br>**DON'T**: Assume structure without checking | 🔴 |
| 4.4.3 | Assert output values | Verify result contains expected data | Output values correct | **DO**: `assert result['column'].min() >= 0`<br>**DON'T**: Skip value validation | 🟡 |
| 4.4.4 | Assert output type | Verify return type matches signature | Type correctness verified | **DO**: `assert isinstance(result, pd.DataFrame)`<br>**DON'T**: Rely only on type hints without runtime check | 🟡 |
| 4.5.0 | Run tests and fix failures | Execute tests, identify failures, fix bugs, re-test | All tests passing | **DO**: Fix one failing test at a time<br>**DON'T**: Try fixing multiple failures simultaneously | 🔴 |
| 4.5.1 | Run tests in isolation | Execute each test separately to identify failures | Failing tests identified | **DO**: `pytest tests/test_module.py::test_specific_function`<br>**DON'T**: Run entire test suite when debugging | 🔴 |
| 4.5.2 | Debug failed tests | Use debugger to understand failure root cause | Bug root cause identified | **DO**: Set breakpoint before assertion: `import pdb; pdb.set_trace()`<br>**DON'T**: Guess at fixes without understanding failure | 🔴 |
| 4.5.3 | Fix implementation bugs | Modify code to pass tests | Implementation corrected | **DO**: Fix code, not tests (unless test is wrong)<br>**DON'T**: Disable failing tests | 🔴 |
| 4.5.4 | Re-run tests | Verify fix resolved issue without breaking other tests | Tests pass after fix | **DO**: Run full test suite after fix<br>**DON'T**: Only re-run failing test | 🔴 |
| 4.6.0 | Validate test coverage | Ensure tests exercise all code paths | High test coverage achieved | **DO**: Use coverage tool: `pytest --cov=module`<br>**DON'T**: Aim for 100% coverage initially | 🟢 |
| 4.6.1 | Check line coverage | Verify each line executed by tests | Lines covered | **DO**: Aim for >80% line coverage<br>**DON'T**: Ignore uncovered lines | 🟢 |
| 4.6.2 | Check branch coverage | Verify all if/else branches tested | Branches covered | **DO**: Add tests for uncovered branches<br>**DON'T**: Skip edge case branches | 🟡 |

Continue to: [[#Phase 5: Validation Addition]] ^phase-4-complete

---

<a id="phase-5-validation-addition"></a>
## Phase 5: Validation Addition (30–60 minutes)

| # | Phase/Step/Sub-step | Reasoning (Key Concepts) | Outcome | Notes (Do/Don't) | Priority |
|---|---------------------|--------------------------|---------|------------------|----------|
| **5.0.0** | **Validation Addition** | Add input/output validation to catch bad data early and provide clear error messages | Validation functions implemented | Fail fast with clear errors | 🔴 |
| 5.1.0 | Identify validation requirements | Determine what needs validation based on requirements and failure modes | Validation checklist created | **DO**: Consider all input sources and formats<br>**DON'T**: Assume inputs always valid | 🔴 |
| 5.1.1 | List input constraints | Define valid ranges, types, formats for inputs | Input constraints documented | **DO**: "age: integer, 0-120; email: valid email format"<br>**DON'T**: Leave constraints implicit | 🔴 |
| 5.1.2 | List output constraints | Define expected output properties | Output constraints documented | **DO**: "result: DataFrame, >0 rows, columns [a,b,c]"<br>**DON'T**: Skip output validation | 🟡 |
| 5.1.3 | Identify validation points | Determine where validation should occur | Validation locations marked | **DO**: Validate at function entry and exit<br>**DON'T**: Validate in middle of complex logic | 🟡 |
| 5.2.0 | Implement input validation functions | Write functions to check input validity | Input validators implemented | **DO**: Separate validation from business logic<br>**DON'T**: Mix validation with processing | 🔴 |
| 5.2.1 | Validate for null/missing | Check required inputs are present | Null checks implemented | **DO**: `if data is None: raise ValueError("data required")`<br>**DON'T**: Allow null to propagate | 🔴 |
| 5.2.2 | Validate data types | Check inputs have expected types | Type checks implemented | **DO**: `if not isinstance(data, pd.DataFrame): raise TypeError()`<br>**DON'T**: Rely only on type hints | 🔴 |
| 5.2.3 | Validate data structure | Check shape, schema, columns match expected | Structure checks implemented | **DO**: Validate column names, data types, row counts<br>**DON'T**: Assume structure from sample | 🔴 |
| 5.2.4 | Validate value ranges | Check values within acceptable bounds | Range checks implemented | **DO**: `if age < 0 or age > 120: raise ValueError()`<br>**DON'T**: Allow impossible values | 🟡 |
| 5.2.5 | Validate data quality | Check for data quality issues (duplicates, outliers) | Quality checks implemented | **DO**: Check for unexpected nulls, duplicates in IDs<br>**DON'T**: Try to fix data quality in validation | 🟢 |
| 5.3.0 | Implement output validation functions | Write functions to verify output correctness | Output validators implemented | **DO**: Verify output meets contract<br>**DON'T**: Skip output validation | 🟡 |
| 5.3.1 | Validate output structure | Check output has expected format | Output structure validated | **DO**: Verify return value matches documented structure<br>**DON'T**: Return partial results without validation | 🟡 |
| 5.3.2 | Validate output constraints | Check output satisfies business rules | Output constraints validated | **DO**: Verify row counts, value ranges, required fields<br>**DON'T**: Return invalid data silently | 🟡 |
| 5.4.0 | Add validation to main functions | Integrate validators into function flow | Validation active in functions | **DO**: Call validators at function entry/exit<br>**DON'T**: Skip validation in production code | 🔴 |
| 5.4.1 | Add input validation calls | Insert validator calls at function start | Inputs validated before processing | **DO**: `validate_input(data, config.expected_schema)`<br>**DON'T**: Validate after partial processing | 🔴 |
| 5.4.2 | Add output validation calls | Insert validator calls before return | Outputs validated before return | **DO**: `validate_output(result, config.constraints)`<br>**DON'T**: Return without validation | 🟡 |
| 5.5.0 | Define clear error messages | Write descriptive messages for validation failures | Error messages informative | **DO**: "Expected 47 columns, got 42. Missing: [col_a, col_b]"<br>**DON'T**: "Invalid data" | 🔴 |
| 5.5.1 | Include context in errors | Add relevant details to error messages | Errors contain debugging info | **DO**: Include actual vs expected values<br>**DON'T**: Raise generic errors | 🔴 |
| 5.5.2 | Use appropriate exception types | Choose correct exception class for error type | Exceptions semantically correct | **DO**: `ValueError` for invalid values, `TypeError` for type issues<br>**DON'T**: Always use `Exception` | 🟡 |
| 5.5.3 | Document validation errors | Update docstrings with new exceptions | Exceptions documented | **DO**: Add to Raises section: "ValueError: if column count != 47"<br>**DON'T**: Leave new exceptions undocumented | 🟡 |
| 5.6.0 | Test validation functions | Write tests that trigger validation failures | Validation tests passing | **DO**: Test each validation path<br>**DON'T**: Only test happy path | 🔴 |
| 5.6.1 | Test null input handling | Verify null/missing inputs raise appropriate errors | Null handling tested | **DO**: `with pytest.raises(ValueError): func(None, config)`<br>**DON'T**: Skip null tests | 🔴 |
| 5.6.2 | Test invalid type handling | Verify wrong types raise TypeError | Type checking tested | **DO**: `with pytest.raises(TypeError): func("not a dataframe", config)`<br>**DON'T**: Assume types always correct | 🔴 |
| 5.6.3 | Test schema mismatch | Verify wrong schema raises SchemaError | Schema validation tested | **DO**: Create fixture with wrong columns, expect error<br>**DON'T**: Only test valid schemas | 🔴 |
| 5.6.4 | Test value range violations | Verify out-of-range values raise ValueError | Range validation tested | **DO**: Test boundary conditions: -1, 0, max, max+1<br>**DON'T**: Only test middle values | 🟡 |

Continue to: [[#Phase 6: Error Handling]] ^phase-5-complete

---

<a id="phase-6-error-handling"></a>
## Phase 6: Error Handling (45–90 minutes)

| # | Phase/Step/Sub-step | Reasoning (Key Concepts) | Outcome | Notes (Do/Don't) | Priority |
|---|---------------------|--------------------------|---------|------------------|----------|
| **6.0.0** | **Error Handling** | Add comprehensive error handling to make code robust and maintainable in production | Production-grade error handling | Handle errors gracefully with recovery where possible | 🔴 |
| 6.1.0 | Identify error scenarios | List all possible failure modes for each function | Error scenarios documented | **DO**: Consider external dependencies, resource limits, edge cases<br>**DON'T**: Only plan for obvious errors | 🔴 |
| 6.1.1 | Categorize error types | Group errors by type: validation, resource, network, business logic | Error taxonomy created | **DO**: Distinguish recoverable vs non-recoverable errors<br>**DON'T**: Treat all errors the same | 🟡 |
| 6.1.2 | Define error handling strategy | Decide on retry, fallback, or fail-fast for each error type | Error handling policy established | **DO**: Fail fast for programming errors, retry for transient failures<br>**DON'T**: Swallow errors silently | 🔴 |
| 6.2.0 | Wrap risky operations in try-catch | Add exception handling around operations that can fail | Try-catch blocks added | **DO**: Catch specific exceptions, not generic Exception<br>**DON'T**: Create empty catch blocks | 🔴 |
| 6.2.1 | Identify risky operations | Find operations prone to failure: I/O, network, parsing, external calls | Risky operations marked | **DO**: File operations, database queries, API calls, type conversions<br>**DON'T**: Overlook parsing operations | 🔴 |
| 6.2.2 | Add try blocks | Wrap risky operations in try blocks | Try blocks added | **DO**: Keep try blocks small and focused<br>**DON'T**: Wrap entire function in single try | 🟡 |
| 6.2.3 | Add specific catch blocks | Catch specific exception types in order of specificity | Catch blocks ordered correctly | **DO**: `except FileNotFoundError:` then `except IOError:` then `except Exception:`<br>**DON'T**: Catch Exception first (prevents specific handling) | 🔴 |
| 6.3.0 | Implement error logging | Log errors with context for debugging | Error logging implemented | **DO**: Use structured logging with context<br>**DON'T**: Use print statements | 🔴 |
| 6.3.1 | Log error details | Record exception type, message, and stack trace | Errors logged with details | **DO**: `logger.error(f"Failed: {e}", exc_info=True)`<br>**DON'T**: Log without context: `logger.error("Error")` | 🔴 |
| 6.3.2 | Log error context | Include relevant state when error occurred | Error context captured | **DO**: Log function parameters, intermediate state<br>**DON'T**: Log sensitive data (passwords, tokens) | 🟡 |
| 6.3.3 | Set appropriate log levels | Use ERROR for failures, WARNING for recoverable issues | Log levels correct | **DO**: ERROR for actual failures, WARNING for degraded operation<br>**DON'T**: Use DEBUG for production errors | 🟡 |
| 6.4.0 | Implement error transformation | Convert low-level errors to domain-specific exceptions | Domain exceptions defined | **DO**: Raise business-meaningful exceptions<br>**DON'T**: Expose implementation details in errors | 🟡 |
| 6.4.1 | Define custom exceptions | Create exception classes for domain errors | Custom exceptions defined | **DO**: `class DataValidationError(ValueError):`<br>**DON'T**: Reuse generic exceptions for domain errors | 🟢 |
| 6.4.2 | Transform exceptions | Catch low-level, raise high-level | Exception transformation implemented | **DO**: `except sqlite3.Error as e: raise DataLoadError(f"Load failed: {e}")`<br>**DON'T**: Let sqlite3.Error propagate to caller | 🟡 |
| 6.4.3 | Chain exceptions | Preserve original exception in chain | Exception chain preserved | **DO**: `raise DataLoadError() from e` (Python 3+)<br>**DON'T**: Lose original error information | 🟢 |
| 6.5.0 | Add cleanup in finally blocks | Ensure resources released even when errors occur | Cleanup code in finally | **DO**: Close files, connections in finally block<br>**DON'T**: Rely on garbage collection for resource cleanup | 🟡 |
| 6.5.1 | Identify cleanup needs | List resources that need explicit cleanup | Cleanup checklist created | **DO**: Files, database connections, network sockets, locks<br>**DON'T**: Forget temporary files | 🟡 |
| 6.5.2 | Add finally blocks | Insert cleanup code in finally blocks | Finally blocks added | **DO**: `finally: connection.close()`<br>**DON'T**: Put cleanup in except block only | 🟡 |
| 6.5.3 | Use context managers | Prefer context managers over try-finally for resources | Context managers used | **DO**: `with open(file) as f:` instead of try-finally<br>**DON'T**: Manually manage resources when context manager available | 🟡 |
| 6.6.0 | Implement retry logic for transient errors | Add retry with backoff for recoverable failures | Retry logic implemented | **DO**: Retry network errors, rate limits, temporary unavailability<br>**DON'T**: Retry validation errors or permanent failures | 🟢 |
| 6.6.1 | Identify retryable operations | Determine which failures are transient | Retryable operations marked | **DO**: Network timeouts, 429 rate limit, database connection loss<br>**DON'T**: Retry 404 not found, 401 unauthorized | 🟢 |
| 6.6.2 | Implement exponential backoff | Add retry with increasing delays | Backoff strategy implemented | **DO**: Wait 1s, 2s, 4s, 8s between retries<br>**DON'T**: Retry immediately in tight loop | 🟢 |
| 6.6.3 | Set retry limits | Define maximum retry attempts | Retry limits configured | **DO**: Max 3–5 retries for most operations<br>**DON'T**: Retry infinitely | 🟢 |
| 6.7.0 | Add error recovery mechanisms | Implement fallbacks where appropriate | Recovery strategies implemented | **DO**: Fallback to cache, default values, alternative service<br>**DON'T**: Return partial/corrupt data | 🟢 |
| 6.7.1 | Define fallback strategies | Specify what to do when primary operation fails | Fallback plans documented | **DO**: Document fallback behavior in function docstring<br>**DON'T**: Implement hidden fallbacks | 🟢 |
| 6.7.2 | Implement graceful degradation | Allow system to continue with reduced functionality | Degraded mode implemented | **DO**: Skip optional features if they fail<br>**DON'T**: Fail entire operation for non-critical failures | 🟢 |
| 6.8.0 | Test error handling paths | Write tests that trigger each error scenario | Error tests passing | **DO**: Test every catch block<br>**DON'T**: Only test happy path | 🔴 |
| 6.8.1 | Test validation error paths | Trigger validation failures and verify error messages | Validation error tests passing | **DO**: `with pytest.raises(ValueError, match="Expected 47 columns")`<br>**DON'T**: Skip error message verification | 🔴 |
| 6.8.2 | Test resource error paths | Simulate file not found, connection failures, etc. | Resource error tests passing | **DO**: Mock file system, network to trigger errors<br>**DON'T**: Rely on actual failures for testing | 🔴 |
| 6.8.3 | Test cleanup execution | Verify finally blocks execute and resources released | Cleanup tests passing | **DO**: Verify file closed even when exception raised<br>**DON'T**: Assume cleanup works without testing | 🟡 |
| 6.8.4 | Test retry logic | Verify retries occur with correct backoff | Retry tests passing | **DO**: Mock time and verify retry delays<br>**DON'T**: Sleep in tests (slows test suite) | 🟢 |

Continue to: [[#Phase 7: Documentation Refinement]] ^phase-6-complete

---

<a id="phase-7-documentation-refinement"></a>
## Phase 7: Documentation Refinement (30–60 minutes)

| # | Phase/Step/Sub-step | Reasoning (Key Concepts) | Outcome | Notes (Do/Don't) | Priority |
|---|---------------------|--------------------------|---------|------------------|----------|
| **7.0.0** | **Documentation Refinement** | Complete documentation with implementation details, examples, and usage guidance for maintainability | Production-ready documentation | Documentation enables others to use and maintain code | 🟡 |
| 7.1.0 | Update function docstrings | Refine docstrings to reflect final implementation | Docstrings accurate and complete | **DO**: Update after implementation changes<br>**DON'T**: Leave outdated documentation | 🟡 |
| 7.1.1 | Verify summary accuracy | Check one-line summary matches actual behavior | Summary reflects implementation | **DO**: Update if function behavior changed during development<br>**DON'T**: Keep original stub description if behavior evolved | 🟡 |
| 7.1.2 | Expand detailed description | Add implementation details, algorithms used, performance characteristics | Description comprehensive | **DO**: "Uses binary search O(log n); requires sorted input"<br>**DON'T**: Repeat parameter descriptions in detail section | 🟢 |
| 7.1.3 | Document configuration options | List all configuration parameters and their effects | Configuration fully documented | **DO**: Include valid values: "transformation_type: 'standard' \| 'normalized' \| 'encoded'"<br>**DON'T**: Say "see config object" | 🟡 |
| 7.1.4 | Update Raises section | Add all new exceptions from validation and error handling | All exceptions documented | **DO**: Include conditions: "SchemaError: if input columns != expected_schema"<br>**DON'T**: Miss exceptions added in Phase 5–6 | 🟡 |
| 7.1.5 | Add performance notes | Document time/space complexity, performance considerations | Performance characteristics documented | **DO**: "O(n log n) time, O(n) space"<br>**DON'T**: Claim performance without measurement | 🟢 |
| 7.1.6 | Add thread-safety notes | Document whether function is thread-safe | Concurrency behavior documented | **DO**: "Not thread-safe: uses shared state"<br>**DON'T**: Leave concurrency behavior unclear | 🟢 |
| 7.2.0 | Add comprehensive examples | Include realistic usage examples showing typical workflows | Examples demonstrate usage | **DO**: Show complete working examples<br>**DON'T**: Use placeholder values in examples | 🟡 |
| 7.2.1 | Add basic usage example | Show simplest common use case | Basic example present | **DO**: Include imports, setup, function call, result handling<br>**DON'T**: Show only function call without context | 🟡 |
| 7.2.2 | Add advanced usage example | Show complex scenario with multiple features | Advanced example present | **DO**: Demonstrate configuration options, error handling<br>**DON'T**: Repeat basic example with minor changes | 🟢 |
| 7.2.3 | Add error handling example | Show how to handle exceptions | Error handling demonstrated | **DO**: `try: result = func() except DataError as e: handle(e)`<br>**DON'T**: Show only happy path in examples | 🟢 |
| 7.2.4 | Add integration example | Show function used with other components | Integration demonstrated | **DO**: Show realistic pipeline: load → validate → process → save<br>**DON'T**: Show functions in isolation | 🟢 |
| 7.3.0 | Document module-level information | Add module docstring with overview and usage | Module documented | **DO**: Explain module purpose and main components<br>**DON'T**: Leave module without docstring | 🟢 |
| 7.3.1 | Write module summary | Describe module purpose and responsibilities | Module purpose clear | **DO**: "Data loading and validation utilities for ML pipeline"<br>**DON'T**: Just list functions | 🟢 |
| 7.3.2 | List module contents | Enumerate main classes and functions with brief descriptions | Contents cataloged | **DO**: "Main functions: load_data(), validate_schema(), transform()"<br>**DON'T**: Miss important exports | 🟢 |
| 7.3.3 | Document module dependencies | List required libraries and versions | Dependencies documented | **DO**: "Requires: pandas>=1.3.0, numpy>=1.21.0"<br>**DON'T**: Hide dependency requirements | 🟡 |
| 7.3.4 | Add module usage example | Show how to import and use module | Module usage demonstrated | **DO**: `from module import DataLoader; loader = DataLoader(config)`<br>**DON'T**: Assume import pattern is obvious | 🟢 |
| 7.4.0 | Create README documentation | Write README explaining module purpose, installation, usage | README complete | **DO**: Include quickstart, examples, API reference<br>**DON'T**: Leave README empty or minimal | 🟢 |
| 7.4.1 | Write installation instructions | Document how to install and set up module | Installation documented | **DO**: `pip install -r requirements.txt`<br>**DON'T**: Assume installation is obvious | 🟡 |
| 7.4.2 | Write quickstart guide | Provide minimal example to get started | Quickstart present | **DO**: 5–10 line example that actually runs<br>**DON'T**: Reference non-existent files in quickstart | 🟡 |
| 7.4.3 | Document configuration | Explain configuration options and defaults | Configuration guide complete | **DO**: Show example config file with annotations<br>**DON'T**: Just list parameter names | 🟡 |
| 7.4.4 | Add troubleshooting section | List common issues and solutions | Troubleshooting guide present | **DO**: "FileNotFoundError: Check path is absolute or relative to working directory"<br>**DON'T**: Skip troubleshooting | 🟢 |
| 7.5.0 | Add inline comments | Comment complex or non-obvious code sections | Code well-commented | **DO**: Explain *why*, not *what*<br>**DON'T**: Over-comment obvious code | 🟢 |
| 7.5.1 | Comment algorithm implementations | Explain complex algorithms and data structures | Algorithms explained | **DO**: "Using Dijkstra's algorithm for shortest path"<br>**DON'T**: Describe what code does line-by-line | 🟢 |
| 7.5.2 | Comment workarounds | Explain non-obvious solutions to problems | Workarounds documented | **DO**: "Workaround for pandas bug #12345: using .copy() to avoid SettingWithCopyWarning"<br>**DON'T**: Leave cryptic workarounds unexplained | 🟡 |
| 7.5.3 | Comment magic numbers | Explain numeric constants | Constants explained | **DO**: `TIMEOUT = 30  # seconds to wait for database connection`<br>**DON'T**: Use unexplained numbers: `time.sleep(30)` | 🟡 |
| 7.5.4 | Add TODO comments for future work | Mark areas needing improvement | Future work documented | **DO**: `# TODO(username): Optimize this O(n²) loop for large datasets`<br>**DON'T**: Add TODOs without owner or context | 🟢 |
| 7.6.0 | Generate API documentation | Create formatted API docs from docstrings | API docs generated | **DO**: Use Sphinx, pydoc, JSDoc, or similar<br>**DON'T**: Manually write API docs | 🟢 |
| 7.6.1 | Set up documentation generator | Configure documentation tool for project | Doc generator configured | **DO**: Follow project documentation standards<br>**DON'T**: Use different tool than rest of project | 🟢 |
| 7.6.2 | Generate HTML documentation | Build HTML docs from docstrings | HTML docs created | **DO**: `sphinx-build docs/ docs/_build/html`<br>**DON'T**: Check in generated docs to version control | 🟢 |
| 7.6.3 | Review generated docs | Check docs render correctly and are complete | Docs quality verified | **DO**: Click through all generated pages<br>**DON'T**: Assume docs generated correctly | 🟢 |
| 7.7.0 | Create responsibility table | Document module functions in structured table | Responsibility table complete | **DO**: Follow CID template format<br>**DON'T**: Skip this if using CID framework | 🟢 |
| 7.7.1 | List all functions | Create row for each function in module | All functions listed | **DO**: Include module, class, function, responsibility (S-V-O), dependencies, outputs<br>**DON'T**: Miss helper functions | 🟢 |
| 7.7.2 | Document dependencies | List config parameters and external dependencies for each function | Dependencies mapped | **DO**: "config.transformation_type, config.expected_schema"<br>**DON'T**: List internal variables | 🟢 |
| 7.7.3 | Document outputs | Specify return types and artifacts for each function | Outputs specified | **DO**: "DataFrame with columns [id, score], CheckpointFile at config.checkpoint_path"<br>**DON'T**: Just write "data" | 🟢 |

^phase-7-complete

---

<a id="summary-phase-completion-checklist"></a>
## Summary: Phase Completion Checklist

| Phase | Duration | Must Complete Before Next | Critical Outputs | Success Criteria |
|-------|----------|---------------------------|------------------|------------------|
| **1. File Creation** | 5–10 min | Starting Phase 2 | File exists, imports resolve | `import module` succeeds |
| **2. Stub Definitions** | 15–30 min | Starting Phase 3 | All function signatures + docstrings | `help(module.function)` shows complete docs |
| **3. Minimal Implementation** | 30–60 min | Starting Phase 4 | Core logic works | Function executes without errors on valid input |
| **4. Incremental Testing** | 20–45 min | Starting Phase 5 | All functions tested and passing | `pytest tests/` passes all tests |
| **5. Validation Addition** | 30–60 min | Starting Phase 6 | Input/output validation active | Invalid inputs raise clear errors |
| **6. Error Handling** | 45–90 min | Starting Phase 7 | Comprehensive error handling | All error paths tested and logged |
| **7. Documentation** | 30–60 min | Production deployment | Complete documentation | Others can use module without asking questions |

---

## Anti-Pattern Alert: Common Mistakes to Avoid

> [!warning] Anti-Patterns to Avoid

| ❌ Anti-Pattern | Why It's Harmful | ✅ Correct Pattern | When to Apply |
|----------------|------------------|-------------------|---------------|
| Skipping stubs, implementing directly | Unclear contracts, hard to test incrementally | Stub → Test → Implement | Always, every function |
| Hardcoding config values | Not reusable, requires code changes for different contexts | Inject via config object | Phase 1–3 |
| Implementing all functions before testing any | Late bug discovery, costly rework | Test each function after implementation | Phase 3–4 |
| Generic error messages: "Invalid data" | Impossible to debug | Include context: "Expected 47 columns, got 42. Missing: [age, income]" | Phase 5–6 |
| Empty catch blocks: `except: pass` | Hides errors, makes debugging impossible | Log error and raise or handle explicitly | Phase 6 |
| Testing only happy path | Fails in production with unexpected input | Test normal, boundary, edge, error cases | Phase 4–6 |
| Writing documentation at the end | Incomplete, inconsistent documentation | Document as you implement (docstrings in Phase 2) | All phases |
| Functions with 5+ parameters | Hard to use, error-prone | Group params in config object | Phase 2 |
| 100+ line functions | Hard to understand, test, maintain | Split into smaller focused functions | Phase 3 |
| Mixing validation and business logic | Hard to test and reuse | Separate validation functions | Phase 5 |

---

## Estimated Time Budget (Total: 3–7 hours for complete module)

> [!tip] Time Budget per Phase
> - **Phase 1**: 5–10 minutes
> - **Phase 2**: 15–30 minutes
> - **Phase 3**: 30–60 minutes
> - **Phase 4**: 20–45 minutes
> - **Phase 5**: 30–60 minutes
> - **Phase 6**: 45–90 minutes
> - **Phase 7**: 30–60 minutes
>
> **Total**: ~3–7 hours depending on module complexity

> [!note] Optimization Notes
> - Phases 2–3–4 can iterate: stub one function → implement → test → repeat
> - Phases 5–6 can overlap: add validation and error handling together
> - Phase 7 is ongoing: update docs as implementation changes

---

## Success Metrics: When Is Module Production-Ready?

> [!example] Production-Ready Checklist

**✅ Code Quality**
- [ ] All functions have complete docstrings
- [ ] No hardcoded configuration values
- [ ] No code duplication (DRY principle)
- [ ] All functions maintain single responsibility
- [ ] Code follows project style guide

**✅ Testing**
- [ ] >80% test coverage
- [ ] All error paths tested
- [ ] Tests pass consistently
- [ ] No disabled/skipped tests

**✅ Error Handling**
- [ ] All external operations wrapped in try-catch
- [ ] Clear error messages with context
- [ ] Resources properly cleaned up (finally blocks)
- [ ] Appropriate logging at all error points

**✅ Documentation**
- [ ] Module README complete
- [ ] All functions documented with examples
- [ ] Configuration options explained
- [ ] Troubleshooting guide present

**✅ Validation**
- [ ] All inputs validated at function entry
- [ ] Invalid inputs raise clear errors
- [ ] Output validation before return
- [ ] Edge cases handled

**✅ Integration**
- [ ] Module importable without errors
- [ ] Works with project configuration system
- [ ] Integrates with logging infrastructure
- [ ] Follows project conventions

> [!info] Definition of Done
> **Production-Ready**: Others can understand, use, test, and maintain your code without asking you questions.
