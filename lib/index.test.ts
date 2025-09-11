import { describe, expect, it } from 'vitest';

import { isNotNullOrUndefined } from './index';

describe('isNotNullOrUndefined', () => {
  it('should return `true` for non-`null` and non-`undefined` values', () => {
    expect(isNotNullOrUndefined('string')).toBe(true);

    expect(isNotNullOrUndefined(123)).toBe(true);

    expect(isNotNullOrUndefined({})).toBe(true);

    expect(isNotNullOrUndefined([])).toBe(true);

    expect(isNotNullOrUndefined(false)).toBe(true);

    expect(isNotNullOrUndefined(0)).toBe(true);
  });

  it('should return `false` for `null` and `undefined` values', () => {
    expect(isNotNullOrUndefined(null)).toBe(false);

    expect(isNotNullOrUndefined(undefined)).toBe(false);
  });
});
