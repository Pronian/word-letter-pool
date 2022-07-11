import { loadWords } from "./dictionary.ts";
import { findWords } from "./mod.ts";
import { assertArrayIncludes } from "std/testing/asserts.ts";

const allWords = loadWords();

function assertWords(input: string, expected: string[]) {
  const foundWords = findWords(input, allWords);
  assertArrayIncludes(foundWords, expected);
}

Deno.test("find medium word - prices, pricer", () => {
  assertWords("[rpi]3[ce]2[rs]1", ["prices", "pricer"]);
});

Deno.test("find long word - literally, laterally", () => {
  assertWords("[toalm]1[tia]2[ea]1r[ea]1lly", ["literally", "laterally"]);
});

Deno.test("find complex - disaster", () => {
  assertWords("[dn]1[ni]1[asi]2[tosd]2[eamr]2", ["disaster"]);
});

Deno.test("no singles - leaders", () => {
  assertWords("[le]2[gdan]2[rsei]3", [
    "leaders",
    "leadier",
    "ledgers",
    "ledgier",
    "lenders",
  ]);
});

Deno.test("letters always more than picks - dividing", () => {
  assertWords("[ied]2[giev]2[odin]2[gdan]2", [
    "dividing",
    "deigning",
    "divining",
  ]);
});
