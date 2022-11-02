import { NULL_TYPE, UNDEFINED_TYPE } from "constants/types";

export const getItemLocalStorage = (key) => {
  const stringifyItem = localStorage.getItem(key);

  if (
    !stringifyItem ||
    stringifyItem.includes(NULL_TYPE) ||
    stringifyItem.includes(UNDEFINED_TYPE)
  ) {
    return [];
  } else {
    return JSON.parse(localStorage.getItem(key));
  }
};
