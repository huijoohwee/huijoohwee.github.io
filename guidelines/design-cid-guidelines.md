# Design Guidelines – CID

## Slogan‑style, three‑beat mantra form

- Each line is a three‑beat `Context; Intent; Directive` mantra

- [] A11y; ensure accessibility compliance; forbid div‑based interactive elements
- [] Actions; validate via schema; forbid unvalidated dispatches
- [] Adaptability; enable via configuration; forbid hardcoded behavior
- [] Amber; use for hover interactions; forbid inconsistent hover colors
- [] Anti‑patterns; identify and prohibit; forbid undocumented bad practices
- [] ARIA; label dynamic content; forbid unlabeled dynamic content
- [] Assembly; drive via configuration; forbid hardcoded composition
- [] Atomic; build from primitives; forbid monolithic component structures
- [] Atoms; provide single‑purpose primitives; forbid multi‑concern atoms
- [] Backgrounds; use flat row styling; forbid zebra striping
- [] Behavior; control via props; forbid embedded logic
- [] Blocks; track metadata for editing; forbid metadata‑free content blocks
- [] Boundaries; define component responsibilities; forbid unclear component scope
- [] Buttons; use semantic elements; forbid div‑based clickable elements
- [] Cache; implement cache‑first fetching; forbid cache‑bypass fetching
- [] Callback; memoize event handlers; forbid unmemoized callbacks in dependencies
- [] Chunks; constrain bundle sizes; forbid oversized bundles
- [] Circular; prevent dependency loops; forbid circular references
- [] Classes; use component‑specific naming; forbid generic utility classes
- [] Click‑to‑Edit; enable seamless transitions; forbid jarring view transitions
- [] CLS; minimize layout shift; forbid unstable layouts
- [] Code; split at route boundaries; forbid monolithic bundles
- [] Colors; reference tokens only; forbid hex/RGB color literals
- [] Composability; build from domain‑agnostic blocks; forbid domain‑coupled primitives
- [] Components; limit size and complexity; forbid god components
- [] Configuration; drive design via schemas; forbid config‑free components
- [] Consistency; maintain interaction models; forbid inconsistent interactions
- [] Content; externalize all strings; forbid hardcoded user‑facing text
- [] Contrast; ensure readability standards; forbid low‑contrast text
- [] CSS; use logical properties for RTL; forbid left/right‑only positioning
- [] Dark; support theme modes; forbid light‑only designs
- [] Data; normalize entity structures; forbid denormalized state
- [] Dataset; avoid specific assumptions; forbid dataset‑specific components
- [] Dependencies; prevent circular references; forbid circular imports
- [] Derived; compute via selectors; forbid storing computed values
- [] Design; remain domain‑agnostic; forbid domain‑locked components
- [] Dialogs; manage focus properly; forbid unmanaged dialog focus
- [] Diff; notify subscribers efficiently; forbid full‑state broadcasts
- [] Directives; express as SVO statements; forbid ambiguous component docs
- [] Dispatcher; validate actions before reducing; forbid unvalidated dispatches
- [] Documentation; enable From‑To patterns; forbid undocumentable designs
- [] DOM; use semantic HTML structure; forbid div soup
- [] Drag; use consistent indicators; forbid inconsistent drag UI
- [] Drop; indicate targets clearly; forbid unclear drop zones
- [] Dynamic; label with ARIA; forbid unlabeled dynamic UI
- [] Editing; enable seamless mode switching; forbid disjointed edit experience
- [] Emergent; build complexity via composition; forbid monolithic complexity
- [] Entities; structure by ID; forbid duplicate entity data
- [] Enter; support keyboard activation; forbid mouse‑only interactions
- [] Escape; handle dialog dismissal; forbid keyboard‑inaccessible modals
- [] Events; emit with metadata; forbid context‑free events
- [] Externalization; remove hardcoded content; forbid inline user‑facing text
- [] FCP; optimize first paint; forbid slow first paint
- [] Fetching; implement cache‑first strategy; forbid direct API calls
- [] Flow; maintain unidirectional updates; forbid bidirectional state updates
- [] Focus; manage for accessibility; forbid invisible focus indicators
- [] Functions; use pure reducers; forbid side effects in reducers
- [] Gallery; apply consistent selection model; forbid inconsistent gallery interactions
- [] Global; tokenize all theme values; forbid legacy color literals
- [] God; avoid oversized components; forbid components >300 lines
- [] Hardcoding; eliminate from design layer; forbid magic numbers/strings
- [] Hex; replace with tokens; forbid color literals like #FF5733
- [] Hierarchy; apply atomic design pattern; forbid flat component structure
- [] Hooks; provide accessibility integration; forbid inaccessible interactive components
- [] Hover; apply amber/gray highlights; forbid inconsistent hover states
- [] HTML; use semantic elements; forbid non‑semantic markup
- [] i18n; externalize all user text; forbid hardcoded strings
- [] IDs; normalize entity storage; forbid array‑based entity storage
- [] Images; optimize and lazy load; forbid unoptimized images
- [] Imports; split dynamically; forbid static imports for large modules
- [] Indicators; use consistent colors; forbid arbitrary indicator colors
- [] Inline; avoid magic number styles; forbid style={{ margin: 16 }}
- [] Input; validate via schema; forbid unvalidated component props
- [] Integration; document via From‑To statements; forbid undocumentable components
- [] Interaction; support keyboard navigation; forbid mouse‑only components
- [] Internationalization; support via externalized strings; forbid locale‑specific hardcoding
- [] JSON; define component schemas; forbid schema‑free components
- [] Keyboard; enable full navigation; forbid keyboard‑inaccessible UI
- [] Keys; use for i18n lookup; forbid t() function with inline strings
- [] Labels; provide ARIA descriptions; forbid unlabeled controls
- [] Layers; separate concerns independently; forbid coupling
- [] Lazy; load below‑fold content; forbid eager loading of all content
- [] LCP; optimize largest paint; forbid slow content rendering
- [] Lexing; share token processing; forbid redundant lexing across modes
- [] Light; support theme modes; forbid dark‑only designs
- [] Lines; track for click‑to‑edit; forbid metadata‑free content
- [] Lists; virtualize long collections; forbid rendering all items
- [] Locale; structure i18n by namespace; forbid flat translation files
- [] Logic; keep reducers pure; forbid side effects in state updates
- [] Magic; eliminate hardcoded values; forbid 16px or #FF5733 literals
- [] Main; avoid blocking operations; forbid operations >50ms on main thread
- [] Memoization; apply to prevent re‑renders; forbid unmemoized expensive computations
- [] Metadata; enable component features; forbid metadata‑free interactive content
- [] Modes; support light/dark/system; forbid mode‑specific hardcoding
- [] Modals; manage focus lifecycle; forbid unmanaged modal focus
- [] Molecules; compose from atoms; forbid skipping atomic composition
- [] Monolithic; avoid single‑responsibility violations; forbid god components
- [] Mutation; prevent direct state changes; forbid state.x = y patterns
- [] Namespace; organize i18n translations; forbid flat i18n structures
- [] Navigation; enable via keyboard; forbid mouse‑only navigation
- [] Neutrality; maintain domain‑agnostic design; forbid domain‑specific components
- [] Non‑serializable; exclude from state; forbid non‑serializable state
- [] Normalization; structure entities by ID; forbid denormalized entity storage
- [] Numbers; replace with tokens; forbid hardcoded pixel values
- [] Optimization; apply rendering techniques; forbid unoptimized critical paths
- [] Organisms; compose from molecules; forbid flat component composition
- [] Output; render from configuration; forbid hardcoded rendering logic
- [] Pages; complete atomic hierarchy; forbid skipping design layers
- [] Panels; use semantic CSS variables; forbid hardcoded panel styles
- [] Patterns; document via configuration schemas; forbid undocumentable design approaches
- [] Performance; meet Core Web Vitals targets; forbid vitals‑exceeding designs
- [] Presentation; separate from structure/behavior; forbid coupled presentation logic
- [] Primitives; build domain‑agnostic blocks; forbid domain‑specific building blocks
- [] Project; avoid specific naming; forbid project names in components
- [] Promises; exclude from state; forbid async values in state
- [] Props; validate via TypeScript/schema; forbid untyped component props
- [] Prop‑drilling; limit depth; forbid drilling >3 component levels
- [] Pure; keep reducer functions stateless; forbid impure reducer logic
- [] Re‑renders; prevent unnecessary updates; forbid unmemoized expensive components
- [] Readers; enable screen reader support; forbid unlabeled interactive elements
- [] Reducer; use pure functions only; forbid side effects in reducers
- [] References; store entity relationships; forbid embedding related entities
- [] Relationships; store by reference not embedding; forbid embedded relationship data
- [] Rendering; optimize with memoization; forbid unnecessary component updates
- [] Responsibility; maintain single purpose; forbid multi‑concern components
- [] Reuse; enable across products/teams; forbid single‑use design patterns
- [] Revalidate; use stale‑while‑revalidate; forbid blocking on revalidation
- [] Rows; apply flat backgrounds; forbid zebra striping
- [] RTL; support via CSS logical properties; forbid left/right‑only layouts
- [] Schema; validate component props; forbid schema‑free prop validation
- [] Screen; support reader technologies; forbid inaccessible dynamic content
- [] Scroll; sync on mode transitions; forbid disjointed scroll behavior
- [] Selected; use blue background tint; forbid inconsistent selection styling
- [] Selection; maintain consistent model; forbid arbitrary selection colors
- [] Selectors; compute derived data; forbid storing derived values in state
- [] Semantic; use HTML5 elements; forbid generic div/span structures
- [] Separation; decouple design concerns; forbid coupling
- [] Serializable; keep state data simple; forbid functions in state
- [] Singletons; avoid global mutable state; forbid mutable global objects
- [] Source; maintain single truth authority; forbid competing data sources
- [] Spacing; use token references; forbid magic spacing values
- [] Splitting; apply at route boundaries; forbid monolithic application bundles
- [] State; normalize and serialize; forbid denormalized/non‑serializable state
- [] Storage; avoid synchronous reads in render; forbid synchronous localStorage in render
- [] Strings; externalize via i18n; forbid hardcoded user‑facing strings
- [] Structure; separate from semantics; forbid structure‑semantic coupling
- [] Style; use theme tokens exclusively; forbid hardcoded colors/spacing
- [] Subscribers; notify with state diffs; forbid full‑state notifications
- [] Subtree; re‑render affected only; forbid full‑tree re‑renders
- [] SVO; express component responsibilities; forbid ambiguous component docs
- [] Syntax; apply theme‑aware highlighting; forbid hardcoded syntax colors
- [] System; support theme mode detection; forbid manual‑only theme selection
- [] Tab; enable keyboard navigation; forbid Tab‑inaccessible interfaces
- [] Tables; use flat backgrounds; forbid zebra striping
- [] Targets; meet Core Web Vitals; forbid exceeding vitals thresholds
- [] Templates; build from organisms; forbid skipping composition layers
- [] Text; ensure contrast standards; forbid low‑contrast text
- [] Theme; tokenize all values; forbid hardcoded theme values
- [] Thread; avoid blocking main execution; forbid long synchronous tasks >50ms
- [] Tokenization; enforce 100% coverage; forbid partial token adoption
- [] Tokens; reference semantic values; forbid raw color/spacing values
- [] Toolbar; use semantic CSS variables; forbid hardcoded toolbar styles
- [] Tracking; include event metadata; forbid metadata‑free event emissions
- [] Transform; drive via configuration; forbid hardcoded transformations
- [] Transitions; enable seamless mode switching; forbid jarring mode changes
- [] TTI; optimize interactivity timing; forbid slow interactivity
- [] TypeScript; type all component props; forbid untyped props
- [] Types; generate from schemas; forbid manual type duplication
- [] UI; build from semantic tokens; forbid hardcoded UI values
- [] Unidirectional; maintain data flow pattern; forbid bidirectional updates
- [] Universal; design for cross‑product reuse; forbid product‑specific designs
- [] Updates; compute via pure reducers; forbid direct state mutation
- [] User; externalize all facing text; forbid hardcoded UI strings
- [] Validation; apply schema checking; forbid unvalidated inputs
- [] Variables; use CSS semantic tokens; forbid hardcoded CSS values
- [] View; re‑render from state changes; forbid view‑driven state changes
- [] Virtualization; window long lists; forbid rendering all list items
- [] Visibility; ensure focus indicators; forbid invisible focus states
- [] WebP; optimize image formats; forbid unoptimized image formats
- [] Windowing; apply to long collections; forbid full list rendering
- [] YAML; define component configurations; forbid inline configuration objects
- [] Zebra; avoid row striping; forbid alternating row colors

---

## Context–Intent–Directive Table

- Each row is a universal, neutral, project‑agnostic one‑liner mantra: `Context | Intent | Directive`

| Context             | Intent                              | Directive                                                                                      |
|---------------------|-------------------------------------|------------------------------------------------------------------------------------------------|
| A11y                | Ensure accessibility compliance     | - [ ] Apply semantic HTML; ensure accessibility; forbid div‑based interactive elements        |
| Actions             | Validate via schema                 | - [ ] Validate action schema; ensure correctness; forbid unvalidated dispatches               |
| Adaptability        | Enable via configuration            | - [ ] Adapt behavior via props; enable flexibility; forbid hardcoded behavior                 |
| Amber               | Use for hover interactions          | - [ ] Apply gallery‑style amber; indicate hover; forbid inconsistent hover colors             |
| Anti‑patterns       | Identify and prohibit               | - [ ] Document forbidden patterns; prevent violations; forbid undocumented bad practices      |
| ARIA                | Label dynamic content               | - [ ] Provide ARIA labels; enable screen readers; forbid unlabeled dynamic content            |
| Assembly            | Drive via configuration             | - [ ] Assemble from config; compose systematically; forbid hardcoded composition              |
| Atomic              | Build from primitives               | - [ ] Design atomic hierarchy; compose upward; forbid monolithic component structures         |
| Atoms               | Provide single‑purpose primitives   | - [ ] Build atomic components; maintain single purpose; forbid multi‑concern atoms            |
| Backgrounds         | Use flat row styling                | - [ ] Apply flat backgrounds; maintain clean look; forbid zebra striping                      |
| Behavior            | Control via props                   | - [ ] Drive behavior via configuration; enable customization; forbid embedded logic           |
| Blocks              | Track metadata for editing          | - [ ] Capture block metadata; enable click‑to‑edit; forbid metadata‑free content blocks       |
| Boundaries          | Define component responsibilities   | - [ ] Enforce responsibility boundaries; maintain SRP; forbid unclear component scope         |
| Buttons             | Use semantic elements               | - [ ] Use button elements; ensure semantics; forbid div‑based clickable elements              |
| Cache               | Implement cache‑first fetching      | - [ ] Check cache first; optimize loading; forbid cache‑bypass fetching                       |
| Callback            | Memoize event handlers              | - [ ] Use useCallback; prevent re‑renders; forbid unmemoized callbacks in dependencies        |
| Chunks              | Constrain bundle sizes              | - [ ] Limit chunks <500kB; constrain output; forbid oversized bundles                         |
| Circular            | Prevent dependency loops            | - [ ] Avoid circular dependencies; maintain acyclic graph; forbid circular references         |
| Classes             | Use component‑specific naming       | - [ ] Apply semantic classes; maintain clarity; forbid generic utility classes                |
| Click‑to‑Edit       | Enable seamless transitions         | - [ ] Sync scroll on mode switch; enable editing; forbid jarring view transitions             |
| CLS                 | Minimize layout shift               | - [ ] Keep CLS <0.1; minimize shift; forbid unstable layouts                                  |
| Code                | Split at route boundaries           | - [ ] Split code by route; optimize loading; forbid monolithic bundles                        |
| Colors              | Reference tokens only               | - [ ] Use theme tokens; avoid hardcoding; forbid hex/RGB color literals                       |
| Composability       | Build from domain‑agnostic blocks   | - [ ] Enable universal composability; build blocks; forbid domain‑coupled primitives          |
| Components          | Limit size and complexity           | - [ ] Keep components <300 lines; maintain focus; forbid god components                       |
| Configuration       | Drive design via schemas            | - [ ] Use schema‑first approach; enable flexibility; forbid config‑free components            |
| Consistency         | Maintain interaction models         | - [ ] Apply consistent patterns; maintain uniformity; forbid inconsistent interactions        |
| Content             | Externalize all strings             | - [ ] Use i18n keys; externalize content; forbid hardcoded user‑facing text                   |
| Contrast            | Ensure readability standards        | - [ ] Maintain contrast ≥4.5:1; ensure readability; forbid low‑contrast text                  |
| CSS                 | Use logical properties for RTL      | - [ ] Apply CSS logical properties; support RTL; forbid left/right‑only positioning           |
| Dark                | Support theme modes                 | - [ ] Adapt to dark mode; use theme tokens; forbid light‑only designs                         |
| Data                | Normalize entity structures         | - [ ] Normalize data by ID; avoid duplication; forbid denormalized state                      |
| Dataset             | Avoid specific assumptions          | - [ ] Design dataset‑agnostic; maintain neutrality; forbid dataset‑specific components        |
| Dependencies        | Prevent circular references         | - [ ] Maintain acyclic dependencies; prevent loops; forbid circular imports                   |
| Derived             | Compute via selectors               | - [ ] Use selectors for derived data; compute on read; forbid storing computed values         |
| Design              | Remain domain‑agnostic              | - [ ] Build universal designs; enable reuse; forbid domain‑locked components                  |
| Dialogs             | Manage focus properly               | - [ ] Handle focus in modals; trap keyboard; forbid unmanaged dialog focus                    |
| Diff                | Notify subscribers efficiently      | - [ ] Notify with diffs; minimize updates; forbid full‑state broadcasts                       |
| Directives          | Express as SVO statements           | - [ ] Document via SVO; clarify responsibilities; forbid ambiguous component docs             |
| Dispatcher          | Validate actions before reducing    | - [ ] Validate action schema; ensure correctness; forbid unvalidated dispatches               |
| Documentation       | Enable From‑To patterns             | - [ ] Support From‑To statements; document transformations; forbid undocumentable designs     |
| DOM                 | Use semantic HTML structure         | - [ ] Build semantic DOM; enhance accessibility; forbid div soup                              |
| Drag                | Use consistent indicators           | - [ ] Apply blue drop indicators; maintain consistency; forbid inconsistent drag UI           |
| Drop                | Indicate targets clearly            | - [ ] Show drop targets; guide users; forbid unclear drop zones                               |
| Dynamic             | Label with ARIA                     | - [ ] Provide ARIA for dynamic content; enable screen readers; forbid unlabeled dynamic UI    |
| Editing             | Enable seamless mode switching      | - [ ] Sync scroll on edit; enable smooth transitions; forbid disjointed edit experience       |
| Emergent            | Build complexity via composition    | - [ ] Compose simple primitives; enable emergence; forbid monolithic complexity               |
| Entities            | Structure by ID                     | - [ ] Normalize entities by ID; maintain single source; forbid duplicate entity data          |
| Enter               | Support keyboard activation         | - [ ] Enable Enter key; support keyboard; forbid mouse‑only interactions                      |
| Escape              | Handle dialog dismissal             | - [ ] Support Escape key; enable dismissal; forbid keyboard‑inaccessible modals               |
| Events              | Emit with metadata                  | - [ ] Include event metadata; enable tracing; forbid context‑free events                      |
| Externalization     | Remove hardcoded content            | - [ ] Externalize all strings; use i18n; forbid inline user‑facing text                       |
| FCP                 | Optimize first paint                | - [ ] Achieve FCP <1.8s; optimize loading; forbid slow first paint                            |
| Fetching            | Implement cache‑first strategy      | - [ ] Check cache before fetch; optimize performance; forbid direct API calls                 |
| Flow                | Maintain unidirectional updates     | - [ ] Apply unidirectional flow; ensure predictability; forbid bidirectional state updates    |
| Focus               | Manage for accessibility            | - [ ] Handle focus management; ensure visibility; forbid invisible focus indicators           |
| Functions           | Use pure reducers                   | - [ ] Keep reducers pure; ensure predictability; forbid side effects in reducers              |
| Gallery             | Apply consistent selection model    | - [ ] Use blue selection; maintain consistency; forbid inconsistent gallery interactions      |
| Global              | Tokenize all theme values           | - [ ] Enforce 100% tokenization; remove hardcoded styles; forbid legacy color literals        |
| God                 | Avoid oversized components          | - [ ] Limit component size; maintain focus; forbid components >300 lines                      |
| Hardcoding          | Eliminate from design layer         | - [ ] Remove hardcoded values; use tokens; forbid magic numbers/strings                       |
| Hex                 | Replace with tokens                 | - [ ] Use semantic tokens; avoid hex values; forbid color literals like #FF5733               |
| Hierarchy           | Apply atomic design pattern         | - [ ] Build Atoms→Molecules→Organisms; compose hierarchically; forbid flat component structure|
| Hooks               | Provide accessibility integration   | - [ ] Use accessibility hooks; enable features; forbid inaccessible interactive components    |
| Hover               | Apply amber/gray highlights         | - [ ] Use theme‑aware hover; indicate interactivity; forbid inconsistent hover states         |
| HTML                | Use semantic elements               | - [ ] Build with semantic HTML; enhance accessibility; forbid non‑semantic markup             |
| i18n                | Externalize all user text           | - [ ] Use i18n keys; support locales; forbid hardcoded strings                                |
| IDs                 | Normalize entity storage            | - [ ] Store entities by ID; enable normalization; forbid array‑based entity storage           |
| Images              | Optimize and lazy load              | - [ ] Use WebP; lazy load images; forbid unoptimized images                                   |
| Imports             | Split dynamically                   | - [ ] Dynamic import routes; enable code splitting; forbid static imports for large modules   |
| Indicators          | Use consistent colors               | - [ ] Apply blue for selections; maintain consistency; forbid arbitrary indicator colors      |
| Inline              | Avoid magic number styles           | - [ ] Use theme tokens; avoid inline styles; forbid style={{ margin: 16 }}                    |
| Input               | Validate via schema                 | - [ ] Validate input props; ensure correctness; forbid unvalidated component props            |
| Integration         | Document via From‑To statements     | - [ ] Enable documentation patterns; support integration; forbid undocumentable components    |
| Interaction         | Support keyboard navigation         | - [ ] Enable keyboard interaction; ensure accessibility; forbid mouse‑only components         |
| Internationalization| Support via externalized strings    | - [ ] Use i18n namespace files; support locales; forbid locale‑specific hardcoding            |
| JSON                | Define component schemas            | - [ ] Schema‑first design; validate runtime; forbid schema‑free components                    |
| Keyboard            | Enable full navigation              | - [ ] Support Tab/Enter/Escape; enable keyboard nav; forbid keyboard‑inaccessible UI          |
| Keys                | Use for i18n lookup                 | - [ ] Reference i18n keys; externalize text; forbid t() function with inline strings          |
| Labels              | Provide ARIA descriptions           | - [ ] Label all interactive elements; enable screen readers; forbid unlabeled controls        |
| Layers              | Separate concerns independently     | - [ ] Decouple Structure/Semantics/Presentation/Behavior; maintain separation; forbid coupling|
| Lazy                | Load below‑fold content             | - [ ] Defer non‑critical content; optimize loading; forbid eager loading of all content       |
| LCP                 | Optimize largest paint              | - [ ] Achieve LCP <2.5s; optimize rendering; forbid slow content rendering                    |
| Lexing              | Share token processing              | - [ ] Implement token sharing; avoid redundancy; forbid redundant lexing across modes         |
| Light               | Support theme modes                 | - [ ] Adapt to light mode; use theme tokens; forbid dark‑only designs                         |
| Lines               | Track for click‑to‑edit             | - [ ] Preserve line metadata; enable navigation; forbid metadata‑free content                 |
| Lists               | Virtualize long collections         | - [ ] Window lists >100 items; optimize rendering; forbid rendering all items                 |
| Locale              | Structure i18n by namespace         | - [ ] Organize by locale/namespace; support i18n; forbid flat translation files               |
| Logic               | Keep reducers pure                  | - [ ] Use pure reducer logic; ensure predictability; forbid side effects in state updates     |
| Magic               | Eliminate hardcoded values          | - [ ] Use theme tokens; avoid magic numbers; forbid 16px or #FF5733 literals                  |
| Main                | Avoid blocking operations           | - [ ] Keep main thread free; prevent blocking; forbid operations >50ms on main thread         |
| Memoization         | Apply to prevent re‑renders         | - [ ] Use React.memo/useMemo; optimize performance; forbid unmemoized expensive computations  |
| Metadata            | Enable component features           | - [ ] Include block metadata; enable features; forbid metadata‑free interactive content       |
| Modes               | Support light/dark/system           | - [ ] Adapt to theme modes; use tokens; forbid mode‑specific hardcoding                       |
| Modals              | Manage focus lifecycle              | - [ ] Trap focus in modals; handle lifecycle; forbid unmanaged modal focus                    |
| Molecules           | Compose from atoms                  | - [ ] Build molecules from atoms; maintain hierarchy; forbid skipping atomic composition      |
| Monolithic          | Avoid single‑responsibility violations| - [ ] Decompose monolithic components; maintain SRP; forbid god components                   |
| Mutation            | Prevent direct state changes        | - [ ] Avoid direct mutation; use immutable updates; forbid state.x = y patterns               |
| Namespace           | Organize i18n translations          | - [ ] Structure by namespace; organize translations; forbid flat i18n structures              |
| Navigation          | Enable via keyboard                 | - [ ] Support keyboard navigation; ensure accessibility; forbid mouse‑only navigation         |
| Neutrality          | Maintain domain‑agnostic design     | - [ ] Design neutrally; enable reuse; forbid domain‑specific components                       |
| Non‑serializable    | Exclude from state                  | - [ ] Keep state serializable; avoid functions/Promises; forbid non‑serializable state        |
| Normalization       | Structure entities by ID            | - [ ] Normalize entity data; prevent duplication; forbid denormalized entity storage          |
| Numbers             | Replace with tokens                 | - [ ] Use semantic spacing tokens; avoid magic numbers; forbid hardcoded pixel values         |
| Optimization        | Apply rendering techniques          | - [ ] Memoize/virtualize/split code; optimize rendering; forbid unoptimized critical paths    |
| Organisms           | Compose from molecules              | - [ ] Build organisms from molecules; maintain hierarchy; forbid flat component composition   |
| Output              | Render from configuration           | - [ ] Derive output from config; enable flexibility; forbid hardcoded rendering logic         |
| Pages               | Complete atomic hierarchy           | - [ ] Build pages from templates; complete hierarchy; forbid skipping design layers           |
| Panels              | Use semantic CSS variables          | - [ ] Apply panel tokens; maintain consistency; forbid hardcoded panel styles                 |
| Patterns            | Document via configuration schemas  | - [ ] Provide design patterns; enable documentation; forbid undocumentable design approaches  |
| Performance         | Meet Core Web Vitals targets        | - [ ] Achieve FCP/LCP/CLS/TTI targets; optimize performance; forbid vitals‑exceeding designs  |
| Presentation        | Separate from structure/behavior    | - [ ] Decouple presentation layer; maintain separation; forbid coupled presentation logic     |
| Primitives          | Build domain‑agnostic blocks        | - [ ] Design universal primitives; enable composition; forbid domain‑specific building blocks |
| Project             | Avoid specific naming               | - [ ] Design project‑agnostic; maintain neutrality; forbid project names in components        |
| Promises            | Exclude from state                  | - [ ] Keep state synchronous; avoid Promises; forbid async values in state                    |
| Props               | Validate via TypeScript/schema      | - [ ] Type and validate props; ensure correctness; forbid untyped component props             |
| Prop‑drilling       | Limit depth                         | - [ ] Avoid deep prop drilling; limit <3 levels; forbid drilling >3 component levels          |
| Pure                | Keep reducer functions stateless    | - [ ] Use pure reducers; ensure predictability; forbid impure reducer logic                   |
| Re‑renders          | Prevent unnecessary updates         | - [ ] Minimize re‑renders; optimize updates; forbid unmemoized expensive components           |
| Readers             | Enable screen reader support        | - [ ] Provide ARIA labels; support screen readers; forbid unlabeled interactive elements      |
| Reducer             | Use pure functions only             | - [ ] Keep reducers pure; compute next state; forbid side effects in reducers                 |
| References          | Store entity relationships          | - [ ] Link by reference; normalize relationships; forbid embedding related entities           |
| Relationships       | Store by reference not embedding    | - [ ] Use ID references; maintain normalization; forbid embedded relationship data            |
| Rendering           | Optimize with memoization           | - [ ] Apply React.memo; prevent re‑renders; forbid unnecessary component updates              |
| Responsibility      | Maintain single purpose             | - [ ] Enforce SRP; one component one responsibility; forbid multi‑concern components          |
| Reuse               | Enable across products/teams        | - [ ] Build reusable artifacts; enable sharing; forbid single‑use design patterns             |
| Revalidate          | Use stale‑while‑revalidate          | - [ ] Return stale data; fetch in background; forbid blocking on revalidation                 |
| Rows                | Apply flat backgrounds              | - [ ] Use flat row styling; maintain clean look; forbid zebra striping                        |
| RTL                 | Support via CSS logical properties  | - [ ] Enable RTL; use logical properties; forbid left/right‑only layouts                      |
| Schema              | Validate component props            | - [ ] Define JSON schemas; validate runtime; forbid schema‑free prop validation               |
| Screen              | Support reader technologies         | - [ ] Enable screen reader access; provide ARIA; forbid inaccessible dynamic content          |
| Scroll              | Sync on mode transitions            | - [ ] Preserve scroll position; sync on switch; forbid disjointed scroll behavior             |
| Selected            | Use blue background tint            | - [ ] Apply selection tokens; indicate selected; forbid inconsistent selection styling        |
| Selection           | Maintain consistent model           | - [ ] Use blue tint for selection; maintain consistency; forbid arbitrary selection colors    |
| Selectors           | Compute derived data                | - [ ] Use selectors; compute on read; forbid storing derived values in state                  |
| Semantic            | Use HTML5 elements                  | - [ ] Build with semantic HTML; enhance accessibility; forbid generic div/span structures     |
| Separation          | Decouple design concerns            | - [ ] Separate Structure/Semantics/Presentation/Behavior; maintain independence; forbid coupling|
| Serializable        | Keep state data simple              | - [ ] Ensure serializable state; use primitives/objects/arrays; forbid functions in state     |
| Singletons          | Avoid global mutable state          | - [ ] Prevent global singletons; use dependency injection; forbid mutable global objects      |
| Source              | Maintain single truth authority     | - [ ] Normalize to single source; prevent duplication; forbid competing data sources          |
| Spacing             | Use token references                | - [ ] Apply spacing tokens; avoid hardcoding; forbid magic spacing values                     |
| Splitting           | Apply at route boundaries           | - [ ] Split code by route; optimize bundles; forbid monolithic application bundles            |
| State               | Normalize and serialize             | - [ ] Structure normalized state; keep serializable; forbid denormalized/non‑serializable state|
| Storage             | Avoid synchronous reads in render   | - [ ] Defer localStorage; avoid blocking; forbid synchronous localStorage in render           |
| Strings             | Externalize via i18n                | - [ ] Use i18n keys; externalize content; forbid hardcoded user‑facing strings                |
| Structure           | Separate from semantics             | - [ ] Decouple structure layer; maintain independence; forbid structure‑semantic coupling     |
| Style               | Use theme tokens exclusively        | - [ ] Reference tokens only; avoid literals; forbid hardcoded colors/spacing                  |
| Subscribers         | Notify with state diffs             | - [ ] Send diffs to subscribers; minimize updates; forbid full‑state notifications            |
| Subtree             | Re‑render affected only             | - [ ] Update affected subtree; minimize re‑renders; forbid full‑tree re‑renders               |
| SVO                 | Express component responsibilities  | - [ ] Document via Subject‑Verb‑Object; clarify duties; forbid ambiguous component docs       |
| Syntax              | Apply theme‑aware highlighting      | - [ ] Use theme tokens for syntax; adapt to modes; forbid hardcoded syntax colors             |
| System              | Support theme mode detection        | - [ ] Enable system theme detection; auto‑adapt; forbid manual‑only theme selection           |
| Tab                 | Enable keyboard navigation          | - [ ] Support Tab key; enable navigation; forbid Tab‑inaccessible interfaces                  |
| Tables              | Use flat backgrounds                | - [ ] Apply consistent table styling; use flat rows; forbid zebra striping                    |
| Targets             | Meet Core Web Vitals                | - [ ] Achieve performance targets; optimize metrics; forbid exceeding vitals thresholds       |
| Templates           | Build from organisms                | - [ ] Compose templates from organisms; maintain hierarchy; forbid skipping composition layers|
| Text                | Ensure contrast standards           | - [ ] Maintain ≥4.5:1 contrast; ensure readability; forbid low‑contrast text                  |
| Theme               | Tokenize all values                 | - [ ] Use theme tokens; enable modes; forbid hardcoded theme values                           |
| Thread              | Avoid blocking main execution       | - [ ] Keep main thread responsive; prevent blocking; forbid long synchronous tasks >50ms      |
| Tokenization        | Enforce 100% coverage               | - [ ] Achieve complete tokenization; remove legacy styles; forbid partial token adoption      |
| Tokens              | Reference semantic values           | - [ ] Use UI_THEME_TOKENS; maintain consistency; forbid raw color/spacing values              |
| Toolbar             | Use semantic CSS variables          | - [ ] Apply toolbar tokens; maintain consistency; forbid hardcoded toolbar styles             |
| Tracking            | Include event metadata              | - [ ] Emit events with metadata; enable tracking; forbid metadata‑free event emissions        |
| Transform           | Drive via configuration             | - [ ] Apply transforms from config; enable flexibility; forbid hardcoded transformations      |
| Transitions         | Enable seamless mode switching      | - [ ] Smooth view transitions; preserve context; forbid jarring mode changes                  |
| TTI                 | Optimize interactivity timing       | - [ ] Achieve TTI <3.8s; optimize loading; forbid slow interactivity                          |
| TypeScript          | Type all component props            | - [ ] Validate via TypeScript; ensure type safety; forbid untyped props                       |
| Types               | Generate from schemas               | - [ ] Derive TypeScript from schemas; ensure alignment; forbid manual type duplication        |
| UI                  | Build from semantic tokens          | - [ ] Use UI_THEME_TOKENS; maintain consistency; forbid hardcoded UI values                   |
| Unidirectional      | Maintain data flow pattern          | - [ ] Apply Action→Reducer→State→View; ensure predictability; forbid bidirectional updates    |
| Universal           | Design for cross‑product reuse      | - [ ] Build universal components; enable reuse; forbid product‑specific designs               |
| Updates             | Compute via pure reducers           | - [ ] Use pure state updates; ensure immutability; forbid direct state mutation               |
| User                | Externalize all facing text         | - [ ] Use i18n for user text; externalize content; forbid hardcoded UI strings                |
| Validation          | Apply schema checking               | - [ ] Validate props/actions via schema; ensure correctness; forbid unvalidated inputs        |
| Variables           | Use CSS semantic tokens             | - [ ] Apply CSS variables; enable theming; forbid hardcoded CSS values                        |
| View                | Re‑render from state changes        | - [ ] Update view from state; maintain unidirectional flow; forbid view‑driven state changes  |
| Virtualization      | Window long lists                   | - [ ] Virtualize lists >100 items; optimize rendering; forbid rendering all list items        |
| Visibility          | Ensure focus indicators             | - [ ] Show visible focus; ensure accessibility; forbid invisible focus states                 |
| WebP                | Optimize image formats              | - [ ] Use WebP images; optimize loading; forbid unoptimized image formats                     |
| Windowing           | Apply to long collections           | - [ ] Window large lists; optimize performance; forbid full list rendering                    |
| YAML                | Define component configurations     | - [ ] Use YAML for config; enable clarity; forbid inline configuration objects                |
| Zebra               | Avoid row striping                  | - [ ] Use flat backgrounds; maintain clean look; forbid alternating row colors                |