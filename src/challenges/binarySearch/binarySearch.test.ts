import { testerFactory } from 'utils/arraySearchTester';
import { searchRecursive, searchCycle } from './binarySearch';

const testArray = [-5, -2, 0, 1, 2, 7, 9, 12];
const testNotFoundValues = [-1, -200, 10000000, 13, 10];

const tester = testerFactory(testArray, testNotFoundValues);

tester(searchCycle, 'cycle binary search');
tester(searchRecursive, 'recursive binary search');
