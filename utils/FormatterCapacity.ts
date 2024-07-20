export enum CapacityUnit {
  KB = 1024,
  MB = 1024 * 1024,
  GB = 1024 * 1024 * 1024
}

const formatterCapacity = (unit: CapacityUnit, total: number, decimals: number) => {
  let change = total / unit;
  return parseFloat(change.toFixed(decimals));
};

export default formatterCapacity;
