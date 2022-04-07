export const insertHelper = <T extends { id: string }>(
  array: T[],
  item: T,
  sortAfter?: keyof T
) => {
  const result = [...array, item];
  if (sortAfter) {
    result.sort((a, b) => {
      if (a[sortAfter] > b[sortAfter]) return 1;
      if (a[sortAfter] < b[sortAfter]) return -1;
      return 0;
    });
  }
  return result;
};
export const updateHelper = <T extends { id: string }>(
  array: T[],
  item: Partial<T>,
  sortAfter?: keyof T
) => {
  const result = array.map((element) =>
    element.id === item.id ? { ...element, ...item } : element
  );
  if (sortAfter) {
    result.sort((a, b) => {
      if (a[sortAfter] > b[sortAfter]) return 1;
      if (a[sortAfter] < b[sortAfter]) return -1;
      return 0;
    });
  }
  return result;
};
