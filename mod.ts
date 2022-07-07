import { loadWords } from "./dictionary.ts";
import { inputToLetterPools, poolsToPermutations } from "./letter_pools.ts";

const allWords = loadWords();

const searchStr = "[toalm]1[tia]2[ea]1r[ea]1lly"; // "Literally"

const pools = inputToLetterPools(searchStr);
console.log("Letter pools", pools);
const poolPermutations = poolsToPermutations(pools);
console.log("Pool permutations", poolPermutations);

const resultComb: string[] = [];
function getMerged(arr: string[][], start = 0, acc = "") {
  if (start >= arr.length) return acc;

  for (const letter of arr[start]) {
    const merged = getMerged(arr, start + 1, acc + letter);
    if (merged) resultComb.push(merged);
  }
}

getMerged(poolPermutations);
const foundWords = allWords.filter((word) => resultComb.includes(word));
console.log("found", foundWords);
