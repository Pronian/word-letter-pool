/**
 * Load words from a dictionary file.
 * @returns - An array of words.
 */
export function loadWords() {
  // Use dictionary from https://github.com/dwyl/english-words
  const allWords = Deno.readTextFileSync("words_alpha.txt")
    .split("\n")
    .map((word) => word.trim());

  return allWords;
}
