# Coding Guidelines

## Core Principles
1. **Ship small, learn fast, iterate always**: <600 lines/file, <500kB chunks.
2. **Metrics before magic**: Validate with metrics (KL drift, F1, p99).
3. **One role, one schema, one truth**: Zero hardcoded domains.
4. **Pipeline feeds itself**: EDA -> LLM Ops.
5. **Forbidden patterns**: Hardcoding, duplication, memory leaks.

## HTML & React Best Practices
- **Semantic HTML**: ALWAYS use semantic tags (`<article>`, `<section>`, `<aside>`, `<nav>`, `<header>`, `<footer>`) instead of generic `<div>` wrappers where possible. This improves accessibility and code readability.
- **Components**: Functional components with hooks. Avoid class components.
- **Props**: Use typed props interfaces.
- **State**: Use `zustand` for global state, `useState`/`useReducer` for local complex state.

## Performance & Optimization
- **Token Sharing**: When switching between views (e.g., Editor <-> Viewer), share expensive computation results like lexed tokens. 
  - **Pattern**: Lift state up or use a store (e.g., `useGraphStore.markdownTokens`) to hold the `tokens` array. Pass `tokens` to both the Editor (for syntax highlighting/analysis) and Viewer (for rendering).
  - **Avoid**: Re-lexing the same markdown text in multiple child components.
  - **Data Sharing**: Tokens must include source mapping (`startLine`, `endLine`) which should be preserved and shared to enable features like scroll sync, auto-positioning, and bi-directional navigation without re-parsing.
  - **Rendering Cycle**: Components should check the shared store for tokens before lexing. If tokens are missing, lex and update the store. The store should invalidate tokens when the source text changes.
- **React.memo**: Use sparingly, only when profiling shows benefit.
- **useEffect**: Avoid complex dependency arrays. Use `useCallback` / `useMemo` to stabilize functions and values.

## Styling
- **Tailwind CSS**: Use utility classes via `className`.
- **Theme Tokens**: Use `UI_THEME_TOKENS` for consistent colors and spacing.

## File Structure
- **Feature-based**: Group files by feature (e.g., `features/markdown/ui`).
- **Shared Utils**: Place reusable logic in `lib/` or feature-specific `utils.ts`.
