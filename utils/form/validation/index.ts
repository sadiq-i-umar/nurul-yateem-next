export const validateFileType = (value: string | File, validTypes: string[]) =>
  typeof value === "string" || validTypes.includes(value?.type);
