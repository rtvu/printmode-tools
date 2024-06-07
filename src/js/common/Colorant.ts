export type Colorant = string & { readonly Colorant: unique symbol };

export function isColorant(colorant: string): colorant is Colorant {
  colorant = colorant.trim();

  return /^[a-zA-Z]/i.test(colorant) && /^[a-zA-Z0-9]+$/g.test(colorant);
}

export function assertIsColorant(colorant: string): asserts colorant is Colorant {
  if (!isColorant(colorant)) {
    throw new TypeError(`String "${colorant}" is not a Colorant.`);
  }
}
