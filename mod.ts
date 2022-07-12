import { loadWords } from "./dictionary.ts";
import {
  inputToLetterPools,
  wordLengthFromLetterPools,
  wordMatchesLetterPools,
} from "./letter_pools.ts";
import { bold, green, red } from "std/fmt/colors.ts";

export function findWords(
  searchStr: string,
  dictionaryWords: string[],
  debug = false,
) {
  const pools = inputToLetterPools(searchStr);

  if (debug) {
    console.debug("Letter pools:", pools);
  }

  const poolWordLength = wordLengthFromLetterPools(pools);
  const wordsMatchingLength = dictionaryWords.filter((word) =>
    word.length === poolWordLength
  );

  const words = wordsMatchingLength.filter((word) =>
    wordMatchesLetterPools(word, pools)
  );

  if (debug) {
    console.log("Found words:", words);
  }

  return words;
}

const input = Deno.args[0];

if (input) {
  const foundWords = findWords(input, loadWords());
  if (foundWords.length > 0) {
    console.log(bold("Found words:"));
    console.log(foundWords.map((w, i) => `  ${i + 1}. ${green(w)}`).join("\n"));
  } else {
    console.log(red(bold("No words found!")));
  }
}
