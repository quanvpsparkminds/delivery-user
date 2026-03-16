export const createFormData = (data: any): FormData => {
  const formData = new FormData();

  Object.keys(data).forEach((key) => {
    const value = data[key];
    if (value !== undefined && value !== null) {
      if (value instanceof Object) {
        formData.append(key, value);
      } else {
        formData.append(key, value.toString());
      }
    }
  });

  return formData;
};
