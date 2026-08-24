---
title: "Testing Anti-Patterns & Examples Module"
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

# Testing Anti-Patterns & Examples Module

## Scope & Ownership

Owns the prohibited patterns and the worked examples that show the guidance applied across domains.

This module is loaded on demand from [Testing Guidelines](./testing-guidelines.md), which keeps the binding rules and the index. It carries one responsibility and stays under the 600-line file budget.

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
