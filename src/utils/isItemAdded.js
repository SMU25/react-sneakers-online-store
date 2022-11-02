export const isItemAdded = (items, id) =>
  items.some((obj) => Number(obj.id) === Number(id));
