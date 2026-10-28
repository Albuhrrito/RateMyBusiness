import assert from "node:assert/strict";
import { test } from "node:test";
import { ENDING_VALUES, overallFromDimensions, stageIndex, trackState } from "./scoring";

test("overall is the mean of five dimensions, rounded to one decimal", () => {
  assert.equal(
    overallFromDimensions({
      communication: 5,
      timeliness: 5,
      interviewQuality: 5,
      processClarity: 5,
      professionalism: 5,
    }),
    5,
  );
  assert.equal(
    overallFromDimensions({
      communication: 2,
      timeliness: 3,
      interviewQuality: 4,
      processClarity: 3,
      professionalism: 5,
    }),
    3.4,
  );
  assert.equal(
    overallFromDimensions({
      communication: 1,
      timeliness: 2,
      interviewQuality: 2,
      processClarity: 2,
      professionalism: 2,
    }),
    1.8,
  );
});

test("trackState finds the furthest stage and writes a caption", () => {
  assert.deepEqual(trackState("final_round", "ghosted"), {
    reached: 3,
    ending: "ghosted",
    caption: "Reached the final round, then ghosted.",
  });
  assert.equal(trackState("offered", "hired").caption, "Got an offer, then accepted it.");
  assert.equal(trackState("screened", "rejected").reached, 1);
});

test("trackState has a caption for every ending", () => {
  for (const ending of ENDING_VALUES) {
    const state = trackState("interviewed", ending);
    assert.equal(state.ending, ending);
    assert.match(state.caption, /^Interviewed, then .+\.$/);
  }
});

test("unknown stages and endings fall back safely", () => {
  assert.equal(stageIndex("nope"), 0);
  assert.equal(trackState("nope", "nope").ending, "rejected");
});
