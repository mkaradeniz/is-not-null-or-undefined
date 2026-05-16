import type { ReactNode } from 'react';

import { isNotNullOrUndefined } from './index';

/**
 * Checks whether a React node has renderable content.
 *
 * `null`, `undefined`, `false`, and an empty string are treated as not
 * renderable. Numbers, including `0`, whitespace strings, `true`, arrays, and
 * React elements are treated as renderable.
 *
 * The `ReactNode` import is type-only, so this function does not import React
 * at runtime.
 *
 * @example
 * ```tsx
 * hasRenderableNode("Save"); // true
 * hasRenderableNode(0); // true
 * hasRenderableNode(""); // false
 * hasRenderableNode(false); // false
 * hasRenderableNode(null); // false
 * ```
 *
 * @example
 * ```tsx
 * const suffix = props.suffix;
 *
 * return hasRenderableNode(suffix) ? <span>{suffix}</span> : null;
 * ```
 *
 * @see The package README includes optional agent-assisted adoption guidance for
 * finding related render checks in a codebase.
 */
export const hasRenderableNode = (node: ReactNode): boolean => {
  return isNotNullOrUndefined(node) && node !== false && (typeof node !== 'string' || node.length > 0);
};
