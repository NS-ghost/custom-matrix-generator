import { createMatrixInRange } from "../src/createMatrixInRange";
import { Matrix } from "../src/types";

describe("createMatrixInRange", () => {
  test("vrednost svake pozicije matrice treba da bude u zadatom opsegu", () => {
    const dimensions = [3, 4];
    const range: [number, number] = [5, 10];

    const matrix: Matrix<number> = createMatrixInRange({ dimensions, range });

    console.log("Izgled matrice: ", matrix);

    let allValuesInRange = true;

    if (Array.isArray(matrix)) {
      matrix.forEach((matPosition) => {
        if (typeof matPosition === "number") {
          if (matPosition < range[0] || matPosition > range[1]) {
            allValuesInRange = false;
          }
        }
      });
    }

    expect(allValuesInRange).toBe(true);
  });
});
