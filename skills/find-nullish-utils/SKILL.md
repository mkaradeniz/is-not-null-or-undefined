---
name: find-nullish-utils
description: Find places in a TypeScript or JavaScript codebase that may be clearer with is-not-null-or-undefined predicates and type guards for nullish values, booleans, non-empty values, non-blank strings, or renderable React nodes.
---

# Find Nullish Utility Opportunities

Use this skill to review a codebase for checks that may be clearer with `is-not-null-or-undefined` predicates and type guards.

## Exports

- `isNotNullOrUndefined`: checks for values that are not `null` or `undefined`.
- `isNotNullOrUndefinedAndNotEmpty`: checks strings, arrays, and array-like values with `length > 0`.
- `isNotNullOrUndefinedAndNotBlank`: checks strings with non-whitespace content after trimming.
- `isNotNullOrUndefinedAndTrue`: checks nullable booleans that are exactly `true`.
- `isNotNullOrUndefinedAndFalse`: checks nullable booleans that are exactly `false`.
- `isNullOrUndefinedOrFalse`: checks nullable booleans that are `false`, `null`, or `undefined`.
- `hasRenderableNode`: checks React nodes that have renderable content after rejecting `null`, `undefined`, booleans, empty strings, empty iterables, and iterables with no renderable items. Import from `is-not-null-or-undefined/react`.

## Review Workflow

1. Search for candidate patterns before editing:
   - `!== null &&`
   - `!== undefined`
   - `!= null`
   - `== null`
   - `.length > 0`
   - `.trim().length > 0`
   - `=== true`
   - `=== false`
   - React conditional render guards involving `children`, `node`, `content`, `label`, `prefix`, or `suffix`
2. Inspect each candidate in context. Preserve behavior when `0`, `false`, an empty string, or a whitespace-only string has special meaning.
3. Add imports from `is-not-null-or-undefined` or `is-not-null-or-undefined/react` only when at least one replacement is made in that file.
4. Prefer small, obvious replacements. Leave complex expressions unchanged when the helper would obscure intent.
5. Run the package or project tests after changes.

## Common Replacements

```ts
value !== null && value !== undefined;
```

can usually become:

```ts
isNotNullOrUndefined(value);
```

```ts
value !== null && value !== undefined && value.length > 0;
```

can usually become:

```ts
isNotNullOrUndefinedAndNotEmpty(value);
```

```ts
value !== null && value !== undefined && value.trim().length > 0;
```

can usually become:

```ts
isNotNullOrUndefinedAndNotBlank(value);
```

```ts
value !== null && value !== undefined && value === true;
```

can usually become:

```ts
isNotNullOrUndefinedAndTrue(value);
```

```ts
value === false || value === null || value === undefined;
```

can usually become:

```ts
isNullOrUndefinedOrFalse(value);
```

```tsx
node !== null && node !== undefined && node !== false && node !== true && (typeof node !== 'string' || node.length > 0);
```

can usually become:

```tsx
hasRenderableNode(node);
```

## Do Not Replace

- Checks where `null` and `undefined` intentionally mean different things.
- Checks where empty strings, blank strings, `0`, or `false` need custom handling not represented by the helper.
- React checks where `true`, empty arrays, empty iterables, or iterables with no renderable items intentionally differ from `hasRenderableNode`.
- Expressions where narrowing relies on a broader condition than the helper expresses.
- Code that would need a new dependency for only one unclear or debatable replacement.
