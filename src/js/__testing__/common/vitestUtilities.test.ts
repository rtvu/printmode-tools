import { describe, expect, test } from "vitest";

import { setNot } from "../../common/vitestUtilities";

describe("setNot", () => {
  test("not is toggled", () => {
    setNot(expect(0), false).toBe(0);
    setNot(expect(0), true).toBe(1);
  });
});
