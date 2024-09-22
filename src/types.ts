/*
 * INTERFACES
 */

// Definicja intefejsa za createMatrixByDistribution funkciju
export interface MatrixByDistribution {
  dimensions: number[];
  options: DistributionOptions;
}

// Definicija interfejsa za createMatrixByProbability funkciju
export interface MatrixByProbability {
  dimensions: number[];
  values?: number[];
  probabilities?: number[];
  min?: number;
  max?: number;
}

// Definicija interfejsa za createMatrixInRange funkciju
export interface MatrixInRange {
  dimensions: number[];
  range: [number, number];
}

// Definicija interfejsa za createMatrixWithPattern funkciju
export interface MatrixWithPattern {
  dimensions: number[];
  options: MatrixPatternOptions;
  min?: number;
  max?: number;
}

// Definicija interfejsa za options u createMatrixWithPattern funkciji
export interface MatrixPatternOptions {
  pattern: "upper-diagonal" | "lower-diagonal";
  value: number;
  row?: number;
  col?: number;
}

// Interfejs za uniformnu distribuciju
export interface UniformDistribution {
  distribution: DistributionType.Uniform;
  minValue: number;
  maxValue: number;
  wholeNumbers?: boolean;
}

// Interfejs za normalnu distribuciju
export interface NormalDistribution {
  distribution: DistributionType.Normal;
  mean: number;
  stdDev: number;
  wholeNumbers?: boolean;
}

// Intefejs za toJSON klasu
export interface JsonObject {
  [key: string]: any;
}

/*
 * TYPES
 */

// Definicija rekurzivnog tipa za N-dimenzionalnu matricu
export type Matrix<T> = T | Matrix<T>[];

// Tip objekta koji određuje tip distribucije i njene parametre
export type DistributionOptions = UniformDistribution | NormalDistribution;

/*
 * ENUMS
 */

// Definicija enum za tip distribucije
export enum DistributionType {
  Uniform = "uniform",
  Normal = "normal",
}
