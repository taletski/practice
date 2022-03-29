export const searchCycle = (nums: number[], target: number): number => {
  if (nums.length === 0) return -1;

  let left = 0;
  let right = nums.length - 1;
  let counter = 0;

  while (right >= left) {
    const middle = Math.round((right + left) / 2);
    if (target === nums[middle]) {
      return middle;
    } else if (nums[middle] < target) {
      left = middle + 1;
    } else {
      right = middle - 1;
    }
    if (counter++ > 100) break;
  }

  if (counter > 100)
    throw new Error(
      `Binary search stuck with target=${target}, leftIdx=${left}, middleIdx=${Math.round(
        (right - left) / 2
      )} righIdxt=${right} in array ${nums}`
    );

  return -1;
};

export const searchRecursive = (
  nums: number[],
  target: number,
  idxStart: number = 0
): number => {
  if (nums.length === 0) return -1;

  const middleIdx = Math.floor((nums.length - 1) / 2);
  const numToCompare = nums[middleIdx];

  if (target === numToCompare) {
    return middleIdx + idxStart;
  } else if (target > numToCompare) {
    return searchRecursive(
      nums.slice(middleIdx + 1),
      target,
      middleIdx + idxStart + 1
    );
  } else {
    return searchRecursive(nums.slice(0, middleIdx), target, idxStart);
  }
};
