# Welcome to custom-matrix-generator 👋

[![Verzija](https://img.shields.io/npm/v/custom-matrix-generator.svg)](https://www.npmjs.com/package/custom-matrix-generator)
[![Dokumentacija](https://img.shields.io/badge/documentation-yes-brightgreen.svg)](https://github.com/NS-ghost/custom-matrix-generator#readme)
[![Licenca: MIT](https://img.shields.io/github/license/NS-ghost/custom-matrix-generator)](https://github.com/NS-ghost/custom-matrix-generator/blob/master/LICENSE)

### 🏠 [Homepage](https://www.npmjs.com/package/custom-matrix-generator?activeTab=readme)

## Opis

Biblioteka je osmišljena sa ciljem da korisnicima pruži mogućnost generisanja matrica sa raznim verovatnoćama, obrascima i ograničenjima, kao i izvođenja složenih matematičkih operacija.

## Instalacija

```sh
npm i custom-matrix-generator
```

## Pokretanje testova

```sh
npm run tests
```

# `createMatrixInRange()`

## Opis

Funkcija `createMatrixInRange` kreira N-dimenzionalnu matricu sa nasumično generisanim vrednostima unutar datog raspona. Ova funkcija je korisna za generisanje matrica koje se mogu koristiti u različitim matematičkim, statističkim ili simulacionim scenarijima.

## Parametri

- **dimensions**: `number[]`  
  Niz koji predstavlja dimenzije matrice. Na primer, za 3D matricu dimenzija 2x3x4, prosledite `[2, 3, 4]`.

- **range**: `[number, number]`  
  Raspon brojeva `[min, max]` koji mogu biti nasumično generisani u matrici. Na primer, za generisanje brojeva između 1 i 10, prosledite `[1, 10]`.

## Primer upotrebe

```typescript
// Kreiraj 3D matricu dimenzija 2x3x4 sa vrednostima u rasponu od 1 do 10
const dimensions = [2, 3, 4];
const range = [1, 10];
const randomMatrix = createMatrixInRange({ dimensions, range });
```

# `createMatrixWithPattern()`

## Opis

Funkcija `createMatrixWithPattern` kreira matricu sa zadatim dimenzijama i nasumičnim vrednostima, uz opcionalno postavljanje vrednosti prema definisanom obrascu. Obrasci mogu biti postavljanje vrednosti na gornjoj ili donjoj dijagonali, popunjavanje celog reda ili kolone određenom vrednošću.

## Parametri

- **dimensions**: `number[]`
  Niz koji predstavlja dimenzije matrice. Prvi element je broj redova, a drugi broj kolona.

- **options**: `MatrixPatternOptions`
  Objekat koji definiše obrazac za popunjavanje matrice:

  - **pattern**: `'upper-diagonal' | 'lower-diagonal'`
    Tip dijagonale koja će biti popunjena datom vrednošću.
  - **value**: `number`
    Vrednost koja će se postaviti na dijagonalama ili u zadatom redu/koloni.
  - **row**: `number` (opciono)
    Indeks reda koji treba da se popuni sa `value`.
  - **col**: `number` (opciono)
    Indeks kolone koja treba da se popuni sa `value`.

- **min**: `number` (opciono)
  Minimalna vrednost za generisanje nasumičnih brojeva u matrici.

- **max**: `number` (opciono)
  Maksimalna vrednost za generisanje nasumičnih brojeva u matrici.

## Primer upotrebe

```typescript
// Kreiraj matricu 4x4 sa nasumičnim vrednostima između 1 i 10, popuni gornju dijagonalu sa vrednošću 5
const dimensions = [4, 4];
const options = { pattern: "upper-diagonal", value: 5 };
const randomMatrix = createMatrixWithPattern({
  dimensions,
  options,
  min: 1,
  max: 10,
});
```

# `createMatrixByDistribution()`

## Opis

Funkcija `createMatrixByDistribution` kreira N-dimenzionalnu matricu sa nasumično generisanim brojevima prema specificiranim opcijama distribucije. Možete birati između uniformne i normalne distribucije, sa dodatnim opcijama poput granica raspona ili standardne devijacije, a postoji i mogućnost zaokruživanja brojeva na celobrojne vrednosti.

## Parametri

- **dimensions**: `number[]`  
  Niz brojeva koji definiše dimenzije matrice. Prvi element predstavlja broj redova, a drugi broj kolona, dok dodatni elementi definišu više dimenzije (ukoliko su potrebne).

- **options**: `DistributionOptions`  
  Objekat koji definiše opcije distribucije:
  - **distribution**: `'Uniform' | 'Normal'`  
    Tip distribucije koji će se koristiti.
  - **minValue**: `number` (za uniformnu distribuciju)  
    Minimalna vrednost za nasumične brojeve kada je distribucija `'Uniform'`.
  - **maxValue**: `number` (za uniformnu distribuciju)  
    Maksimalna vrednost za nasumične brojeve kada je distribucija `'Uniform'`.
  - **mean**: `number` (za normalnu distribuciju)  
    Srednja vrednost (mean) za nasumične brojeve kada je distribucija `'Normal'`.
  - **stdDev**: `number` (za normalnu distribuciju)  
    Standardna devijacija (stdDev) za nasumične brojeve kada je distribucija `'Normal'`.
  - **wholeNumbers**: `boolean` (opciono)  
    Da li bi brojevi trebalo da budu celobrojni. Podrazumevano je `false`.

## Primeri upotrebe

### Uniformna distribucija

```typescript
// Kreiraj matricu 3x3 sa nasumičnim vrednostima između 1 i 10, u uniformnoj distribuciji
const dimensions = [3, 3];
const options = {
  distribution: "Uniform",
  minValue: 1,
  maxValue: 10,
  wholeNumbers: true,
};
const uniformMatrix = createMatrixByDistribution({ dimensions, options });

// Kreiraj 4x4 matricu sa normalnom distribucijom (mean: 0, stdDev: 1)
const dimensions = [4, 4];
const options = { distribution: "Normal", mean: 0, stdDev: 1 };
const normalMatrix = createMatrixByDistribution({ dimensions, options });
```

# `createMatrixByProbability()`

Kreira n-dimenzionalnu matricu sa vrednostima koje su odabrane na osnovu verovatnoće ili proizvoljnih vrednosti.

#### Parametri:

- **dimensions**: `number[]`: Niz koji definiše dimenzije matrice.
- **values?**: `number[]`: (Opciono) Niz vrednosti koje se mogu pojaviti u matrici.
- **probabilities?**: `number[]`: (Opciono) Niz verovatnoća koje odgovaraju vrednostima. Mora biti iste dužine kao `values`.
- **min?**: `number`: (Opciono) Minimalna vrednost za nasumično generisane brojeve (ako se ne koriste `values` i `probabilities`).
- **max?**: `number`: (Opciono) Maksimalna vrednost za nasumično generisane brojeve (ako se ne koriste `values` i `probabilities`).

#### Primer upotrebe:

```typescript
// Kreira 3x3 matricu sa vrednostima 1 ili 5 sa verovatnoćom 0.7 za 1 i 0.3 za 5
const dimensions = [3, 3];
const values = [1, 5];
const probabilities = [0.7, 0.3];
const matrix = createMatrixByProbability({ dimensions, values, probabilities });

// Ako nisi definisao vrednosti i verovatnoće, koristi se opseg za nasumične brojeve

// Kreira 4x4 matricu sa nasumičnim vrednostima između 10 i 20
const dimensions = [4, 4];
const matrix = createMatrixByProbability({ dimensions, min: 10, max: 20 });
```

# `MatrixToJSON`

Ova klasa omogućava kreiranje i čuvanje matrice u JSON formatu, zajedno sa osnovnim podacima.

#### Konstruktor:

- **_constructor(fileName: string, objectTemplate: JsonObject)_**: Inicijalizuje sesiju sa imenom fajla i osnovnim podacima.
  - **fileName**: Ime JSON fajla gde će se podaci čuvati.
  - **objectTemplate**: Osnovni podaci koji se dodaju uz svaki unos (npr. metapodaci).

#### Metode:

- `write(matrix: Matrix<number>)`: Upisuje novi unos sa matricom u JSON fajl.

  - `matrix`: Matrica koja se dodaje u fajl.

- `private saveEntry(entry: JsonObject)`: Interna metoda koja čuva dati unos u JSON fajl.

#### Primer upotrebe:

```typescript
const objectTemplate = {
  name: "Test polje",
  description: "Matrica za test",
};

const matrixToJson = new MatrixToJSON("matrix_data.json", objectTemplate);

const matrix: Matrix<number> = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
];
// Upisivanje matrice u JSON fajl
matrixToJson.write(matrix);
```

## Autor

👤 **Dimitrije Manić**

- Github: [@NS-ghost](https://github.com/NS-ghost)

## 📝 Licenca

Copyright © 2024 [Dimitrije Manić](https://github.com/NS-ghost).

Ovaj projekat je licenciran od strane [MIT](https://github.com/NS-ghost/custom-matrix-generator/blob/master/LICENSE).
