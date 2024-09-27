import { Matrix } from "./types";

// Funkcija za kreiranje matrice sa zadatim dimenzijama
export function createMatrix(dims: number[]): Matrix<number> {
  if (dims.length === 0) return 0 as number;
  return Array.from({ length: dims[0] }, () => createMatrix(dims.slice(1)));
}

// Funkcija za generisanje random brojeva
export function getRandomValue(min: number = 0, max: number = 1000): number {
  // Ako min i max nisu definisani, koristi podrazumevani opseg
  if (min > max) {
    throw new Error("Minimalna vrednost ne može biti veća od maksimalne.");
  }

  // Generiši random broj između min i max (uključivo)
  return Math.floor(Math.random() * (max - min + 1)) + min;
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
// Ista ko i getRandomValue(), korisnik mora da posalje parametar za cele brojeve
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
