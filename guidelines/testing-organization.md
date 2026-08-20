---
title: "Testing Naming & Organization Module"
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

# Testing Naming & Organization Module

## Scope & Ownership

Owns where a test lives and what it is called: naming conventions and suite organization.

This module is loaded on demand from [Testing Guidelines](./testing-guidelines.md), which keeps the binding rules and the index. It carries one responsibility and stays under the 600-line file budget.

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
