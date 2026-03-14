import { expect, test } from "vitest";
import { Cache } from "./pokecache.js";

test("stores and retrieves values", () => {
  const cache = new Cache(1000);
  cache.add("hello", { value: 123 });
  expect(cache.get("hello")).toEqual({ value: 123 });
  cache.stopReapLoop();
});

test("reaps stale entries", async () => {
  const cache = new Cache(5);
  cache.add("soon", { value: "stale" });
  await new Promise((resolve) => setTimeout(resolve, 20));
  expect(cache.get("soon")).toBeUndefined();
  cache.stopReapLoop();
});
