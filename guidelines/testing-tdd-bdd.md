---
title: "Testing TDD & BDD Module"
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

# Testing TDD & BDD Module

## Scope & Ownership

Owns the two development disciplines that drive test authoring: test-driven development and behavior-driven development.

This module is loaded on demand from [Testing Guidelines](./testing-guidelines.md), which keeps the binding rules and the index. It carries one responsibility and stays under the 600-line file budget.

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
