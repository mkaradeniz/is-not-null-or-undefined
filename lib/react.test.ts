import type { ReactNode } from 'react';
import { describe, expect, expectTypeOf, it } from 'vitest';

import { hasRenderableNode } from './react';

describe('hasRenderableNode', () => {
  it.each([
    ['string', 'value'],
    ['whitespace string', '   '],
    ['zero', 0],
    ['positive number', 1],
    ['array with renderable content', ['value']],
    ['nested array with renderable content', [null, [false, 0]]],
  ] satisfies Array<[string, ReactNode]>)('returns `true` for renderable %s', (_label, node) => {
    expect(hasRenderableNode(node)).toBe(true);
  });

  it.each([
    ['empty string', ''],
    ['true', true],
    ['false', false],
    ['empty array', []],
    ['array without renderable content', [null, undefined, false, true, '']],
    ['nested array without renderable content', [null, [false, '']]],
    ['null', null],
    ['undefined', undefined],
  ] satisfies Array<[string, ReactNode]>)('returns `false` for non-renderable %s', (_label, node) => {
    expect(hasRenderableNode(node)).toBe(false);
  });

  it('accepts ReactNode input', () => {
    expectTypeOf(hasRenderableNode).parameter(0).toEqualTypeOf<ReactNode>();
  });
});
