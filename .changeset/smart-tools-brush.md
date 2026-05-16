---
'is-not-null-or-undefined': major
---

Release v2 with a broader set of TypeScript type guards and modern package infrastructure.

Added root helpers for non-empty array-like values, non-blank strings, nullable boolean checks, and `false | null | undefined` checks. Added
the `is-not-null-or-undefined/react` subpath with `hasRenderableNode`, which uses React types only and has no React runtime dependency.
`hasRenderableNode` treats `null`, `undefined`, booleans, empty strings, empty arrays, and arrays without renderable items as not renderable.
Added exhaustive tests with 100% coverage enforcement and JSDoc examples for every exported function. Added an optional Agent Skill at
`skills/find-nullish-utils/SKILL.md` for finding places in consuming codebases where these helpers may clarify existing checks.

This release also raises the package baseline to Node 22, migrates the repository to pnpm, switches formatting and linting to Oxfmt and
Oxlint, marks the package as ESM, adds package metadata for npm consumers, and adds Changesets-based releases through npm Trusted
Publishing.
