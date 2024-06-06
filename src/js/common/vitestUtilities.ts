import { Assertion } from "vitest";

export function setNot<T>(assertion: Assertion<T>, isOn = false) {
  if (isOn) {
    return assertion.not;
  } else {
    return assertion;
  }
}
