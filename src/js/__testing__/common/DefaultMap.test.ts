import { describe, expect, test } from "vitest";

import { DefaultMap } from "../../common/DefaultMap";

describe("DefaultMap", () => {
  test("get provides default value", () => {
    const map = new DefaultMap<string, string[]>(() => []);

    expect(map.has("key")).toBe(false);
    expect(map.get("key")).toEqual([]);
    expect(map.has("key")).toBe(true);

    const value = ["value"];
    expect(map.set("key", value).get("key")).toEqual(value);
  });
});
