---
title: "Testing Workflow & Maintenance Module"
doc_type: "Guidelines Module"
version: "1.0.0"
date: "2026-08-20"
lang: "en-US"
frontmatter_contract: "required"
owner: "Technical Writer function"
local_rung: "spec-complete"
delivered_rung: "undocumented"
lane: "authoring"
universal_scope: "true"
parent: "Testing Guidelines"
parent_version: "1.0.0"
---

# Testing Workflow & Maintenance Module

## Scope & Ownership

Owns the lifecycle of a suite after it exists: workflow integration and long-run maintenance.

This module is loaded on demand from [Testing Guidelines](./testing-guidelines.md), which keeps the binding rules and the index. It carries one responsibility and stays under the 600-line file budget.

---

## Testing Workflow Integration

### Pre-Commit Testing

**Engineers run tests before committing**:

```yaml
# .husky/pre-commit
#!/bin/sh
. "$(dirname "$0")/_/husky.sh"

echo "Running pre-commit tests..."

# Run fast unit tests
npm test -- --testPathPattern=unit --bail

# Check test coverage
npm run test:coverage:check

# Run linting
npm run lint

# Type checking
npm run typecheck

echo "Pre-commit checks passed ✓"
```

**Git Hooks Configuration**:
```json
{
  "husky": {
    "hooks": {
      "pre-commit": "npm run test:pre-commit",
      "pre-push": "npm run test:integration"
    }
  },
  "scripts": {
    "test:pre-commit": "jest --onlyChanged --bail",
    "test:integration": "jest --testPathPattern=integration",
    "test:coverage:check": "jest --coverage --coverageThreshold='{\"global\":{\"statements\":80}}'"
  }
}
```

**Directive**: Forbid committing without passing tests.

### Continuous Integration Testing

**Engineers configure CI test pipeline**:

```yaml
# .github/workflows/test.yml
name: Test Pipeline

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main, develop]

jobs:
  unit-tests:
    runs-on: ubuntu-latest
    
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Run unit tests
        run: npm test -- --coverage
      
      - name: Upload coverage
        uses: codecov/codecov-action@v3
        with:
          files: ./coverage/lcov.info
  
  integration-tests:
    runs-on: ubuntu-latest
    needs: unit-tests
    
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Run integration tests
        run: npm test -- --testPathPattern=integration
  
  e2e-tests:
    runs-on: ubuntu-latest
    needs: integration-tests
    
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Run E2E tests
        run: npm run test:e2e
```

**Directive**: Forbid merging without CI test passage.

### Test-Driven Development Workflow

**Engineers integrate TDD into daily workflow**:

```
Morning Stand-up
       │
       ▼
Pick Task from Backlog
       │
       ▼
Write Acceptance Test (RED)
       │
       ├─► Review with team
       │
       ▼
Write Unit Test (RED)
       │
       ▼
Implement Feature (GREEN)
       │
       ├─► Tests pass?
       │   │
       │   ├─ No ─► Debug and fix
       │   │
       │   └─ Yes ─► Continue
       │
       ▼
Refactor Code (REFACTOR)
       │
       ├─► Tests still pass?
       │   │
       │   ├─ No ─► Rollback and retry
       │   │
       │   └─ Yes ─► Continue
       │
       ▼
Run Full Test Suite
       │
       ├─► All pass?
       │   │
       │   ├─ No ─► Fix failures
       │   │
       │   └─ Yes ─► Continue
       │
       ▼
Commit Changes
       │
       ▼
Push to Remote
       │
       ▼
Create Pull Request
       │
       ▼
Code Review + Tests Review
       │
       ▼
Merge to Main
```

**Directive**: Forbid deviating from TDD cycle without justification.

---

---

## Test Maintenance

### Refactoring Test Code

**Engineers maintain test code quality**:

```typescript
// Before: Duplicated setup code
describe('OrderService', () => {
  it('should calculate total for single item', () => {
    const service = new OrderService();
    const repository = new InMemoryOrderRepository();
    const pricer = new PricingService();
    service.setRepository(repository);
    service.setPricer(pricer);
    
    // Test logic...
  });
  
  it('should calculate total for multiple items', () => {
    const service = new OrderService();
    const repository = new InMemoryOrderRepository();
    const pricer = new PricingService();
    service.setRepository(repository);
    service.setPricer(pricer);
    
    // Test logic...
  });
});

// After: Extracted setup
describe('OrderService', () => {
  let service: OrderService;
  let repository: InMemoryOrderRepository;
  let pricer: PricingService;
  
  beforeEach(() => {
    repository = new InMemoryOrderRepository();
    pricer = new PricingService();
    service = new OrderService();
    service.setRepository(repository);
    service.setPricer(pricer);
  });
  
  it('should calculate total for single item', () => {
    // Test logic only...
  });
  
  it('should calculate total for multiple items', () => {
    // Test logic only...
  });
});
```

**Test Refactoring Patterns**:

```typescript
// Extract helper methods
describe('UserValidator', () => {
  // Helper for creating invalid users
  function createInvalidUser(override: Partial<User> = {}): User {
    return {
      email: '', // Invalid
      password: 'short', // Invalid
      ...override
    };
  }
  
  it('should reject user with invalid email', () => {
    const user = createInvalidUser({ email: 'invalid' });
    expect(() => validator.validate(user)).toThrow();
  });
  
  it('should reject user with short password', () => {
    const user = createInvalidUser({ 
      email: 'valid@example.com',
      password: 'short'
    });
    expect(() => validator.validate(user)).toThrow();
  });
});

// Extract custom matchers
expect.extend({
  toBeValidUser(received: User) {
    const pass = 
      received.email.includes('@') &&
      received.password.length >= 8 &&
      received.name.length > 0;
    
    return {
      pass,
      message: () => 
        pass
          ? `Expected ${received} not to be a valid user`
          : `Expected ${received} to be a valid user`
    };
  }
});

it('should create valid user', () => {
  const user = service.createUser(userData);
  expect(user).toBeValidUser();
});
```

**Directive**: Forbid test code duplication without refactoring.

### Handling Flaky Tests

**Engineers eliminate test flakiness**:

```typescript
// ❌ Flaky: Race condition
it('should process items', async () => {
  service.startProcessing();
  // No await - race condition!
  expect(service.isComplete()).toBe(true); // Sometimes fails
});

// ✅ Fixed: Proper async handling
it('should process items', async () => {
  await service.startProcessing();
  expect(service.isComplete()).toBe(true);
});

// ❌ Flaky: Timing dependency
it('should timeout after 100ms', () => {
  const start = Date.now();
  service.withTimeout(100).execute();
  const duration = Date.now() - start;
  expect(duration).toBe(100); // Unreliable
});

// ✅ Fixed: Mock time
it('should timeout after 100ms', () => {
  jest.useFakeTimers();
  
  const timeoutSpy = jest.fn();
  service.withTimeout(100).onTimeout(timeoutSpy).execute();
  
  jest.advanceTimersByTime(100);
  
  expect(timeoutSpy).toHaveBeenCalled();
  
  jest.useRealTimers();
});

// ❌ Flaky: Order-dependent
describe('Tests', () => {
  let sharedState = [];
  
  it('test 1', () => {
    sharedState.push('a');
    expect(sharedState).toEqual(['a']);
  });
  
  it('test 2', () => {
    sharedState.push('b');
    expect(sharedState).toEqual(['a', 'b']); // Assumes test 1 ran first
  });
});

// ✅ Fixed: Isolated state
describe('Tests', () => {
  let state: string[];
  
  beforeEach(() => {
    state = []; // Fresh state for each test
  });
  
  it('test 1', () => {
    state.push('a');
    expect(state).toEqual(['a']);
  });
  
  it('test 2', () => {
    state.push('b');
    expect(state).toEqual(['b']);
  });
});
```

**Directive**: Forbid ignoring or skipping flaky tests without fixing root cause.

---
