# is-not-null-or-undefined

A TypeScript utility function & type-guard to check if a value is not `null` or `undefined`.

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
import { isNotNullOrUndefined } from 'is-not-null-or-undefined';

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
