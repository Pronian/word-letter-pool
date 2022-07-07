import { permutateWithoutRepAndLength } from "./permutations.ts";

export interface LetterPool {
  /**
   * The pool of letters to pick from.
   */
  letters: string[];
  /**
   * How many letters to pick from the pool.
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

export function poolsToPermutations(pools: LetterPool[]) {
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
