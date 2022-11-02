export const setItemLocalStorage = (item = [], key) =>
  localStorage.setItem(key, JSON.stringify(item));
