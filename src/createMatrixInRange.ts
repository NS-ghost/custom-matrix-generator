import { Matrix, MatrixInRange } from "./types";
import { getRandomValue } from "./utils";

/**
 * Funkcija za kreiranje N-dimenzionalne matrice sa vrednostima iz datog raspona.
 *
 * @param {number[]} dimensions - Niz koji predstavlja dimenzije matrice.
 * @param {[number, number]} range - Raspon brojeva [min, max] koji mogu biti nasumično generisani u matrici.
 *
 * @returns {Matrix<number>} - N-dimenzionalna matrica sa nasumično generisanim brojevima iz zadatog raspona.
 *
 */
export function createMatrixInRange({
  dimensions,
  range,
}: MatrixInRange): Matrix<number> {
  const [min, max] = range;

  // Rekurzivna funkcija za kreiranje matrice
  function populateMatrix(dimensions: number[]): Matrix<number> {
    if (dimensions.length === 0) return getRandomValue(min, max);
    return Array.from({ length: dimensions[0] }, () =>
      populateMatrix(dimensions.slice(1))
    );
  }

  return populateMatrix(dimensions);
}
