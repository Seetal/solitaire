import { shuffle } from "./shuffle.js";

describe('Shuffle an array', () => {
    test('A array of 1,2,3,4,6 to not equal 1,2,3,4,5', () => {
        let newArray = [1, 2, 3, 4, 5];
        shuffle(newArray);
        //expect(shuffledArray[4]).not.toBe(newArray[4]);
        expect(newArray).not.toEqual([1, 2, 3, 4, 5]);
    })
})