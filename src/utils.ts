import { Matrix } from "./types";

// Funkcija za kreiranje matrice sa zadatim dimenzijama
export function createMatrix(dims: number[]): Matrix<number> {
  if (dims.length === 0) return 0 as any;
  return Array.from({ length: dims[0] }, () => createMatrix(dims.slice(1)));
}

// Funkcija za generisanje random brojeva
export function getRandomValue(min?: number, max?: number): number {
  const maxValue = Number.MAX_SAFE_INTEGER; // Maksimalna vrednost celog broja

  if (min && max) {
    // Ako su min i max definisani, generiši random broj između njih
    if (min > max) {
      throw new Error("min treba da bude manji ili jednak max.");
    }
    return Math.floor(Math.random() * (max - min + 1)) + min;
  } else {
    // Ako min i max nisu definisani, generiši random broj između 0 i Number.MAX_SAFE_INTEGER
    return Math.floor(Math.random() * (maxValue + 1));
  }
}

// Validacija dimenzija matrice
export function validateMatrixDimensions(dimensions: number[]): void {
  if (dimensions.length === 0) {
    throw new Error("Dimenzije matrice moraju biti navedene.");
  }
  dimensions.forEach((dim, index) => {
    if (!Number.isInteger(dim) || dim <= 0) {
      throw new Error(
        `Dimenzija na indeksu ${index} mora biti pozitivan ceo broj.`
      );
    }
  });
}

// Funkcija za validaciju normalnih parametara
export function validateNormalDistributionParams(
  mean: number,
  stdDev: number
): void {
  if (stdDev <= 0) {
    throw new Error("stdDev mora biti veći od 0.");
  }
  if (isNaN(mean)) {
    throw new Error("mean mora biti validan broj.");
  }
}

// Funkcija za generisanje uniformnih brojeva
export function randomUniformNumbers(
  min: number,
  max: number,
  wholeNumbers: boolean = false
): number {
  const value = Math.random() * (max - min) + min;
  return wholeNumbers ? Math.round(value) : value;
}

// Funkcija za generisanje normalnih brojeva (Box-Muller)
export function randomNormalNumbers(
  mean: number,
  stdDev: number,
  wholeNumbers: boolean = false
): number {
  let number1 = Math.random();
  let number2 = Math.random();
  let nextNumber =
    Math.sqrt(-2.0 * Math.log(number1)) * Math.cos(2.0 * Math.PI * number2);
  const value = nextNumber * stdDev + mean;
  return wholeNumbers ? Math.round(value) : value;
}
