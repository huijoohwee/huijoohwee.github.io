# Evaluation Guidelines

## Overview

**Evaluation systems**: design domain-agnostic tests to maximize applicability, execute across contexts to ensure versatility, validate against schemas to preserve correctness, instrument comprehensive metrics to guarantee transparency, automate verification to maintain consistency, isolate test concerns to uphold clarity, and configure assertions to enable adaptability.

**Testing guidelines**: avoid hardcoded fixtures to sustain reusability, prevent flaky tests to reduce fragility, eliminate untested paths to secure coverage, define assertion contracts to uphold clarity, integrate through continuous validation to enable confidence, and bound test scope with explicit ownership to guarantee accountability.

**Evaluation principles**: architect test-first systems to maximize quality, design stateless tests to preserve reproducibility, validate through multiple layers to enable comprehensiveness, bound test contexts with clear assertions to maintain stability, degrade gracefully with fallback assertions to ensure resilience, apply strategic fixture management to optimize maintainability, enforce multi-layer validation with defense-in-depth to secure correctness, and instrument comprehensive test observability to guarantee transparency.

---

## Context—Intent—Directive (CID) Framework

### Definition
- **Context**: focus domain of testing concern
- **Intent**: desired testing principle or quality goal
- **Directive**: explicit prohibition or required test safeguard

### Sorting
Each line/column is organized alphabetically (A→Z) for clarity and neutrality.

---

## Three-Beat Mantra Form

Each line is a three-beat `Context; Intent; Directive` mantra:

- Assertions; validate expected behavior; forbid untested assumptions
- Asynchronous; handle timing properly; forbid race conditions
- Automation; enable continuous validation; forbid manual-only testing
- Baseline; establish performance thresholds; forbid unmonitored degradation
- Boundary; test edge cases; forbid happy-path-only testing
- Brittle; eliminate flaky tests; forbid non-deterministic assertions
- Coverage; measure code paths; forbid untested code
- Data; use representative fixtures; forbid production data in tests
- Determinism; ensure reproducible results; forbid random test outcomes
- Diversity; test across domains; forbid single-context validation
- Documentation; maintain test rationale; forbid undocumented test intent
- Domains; validate across contexts; forbid domain-specific test assumptions
- Duration; optimize test execution; forbid slow test suites
- Environment; isolate test context; forbid shared test state
- Error; validate failure paths; forbid error-path neglect
- Fixtures; externalize test data; forbid embedded test data
- Flaky; eliminate non-deterministic tests; forbid unreliable assertions
- Golden; maintain reference outputs; forbid unvalidated expected results
- Granularity; scope tests appropriately; forbid mixed test levels
- Happy-path; test beyond success; forbid failure-path neglect
- Idempotency; ensure repeatable tests; forbid state-dependent tests
- Independence; isolate test execution; forbid test interdependencies
- Integration; validate component boundaries; forbid integration neglect
- Isolation; separate test concerns; forbid coupled test logic
- Layers; test at appropriate levels; forbid single-layer testing
- Mocking; stub external dependencies; forbid external service calls in unit tests
- Mutation; test data transformations; forbid transformation neglect
- Negative; validate error handling; forbid positive-only testing
- Observability; instrument test execution; forbid opaque test failures
- Orchestration; coordinate multi-repo tests; forbid isolated testing only
- Parallelization; enable concurrent execution; forbid sequential-only tests
- Performance; validate response times; forbid performance neglect
- Pollution; prevent test contamination; forbid shared mutable state
- Precision; assert exact expectations; forbid vague assertions
- Property; test invariants; forbid example-only testing
- Quarantine; isolate flaky tests; forbid blocking CI with flakes
- Regression; prevent bug reintroduction; forbid regression neglect
- Reliability; ensure consistent results; forbid unreliable tests
- Repeatability; guarantee deterministic execution; forbid environment-dependent tests
- Reproduction; enable failure debugging; forbid unreproducible failures
- Schemas; validate data structures; forbid schema drift
- Scope; bound test responsibilities; forbid multi-concern tests
- Security; validate access controls; forbid security test neglect
- Semantics; preserve behavior correctness; forbid semantic drift
- Similarity; test equivalence classes; forbid exhaustive enumeration
- Snapshots; validate output stability; forbid uncontrolled output changes
- Speed; optimize test runtime; forbid unnecessarily slow tests
- Stability; maintain consistent results; forbid intermittent failures
- State; reset between tests; forbid state leakage
- Stubs; simulate dependencies; forbid real dependency usage in unit tests
- Teardown; clean up test artifacts; forbid resource leaks
- Thresholds; configure acceptable ranges; forbid hardcoded limits
- Timeout; limit test duration; forbid hanging tests
- Traceability; link tests to requirements; forbid orphaned tests
- Unit; test components in isolation; forbid integration in unit tests
- Validation; verify correctness systematically; forbid ad-hoc validation
- Variety; test diverse scenarios; forbid narrow test cases
- Verification; prove implementation correctness; forbid unverified behavior

---

## Context—Intent—Directive Table

Each row is a universal, neutral, project-agnostic one-liner mantra: `Context | Intent | Directive`

| Context        | Intent                              | Directive                                                                                      |
|----------------|-------------------------------------|------------------------------------------------------------------------------------------------|
| Assertions     | Validate expected behavior          | - [ ] Use precise assertions; validate behavior; forbid untested assumptions                  |
| Asynchronous   | Handle timing properly              | - [ ] Await promises correctly; handle timing; forbid race conditions                         |
| Automation     | Enable continuous validation        | - [ ] Integrate with CI/CD; automate testing; forbid manual-only testing                      |
| Baseline       | Establish performance thresholds    | - [ ] Track performance metrics; establish baselines; forbid unmonitored degradation          |
| Boundary       | Test edge cases                     | - [ ] Include boundary conditions; test edges; forbid happy-path-only testing                 |
| Brittle        | Eliminate flaky tests               | - [ ] Fix non-deterministic tests; eliminate brittleness; forbid flaky assertions             |
| Coverage       | Measure code paths                  | - [ ] Track test coverage; measure paths; forbid untested code                                |
| Data           | Use representative fixtures         | - [ ] Create diverse fixtures; use representative data; forbid production data in tests       |
| Determinism    | Ensure reproducible results         | - [ ] Control randomness; ensure determinism; forbid random test outcomes                     |
| Diversity      | Test across domains                 | - [ ] Validate multiple contexts; test diversity; forbid single-context validation            |
| Documentation  | Maintain test rationale             | - [ ] Document test intent; maintain rationale; forbid undocumented test purpose              |
| Domains        | Validate across contexts            | - [ ] Test domain-agnostically; validate universally; forbid domain-specific assumptions      |
| Duration       | Optimize test execution             | - [ ] Minimize test runtime; optimize duration; forbid slow test suites                       |
| Environment    | Isolate test context                | - [ ] Reset environment; isolate context; forbid shared test state                            |
| Error          | Validate failure paths              | - [ ] Test error handling; validate failures; forbid error-path neglect                       |
| Fixtures       | Externalize test data               | - [ ] Store fixtures externally; externalize data; forbid embedded test data                  |
| Flaky          | Eliminate non-deterministic tests   | - [ ] Debug and fix flakes; eliminate unreliability; forbid flaky tests                       |
| Golden         | Maintain reference outputs          | - [ ] Store golden files; maintain references; forbid unvalidated expected results            |
| Granularity    | Scope tests appropriately           | - [ ] Match test to level; scope appropriately; forbid mixed test levels                      |
| Happy-path     | Test beyond success                 | - [ ] Include failure scenarios; test beyond success; forbid failure-path neglect             |
| Idempotency    | Ensure repeatable tests             | - [ ] Design for rerun safety; ensure idempotency; forbid state-dependent tests               |
| Independence   | Isolate test execution              | - [ ] Remove test dependencies; isolate execution; forbid test interdependencies              |
| Integration    | Validate component boundaries       | - [ ] Test component integration; validate boundaries; forbid integration neglect             |
| Isolation      | Separate test concerns              | - [ ] Scope to single concern; isolate tests; forbid coupled test logic                       |
| Layers         | Test at appropriate levels          | - [ ] Use test pyramid; test at levels; forbid single-layer testing                           |
| Mocking        | Stub external dependencies          | - [ ] Mock external services; stub dependencies; forbid external calls in unit tests          |
| Mutation       | Test data transformations           | - [ ] Validate transformations; test mutations; forbid transformation neglect                 |
| Negative       | Validate error handling             | - [ ] Test error cases; validate negatives; forbid positive-only testing                      |
| Observability  | Instrument test execution           | - [ ] Log test details; instrument execution; forbid opaque test failures                     |
| Orchestration  | Coordinate multi-repo tests         | - [ ] Synchronize test runs; orchestrate testing; forbid isolated testing only                |
| Parallelization| Enable concurrent execution         | - [ ] Run tests in parallel; enable concurrency; forbid sequential-only tests                 |
| Performance    | Validate response times             | - [ ] Measure latency; validate performance; forbid performance neglect                       |
| Pollution      | Prevent test contamination          | - [ ] Clean test environment; prevent pollution; forbid shared mutable state                  |
| Precision      | Assert exact expectations           | - [ ] Use specific assertions; assert precisely; forbid vague assertions                      |
| Property       | Test invariants                     | - [ ] Verify properties; test invariants; forbid example-only testing                         |
| Quarantine     | Isolate flaky tests                 | - [ ] Separate unreliable tests; quarantine flakes; forbid blocking CI with flakes            |
| Regression     | Prevent bug reintroduction          | - [ ] Add regression tests; prevent reintroduction; forbid regression neglect                 |
| Reliability    | Ensure consistent results           | - [ ] Stabilize test execution; ensure reliability; forbid unreliable tests                   |
| Repeatability  | Guarantee deterministic execution   | - [ ] Control test inputs; guarantee repeatability; forbid environment-dependent tests        |
| Reproduction   | Enable failure debugging            | - [ ] Provide repro steps; enable debugging; forbid unreproducible failures                   |
| Schemas        | Validate data structures            | - [ ] Test schema compliance; validate structures; forbid schema drift                        |
| Scope          | Bound test responsibilities         | - [ ] Limit test focus; bound scope; forbid multi-concern tests                               |
| Security       | Validate access controls            | - [ ] Test security boundaries; validate access; forbid security test neglect                 |
| Semantics      | Preserve behavior correctness       | - [ ] Verify semantic correctness; preserve meaning; forbid semantic drift                    |
| Similarity     | Test equivalence classes            | - [ ] Group similar cases; test classes; forbid exhaustive enumeration                        |
| Snapshots      | Validate output stability           | - [ ] Compare against snapshots; validate stability; forbid uncontrolled output changes       |
| Speed          | Optimize test runtime               | - [ ] Reduce test time; optimize speed; forbid unnecessarily slow tests                       |
| Stability      | Maintain consistent results         | - [ ] Ensure deterministic output; maintain stability; forbid intermittent failures           |
| State          | Reset between tests                 | - [ ] Clear state after tests; reset properly; forbid state leakage                           |
| Stubs          | Simulate dependencies               | - [ ] Create test doubles; simulate dependencies; forbid real dependency usage in unit tests  |
| Teardown       | Clean up test artifacts             | - [ ] Remove test resources; clean up properly; forbid resource leaks                         |
| Thresholds     | Configure acceptable ranges         | - [ ] Set tolerance levels; configure thresholds; forbid hardcoded limits                     |
| Timeout        | Limit test duration                 | - [ ] Set time limits; configure timeouts; forbid hanging tests                               |
| Traceability   | Link tests to requirements          | - [ ] Map tests to features; ensure traceability; forbid orphaned tests                       |
| Unit           | Test components in isolation        | - [ ] Isolate component logic; test units; forbid integration in unit tests                   |
| Validation     | Verify correctness systematically   | - [ ] Apply validation patterns; verify systematically; forbid ad-hoc validation              |
| Variety        | Test diverse scenarios              | - [ ] Include edge cases; test variety; forbid narrow test cases                              |
| Verification   | Prove implementation correctness    | - [ ] Confirm expected behavior; prove correctness; forbid unverified behavior                |

---

## Evaluation Architecture

### Test Pyramid Principles

**Engineers implement layered testing strategy**:

```
        /\
       /  \  E2E Tests (Few)
      /____\
     /      \
    / Integration \ (Some)
   /____________\
  /              \
 /   Unit Tests   \ (Many)
/________________\
```

**Layer Distribution**:
- **Unit Tests (70-80%)**: Fast, isolated, focused on single components
- **Integration Tests (15-20%)**: Medium speed, validate component boundaries
- **E2E Tests (5-10%)**: Slow, validate complete user flows

**Directive**: Forbid inverted test pyramid (more E2E than unit tests).

### Test Categories

**Engineers classify tests by scope**:

**Unit Tests**:
- Scope: Single function, class, or module
- Speed: < 100ms per test
- Dependencies: Mocked/stubbed
- Assertion target: Implementation correctness

**Integration Tests**:
- Scope: Multiple components, module boundaries
- Speed: < 1s per test
- Dependencies: Real internal, mocked external
- Assertion target: Contract compliance

**Contract Tests**:
- Scope: API/interface boundaries
- Speed: < 500ms per test
- Dependencies: Schema validation
- Assertion target: Interface stability

**E2E Tests**:
- Scope: Complete user workflows
- Speed: < 10s per test
- Dependencies: Real systems (test environment)
- Assertion target: Business value delivery

**Performance Tests**:
- Scope: System under load
- Speed: Seconds to minutes
- Dependencies: Isolated test environment
- Assertion target: Response time, throughput, resource usage

**Security Tests**:
- Scope: Access controls, input validation
- Speed: Variable
- Dependencies: Security scanner, test credentials
- Assertion target: Vulnerability absence

---

## Operating Principles

### Test-First Design

**Principle**: Write tests before implementation to ensure testability and clarity.

**Application**:
- Define expected behavior through tests
- Implement minimum code to pass tests
- Refactor with test safety net
- Maintain tests as living documentation

**Directive**: Forbid untested production code.

### Deterministic Execution

**Principle**: Tests must produce consistent results across runs.

**Application**:
- Control random seeds
- Mock current time/date
- Stub external services
- Reset state between tests
- Avoid timing-dependent assertions

**Configuration**:
```yaml
# test-config.yaml
determinism:
  random_seed: 42
  fixed_time: "2025-01-01T00:00:00Z"
  mock_external: true
  state_isolation: strict
```

**Directive**: Forbid non-deterministic test behavior.

### Isolation and Independence

**Principle**: Tests must run independently without shared state.

**Application**:
- Each test sets up its own fixtures
- Tests clean up after themselves
- No test execution order dependencies
- Parallel execution safe

**Directive**: Forbid test interdependencies.

### Fast Feedback Loops

**Principle**: Tests should run quickly to enable rapid iteration.

**Application**:
- Unit tests run in milliseconds
- Integration tests run in seconds
- E2E tests run in reasonable time
- Optimize slow tests or move to appropriate layer

**Targets**:
- Unit test suite: < 10 seconds
- Integration test suite: < 2 minutes
- E2E test suite: < 10 minutes

**Directive**: Forbid unnecessarily slow test suites.

### Representative Coverage

**Principle**: Test coverage should represent real usage patterns and edge cases.

**Application**:
- Include happy paths
- Test error conditions
- Validate boundary conditions
- Cover edge cases
- Test domain diversity

**Directive**: Forbid happy-path-only testing.

---

## Standard Testing Workflow

### 1. Define Test Scope

**Engineers identify testing needs**:
- Determine affected components
- Identify integration boundaries
- Locate existing test coverage
- Map test layers (unit, integration, E2E)
- Assess domain diversity requirements

**Engineers document test plan**:
```yaml
# test-plan.yaml
scope:
  components:
    - component: ${COMPONENT_NAME}
      layer: [unit, integration]
      coverage_target: 80
  
  boundaries:
    - interface: ${API_CONTRACT}
      type: contract_test
  
  domains:
    - context: ${DOMAIN_1}
    - context: ${DOMAIN_2}
    - context: ${DOMAIN_3}
```

**Directive**: Forbid untested code paths.

### 2. Design Test Cases

**Engineers design test scenarios**:

**Unit Test Design**:
```typescript
// Pattern: Arrange-Act-Assert (AAA)
describe('Component.method', () => {
  it('should handle valid input correctly', () => {
    // Arrange: Set up test data
    const input = createValidInput();
    const component = new Component(config);
    
    // Act: Execute behavior
    const result = component.method(input);
    
    // Assert: Verify expectations
    expect(result).toEqual(expectedOutput);
  });
  
  it('should handle invalid input with error', () => {
    // Arrange
    const invalidInput = createInvalidInput();
    const component = new Component(config);
    
    // Act & Assert
    expect(() => component.method(invalidInput))
      .toThrow(ValidationError);
  });
});
```

**Integration Test Design**:
```typescript
// Pattern: Given-When-Then (GWT)
describe('Feature Integration', () => {
  it('should coordinate components correctly', async () => {
    // Given: System in known state
    const system = await setupTestSystem();
    const input = createTestInput();
    
    // When: Action performed
    const result = await system.processInput(input);
    
    // Then: Expected outcome
    expect(result.status).toBe('success');
    expect(result.output).toMatchSchema(outputSchema);
    
    // Cleanup
    await system.teardown();
  });
});
```

**Property-Based Test Design**:
```typescript
// Pattern: Property testing for invariants
import { fc } from 'fast-check';

describe('Component Properties', () => {
  it('should maintain invariant for any input', () => {
    fc.assert(
      fc.property(
        fc.string(), // Generate arbitrary strings
        (input) => {
          const result = component.process(input);
          // Property: Output length never exceeds input length * 2
          return result.length <= input.length * 2;
        }
      )
    );
  });
});
```

**Directive**: Forbid vague or incomplete test cases.

### 3. Implement Test Infrastructure

**Engineers set up test environment**:

**Test Configuration**:
```yaml
# test.config.yaml
environment:
  type: test
  isolation: strict
  
fixtures:
  path: ${TEST_FIXTURES_PATH}
  domains:
    - domain_1
    - domain_2
    - domain_3

mocking:
  external_services: true
  databases: inmemory
  time: fixed

coverage:
  threshold: 80
  exclude:
    - "**/*.test.ts"
    - "**/fixtures/**"

performance:
  baseline_path: ${PERFORMANCE_BASELINE_PATH}
  thresholds:
    p50: 100ms
    p95: 500ms
    p99: 1000ms
```

**Test Fixtures**:
```typescript
// fixtures/fixture-manager.ts
export class FixtureManager {
  private fixturesPath: string;
  
  constructor(config: TestConfig) {
    this.fixturesPath = config.fixtures.path;
  }
  
  loadFixture(domain: string, name: string): any {
    const path = `${this.fixturesPath}/${domain}/${name}.json`;
    return JSON.parse(fs.readFileSync(path, 'utf-8'));
  }
  
  // Load fixtures across multiple domains for diversity testing
  loadMultiDomainFixtures(name: string): any[] {
    return config.fixtures.domains.map(domain =>
      this.loadFixture(domain, name)
    );
  }
}
```

**Directive**: Forbid hardcoded test data in test files.

### 4. Execute and Monitor Tests

**Engineers run test suites**:

**Test Execution**:
```bash
# Unit tests (fast feedback)
npm test -- --testPathPattern=unit

# Integration tests
npm test -- --testPathPattern=integration

# All tests with coverage
npm test -- --coverage --coverageThreshold='{"global":{"statements":80}}'

# Performance tests
npm run test:performance

# Multi-domain validation
npm test -- --testPathPattern=domains
```

**Test Observability**:
```yaml
# test-observability.yaml
metrics:
  - test_duration_ms
  - test_pass_rate
  - coverage_percentage
  - flaky_test_count
  
logs:
  level: info
  format: json
  include_context: true
  
traces:
  enabled: true
  sample_rate: 1.0
  export_path: ${TEST_TRACES_PATH}
```

**Directive**: Forbid opaque test failures without debugging information.

### 5. Analyze and Improve

**Engineers review test results**:

**Coverage Analysis**:
```bash
# Generate coverage report
npm test -- --coverage --coverageReporters=html lcov text

# Check coverage thresholds
npm run coverage:check

# Identify untested paths
npm run coverage:report -- --show-uncovered
```

**Performance Analysis**:
```typescript
// performance-analyzer.ts
export function analyzePerformance(results: TestResults): Analysis {
  return {
    p50: percentile(results.durations, 50),
    p95: percentile(results.durations, 95),
    p99: percentile(results.durations, 99),
    regressions: detectRegressions(results, baseline),
    recommendations: generateOptimizations(results)
  };
}
```

**Flaky Test Detection**:
```typescript
// flaky-detector.ts
export async function detectFlakes(
  testSuite: string,
  iterations: number = 10
): Promise<FlakyTest[]> {
  const results = await runMultipleTimes(testSuite, iterations);
  return results
    .filter(test => test.passRate < 1.0 && test.passRate > 0)
    .map(test => ({
      name: test.name,
      passRate: test.passRate,
      failurePatterns: analyzeFailures(test.failures)
    }));
}
```

**Directive**: Forbid ignoring test failures or flakiness.

---

## Multi-Repo Test Orchestration

### Cross-Repository Testing Strategy

**Engineers coordinate testing across repositories**:

**Test Orchestration Configuration**:
```yaml
# multi-repo-test.config.yaml
repositories:
  host:
    path: ${HOST_REPO_PATH}
    tests:
      unit: npm test -- --testPathPattern=unit
      integration: npm test -- --testPathPattern=integration
      e2e: npm test -- --testPathPattern=e2e
    coverage_threshold: 80
  
  packages:
    - path: ${PACKAGE_1_PATH}
      tests:
        unit: npm test
      coverage_threshold: 85
    
    - path: ${PACKAGE_2_PATH}
      tests:
        unit: npm test
        integration: npm test -- --integration
      coverage_threshold: 85

orchestration:
  strategy: layered  # layered | parallel | sequential
  
  layers:
    - name: unit_tests
      repositories: [packages, host]
      parallel: true
      fail_fast: false
    
    - name: integration_tests
      repositories: [packages, host]
      parallel: false
      depends_on: [unit_tests]
    
    - name: e2e_tests
      repositories: [host]
      parallel: false
      depends_on: [integration_tests]

verification:
  required:
    - all_unit_tests_pass
    - coverage_thresholds_met
    - no_flaky_tests
  
  optional:
    - performance_baseline_maintained
    - security_scans_pass
```

**Test Execution Order**:
1. Package unit tests (parallel)
2. Host unit tests
3. Integration tests (package boundaries)
4. Integration tests (host application)
5. E2E tests (complete workflows)

**Directive**: Forbid testing in isolation without cross-boundary validation.

### Contract Testing

**Engineers validate interface contracts**:

```typescript
// contract-tests/api-contract.test.ts
import { defineContract, validateContract } from '@test/contracts';

describe('API Contract Tests', () => {
  const contract = defineContract({
    provider: 'DataService',
    consumer: 'HostApplication',
    interactions: [
      {
        description: 'fetch user data',
        request: {
          method: 'GET',
          path: '/users/:id',
          headers: { 'Content-Type': 'application/json' }
        },
        response: {
          status: 200,
          body: {
            id: 'string',
            name: 'string',
            email: 'string'
          }
        }
      }
    ]
  });
  
  it('should satisfy contract from provider side', async () => {
    await validateContract.asProvider(contract, providerService);
  });
  
  it('should satisfy contract from consumer side', async () => {
    await validateContract.asConsumer(contract, consumerService);
  });
});
```

**Directive**: Forbid breaking contracts without coordinated updates.

---

## Test Quality Patterns

### Assertion Patterns

**Engineers use precise assertions**:

**Good Assertions**:
```typescript
// ✅ Precise assertion
expect(result.items).toHaveLength(3);
expect(result.items[0]).toMatchObject({
  id: expect.any(String),
  name: 'Expected Name',
  createdAt: expect.any(Date)
});

// ✅ Schema validation
expect(result).toMatchSchema(responseSchema);

// ✅ Property-based assertion
expect(result.total).toBe(result.items.reduce((sum, item) => sum + item.value, 0));
```

**Poor Assertions**:
```typescript
// ❌ Vague assertion
expect(result).toBeTruthy();

// ❌ Too broad
expect(result).toBeDefined();

// ❌ Brittle assertion
expect(result.items.length).toBeGreaterThan(0);
```

**Directive**: Forbid vague or imprecise assertions.

### Fixture Management

**Engineers organize test fixtures**:

**Fixture Structure**:
```
fixtures/
├── domains/
│   ├── domain-1/
│   │   ├── valid-input.json
│   │   ├── invalid-input.json
│   │   └── edge-cases.json
│   ├── domain-2/
│   │   ├── valid-input.json
│   │   ├── invalid-input.json
│   │   └── edge-cases.json
│   └── domain-3/
│       ├── valid-input.json
│       ├── invalid-input.json
│       └── edge-cases.json
├── golden/
│   ├── outputs/
│   │   ├── standard-case.json
│   │   └── edge-case.json
│   └── snapshots/
│       └── component-output.snap
└── schemas/
    ├── input-schema.json
    └── output-schema.json
```

**Fixture Usage**:
```typescript
// test-helpers.ts
export class TestFixtures {
  static loadDomainFixture(domain: string, type: string): any {
    return require(`../fixtures/domains/${domain}/${type}.json`);
  }
  
  static loadGoldenOutput(name: string): any {
    return require(`../fixtures/golden/outputs/${name}.json`);
  }
  
  // Load diverse fixtures for neutrality testing
  static loadMultiDomainFixtures(type: string): any[] {
    const domains = ['domain-1', 'domain-2', 'domain-3'];
    return domains.map(domain => this.loadDomainFixture(domain, type));
  }
}
```

**Directive**: Forbid production data in test fixtures.

### Mock and Stub Patterns

**Engineers isolate external dependencies**:

```typescript
// mocks/external-service.mock.ts
export class ExternalServiceMock {
  private responses: Map<string, any>;
  private callLog: Call[];
  
  constructor(config: MockConfig) {
    this.responses = new Map(config.responses);
    this.callLog = [];
  }
  
  async fetch(url: string): Promise<Response> {
    this.callLog.push({ url, timestamp: Date.now() });
    
    if (this.responses.has(url)) {
      return this.responses.get(url);
    }
    
    throw new Error(`No mock response configured for ${url}`);
  }
  
  getCallLog(): Call[] {
    return [...this.callLog];
  }
  
  verify(url: string, times: number): void {
    const calls = this.callLog.filter(call => call.url === url);
    expect(calls).toHaveLength(times);
  }
}

// Usage in tests
describe('Component with external dependency', () => {
  it('should call external service correctly', async () => {
    const externalService = new ExternalServiceMock({
      responses: [
        ['/api/data', { status: 200, body: { data: 'test' } }]
      ]
    });
    
    const component = new Component(externalService);
    await component.fetchData();
    
    externalService.verify('/api/data', 1);
  });
});
```

**Directive**: Forbid real external service calls in unit tests.

---

## Test Configuration

### Environment-Specific Configuration

**Engineers configure tests per environment**:

```yaml
# test.config.yaml
default:
  timeout: 5000
  retries: 0
  isolation: strict
  
  fixtures:
    path: ./fixtures
    domains: [domain-1, domain-2, domain-3]
  
  mocking:
    external_services: true
    time: fixed
    random: seeded
  
  coverage:
    enabled: true
    threshold: 80
    reporters: [text, html, lcov]

unit:
  extends: default
  timeout: 1000
  pattern: "**/*.unit.test.ts"
  
integration:
  extends: default
  timeout: 10000
  pattern: "**/*.integration.test.ts"
  setup: ./setup/integration-setup.ts
  teardown: ./setup/integration-teardown.ts

e2e:
  extends: default
  timeout: 30000
  pattern: "**/*.e2e.test.ts"
  retries: 2
  parallel: false
  browser: chromium

performance:
  extends: default
  timeout: 60000
  pattern: "**/*.perf.test.ts"
  baseline: ./baselines/performance.json
  thresholds:
    p50: 100
    p95: 500
    p99: 1000

ci:
  extends: default
  parallel: true
  max_workers: 4
  coverage:
    enabled: true
    enforce_threshold: true
  fail_fast: true
```

**Directive**: Forbid environment-dependent test behavior without configuration.

### Test Data Generation

**Engineers generate test data programmatically**:

```typescript
// test-data/generators.ts
export class TestDataGenerator {
  private faker: Faker;
  private random: SeededRandom;
  
  constructor(seed: number = 42) {
    this.random = new SeededRandom(seed);
    this.faker = new Faker({ random: this.random });
  }
  
  generateUser(overrides: Partial<User> = {}): User {
    return {
      id: this.faker.string.uuid(),
      name: this.faker.person.fullName(),
      email: this.faker.internet.email(),
      createdAt: this.faker.date.past(),
      ...overrides
    };
  }
  
  generateUsers(count: number, overrides: Partial<User> = {}): User[] {
    return Array.from({ length: count }, () => this.generateUser(overrides));
  }
  
  // Generate data across multiple domains for diversity
  generateMultiDomainData<T>(
    generator: () => T,
    domains: string[]
  ): Map<string, T> {
    return new Map(
      domains.map(domain => [domain, generator()])
    );
  }
}

// Usage
const generator = new TestDataGenerator(42);
const users = generator.generateUsers(10);
const domainData = generator.generateMultiDomainData(
  () => generator.generateUser(),
  ['domain-1', 'domain-2', 'domain-3']
);
```

**Directive**: Forbid non-reproducible random data generation.

---

## Performance Testing

### Performance Test Patterns

**Engineers measure and validate performance**:

```typescript
// performance/benchmark.test.ts
import { Suite } from 'benchmark';
import { performance } from 'perf_hooks';

describe('Performance Tests', () => {
  const baseline = loadPerformanceBaseline();
  
  it('should process items within time threshold', async () => {
    const items = generateTestData(1000);
    
    const start = performance.now();
    const result = await processor.process(items);
    const duration = performance.now() - start;
    
    expect(duration).toBeLessThan(baseline.p95);
    expect(result).toHaveLength(items.length);
  });
  
  it('should maintain throughput under load', async () => {
    const itemsPerSecond = [];
    const testDuration = 10000; // 10 seconds
    const start = performance.now();
    
    while (performance.now() - start < testDuration) {
      const batchStart = performance.now();
      const batch = generateTestData(100);
      await processor.process(batch);
      const batchDuration = performance.now() - batchStart;
      
      itemsPerSecond.push((batch.length / batchDuration) * 1000);
    }
    
    const avgThroughput = average(itemsPerSecond);
    expect(avgThroughput).toBeGreaterThan(baseline.minThroughput);
  });
  
  describe('Benchmark Suite', () => {
    it('should compare algorithm performance', (done) => {
      const suite = new Suite();
      
      suite
        .add('Algorithm A', () => {
          algorithmA.process(testData);
        })
        .add('Algorithm B', () => {
          algorithmB.process(testData);
        })
        .on('cycle', (event: any) => {
          console.log(String(event.target));
        })
        .on('complete', function(this: any) {
          const fastest = this.filter('fastest').map('name');
          expect(fastest).toContain('Algorithm B');
          done();
        })
        .run({ async: true });
    });
  });
});
```

**Performance Baseline**:
```json
{
  "version": "1.0.0",
  "generated": "2025-01-30T00:00:00Z",
  "metrics": {
    "process_items": {
      "p50": 85,
      "p95": 450,
      "p99": 850,
      "unit": "ms"
    },
    "throughput": {
      "min": 500,
      "target": 1000,
      "unit": "items/second"
    }
  }
}
```

**Directive**: Forbid deploying performance regressions.

---

## Security Testing

### Security Test Patterns

**Engineers validate security controls**:

```typescript
// security/security.test.ts
describe('Security Tests', () => {
  describe('Input Validation', () => {
    it('should reject SQL injection attempts', () => {
      const maliciousInputs = [
        "'; DROP TABLE users--",
        "1' OR '1'='1",
        "admin'--"
      ];
      
      maliciousInputs.forEach(input => {
        expect(() => validator.validate(input))
          .toThrow(ValidationError);
      });
    });
    
    it('should reject XSS attempts', () => {
      const xssPayloads = [
        '<script>alert("XSS")</script>',
        '<img src=x onerror=alert("XSS")>',
        'javascript:alert("XSS")'
      ];
      
      xssPayloads.forEach(payload => {
        const sanitized = sanitizer.sanitize(payload);
        expect(sanitized).not.toContain('<script>');
        expect(sanitized).not.toContain('javascript:');
      });
    });
  });
  
  describe('Access Control', () => {
    it('should enforce authentication', async () => {
      const request = createUnauthenticatedRequest();
      
      await expect(handler.handle(request))
        .rejects.toThrow(UnauthorizedError);
    });
    
    it('should enforce authorization', async () => {
      const user = createUserWithRole('viewer');
      const request = createAuthenticatedRequest(user);
      
      await expect(handler.updateResource(request))
        .rejects.toThrow(ForbiddenError);
    });
  });
  
  describe('Data Protection', () => {
    it('should encrypt sensitive data at rest', () => {
      const sensitiveData = { ssn: '123-45-6789' };
      const stored = storage.store(sensitiveData);
      
      expect(stored.ssn).not.toBe(sensitiveData.ssn);
      expect(stored.ssn).toMatch(/^[A-Za-z0-9+/=]+$/); // Base64
    });
    
    it('should not expose sensitive data in logs', () => {
      const logSpy = jest.spyOn(logger, 'info');
      
      service.processPayment({ cardNumber: '4111111111111111' });
      
      const logCalls = logSpy.mock.calls.flat();
      logCalls.forEach(call => {
        expect(String(call)).not.toContain('4111111111111111');
      });
    });
  });
});
```

**Directive**: Forbid deploying without security test coverage.

---

## Anti-Pattern Guards

**Engineers avoid prohibited testing patterns**:

❌ Hardcoded test data in test files → ✅ Externalized fixtures with configuration  
❌ Flaky tests blocking CI → ✅ Quarantine and fix flaky tests  
❌ No test coverage tracking → ✅ Enforce coverage thresholds  
❌ Production data in tests → ✅ Generated or anonymized test data  
❌ Tests dependent on execution order → ✅ Independent, isolated tests  
❌ Slow test suites → ✅ Optimized, layered testing strategy  
❌ Vague assertions → ✅ Precise, specific assertions  
❌ Untested error paths → ✅ Comprehensive negative testing  
❌ Single-domain testing only → ✅ Multi-domain diversity validation  
❌ Mocking in E2E tests → ✅ Real integrations in E2E, mocks in unit tests  

---

## Role—Action—Outcome for Testing

**Role: Test Engineer**  
→ Action: designs test strategies, implements test suites, maintains test infrastructure, configures test environments, ensures coverage  
→ Outcome: produces comprehensive test coverage enabling confident deployment

**Role: QA Engineer**  
→ Action: validates requirements, performs exploratory testing, identifies edge cases, tracks defects, verifies fixes  
→ Outcome: ensures quality through systematic validation and defect prevention

**Role: Performance Engineer**  
→ Action: designs performance tests, establishes baselines, monitors regressions, optimizes bottlenecks, validates scalability  
→ Outcome: maintains performance within acceptable thresholds

**Role: Security Engineer**  
→ Action: implements security tests, validates access controls, tests input validation, scans for vulnerabilities, ensures compliance  
→ Outcome: secures systems through comprehensive security validation

**Role: Integration Engineer**  
→ Action: coordinates cross-repo testing, validates contracts, ensures boundary correctness, orchestrates test execution, verifies integration  
→ Outcome: maintains integration integrity across system boundaries

**Role: CI/CD Engineer**  
→ Action: configures test automation, optimizes test execution, manages test environments, monitors test metrics, maintains test infrastructure  
→ Outcome: enables reliable, automated testing in deployment pipeline

---

## Neutrality Validation Checklist

**Pre-Commit** (Required):
- [ ] Engineers confirm zero hardcoded test data
- [ ] Engineers verify domain-agnostic test implementation
- [ ] Engineers ensure fixtures cover 3+ domains
- [ ] Engineers validate configuration-driven test behavior
- [ ] Engineers test with diverse scenarios

**Code Review** (Required):
- [ ] Reviewers audit for flaky test patterns
- [ ] Reviewers verify assertion precision
- [ ] Reviewers confirm fixture diversity
- [ ] Reviewers validate test independence
- [ ] Reviewers check performance test coverage

**CI/CD** (Required):
- [ ] Engineers confirm all tests pass
- [ ] Engineers verify coverage thresholds met
- [ ] Engineers validate no flaky tests
- [ ] Engineers ensure performance baselines maintained
- [ ] Engineers confirm security tests pass

---

## Test Observability

### Test Metrics

**Engineers track test health metrics**:

```yaml
# test-metrics.yaml
metrics:
  execution:
    - test_duration_total_ms
    - test_duration_p50_ms
    - test_duration_p95_ms
    - test_duration_p99_ms
    - tests_executed_count
    - tests_passed_count
    - tests_failed_count
    - tests_skipped_count
  
  quality:
    - test_pass_rate_percentage
    - test_flake_rate_percentage
    - code_coverage_percentage
    - branch_coverage_percentage
    - mutation_score_percentage
  
  performance:
    - performance_baseline_deviation_percentage
    - throughput_items_per_second
    - latency_p95_ms
  
  trends:
    - coverage_trend_7d
    - flake_rate_trend_7d
    - test_count_trend_30d

dashboards:
  test_health:
    metrics: [test_pass_rate_percentage, test_flake_rate_percentage]
    refresh_interval: 1h
  
  coverage:
    metrics: [code_coverage_percentage, branch_coverage_percentage]
    threshold_line: 80
  
  performance:
    metrics: [latency_p95_ms, throughput_items_per_second]
    baseline_comparison: true
```

### Test Failure Analysis

**Engineers analyze and categorize failures**:

```typescript
// test-analysis/failure-analyzer.ts
export class TestFailureAnalyzer {
  categorizeFailure(failure: TestFailure): FailureCategory {
    if (this.isFlaky(failure)) {
      return 'flaky';
    }
    if (this.isEnvironmentIssue(failure)) {
      return 'environment';
    }
    if (this.isRealBug(failure)) {
      return 'bug';
    }
    return 'unknown';
  }
  
  generateFailureReport(failures: TestFailure[]): FailureReport {
    const categorized = failures.map(f => ({
      test: f.name,
      category: this.categorizeFailure(f),
      message: f.message,
      stack: f.stack,
      recommendation: this.generateRecommendation(f)
    }));
    
    return {
      total: failures.length,
      byCategory: groupBy(categorized, 'category'),
      actionItems: this.generateActionItems(categorized)
    };
  }
  
  private generateRecommendation(failure: TestFailure): string {
    const category = this.categorizeFailure(failure);
    
    switch (category) {
      case 'flaky':
        return 'Quarantine test and investigate timing/state issues';
      case 'environment':
        return 'Check environment configuration and dependencies';
      case 'bug':
        return 'Create bug ticket and add regression test';
      default:
        return 'Manual investigation required';
    }
  }
}
```

---

## Mantra Application

**"CID frames evaluation standards, Test-First drives quality, AAA patterns structure tests, Test-Pyramid optimizes layers, Configuration-Driven ensures neutrality"**

- **CID frames**: Establishes scope (comprehensive evaluation), purpose (quality + confidence + speed + neutrality), rules (isolation + determinism + diversity + coverage)
- **Test-First drives**: Ensures testability by design, validates behavior before implementation, maintains living documentation, enables confident refactoring
- **AAA patterns structure**: Arranges test setup, acts on system under test, asserts expected outcomes with precision
- **Test-Pyramid optimizes**: Maximizes unit test count (fast feedback), balances integration tests (boundary validation), minimizes E2E tests (workflow verification)
- **Configuration-Driven ensures**: Externalizes test data, abstracts domain specifics, enables multi-context validation, prevents hardcoded assumptions, maintains universal applicability

---

## Universal Application Examples

### Example 1: Web Application Testing

```typescript
// JavaScript/TypeScript React Application
describe('UserProfile Component', () => {
  it('should render user data correctly', () => {
    const user = TestFixtures.loadDomainFixture('domain-1', 'valid-user');
    const { getByText } = render(<UserProfile user={user} />);
    expect(getByText(user.name)).toBeInTheDocument();
  });
});
```

### Example 2: API Service Testing

```python
# Python FastAPI Service
def test_create_user_endpoint():
    # Arrange
    user_data = fixture_manager.load_fixture('domain-2', 'valid-user')
    
    # Act
    response = client.post('/users', json=user_data)
    
    # Assert
    assert response.status_code == 201
    assert response.json()['name'] == user_data['name']
```

### Example 3: Data Pipeline Testing

```go
// Go Data Processor
func TestDataPipeline(t *testing.T) {
    // Arrange
    input := LoadFixture("domain-3", "raw-data")
    expected := LoadGoldenOutput("processed-data")
    
    // Act
    result := pipeline.Process(input)
    
    // Assert
    assert.Equal(t, expected, result)
}
```

### Example 4: Mobile Application Testing

```swift
// Swift iOS Application
func testUserLogin() {
    // Arrange
    let credentials = TestFixtures.loadFixture(domain: "domain-1", type: "valid-credentials")
    
    // Act
    app.login(with: credentials)
    
    // Assert
    XCTAssertTrue(app.isLoggedIn)
}
```

### Example 5: Machine Learning Model Testing

```python
# Python ML Model
def test_model_prediction_accuracy():
    # Arrange
    test_data = fixture_manager.load_multi_domain_fixtures('test-samples')
    baseline = load_performance_baseline()
    
    # Act
    predictions = model.predict(test_data)
    accuracy = calculate_accuracy(predictions, test_data.labels)
    
    # Assert
    assert accuracy >= baseline['min_accuracy']
    assert accuracy >= 0.95  # Domain-agnostic threshold
```

---

## Conclusion

Effective evaluation requires disciplined application of testing principles across all layers of the system. By maintaining test-first design, deterministic execution, isolation and independence, fast feedback loops, and representative coverage, teams achieve confidence in their code quality while enabling rapid iteration.

The key is treating testing as a first-class concern throughout the development lifecycle: clear test strategies, precise assertions, comprehensive coverage, efficient execution, and thorough observability. This approach enables confident deployment while maintaining quality standards across any domain, technology stack, or project context.

**Universal Application**: These guidelines apply equally to any testing context—from unit tests to E2E tests, from web applications to data pipelines, from startups to enterprises, from open-source projects to proprietary systems. The principles are technology-agnostic, domain-neutral, and universally applicable by design.