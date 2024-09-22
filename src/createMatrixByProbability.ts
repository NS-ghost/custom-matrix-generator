import { Matrix, MatrixByProbability } from "./types";
import {
  createMatrix,
  getRandomValue,
  validateMatrixDimensions,
} from "./utils";

/**
 * Kreira n-dimenzionalnu matricu sa vrednostima koje su odabrane na osnovu verovatnoće ili proizvoljnih vrednosti.
 *
 * @param {MatrixByProbability} params - Parametri za kreiranje matrice.
 * @param {number[]} params.dimensions - Niz koji definiše dimenzije matrice.
 * @param {number[]} [params.values] - (Opciono) Niz vrednosti koje se mogu pojaviti u matrici.
 * @param {number[]} [params.probabilities] - (Opciono) Niz verovatnoće koje odgovaraju vrednostima. Mora biti iste dužine kao `values`.
 * @param {number} [params.min] - (Opciono) Minimalna vrednost za proizvoljnih generisane brojeve.
 * @param {number} [params.max] - (Opciono) Maksimalna vrednost za proizvoljnih generisane brojeve.
 *
 * @returns {Matrix<number>} - N-dimenzionalna matrica sa popunjenim vrednostima.
 *
 */

export function createMatrixByProbability({
  dimensions,
  values,
  probabilities,
  min,
  max,
}: MatrixByProbability): Matrix<number> {
  // Validacija dimenzija matrice
  validateMatrixDimensions(dimensions);

  // Provera da li su nizovi vrednosti i verovatnoće prisutni zajedno
  if ((values && !probabilities) || (!values && probabilities)) {
    throw new Error(
      "Ako su prisutni values, onda moraju biti prisutni i probabilities, i obrnuto."
    );
  }

  // Provera da li su nizovi vrednosti i verovatnoće iste dužine.
  if (values && probabilities) {
    if (values.length !== probabilities.length) {
      throw new Error(
        "Nizovi vrednosti i verovatnoće moraju biti iste dužine."
      );
    }

    // Provera da li je ukupna verovatnoca veća od 1
    const totalProbability = probabilities.reduce((sum, p) => sum + p, 0);
    if (totalProbability > 1) {
      throw new Error("Ukupna verovatnoće ne mogže biti veća od 1.");
    }
  }

  // Kreiranje matrice
  const matrix = createMatrix(dimensions);

  // Funkcija za popunjavanje matrice
  const populateMatrix = (
    mat: Matrix<number>,
    dims: number[],
    index: number
  ): Matrix<number> => {
    if (index === dims.length) {
      // Kada stignemo do kraja dimenzija, popunjavamo vrednost
      if (values && probabilities) {
        const rand = Math.random();

        let cumulativeProbability = 0;
        let selectedValue = getRandomValue(min, max);

        for (let i = 0; i < values.length; i++) {
          cumulativeProbability += probabilities[i];
          if (rand < cumulativeProbability) {
            selectedValue = values[i];
            break;
          }
        }

        return selectedValue;
      } else {
        return getRandomValue(min, max);
      }
    }

    return (mat as any[]).map((subMatrix) =>
      populateMatrix(subMatrix, dims, index + 1)
    );
  };

  const populatedMatrix = populateMatrix(matrix, dimensions, 0);

  return populatedMatrix;
}