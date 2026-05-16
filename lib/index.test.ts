import { describe, expect, expectTypeOf, it } from 'vitest';

import {
  isNotNullOrUndefined,
  isNotNullOrUndefinedAndFalse,
  isNotNullOrUndefinedAndNotBlank,
  isNotNullOrUndefinedAndNotEmpty,
  isNotNullOrUndefinedAndTrue,
  isNullOrUndefinedOrFalse,
} from './index';

describe('isNotNullOrUndefined', () => {
  it.each([
    ['string', 'string'],
    ['empty string', ''],
    ['number', 123],
    ['zero', 0],
    ['object', {}],
    ['array', []],
    ['false', false],
    ['true', true],
  ] satisfies Array<[string, unknown]>)('returns `true` for %s', (_label, input) => {
    expect(isNotNullOrUndefined(input)).toBe(true);
  });

  it.each([
    ['null', null],
    ['undefined', undefined],
  ] satisfies Array<[string, null | undefined]>)('returns `false` for %s', (_label, input) => {
    expect(isNotNullOrUndefined(input)).toBe(false);
  });

  it('narrows away `null` and `undefined`', () => {
    const input = 'value' as string | null | undefined;

    if (isNotNullOrUndefined(input)) {
      expectTypeOf(input).toEqualTypeOf<string>();
    }
  });

  it('narrows `unknown` to a present value', () => {
    const input = 'value' as unknown;

    if (isNotNullOrUndefined(input)) {
      expectTypeOf(input).toEqualTypeOf<NonNullable<unknown>>();
    }
  });

  it('removes nullish values from an explicit generic', () => {
    const input = 'value' as string | null | undefined;

    if (isNotNullOrUndefined<string | null | undefined>(input)) {
      expectTypeOf(input).toEqualTypeOf<string>();
    }
  });
});

describe('isNotNullOrUndefinedAndNotEmpty', () => {
  it.each([
    ['non-empty string', 'value'],
    ['whitespace string', '   '],
    ['non-empty array', [1]],
    ['array-like value', { length: 1 }],
  ] satisfies Array<[string, { length: number } | null | undefined]>)('returns `true` for %s', (_label, input) => {
    expect(isNotNullOrUndefinedAndNotEmpty(input)).toBe(true);
  });

  it.each([
    ['empty string', ''],
    ['empty array', []],
    ['empty array-like value', { length: 0 }],
    ['null', null],
    ['undefined', undefined],
  ] satisfies Array<[string, { length: number } | null | undefined]>)('returns `false` for %s', (_label, input) => {
    expect(isNotNullOrUndefinedAndNotEmpty(input)).toBe(false);
  });

  it('narrows to the non-nullish array-like value', () => {
    const input = ['value'] as Array<string> | null | undefined;

    if (isNotNullOrUndefinedAndNotEmpty(input)) {
      expectTypeOf(input).toEqualTypeOf<Array<string>>();
    }
  });
});

describe('isNotNullOrUndefinedAndNotBlank', () => {
  it.each([
    ['non-empty string', 'value'],
    ['padded string', ' value '],
    ['string with newline content', '\nvalue\n'],
  ])('returns `true` for %s', (_label, input) => {
    expect(isNotNullOrUndefinedAndNotBlank(input)).toBe(true);
  });

  it.each([
    ['empty string', ''],
    ['space-only string', '   '],
    ['tab-only string', '\t'],
    ['newline-only string', '\n'],
    ['null', null],
    ['undefined', undefined],
  ] satisfies Array<[string, string | null | undefined]>)('returns `false` for %s', (_label, input) => {
    expect(isNotNullOrUndefinedAndNotBlank(input)).toBe(false);
  });

  it('narrows to string', () => {
    const input = ' value ' as string | null | undefined;

    if (isNotNullOrUndefinedAndNotBlank(input)) {
      expectTypeOf(input).toEqualTypeOf<string>();
    }
  });
});

describe('isNotNullOrUndefinedAndTrue', () => {
  it('returns `true` only for `true`', () => {
    expect(isNotNullOrUndefinedAndTrue(true)).toBe(true);
    expect(isNotNullOrUndefinedAndTrue(false)).toBe(false);
    expect(isNotNullOrUndefinedAndTrue(null)).toBe(false);
    expect(isNotNullOrUndefinedAndTrue(undefined)).toBe(false);
  });

  it('narrows to `true`', () => {
    const isInput = true as boolean | null | undefined;

    if (isNotNullOrUndefinedAndTrue(isInput)) {
      expectTypeOf(isInput).toEqualTypeOf<true>();
    }
  });
});

describe('isNotNullOrUndefinedAndFalse', () => {
  it('returns `true` only for `false`', () => {
    expect(isNotNullOrUndefinedAndFalse(false)).toBe(true);
    expect(isNotNullOrUndefinedAndFalse(true)).toBe(false);
    expect(isNotNullOrUndefinedAndFalse(null)).toBe(false);
    expect(isNotNullOrUndefinedAndFalse(undefined)).toBe(false);
  });

  it('narrows to `false`', () => {
    const isInput = false as boolean | null | undefined;

    if (isNotNullOrUndefinedAndFalse(isInput)) {
      expectTypeOf(isInput).toEqualTypeOf<false>();
    }
  });
});

describe('isNullOrUndefinedOrFalse', () => {
  it('returns `true` for `false`, `null`, and `undefined`', () => {
    expect(isNullOrUndefinedOrFalse(false)).toBe(true);
    expect(isNullOrUndefinedOrFalse(null)).toBe(true);
    expect(isNullOrUndefinedOrFalse(undefined)).toBe(true);
  });

  it('returns `false` for `true`', () => {
    expect(isNullOrUndefinedOrFalse(true)).toBe(false);
  });

  it('narrows to `false | null | undefined`', () => {
    const isInput = false as boolean | null | undefined;

    if (isNullOrUndefinedOrFalse(isInput)) {
      expectTypeOf(isInput).toEqualTypeOf<false | null | undefined>();
    }
  });
});
