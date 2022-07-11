/**
 * Load words from a dictionary file.
 * @returns - An array of words.
 */
export function loadWords() {
  const dirname = new URL('.', import.meta.url).pathname;

  // Use dictionary from https://github.com/dwyl/english-words
  const allWords = Deno.readTextFileSync(`${dirname}/words_alpha.txt`)
    .split("\n")
    .map((word) => word.trim());

  return allWords;
}
