/**
 * Checks whether a value is neither `null` nor `undefined`.
 *
 * Returns `true` for any value other than `null` and `undefined`, including
 * `false`, `0`, and an empty string.
 *
 * @example
 * ```ts
 * const value = getValue() as string | null | undefined;
 *
 * if (isNotNullOrUndefined(value)) {
 *   value.toUpperCase();
 * }
 * ```
 *
 * @example
 * ```ts
 * isNotNullOrUndefined(false); // true
 * isNotNullOrUndefined(0); // true
 * isNotNullOrUndefined(""); // true
 * isNotNullOrUndefined(null); // false
 * isNotNullOrUndefined(undefined); // false
 * ```
 *
 * @see The package README includes optional agent-assisted adoption guidance for
 * finding related checks in a codebase.
 */
export const isNotNullOrUndefined = <T>(input: T): input is NonNullable<T> => {
  return input !== null && input !== undefined;
};

/**
 * Checks whether a string, array, or array-like value is present and has a
 * `length` greater than `0`.
 *
 * Returns `true` for whitespace-only strings because their `length` is greater
 * than `0`. Use `isNotNullOrUndefinedAndNotBlank` when strings should be
 * trimmed before checking.
 *
 * @example
 * ```ts
 * isNotNullOrUndefinedAndNotEmpty("hello"); // true
 * isNotNullOrUndefinedAndNotEmpty("   "); // true
 * isNotNullOrUndefinedAndNotEmpty(""); // false
 * isNotNullOrUndefinedAndNotEmpty([1]); // true
 * isNotNullOrUndefinedAndNotEmpty([]); // false
 * ```
 *
 * @example
 * ```ts
 * const tags = getTags() as Array<string> | null | undefined;
 *
 * if (isNotNullOrUndefinedAndNotEmpty(tags)) {
 *   tags.map(tag => tag.toUpperCase());
 * }
 * ```
 *
 * @see The package README includes optional agent-assisted adoption guidance for
 * finding related checks in a codebase.
 */
export const isNotNullOrUndefinedAndNotEmpty = <T extends { length: number }>(input: T | null | undefined): input is T => {
  return isNotNullOrUndefined(input) && input.length > 0;
};

/**
 * Checks whether a string is present and contains non-whitespace content after
 * trimming.
 *
 * Returns `false` for `null`, `undefined`, an empty string, and strings that
 * contain only whitespace.
 *
 * @example
 * ```ts
 * isNotNullOrUndefinedAndNotBlank("hello"); // true
 * isNotNullOrUndefinedAndNotBlank(" hello "); // true
 * isNotNullOrUndefinedAndNotBlank("   "); // false
 * isNotNullOrUndefinedAndNotBlank(""); // false
 * isNotNullOrUndefinedAndNotBlank(null); // false
 * ```
 *
 * @example
 * ```ts
 * const label = getLabel() as string | null | undefined;
 *
 * if (isNotNullOrUndefinedAndNotBlank(label)) {
 *   label.trim().toUpperCase();
 * }
 * ```
 *
 * @see The package README includes optional agent-assisted adoption guidance for
 * finding related checks in a codebase.
 */
export const isNotNullOrUndefinedAndNotBlank = (input: string | null | undefined): input is string => {
  return isNotNullOrUndefined(input) && input.trim().length > 0;
};

/**
 * Checks whether a nullable boolean is exactly `true`.
 *
 * Returns `false` for `false`, `null`, and `undefined`.
 *
 * @example
 * ```ts
 * isNotNullOrUndefinedAndTrue(true); // true
 * isNotNullOrUndefinedAndTrue(false); // false
 * isNotNullOrUndefinedAndTrue(null); // false
 * isNotNullOrUndefinedAndTrue(undefined); // false
 * ```
 *
 * @example
 * ```ts
 * const enabled = getEnabled() as boolean | null | undefined;
 *
 * if (isNotNullOrUndefinedAndTrue(enabled)) {
 *   enabled; // true
 * }
 * ```
 *
 * @see The package README includes optional agent-assisted adoption guidance for
 * finding related checks in a codebase.
 */
export const isNotNullOrUndefinedAndTrue = (input: boolean | null | undefined): input is true => {
  return isNotNullOrUndefined(input) && input === true;
};

/**
 * Checks whether a nullable boolean is exactly `false`.
 *
 * Returns `false` for `true`, `null`, and `undefined`.
 *
 * @example
 * ```ts
 * isNotNullOrUndefinedAndFalse(false); // true
 * isNotNullOrUndefinedAndFalse(true); // false
 * isNotNullOrUndefinedAndFalse(null); // false
 * isNotNullOrUndefinedAndFalse(undefined); // false
 * ```
 *
 * @example
 * ```ts
 * const disabled = getDisabled() as boolean | null | undefined;
 *
 * if (isNotNullOrUndefinedAndFalse(disabled)) {
 *   disabled; // false
 * }
 * ```
 *
 * @see The package README includes optional agent-assisted adoption guidance for
 * finding related checks in a codebase.
 */
export const isNotNullOrUndefinedAndFalse = (input: boolean | null | undefined): input is false => {
  return isNotNullOrUndefined(input) && input === false;
};

/**
 * Checks whether a nullable boolean is absent or explicitly `false`.
 *
 * Returns `true` for `false`, `null`, and `undefined`. Returns `false` only for
 * `true`.
 *
 * @example
 * ```ts
 * isNullOrUndefinedOrFalse(false); // true
 * isNullOrUndefinedOrFalse(null); // true
 * isNullOrUndefinedOrFalse(undefined); // true
 * isNullOrUndefinedOrFalse(true); // false
 * ```
 *
 * @example
 * ```ts
 * const enabled = getEnabled() as boolean | null | undefined;
 *
 * if (isNullOrUndefinedOrFalse(enabled)) {
 *   enabled; // false | null | undefined
 * }
 * ```
 *
 * @see The package README includes optional agent-assisted adoption guidance for
 * finding related checks in a codebase.
 */
export const isNullOrUndefinedOrFalse = (input: boolean | null | undefined): input is false | null | undefined => {
  return !isNotNullOrUndefined(input) || input === false;
};
