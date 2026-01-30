# Testing Guidelines

## Overview

**Testing practices**: implement behavior-driven development to maximize clarity, execute test-driven workflows to ensure quality, validate continuously to preserve confidence, instrument test automation to guarantee consistency, document test intentions to maintain transparency, isolate test execution to uphold reliability, and configure test behavior to enable adaptability.

**Developer guidelines**: write tests before implementation to sustain quality, refactor with test coverage to reduce fragility, validate edge cases to secure correctness, define clear test boundaries to uphold modularity, automate test execution to enable velocity, and maintain test documentation to guarantee knowledge transfer.

**Testing principles**: practice red-green-refactor cycles to maximize feedback, design testable interfaces to preserve simplicity, validate behavior not implementation to enable refactoring, define acceptance criteria before coding to maintain clarity, execute tests frequently to ensure rapid feedback, apply appropriate test doubles to optimize isolation, verify specifications through examples to secure understanding, and instrument comprehensive test reporting to guarantee visibility.

---

## Context—Intent—Directive (CID) Framework

### Definition
- **Context**: focus domain of testing practice
- **Intent**: desired testing outcome or quality attribute
- **Directive**: explicit prohibition or required testing discipline

### Sorting
Each line/column is organized alphabetically (A→Z) for clarity and neutrality.

---

## Three-Beat Mantra Form

Each line is a three-beat `Context; Intent; Directive` mantra:

- Acceptance; define criteria first; forbid coding without acceptance tests
- Arrange; set up test context; forbid implicit test setup
- Automation; enable CI/CD integration; forbid manual test execution
- BDD; specify behavior with examples; forbid ambiguous requirements
- Boundaries; test at module edges; forbid testing implementation details
- Clarity; write readable tests; forbid cryptic test code
- Collaboration; pair on test design; forbid isolated test authorship
- Coverage; track meaningful metrics; forbid vanity coverage metrics
- Cycles; follow red-green-refactor; forbid implementation before tests
- Debugging; reproduce with tests; forbid debugging without test reproduction
- Design; drive from tests; forbid untestable design
- Documentation; maintain living specs; forbid stale test documentation
- Doubles; use appropriate fakes; forbid inappropriate mocking
- Examples; specify with scenarios; forbid abstract specifications
- Feedback; optimize test speed; forbid slow feedback loops
- Given-When-Then; structure scenarios; forbid unstructured test narratives
- Granularity; match test to scope; forbid mismatched test granularity
- Implementation; test behavior; forbid testing private methods
- Intent; document test purpose; forbid unclear test objectives
- Isolation; remove dependencies; forbid coupled test execution
- Maintenance; refactor test code; forbid test code rot
- Naming; describe behavior; forbid technical test names
- Readability; optimize for understanding; forbid clever test code
- Red-Green-Refactor; follow TDD cycle; forbid skipping red phase
- Regression; add tests for bugs; forbid fixing without test reproduction
- SOLID; apply design principles; forbid violating SOLID in tests
- Specifications; define with tests; forbid implicit specifications
- TDD; write tests first; forbid test-after development
- Triangulation; verify with multiple examples; forbid single-example testing
- Understanding; clarify requirements; forbid coding without understanding

---

## Context—Intent—Directive Table

Each row is a universal, neutral, project-agnostic one-liner mantra: `Context | Intent | Directive`

| Context          | Intent                              | Directive                                                                                      |
|------------------|-------------------------------------|------------------------------------------------------------------------------------------------|
| Acceptance       | Define criteria first               | - [ ] Write acceptance tests; define criteria; forbid coding without acceptance tests         |
| Arrange          | Set up test context                 | - [ ] Prepare test data; set up context; forbid implicit test setup                           |
| Automation       | Enable CI/CD integration            | - [ ] Automate test runs; enable CI/CD; forbid manual test execution                          |
| BDD              | Specify behavior with examples      | - [ ] Use Given-When-Then; specify behavior; forbid ambiguous requirements                    |
| Boundaries       | Test at module edges                | - [ ] Test public interfaces; focus on boundaries; forbid testing implementation details      |
| Clarity          | Write readable tests                | - [ ] Use descriptive names; write clearly; forbid cryptic test code                          |
| Collaboration    | Pair on test design                 | - [ ] Review tests together; collaborate; forbid isolated test authorship                     |
| Coverage         | Track meaningful metrics            | - [ ] Measure behavior coverage; track meaningfully; forbid vanity coverage metrics           |
| Cycles           | Follow red-green-refactor           | - [ ] Practice TDD cycles; follow rhythm; forbid implementation before tests                  |
| Debugging        | Reproduce with tests                | - [ ] Write failing test; reproduce bugs; forbid debugging without test reproduction          |
| Design           | Drive from tests                    | - [ ] Let tests guide design; drive architecture; forbid untestable design                    |
| Documentation    | Maintain living specs               | - [ ] Keep tests current; maintain specs; forbid stale test documentation                     |
| Doubles          | Use appropriate fakes               | - [ ] Choose right test double; use appropriately; forbid inappropriate mocking               |
| Examples         | Specify with scenarios              | - [ ] Provide concrete examples; specify scenarios; forbid abstract specifications            |
| Feedback         | Optimize test speed                 | - [ ] Minimize test runtime; optimize feedback; forbid slow feedback loops                    |
| Given-When-Then  | Structure scenarios                 | - [ ] Use GWT pattern; structure clearly; forbid unstructured test narratives                 |
| Granularity      | Match test to scope                 | - [ ] Align test level; match scope; forbid mismatched test granularity                       |
| Implementation   | Test behavior                       | - [ ] Verify outcomes; test behavior; forbid testing private methods                          |
| Intent           | Document test purpose               | - [ ] Explain why testing; document intent; forbid unclear test objectives                    |
| Isolation        | Remove dependencies                 | - [ ] Use test doubles; isolate tests; forbid coupled test execution                          |
| Maintenance      | Refactor test code                  | - [ ] Improve test quality; refactor regularly; forbid test code rot                          |
| Naming           | Describe behavior                   | - [ ] Use behavioral names; describe clearly; forbid technical test names                     |
| Readability      | Optimize for understanding          | - [ ] Write for readers; optimize readability; forbid clever test code                        |
| Red-Green-Refactor | Follow TDD cycle                  | - [ ] Fail first; follow cycle; forbid skipping red phase                                     |
| Regression       | Add tests for bugs                  | - [ ] Write reproduction test; add regression tests; forbid fixing without test reproduction  |
| SOLID            | Apply design principles             | - [ ] Follow design principles; apply SOLID; forbid violating SOLID in tests                  |
| Specifications   | Define with tests                   | - [ ] Specify behavior; define with tests; forbid implicit specifications                     |
| TDD              | Write tests first                   | - [ ] Test before code; practice TDD; forbid test-after development                           |
| Triangulation    | Verify with multiple examples       | - [ ] Use multiple cases; triangulate; forbid single-example testing                          |
| Understanding    | Clarify requirements                | - [ ] Explore with tests; clarify understanding; forbid coding without understanding          |

---

## Test-Driven Development (TDD)

### The Red-Green-Refactor Cycle

**Engineers follow TDD discipline**:

```
┌─────────────┐
│     RED     │ Write a failing test
│   (Fail)    │ Test describes desired behavior
└──────┬──────┘
       │
       ▼
┌─────────────┐
│    GREEN    │ Write minimum code to pass
│   (Pass)    │ Make the test pass quickly
└──────┬──────┘
       │
       ▼
┌─────────────┐
│  REFACTOR   │ Improve code quality
│  (Improve)  │ Maintain passing tests
└──────┬──────┘
       │
       └──────── Repeat
```

**Cycle Details**:

1. **RED Phase**: Write a failing test
   - Define expected behavior
   - Assert on desired outcome
   - Run test and verify it fails
   - Confirm failure message is clear

2. **GREEN Phase**: Make it pass
   - Write simplest code that works
   - Focus on passing, not perfection
   - Run test and verify it passes
   - Resist premature optimization

3. **REFACTOR Phase**: Improve design
   - Eliminate duplication
   - Improve naming and structure
   - Apply design patterns
   - Keep all tests passing

**Directive**: Forbid writing production code without a failing test first.

### TDD Workflow Example

**Engineers practice TDD cycle**:

```typescript
// CYCLE 1: Basic functionality

// RED: Write failing test
describe('Calculator', () => {
  it('should add two numbers', () => {
    const calc = new Calculator();
    expect(calc.add(2, 3)).toBe(5);
  });
});
// Error: Calculator is not defined

// GREEN: Make it pass
class Calculator {
  add(a: number, b: number): number {
    return a + b;
  }
}
// Test passes ✓

// REFACTOR: Improve (if needed)
// Code is simple, no refactoring needed yet

// CYCLE 2: Handle edge cases

// RED: Write failing test for zero
describe('Calculator', () => {
  it('should handle zero correctly', () => {
    const calc = new Calculator();
    expect(calc.add(0, 5)).toBe(5);
    expect(calc.add(5, 0)).toBe(5);
  });
});
// Test passes already (implementation handles this)

// CYCLE 3: Add subtraction

// RED: Write failing test
describe('Calculator', () => {
  it('should subtract two numbers', () => {
    const calc = new Calculator();
    expect(calc.subtract(5, 3)).toBe(2);
  });
});
// Error: subtract is not defined

// GREEN: Make it pass
class Calculator {
  add(a: number, b: number): number {
    return a + b;
  }
  
  subtract(a: number, b: number): number {
    return a - b;
  }
}
// Test passes ✓

// REFACTOR: Extract common pattern (if needed)
// Current implementation is clean
```

**Directive**: Forbid skipping the red phase (writing test that fails first).

---

## Behavior-Driven Development (BDD)

### Given-When-Then Pattern

**Engineers structure tests with GWT**:

```gherkin
Feature: User Authentication

  Scenario: Successful login with valid credentials
    Given a user with email "user@example.com" and password "secret123"
    And the user account is active
    When the user attempts to log in
    Then the user should be authenticated
    And a session token should be created
    And the user should be redirected to the dashboard

  Scenario: Failed login with invalid password
    Given a user with email "user@example.com" exists
    When the user attempts to log in with password "wrongpassword"
    Then the login should fail
    And an error message "Invalid credentials" should be displayed
    And no session token should be created
```

**Implementation**:

```typescript
// Step definitions (domain-agnostic)
describe('Feature: User Authentication', () => {
  describe('Scenario: Successful login with valid credentials', () => {
    it('should authenticate user and create session', async () => {
      // Given
      const user = await createUser({
        email: 'user@example.com',
        password: 'secret123',
        status: 'active'
      });
      
      // When
      const result = await authService.login({
        email: 'user@example.com',
        password: 'secret123'
      });
      
      // Then
      expect(result.authenticated).toBe(true);
      expect(result.sessionToken).toBeDefined();
      expect(result.redirectUrl).toBe('/dashboard');
    });
  });
  
  describe('Scenario: Failed login with invalid password', () => {
    it('should reject authentication and show error', async () => {
      // Given
      const user = await createUser({
        email: 'user@example.com',
        password: 'secret123'
      });
      
      // When
      const result = await authService.login({
        email: 'user@example.com',
        password: 'wrongpassword'
      });
      
      // Then
      expect(result.authenticated).toBe(false);
      expect(result.error).toBe('Invalid credentials');
      expect(result.sessionToken).toBeUndefined();
    });
  });
});
```

**Directive**: Forbid ambiguous or unstructured test scenarios.

### Specification by Example

**Engineers define behavior through examples**:

```typescript
// specification/user-registration.spec.ts
describe('User Registration Specification', () => {
  describe('Email Validation', () => {
    // Specify valid examples
    it.each([
      'user@example.com',
      'name.surname@domain.co.uk',
      'user+tag@example.com'
    ])('should accept valid email: %s', async (email) => {
      const result = await validator.validateEmail(email);
      expect(result.valid).toBe(true);
    });
    
    // Specify invalid examples
    it.each([
      'invalid.email',
      '@example.com',
      'user@',
      'user space@example.com'
    ])('should reject invalid email: %s', async (email) => {
      const result = await validator.validateEmail(email);
      expect(result.valid).toBe(false);
      expect(result.error).toBeDefined();
    });
  });
  
  describe('Password Strength', () => {
    // Specify requirements through examples
    const examples = [
      { password: 'short', expected: false, reason: 'too short' },
      { password: 'alllowercase123', expected: false, reason: 'no uppercase' },
      { password: 'ALLUPPERCASE123', expected: false, reason: 'no lowercase' },
      { password: 'NoNumbers!', expected: false, reason: 'no numbers' },
      { password: 'Valid123', expected: true, reason: 'meets all criteria' }
    ];
    
    examples.forEach(({ password, expected, reason }) => {
      it(`should ${expected ? 'accept' : 'reject'} "${password}" (${reason})`, () => {
        const result = validator.validatePassword(password);
        expect(result.valid).toBe(expected);
      });
    });
  });
});
```

**Directive**: Forbid abstract specifications without concrete examples.

---

## Test Design Patterns

### Arrange-Act-Assert (AAA)

**Engineers structure unit tests with AAA**:

```typescript
describe('OrderService', () => {
  it('should calculate total with discount', () => {
    // Arrange: Set up test data and dependencies
    const items = [
      { name: 'Item 1', price: 100, quantity: 2 },
      { name: 'Item 2', price: 50, quantity: 1 }
    ];
    const discount = 0.1; // 10% discount
    const service = new OrderService();
    
    // Act: Execute the behavior being tested
    const total = service.calculateTotal(items, discount);
    
    // Assert: Verify the expected outcome
    expect(total).toBe(225); // (200 + 50) * 0.9
  });
});
```

**AAA Variations**:

```typescript
// AAA with setup/teardown
describe('DatabaseService', () => {
  let db: Database;
  let service: DatabaseService;
  
  beforeEach(() => {
    // Arrange (common setup)
    db = createTestDatabase();
    service = new DatabaseService(db);
  });
  
  afterEach(async () => {
    // Cleanup
    await db.close();
  });
  
  it('should save entity to database', async () => {
    // Arrange (test-specific)
    const entity = { id: '1', name: 'Test' };
    
    // Act
    await service.save(entity);
    
    // Assert
    const saved = await db.findById('1');
    expect(saved).toEqual(entity);
  });
});
```

**Directive**: Forbid mixing arrange, act, and assert phases without clear separation.

### Four-Phase Test Pattern

**Engineers use four-phase structure for complex tests**:

```typescript
describe('PaymentProcessor', () => {
  it('should process payment and send confirmation', async () => {
    // 1. Setup: Prepare test environment
    const paymentGateway = createMockPaymentGateway();
    const emailService = createMockEmailService();
    const processor = new PaymentProcessor(paymentGateway, emailService);
    
    // 2. Exercise: Execute the system under test
    const payment = {
      amount: 100,
      currency: 'USD',
      customerId: 'customer-123'
    };
    const result = await processor.processPayment(payment);
    
    // 3. Verify: Check expected outcomes
    expect(result.status).toBe('success');
    expect(result.transactionId).toBeDefined();
    expect(paymentGateway.charge).toHaveBeenCalledWith(payment);
    expect(emailService.sendConfirmation).toHaveBeenCalled();
    
    // 4. Teardown: Clean up resources
    await processor.cleanup();
  });
});
```

**Directive**: Forbid implicit test phases without clear structure.

### Test Data Builders

**Engineers create maintainable test data**:

```typescript
// test-builders/user-builder.ts
export class UserBuilder {
  private user: Partial<User> = {
    id: generateId(),
    email: 'test@example.com',
    name: 'Test User',
    role: 'user',
    status: 'active',
    createdAt: new Date()
  };
  
  withEmail(email: string): this {
    this.user.email = email;
    return this;
  }
  
  withRole(role: UserRole): this {
    this.user.role = role;
    return this;
  }
  
  withStatus(status: UserStatus): this {
    this.user.status = status;
    return this;
  }
  
  inactive(): this {
    return this.withStatus('inactive');
  }
  
  admin(): this {
    return this.withRole('admin');
  }
  
  build(): User {
    return this.user as User;
  }
}

// Usage in tests
describe('UserService', () => {
  it('should not allow inactive users to login', async () => {
    // Arrange
    const user = new UserBuilder()
      .withEmail('inactive@example.com')
      .inactive()
      .build();
    
    await userRepository.save(user);
    
    // Act
    const result = await authService.login({
      email: user.email,
      password: 'password'
    });
    
    // Assert
    expect(result.authenticated).toBe(false);
    expect(result.error).toBe('Account is inactive');
  });
  
  it('should allow admin users special privileges', async () => {
    // Arrange
    const admin = new UserBuilder()
      .admin()
      .build();
    
    // Act
    const hasAccess = await permissionService.canAccessAdminPanel(admin);
    
    // Assert
    expect(hasAccess).toBe(true);
  });
});
```

**Directive**: Forbid duplicating test data creation logic across tests.

### Object Mother Pattern

**Engineers centralize test object creation**:

```typescript
// test-data/test-objects.ts
export class TestObjects {
  static validUser(overrides: Partial<User> = {}): User {
    return {
      id: generateId(),
      email: 'valid@example.com',
      name: 'Valid User',
      role: 'user',
      status: 'active',
      createdAt: new Date(),
      ...overrides
    };
  }
  
  static adminUser(overrides: Partial<User> = {}): User {
    return this.validUser({
      role: 'admin',
      email: 'admin@example.com',
      ...overrides
    });
  }
  
  static inactiveUser(overrides: Partial<User> = {}): User {
    return this.validUser({
      status: 'inactive',
      ...overrides
    });
  }
  
  static validOrder(overrides: Partial<Order> = {}): Order {
    return {
      id: generateId(),
      userId: generateId(),
      items: [this.validOrderItem()],
      total: 100,
      status: 'pending',
      createdAt: new Date(),
      ...overrides
    };
  }
  
  static validOrderItem(overrides: Partial<OrderItem> = {}): OrderItem {
    return {
      productId: generateId(),
      name: 'Test Product',
      price: 100,
      quantity: 1,
      ...overrides
    };
  }
}

// Usage
describe('OrderService', () => {
  it('should create order for user', async () => {
    const user = TestObjects.validUser();
    const order = TestObjects.validOrder({ userId: user.id });
    
    await service.createOrder(order);
    
    expect(await repository.findById(order.id)).toEqual(order);
  });
});
```

**Directive**: Forbid scattering test object creation throughout test files.

---

## Test Doubles

### Types of Test Doubles

**Engineers choose appropriate test doubles**:

**Dummy**: Objects passed but never used
```typescript
// Dummy: Parameter that isn't used
it('should process without notification service', () => {
  const dummyNotifier = null; // Not used in this test path
  const processor = new Processor(logger, dummyNotifier);
  
  processor.process(data);
  
  expect(processor.status).toBe('completed');
});
```

**Stub**: Provides canned responses
```typescript
// Stub: Returns predetermined values
class EmailServiceStub {
  send(email: Email): Promise<boolean> {
    return Promise.resolve(true); // Always succeeds
  }
}

it('should handle email sending', async () => {
  const emailStub = new EmailServiceStub();
  const service = new UserService(emailStub);
  
  await service.registerUser(userData);
  
  expect(service.lastRegisteredUser).toBeDefined();
});
```

**Spy**: Records calls for verification
```typescript
// Spy: Tracks invocations
class EmailServiceSpy {
  calls: Email[] = [];
  
  send(email: Email): Promise<boolean> {
    this.calls.push(email);
    return Promise.resolve(true);
  }
  
  wasCalled(): boolean {
    return this.calls.length > 0;
  }
  
  wasCalledWith(email: Email): boolean {
    return this.calls.some(call => 
      call.to === email.to && call.subject === email.subject
    );
  }
}

it('should send welcome email after registration', async () => {
  const emailSpy = new EmailServiceSpy();
  const service = new UserService(emailSpy);
  
  await service.registerUser({ email: 'user@example.com' });
  
  expect(emailSpy.wasCalled()).toBe(true);
  expect(emailSpy.wasCalledWith({
    to: 'user@example.com',
    subject: 'Welcome!'
  })).toBe(true);
});
```

**Mock**: Verifies interactions with expectations
```typescript
// Mock: Expects specific calls
it('should call payment gateway with correct parameters', async () => {
  const paymentGateway = {
    charge: jest.fn().mockResolvedValue({ success: true })
  };
  
  const processor = new PaymentProcessor(paymentGateway);
  
  await processor.processPayment({
    amount: 100,
    currency: 'USD'
  });
  
  expect(paymentGateway.charge).toHaveBeenCalledTimes(1);
  expect(paymentGateway.charge).toHaveBeenCalledWith({
    amount: 100,
    currency: 'USD'
  });
});
```

**Fake**: Working implementation with shortcuts
```typescript
// Fake: Simplified working implementation
class InMemoryUserRepository {
  private users: Map<string, User> = new Map();
  
  async save(user: User): Promise<void> {
    this.users.set(user.id, user);
  }
  
  async findById(id: string): Promise<User | null> {
    return this.users.get(id) || null;
  }
  
  async findAll(): Promise<User[]> {
    return Array.from(this.users.values());
  }
}

it('should retrieve saved user', async () => {
  const repository = new InMemoryUserRepository();
  const user = TestObjects.validUser();
  
  await repository.save(user);
  const retrieved = await repository.findById(user.id);
  
  expect(retrieved).toEqual(user);
});
```

**Directive**: Forbid using inappropriate test double types (e.g., mocking everything).

### Test Double Guidelines

**Engineers follow test double best practices**:

```typescript
// ✅ Good: Stub for indirect inputs
it('should format user display name', () => {
  const userService = {
    getCurrentUser: () => ({ name: 'John', surname: 'Doe' })
  };
  
  const formatter = new DisplayFormatter(userService);
  const display = formatter.getDisplayName();
  
  expect(display).toBe('John Doe');
});

// ❌ Bad: Over-mocking internal details
it('should process data', () => {
  const parser = jest.fn();
  const validator = jest.fn();
  const transformer = jest.fn();
  const serializer = jest.fn();
  
  // Too many mocks - testing implementation, not behavior
});

// ✅ Good: Mock for verification of important interactions
it('should audit sensitive operation', async () => {
  const auditLog = {
    log: jest.fn().mockResolvedValue(undefined)
  };
  
  const service = new SensitiveOperationService(auditLog);
  await service.performOperation();
  
  expect(auditLog.log).toHaveBeenCalledWith(
    expect.objectContaining({
      action: 'sensitive_operation',
      timestamp: expect.any(Date)
    })
  );
});

// ✅ Good: Fake for complex dependencies
it('should handle multiple user operations', async () => {
  const userRepo = new InMemoryUserRepository();
  const service = new UserService(userRepo);
  
  await service.createUser({ email: 'user1@example.com' });
  await service.createUser({ email: 'user2@example.com' });
  
  const users = await service.getAllUsers();
  expect(users).toHaveLength(2);
});
```

**Directive**: Forbid over-mocking that couples tests to implementation details.

---

## Test Naming Conventions

### Behavioral Test Names

**Engineers write behavior-describing names**:

```typescript
// ✅ Good: Describes behavior and context
describe('ShoppingCart', () => {
  describe('when adding items', () => {
    it('should increase total price by item price', () => {});
    it('should increment item quantity if item already exists', () => {});
    it('should create new item entry if item does not exist', () => {});
  });
  
  describe('when removing items', () => {
    it('should decrease total price by item price', () => {});
    it('should remove item entry when quantity reaches zero', () => {});
    it('should throw error when removing non-existent item', () => {});
  });
  
  describe('when applying discount code', () => {
    it('should reduce total by discount percentage', () => {});
    it('should reject expired discount codes', () => {});
    it('should reject already used single-use codes', () => {});
  });
});

// ❌ Bad: Technical or vague names
describe('ShoppingCart', () => {
  it('test add', () => {});
  it('test remove', () => {});
  it('test discount', () => {});
  it('works correctly', () => {});
  it('handles edge case', () => {});
});
```

### Test Name Templates

**Engineers use consistent naming patterns**:

```typescript
// Pattern: should [expected behavior] when [condition]
it('should return null when user does not exist', () => {});
it('should throw error when password is invalid', () => {});
it('should send notification when order is completed', () => {});

// Pattern: [method/feature] should [expected behavior] [condition]
it('calculateTotal should include tax when country is US', () => {});
it('login should create session when credentials are valid', () => {});
it('exportData should format as JSON when format is not specified', () => {});

// Pattern: given [precondition] when [action] then [outcome]
it('given active user when login then should create session', () => {});
it('given invalid token when verify then should throw error', () => {});
it('given empty cart when checkout then should reject', () => {});
```

**Directive**: Forbid technical or implementation-focused test names.

---

## Test Organization

### Test File Structure

**Engineers organize test files logically**:

```
src/
├── components/
│   ├── UserProfile/
│   │   ├── UserProfile.tsx
│   │   ├── UserProfile.test.tsx          # Co-located with component
│   │   ├── UserProfile.integration.test.tsx
│   │   └── __snapshots__/
│   │       └── UserProfile.test.tsx.snap
│   └── ShoppingCart/
│       ├── ShoppingCart.tsx
│       ├── ShoppingCart.test.tsx
│       └── ShoppingCart.integration.test.tsx
├── services/
│   ├── AuthService.ts
│   ├── AuthService.test.ts              # Unit tests
│   ├── OrderService.ts
│   └── OrderService.test.ts
└── lib/
    ├── utils.ts
    └── utils.test.ts

tests/
├── integration/                          # Integration test suite
│   ├── api/
│   │   ├── user-api.integration.test.ts
│   │   └── order-api.integration.test.ts
│   └── database/
│       └── repository.integration.test.ts
├── e2e/                                  # E2E test suite
│   ├── user-flows/
│   │   ├── registration.e2e.test.ts
│   │   └── checkout.e2e.test.ts
│   └── admin-flows/
│       └── user-management.e2e.test.ts
├── fixtures/                             # Shared test data
│   ├── users.json
│   ├── orders.json
│   └── products.json
└── helpers/                              # Test utilities
    ├── test-objects.ts
    ├── builders.ts
    └── mocks.ts
```

**Directive**: Forbid mixing test types without clear separation.

### Test Suite Organization

**Engineers structure test suites hierarchically**:

```typescript
describe('UserService', () => {
  // Group by feature/method
  describe('registration', () => {
    describe('with valid data', () => {
      it('should create new user account', () => {});
      it('should send welcome email', () => {});
      it('should return user with generated id', () => {});
    });
    
    describe('with invalid data', () => {
      it('should reject duplicate email', () => {});
      it('should reject invalid email format', () => {});
      it('should reject weak password', () => {});
    });
    
    describe('with edge cases', () => {
      it('should handle email with special characters', () => {});
      it('should handle maximum length name', () => {});
    });
  });
  
  describe('authentication', () => {
    describe('with valid credentials', () => {
      it('should return authentication token', () => {});
      it('should update last login timestamp', () => {});
    });
    
    describe('with invalid credentials', () => {
      it('should reject wrong password', () => {});
      it('should reject non-existent user', () => {});
    });
    
    describe('with account status', () => {
      it('should reject inactive accounts', () => {});
      it('should reject locked accounts', () => {});
    });
  });
});
```

**Directive**: Forbid flat test structures without logical grouping.

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

## Testing Anti-Patterns

**Engineers avoid common testing mistakes**:

### Anti-Pattern: Testing Private Methods

```typescript
// ❌ Bad: Testing private implementation
class UserService {
  private validateEmail(email: string): boolean {
    return email.includes('@');
  }
  
  createUser(email: string): User {
    if (!this.validateEmail(email)) {
      throw new Error('Invalid email');
    }
    return { email };
  }
}

describe('UserService', () => {
  it('should validate email', () => {
    const service = new UserService();
    // Testing private method - brittle and couples to implementation
    expect(service['validateEmail']('test@example.com')).toBe(true);
  });
});

// ✅ Good: Testing public behavior
describe('UserService', () => {
  it('should reject invalid email', () => {
    const service = new UserService();
    expect(() => service.createUser('invalid')).toThrow('Invalid email');
  });
  
  it('should accept valid email', () => {
    const service = new UserService();
    const user = service.createUser('valid@example.com');
    expect(user.email).toBe('valid@example.com');
  });
});
```

### Anti-Pattern: Over-Mocking

```typescript
// ❌ Bad: Mocking everything
it('should process order', () => {
  const validator = jest.fn(() => true);
  const pricer = jest.fn(() => 100);
  const taxCalculator = jest.fn(() => 10);
  const formatter = jest.fn(() => '$110');
  
  const service = new OrderService();
  service.setValidator(validator);
  service.setPricer(pricer);
  service.setTaxCalculator(taxCalculator);
  service.setFormatter(formatter);
  
  service.processOrder(order);
  
  // Testing that mocks were called - not testing real behavior
  expect(validator).toHaveBeenCalled();
  expect(pricer).toHaveBeenCalled();
});

// ✅ Good: Test real behavior, mock only external dependencies
it('should process order', () => {
  const externalPaymentGateway = {
    charge: jest.fn().mockResolvedValue({ success: true })
  };
  
  const service = new OrderService(externalPaymentGateway);
  const result = service.processOrder(order);
  
  // Testing actual behavior
  expect(result.total).toBe(110);
  expect(result.tax).toBe(10);
  
  // Verifying external interaction
  expect(externalPaymentGateway.charge).toHaveBeenCalledWith(110);
});
```

### Anti-Pattern: Testing Multiple Concerns

```typescript
// ❌ Bad: One test testing everything
it('should handle complete user flow', async () => {
  // Testing registration
  const user = await service.register(userData);
  expect(user.id).toBeDefined();
  
  // Testing login
  const session = await service.login(credentials);
  expect(session.token).toBeDefined();
  
  // Testing profile update
  const updated = await service.updateProfile(user.id, newData);
  expect(updated.name).toBe(newData.name);
  
  // Testing deletion
  await service.deleteUser(user.id);
  const deleted = await service.findUser(user.id);
  expect(deleted).toBeNull();
});

// ✅ Good: Separate focused tests
describe('UserService', () => {
  describe('registration', () => {
    it('should create user with generated id', async () => {
      const user = await service.register(userData);
      expect(user.id).toBeDefined();
    });
  });
  
  describe('authentication', () => {
    it('should create session on successful login', async () => {
      const session = await service.login(credentials);
      expect(session.token).toBeDefined();
    });
  });
  
  describe('profile updates', () => {
    it('should update user profile data', async () => {
      const updated = await service.updateProfile(userId, newData);
      expect(updated.name).toBe(newData.name);
    });
  });
  
  describe('user deletion', () => {
    it('should remove user from system', async () => {
      await service.deleteUser(userId);
      const deleted = await service.findUser(userId);
      expect(deleted).toBeNull();
    });
  });
});
```

**Directive**: Forbid testing anti-patterns that reduce test value and maintainability.

---

## Role—Action—Outcome for Testing

**Role: Developer**  
→ Action: practices TDD, writes behavioral tests, refactors with test coverage, maintains test code quality, debugs with test reproduction  
→ Outcome: produces reliable code with comprehensive test coverage and rapid feedback

**Role: QA Engineer**  
→ Action: designs test scenarios, validates acceptance criteria, explores edge cases, coordinates testing efforts, reports defects with reproduction steps  
→ Outcome: ensures quality through systematic validation and clear defect communication

**Role: Test Automation Engineer**  
→ Action: builds test frameworks, creates test utilities, maintains test infrastructure, optimizes test execution, implements custom matchers  
→ Outcome: enables efficient testing through robust automation and tooling

**Role: Product Owner**  
→ Action: defines acceptance criteria, provides behavior examples, reviews test scenarios, validates feature completeness, prioritizes test coverage  
→ Outcome: ensures features meet requirements through clear specification and validation

**Role: Tech Lead**  
→ Action: establishes testing standards, reviews test quality, mentors on TDD practices, enforces testing discipline, monitors test metrics  
→ Outcome: maintains testing culture and code quality across team

---

## Mantra Application

**"CID frames testing discipline, TDD drives design, BDD clarifies requirements, AAA structures tests, Test-Doubles isolate dependencies, Configuration-Driven ensures neutrality"**

- **CID frames**: Establishes scope (testing practices), purpose (quality + confidence + feedback + maintainability), rules (TDD + BDD + isolation + clarity)
- **TDD drives**: Red-green-refactor cycle ensures testability, validates behavior before implementation, maintains regression safety, enables confident refactoring
- **BDD clarifies**: Given-When-Then structures scenarios, specifies behavior through examples, aligns technical and business understanding, maintains living documentation
- **AAA structures**: Arranges test context clearly, acts on system under test explicitly, asserts expected outcomes precisely
- **Test-Doubles isolate**: Dummies pass unused parameters, stubs provide responses, spies record calls, mocks verify interactions, fakes implement simplified logic
- **Configuration-Driven ensures**: Externalizes test data, abstracts environment specifics, enables multi-context validation, prevents hardcoded assumptions, maintains universal applicability

---

## Universal Application Examples

### Example 1: JavaScript/TypeScript TDD

```typescript
// RED: Write failing test
describe('StringCalculator', () => {
  it('should return 0 for empty string', () => {
    const calc = new StringCalculator();
    expect(calc.add('')).toBe(0);
  });
});

// GREEN: Make it pass
class StringCalculator {
  add(numbers: string): number {
    return numbers === '' ? 0 : parseInt(numbers);
  }
}

// REFACTOR: Improve (after more tests)
class StringCalculator {
  add(numbers: string): number {
    if (numbers === '') return 0;
    return numbers.split(',').reduce((sum, n) => sum + parseInt(n), 0);
  }
}
```

### Example 2: Python BDD

```python
# Feature specification
def test_user_registration_with_valid_data():
    # Given
    user_data = {
        'email': 'user@example.com',
        'password': 'SecurePass123'
    }
    
    # When
    result = auth_service.register(user_data)
    
    # Then
    assert result.success is True
    assert result.user.email == user_data['email']
    assert result.welcome_email_sent is True
```

### Example 3: Go Table-Driven Tests

```go
func TestValidateEmail(t *testing.T) {
    tests := []struct {
        name    string
        email   string
        want    bool
    }{
        {"valid email", "user@example.com", true},
        {"missing @", "userexample.com", false},
        {"missing domain", "user@", false},
    }
    
    for _, tt := range tests {
        t.Run(tt.name, func(t *testing.T) {
            got := ValidateEmail(tt.email)
            if got != tt.want {
                t.Errorf("ValidateEmail(%q) = %v, want %v", 
                    tt.email, got, tt.want)
            }
        })
    }
}
```

### Example 4: Java JUnit Testing

```java
@Test
@DisplayName("Should calculate order total with discount")
void shouldCalculateOrderTotalWithDiscount() {
    // Arrange
    Order order = new OrderBuilder()
        .addItem("Product A", 100.0)
        .addItem("Product B", 50.0)
        .withDiscount(0.1)
        .build();
    
    // Act
    double total = orderService.calculateTotal(order);
    
    // Assert
    assertEquals(135.0, total, 0.01);
}
```

### Example 5: Ruby RSpec BDD

```ruby
describe UserService do
  describe '#register' do
    context 'with valid data' do
      it 'creates a new user' do
        user_data = { email: 'user@example.com', password: 'password123' }
        
        user = service.register(user_data)
        
        expect(user).to be_persisted
        expect(user.email).to eq(user_data[:email])
      end
    end
    
    context 'with duplicate email' do
      it 'raises validation error' do
        create(:user, email: 'existing@example.com')
        
        expect {
          service.register(email: 'existing@example.com')
        }.to raise_error(ValidationError)
      end
    end
  end
end
```

---

## Conclusion

Effective testing requires disciplined application of TDD and BDD practices throughout the development lifecycle. By maintaining test-first design, clear test structure, appropriate test doubles, behavioral naming, and continuous refactoring, developers achieve confidence in their code while enabling rapid iteration.

The key is treating testing as integral to development: write tests before code, structure tests clearly, name tests descriptively, isolate dependencies appropriately, and maintain test code quality. This approach enables confident refactoring, rapid feedback, clear documentation, and high-quality software delivery across any domain, technology stack, or project context.

**Universal Application**: These guidelines apply equally to any development context—from web applications to embedded systems, from startups to enterprises, from greenfield projects to legacy code, from solo development to large teams. The principles are language-agnostic, framework-neutral, and universally applicable by design.