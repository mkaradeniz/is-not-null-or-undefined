export const isNotNullOrUndefined = <T>(input: T | null | undefined): input is T => {
  return input !== null && input !== undefined;
};

export const isNotNullOrUndefinedAndNotEmpty = <T extends { length: number }>(input: T | null | undefined): input is T => {
  return isNotNullOrUndefined(input) && input.length > 0;
};

export const isNotNullOrUndefinedAndNotBlank = (input: string | null | undefined): input is string => {
  return isNotNullOrUndefined(input) && input.trim().length > 0;
};

export const isNotNullOrUndefinedAndTrue = (input: boolean | null | undefined): input is true => {
  return isNotNullOrUndefined(input) && input === true;
};

export const isNotNullOrUndefinedAndFalse = (input: boolean | null | undefined): input is false => {
  return isNotNullOrUndefined(input) && input === false;
};

export const isNullOrUndefinedOrFalse = (input: boolean | null | undefined): input is false | null | undefined => {
  return !isNotNullOrUndefined(input) || input === false;
};
