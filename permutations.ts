export function permutateWithoutRepetitions<T>(permutationOptions: T[]): T[][] {
  if (permutationOptions.length === 1) {
    return [permutationOptions];
  }

  // Init permutations array.
  const permutations = [];

  // Get all permutations for permutationOptions excluding the first element.
  const smallerPermutations = permutateWithoutRepetitions(
    permutationOptions.slice(1),
  );

  // Insert first option into every possible position of every smaller permutation.
  const firstOption = permutationOptions[0];

  for (
    let permIndex = 0;
    permIndex < smallerPermutations.length;
    permIndex += 1
  ) {
    const smallerPermutation = smallerPermutations[permIndex];

    // Insert first option into every possible position of smallerPermutation.
    for (
      let positionIndex = 0;
      positionIndex <= smallerPermutation.length;
      positionIndex += 1
    ) {
      const permutationPrefix = smallerPermutation.slice(0, positionIndex);
      const permutationSuffix = smallerPermutation.slice(positionIndex);
      permutations.push(
        permutationPrefix.concat([firstOption], permutationSuffix),
      );
    }
  }

  return permutations;
}

export function permutateWithoutRepAndLength<T>(
  permutationOptions: T[],
  length: number,
): T[][] {
  if (length >= permutationOptions.length) {
    return permutateWithoutRepetitions(permutationOptions);
  }

  const permOrder = permutateWithoutRepetitions(
    Array.from({ length: permutationOptions.length }, (_v, i) => i),
  );

  const strS = permOrder.map((val) => JSON.stringify(val.slice(0, length)));
  const unique = new Set(strS);
  const limited: number[][] = [];
  for (const u of unique) {
    limited.push(JSON.parse(u) as number[]);
  }
  const result = limited.map((arr) =>
    arr.map((val) => permutationOptions[val])
  );

  return result;
}
