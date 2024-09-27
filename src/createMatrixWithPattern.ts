import { createMatrixInRange } from "./createMatrixInRange";
import { Matrix, MatrixInRange, MatrixWithPattern } from "./types";

/**
 * Funkcija za kreiranje matrice sa zadatim dimenzijama i obrazcem.
 *
 * @param {number[]} dimensions - Niz koji predstavlja dimenzije matrice.
 *                                 Prvi element je broj redova, a drugi broj kolona.
 * @param {MatrixPatternOptions} options - Objekat koji definiše obrazac za popunjavanje:
 *                                          - pattern: upper-diagonal ili lower-diagonal.
 *                                          - value: Vrednost koja će se postaviti na dijagonalama i u redovima/kolonama.
 *                                          - row (opciono): Indeks reda koji treba popuniti sa value.
 *                                          - col (opciono): Indeks kolone koja treba da dobije value.
 * @param {number} [min] - (opciono) Minimalna vrednost za generisanje nasumičnih brojeva.
 * @param {number} [max] - (opciono) Maksimalna vrednost za generisanje nasumičnih brojeva.
 *
 * @returns {Matrix<number>} - Vraća N-dimenzionalnu matricu sa nasumičnim brojevima i
 *                              postavljenim vrednostima prema datim opcijama.
 */

export function createMatrixWithPattern({
  dimensions,
  options,
  min,
  max,
}: MatrixWithPattern): Matrix<number> {
  const matrixInRange: MatrixInRange = {
    dimensions: dimensions,
    range: [min, max],
  };
  let matrix = createMatrixInRange(matrixInRange);

  if (options.pattern === "upper-diagonal") {
    for (let i = 0; i < dimensions[0]; i++) {
      (matrix as number[][])[i][i] = options.value;
    }
  }

  if (options.pattern === "lower-diagonal") {
    for (let i = 0; i < dimensions[0]; i++) {
      (matrix as number[][])[i][dimensions[0] - 1 - i] = options.value;
    }
  }

  if (options.row !== undefined && Array.isArray(matrix)) {
    for (let i = 0; i < dimensions[1]; i++) {
      (matrix[options.row] as number[])[i] = options.value; // Popuni ceo red
    }
  }

  if (options.col !== undefined && Array.isArray(matrix)) {
    for (let i = 0; i < dimensions[0]; i++) {
      (matrix[i] as number[])[options.col] = options.value; // Popuni celu kolonu
    }
  }

  return matrix;
}
