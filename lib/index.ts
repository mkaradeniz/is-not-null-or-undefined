export const isNotNullOrUndefined = <T>(input: T | null | undefined): input is T => {
  return input !== null && input !== undefined;
};
