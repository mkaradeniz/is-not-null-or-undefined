# is-not-null-or-undefined

TypeScript type guards for nullish values, booleans, non-empty values, non-blank strings, and renderable React nodes.

## Installation

### npm

```bash
npm install is-not-null-or-undefined
```

### yarn

```bash
yarn add is-not-null-or-undefined
```

### pnpm

```bash
pnpm add is-not-null-or-undefined
```

## Usage

```typescript
import {
  isNotNullOrUndefined,
  isNotNullOrUndefinedAndFalse,
  isNotNullOrUndefinedAndNotBlank,
  isNotNullOrUndefinedAndNotEmpty,
  isNotNullOrUndefinedAndTrue,
  isNullOrUndefinedOrFalse,
} from 'is-not-null-or-undefined';

// Returns true for non-`null` and non-`undefined` values
isNotNullOrUndefined('string'); // true
isNotNullOrUndefined(123); // true
isNotNullOrUndefined({}); // true
isNotNullOrUndefined([]); // true
isNotNullOrUndefined(false); // true
isNotNullOrUndefined(0); // true

// Returns false for `null` and `undefined` values
isNotNullOrUndefined(null); // false
isNotNullOrUndefined(undefined); // false

// Checks strings, arrays, and array-like values by length
isNotNullOrUndefinedAndNotEmpty('value'); // true
isNotNullOrUndefinedAndNotEmpty('   '); // true
isNotNullOrUndefinedAndNotEmpty(''); // false
isNotNullOrUndefinedAndNotEmpty([1]); // true
isNotNullOrUndefinedAndNotEmpty([]); // false

// Checks strings after trimming
isNotNullOrUndefinedAndNotBlank(' value '); // true
isNotNullOrUndefinedAndNotBlank('   '); // false

// Checks boolean values
isNotNullOrUndefinedAndTrue(true); // true
isNotNullOrUndefinedAndTrue(false); // false
isNotNullOrUndefinedAndFalse(false); // true
isNullOrUndefinedOrFalse(null); // true
isNullOrUndefinedOrFalse(false); // true
isNullOrUndefinedOrFalse(true); // false
```

## Type Guard

The function acts as a TypeScript type guard, narrowing the type from `T | null | undefined` to `T`:

```typescript
const value: string | null | undefined = getValue();

if (isNotNullOrUndefined(value)) {
  // value is now typed as string
  console.log(value.toUpperCase());
}
```

## React Subpath

```typescript
import { hasRenderableNode } from 'is-not-null-or-undefined/react';

hasRenderableNode('value'); // true
hasRenderableNode(0); // true
hasRenderableNode([null, 'value']); // true
hasRenderableNode(''); // false
hasRenderableNode(true); // false
hasRenderableNode(false); // false
hasRenderableNode([]); // false
hasRenderableNode(null); // false
hasRenderableNode(undefined); // false
```

The `/react` subpath has no React runtime dependency. It imports `ReactNode` as a type only. TypeScript consumers of this subpath should have React types installed.

## Agent-Assisted Adoption

This package includes an optional Agent Skill for reviewing a codebase for checks that may be clearer with these utilities.

Skill path:

```text
skills/find-nullish-utils/SKILL.md
```

You can ask a coding agent to use that skill when reviewing nullable checks, boolean/nullish checks, empty string checks, array length checks, or React render guards.

The skill is guidance, not an automatic codemod. Suggested changes should still be reviewed for local semantics before applying them.
