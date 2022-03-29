type SearchAlgorithm = (array: number[], target: number) => number;
type Tester = (searchAlgorithm: SearchAlgorithm, name: string) => void;

export const testerFactory = (
  testArray: number[],
  testNotFoundValues: number[]
): Tester => {
  return (searchAlgorithm: SearchAlgorithm, name: string) => {
    describe(name, () => {
      testArray.forEach((val, idx, array) => {
        const result = searchAlgorithm(array, val);
        it(`finds index of value ${val} to be ${result} (expected ${idx}) in [${array}]`, () => {
          expect(result).toBe(idx);
        });
      });

      testNotFoundValues.forEach((val, idx, array) => {
        it(`returns -1 for value ${val} searched in [${testArray}]`, () => {
          expect(searchAlgorithm(testArray, val)).toBe(-1);
        });
      });
    });
  };
};
