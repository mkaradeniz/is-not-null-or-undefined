import type { ReactNode } from 'react';
import { describe, expect, expectTypeOf, it } from 'vitest';

import { hasRenderableNode } from './react';

describe('hasRenderableNode', () => {
  it.each([
    ['string', 'value'],
    ['whitespace string', '   '],
    ['zero', 0],
    ['positive number', 1],
    ['true', true],
    ['array', ['value']],
  ] satisfies Array<[string, ReactNode]>)('returns `true` for renderable %s', (_label, node) => {
    expect(hasRenderableNode(node)).toBe(true);
  });

  it.each([
    ['empty string', ''],
    ['false', false],
    ['null', null],
    ['undefined', undefined],
  ] satisfies Array<[string, ReactNode]>)('returns `false` for non-renderable %s', (_label, node) => {
    expect(hasRenderableNode(node)).toBe(false);
  });

  it('accepts ReactNode input', () => {
    expectTypeOf(hasRenderableNode).parameter(0).toEqualTypeOf<ReactNode>();
  });
});
