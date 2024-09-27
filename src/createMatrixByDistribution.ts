import {
  DistributionOptions,
  DistributionType,
  Matrix,
  MatrixByDistribution,
} from "./types";
import {
  createMatrix,
  randomNormalNumbers,
  randomUniformNumbers,
  validateNormalDistributionParams,
} from "./utils";

/**
 * Kreira n-dimenzionalnu matricu sa zadatim dimenzijama na osnovu opcija distribucije.
 *
 * @param {number[]} dimensions - Niz koji definiše dimenzije matrice.
 *
 * @param {DistributionOptions} options - Objekat koji određuje tip distribucije i njene parametre.
 *                                        Može biti uniformna ili normalna distribucija.
 *                                        - Za uniform: { minValue, maxValue, wholeNumbers (opciono) }
 *                                        - Za normal:  { mean, stdDev, wholeNumbers (opciono) }
 * @returns {Matrix<number>} - Matrica popunjena nasumično generisanim brojevima u skladu sa zadatom distribucijom.
 */

// Glavna funkcija za kreiranje i popunjavanje matrice na osnovu distribucije
export function createMatrixByDistribution({
  dimensions,
  options,
}: MatrixByDistribution): Matrix<number> {
  // Kreiranje matrice strukture
  const matrix: Matrix<number> = createMatrix(dimensions);

  // Popunjavanje matrice
  const populateMatrix = (
    matrix: Matrix<number>,
    options: DistributionOptions
  ): Matrix<number> => {
    if (Array.isArray(matrix)) {
      return matrix.map((item) => populateMatrix(item, options));
    } else {
      if (options.distribution === DistributionType.Uniform) {
        return randomUniformNumbers(
          options.min,
          options.max,
          options.wholeNumbers ?? false
        );
      } else if (options.distribution === DistributionType.Normal) {
        // Validaciju normalnih parametara
        validateNormalDistributionParams(options.mean, options.stdDev);
        return randomNormalNumbers(
          options.mean,
          options.stdDev,
          options.wholeNumbers ?? false
        );
      } else {
        return matrix;
      }
    }
  };

  // Popunjavanje matrice generisanim vrednostima
  return populateMatrix(matrix, options);
}
