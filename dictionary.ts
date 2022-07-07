/**
 * Load words from a dictionary file.
 * @param lengthFilter - Optional. If provided, only words of this length will be returned.
 * @returns - An array of words.
 */
export function loadWords(lengthFilter = 0) {
  // Use dictionary from https://github.com/dwyl/english-words
  const allWords = Deno.readTextFileSync("words_alpha.txt")
    .split("\n")
    .map((word) => word.trim());

  if (lengthFilter) {
    return allWords.filter((word) => word.length === lengthFilter);
  }

  return allWords;
}
