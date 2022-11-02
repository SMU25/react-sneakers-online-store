export const setItemLocalStorage = (value = [], key) =>
  localStorage.setItem(key, JSON.stringify(value));
