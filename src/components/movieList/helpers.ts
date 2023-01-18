import { Movie } from "../../types/Movie";

export function findNearestNumberDivisibleByThree(n: number) {
  let newNumber = n;

  while (newNumber) {
    newNumber++;

    if (!(newNumber % 3)) {
      break;
    }
  }

  return newNumber;
};

export function fillAnArray(arr: Movie[]): (Movie | null)[] {
  const nearestNumberDivisibleByThree = findNearestNumberDivisibleByThree(
    arr.length
  );
  const arrToReturn:(Movie | null) []  = [...arr];

  while (arrToReturn.length < nearestNumberDivisibleByThree) {
    arrToReturn.push(null);
  }

  return arrToReturn;
};