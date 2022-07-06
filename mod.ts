import { permutateWithoutRepAndLength } from "./permutations.ts";

interface LetterPool {
  letters: string[];
  count: number;
}

function loadWords(lengthFilter = 0) {
  // Use dictionary from https://github.com/dwyl/english-words
  const allWords = Deno.readTextFileSync("words_alpha.txt")
    .split("\n")
    .map((word) => word.trim());

  if (lengthFilter) {
    return allWords.filter((word) => word.length === lengthFilter);
  }

  return allWords;
}

const allWords = loadWords();

const searchStr = "[toalm]1[tia]2[ea]1r[ea]1lly"; // "Literally"

function inputToLetterPools(searchStr: string) {
  const reVar = /(\[(?<letters>[a-z]+)\](?<count>\d{1,2}))|(?<letter>[a-z])/gi;
  const result: LetterPool[] = [];

  const matches = searchStr.matchAll(reVar);
  if (!matches) return result;

  for (const match of matches) {
    if (match.groups?.letter) {
      result.push({
        letters: [match.groups.letter],
        count: 1,
      });
    } else if (match.groups?.letters) {
      result.push({
        letters: match.groups.letters.split(""),
        count: parseInt(match.groups.count),
      });
    }
  }

  return result;
}

function poolsToPermutations(pools: LetterPool[]) {
  const poolPermutations: string[][] = [];

  for (const pool of pools) {
    if (pool.count === 1) {
      poolPermutations.push(pool.letters);
    } else {
      const perms = permutateWithoutRepAndLength(pool.letters, pool.count).map((
        combo,
      ) => combo.join(""));
      poolPermutations.push(perms);
    }
  }

  return poolPermutations;
}

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
