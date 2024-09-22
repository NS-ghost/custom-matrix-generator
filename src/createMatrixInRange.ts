import { Matrix } from "./types";
import { validateMatrixDimensions } from "./utils";

/**
 * Funkcija za kreiranje N-dimenzionalne matrice sa vrednostima iz datog raspona.
 *
 * @param {number[]} dimensions - Niz koji predstavlja dimenzije matrice.
 * @param {[number, number]} range - Raspon brojeva [min, max] koji mogu biti nasumično generisani u matrici.
 *
 * @returns {Matrix<number>} - N-dimenzionalna matrica sa nasumično generisanim brojevima iz zadatog raspona.
 *
 */
export function createMatrixInRange({ dimensions, range }): Matrix<number> {
  validateMatrixDimensions(dimensions);

  const [min, max] = range;
  if (min > max) {
    throw new Error("Minimalna vrednost ne može biti veća od maksimalne.");
  }

  // Funkcija za generisanje nasumične vrednosti iz raspona
  const generateValue = (): number => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  // Rekurzivna funkcija za kreiranje matrice
  function populateMatrix(dimensions: number[]): Matrix<number> {
    if (dimensions.length === 0) return generateValue();
    return Array.from({ length: dimensions[0] }, () =>
      populateMatrix(dimensions.slice(1))
    );
  }

  return populateMatrix(dimensions);
}
