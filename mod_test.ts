import { loadWords } from "./dictionary.ts";
import { findWords } from "./mod.ts";
import { assertArrayIncludes } from "std/testing/asserts.ts";

const allWords = loadWords();

Deno.test("find medium word - prices, pricer", () => {
  const words = findWords("[rpi]3[ce]2[rs]1", allWords);
  assertArrayIncludes(words, ["prices", "pricer"]);
});

Deno.test("find long word - literally, laterally", () => {
  const words = findWords("[toalm]1[tia]2[ea]1r[ea]1lly", allWords);
  assertArrayIncludes(words, ["literally", "laterally"]);
});

Deno.test("find complex - disaster", () => {
  const words = findWords("[dn]1[ni]1[asi]2[tosd]2[eamr]2", allWords);
  assertArrayIncludes(words, ["disaster"]);
});
