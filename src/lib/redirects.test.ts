import assert from "node:assert/strict";
import { test } from "node:test";
import { safeCallbackUrl } from "./redirects";

test("same-site paths pass through", () => {
  assert.equal(safeCallbackUrl("/reviews/new?company=stripe"), "/reviews/new?company=stripe");
  assert.equal(safeCallbackUrl("/"), "/");
});

test("anything that could leave the site falls back to /", () => {
  for (const value of [
    "https://evil.example",
    "//evil.example",
    "/\\evil.example",
    "javascript:alert(1)",
    "/\nfoo",
    "",
    undefined,
    null,
    42,
  ]) {
    assert.equal(safeCallbackUrl(value), "/", String(value));
  }
});
