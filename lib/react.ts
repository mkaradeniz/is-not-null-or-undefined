import type { ReactNode } from 'react';

import { isNotNullOrUndefined } from './index';

/**
 * Checks whether a React node has renderable content.
 *
 * `null`, `undefined`, booleans, an empty string, and iterables without
 * renderable items are treated as not renderable. Numbers, including `0`,
 * whitespace strings, iterables with renderable items, and React elements are
 * treated as renderable.
 *
 * The `ReactNode` import is type-only, so this function does not import React
 * at runtime.
 *
 * @example
 * ```tsx
 * hasRenderableNode("Save"); // true
 * hasRenderableNode(0); // true
 * hasRenderableNode([null, "Save"]); // true
 * hasRenderableNode(new Set([false, "Save"])); // true
 * hasRenderableNode(""); // false
 * hasRenderableNode(true); // false
 * hasRenderableNode([]); // false
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
  if (!isNotNullOrUndefined(node) || typeof node === 'boolean') {
    return false;
  }

  if (typeof node === 'string') {
    return node.length > 0;
  }

  if (isIterableReactNode(node)) {
    for (const child of node) {
      if (hasRenderableNode(child)) {
        return true;
      }
    }

    return false;
  }

  return true;
};

const isIterableReactNode = (node: ReactNode): node is Iterable<ReactNode> => {
  return typeof node === 'object' && node !== null && Symbol.iterator in node && typeof node[Symbol.iterator] === 'function';
};
