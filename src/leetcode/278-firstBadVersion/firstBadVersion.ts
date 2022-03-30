/**
 * Uses binary search, `O(n*log(n))`
 */
export const firstBadVersion =
  (isBadVersion: (version: number) => boolean) =>
  (latestVersion: number): number => {
    let left = 0;
    let right = latestVersion;

    let counter = 0;

    while (left < right) {
      const middle = Math.round((right + left) / 2);

      if (isBadVersion(middle)) {
        right = middle;
      } else {
        left = middle + 1;
      }

      if (counter++ > 100)
        throw new Error(
          `firstBadVersion stuck with left=${left}, middle=${middle}, right=${right}`
        );
    }

    return left;
  };
