export function reduceNullables<S, T>(
  array: (S | null | undefined)[],
  callback: (accumulator: T, currentValue: S) => T,
  initialValue: T,
): T | null {
  return array.reduce((accumulator: T | null, currentValue: S | null | undefined): T | null => {
    if (accumulator === null || currentValue === null || currentValue === undefined) {
      return null;
    } else {
      return callback(accumulator, currentValue);
    }
  }, initialValue);
}
