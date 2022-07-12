export interface LetterPool {
  /**
   * The pool of letters to pick from
   */
  letters: string[];
  /**
   * How many letters to pick from the pool
   */
  count: number;
}

export function inputToLetterPools(searchStr: string) {
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

/**
 * Compute word length from letter pools.
 * @param pools the letter pools to compute the word length from
 * @returns the word length that the letter pools represent
 */
export function wordLengthFromLetterPools(pools: LetterPool[]) {
  let length = 0;

  for (const pool of pools) {
    length += pool.count;
  }

  return length;
}

/**
 * Goes though the letter pools and though the word simultaneously and checks
 * if the word matches the letter pools.
 * @param word the word to check
 * @param pools the letter pools to check the word against
 * @returns true if the word matches the letter pools, false otherwise
 */
export function wordMatchesLetterPools(word: string, pools: LetterPool[]) {
  const wordLetters = word.split("").values();
  let targetLetter: string | undefined = wordLetters.next().value;

  for (const pool of pools) {
    const availableLetters = pool.letters.slice();
    let remainingCount = pool.count;

    while (remainingCount > 0) {
      if (!targetLetter) return false;

      const index = availableLetters.indexOf(targetLetter);
      if (index === -1) return false;

      availableLetters.splice(index, 1);
      remainingCount--;
      targetLetter = wordLetters.next().value;
    }
  }

  return true;
}
