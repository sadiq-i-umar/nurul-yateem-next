export const getOptions = (options: string[]) => {
  return options.map((option) => ({ label: option, value: option }));
};
