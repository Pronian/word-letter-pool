import { loadWords } from "./dictionary.ts";
import { inputToLetterPools, poolsToPermutations } from "./letter_pools.ts";
import {
  bold,
  green,
  red,
} from "std/fmt/colors.ts";

/**
 * Merges an array of permutations into an array of words.
 * @param permutations An array of string arrays which represent word permutations
 * @returns an array of words
 */
function mergeWordPermutations(permutations: string[][]) {
  const resultPerms: string[] = [];

  function getMerged(arr: string[][], start = 0, acc = "") {
    if (start >= arr.length) return acc;

    for (const letter of arr[start]) {
      const merged = getMerged(arr, start + 1, acc + letter);
      if (merged) resultPerms.push(merged);
    }
  }

  getMerged(permutations);

  return resultPerms;
}

export function findWords(
  searchStr: string,
  dictionaryWords: string[],
  debug = false,
) {
  const pools = inputToLetterPools(searchStr);

  if (debug) {
    console.debug("Letter pools:", pools);
  }

  const permutations = poolsToPermutations(pools);

  if (debug) {
    console.debug("Pool permutations:", permutations);
  }

  const wordPermutations = mergeWordPermutations(permutations);

  const words = dictionaryWords.filter((word) =>
    wordPermutations.includes(word)
  );

  return words;
}

const input = Deno.args[0];

if (input) {
  const foundWords = findWords(input, loadWords());
  if (foundWords.length > 0) {
    console.log(bold("Found words:"));
    console.log(foundWords.map((w, i) => `  ${i+1}. ${green(w)}`).join("\n"));
  } else {
    console.log(red(bold("No words found!")));
  }
}
