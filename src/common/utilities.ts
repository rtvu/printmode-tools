export type JSONValue = string | number | boolean | null | JSONValue[] | { [key: string | number]: JSONValue };

export function reduceIterable<T, V>(
  iterable: Iterable<T>,
  callback: (accumulator: V, currentElement: T, iterable: Iterable<T>) => V,
  initialValue: V,
) {
  let accumulator = initialValue;
  for (const currentElement of iterable) {
    accumulator = callback(accumulator, currentElement, iterable);
  }

  return accumulator;
}
