---
title: "Testing Design Patterns & Doubles Module"
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

# Testing Design Patterns & Doubles Module

## Scope & Ownership

Owns how a test is structured and how its collaborators are stood in for: test design patterns and the test double taxonomy.

This module is loaded on demand from [Testing Guidelines](./testing-guidelines.md), which keeps the binding rules and the index. It carries one responsibility and stays under the 600-line file budget.

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
