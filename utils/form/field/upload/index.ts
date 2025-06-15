export const getImage = (
  file: File,
  getResult: (arg?: string | null) => void
) => {
  const reader = new FileReader();
  if (file) {
    reader.readAsDataURL(file);
    reader.onloadend = (e) => {
      const result = e.target?.result;
      if (typeof result === "string") {
        getResult(result);
      }
    }; /** TODO: Find a way to return the result instead of retrieving it from the getResult param */
  }
};
