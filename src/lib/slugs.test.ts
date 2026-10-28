import assert from "node:assert/strict";
import { test } from "node:test";
import { slugify } from "./slugs";

test("slugify makes URL-safe, lowercase slugs", () => {
  assert.equal(slugify("Trader Joe's"), "trader-joe-s");
  assert.equal(slugify("  Café Métro  "), "cafe-metro");
  assert.equal(slugify("!!!"), "company");
});
