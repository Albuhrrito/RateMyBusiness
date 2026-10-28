import assert from "node:assert/strict";
import { test } from "node:test";
import { endingDistribution, formatShare, median, share } from "./stats";

test("median handles empty, odd and even lists without mutating input", () => {
  assert.equal(median([]), null);
  assert.equal(median([9, 1, 4]), 4);
  const values = [8, 2, 6, 4];
  assert.equal(median(values), 5);
  assert.deepEqual(values, [8, 2, 6, 4]);
});

test("share is null when there is nothing to measure", () => {
  assert.equal(share(0, 0), null);
  assert.equal(share(1, 4), 0.25);
  assert.equal(formatShare(null), "—");
  assert.equal(formatShare(2 / 3), "67%");
});

test("endingDistribution counts every ending in a fixed order, including zeros", () => {
  const counts = endingDistribution(["ghosted", "hired", "ghosted", "unknown"]);
  assert.deepEqual(
    counts.map((c) => [c.ending, c.count]),
    [
      ["hired", 1],
      ["declined", 0],
      ["rejected", 0],
      ["withdrew", 0],
      ["ghosted", 2],
    ],
  );
});
