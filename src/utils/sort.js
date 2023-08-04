export const MapOrder = (originalArray, orderArray, key) => {
  if (!originalArray || !orderArray || !key) return [];
  return orderArray.map((order) =>
    originalArray.find((item) => item[key] === order)
  );
};
