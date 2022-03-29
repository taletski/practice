import { firstBadVersion } from './firstBadVersion';

const latestVersion = 12;
const badVersions = [9, 10, 11, 12];

const isBadVersionFactory =
  (badVersions: number[]) =>
  (version: number): boolean =>
    badVersions.includes(version);

describe('first bad version', () => {
  const expected = badVersions[0];
  const result = firstBadVersion(isBadVersionFactory(badVersions))(
    latestVersion
  );
  it(`finds first bad version of ${result} (expected ${expected}) in the list of versions with latest of ${latestVersion}`, () => {
    expect(result).toBe(expected);
  });
});
