import * as fs from "fs";
import * as path from "path";
import { JsonObject, Matrix } from "./types";

export class MatrixToJSON {
  private matrixKey: string = "matrix";
  private filePath: string;
  private objectTemplate: JsonObject;

  /**
   * Inicijalizuje sesiju sa imenom fajla i osnovnim podacima.
   * @param fileName - Ime JSON fajla.
   * @param objectTemplate - Objekat sa osnovnim podacima.
   */
  constructor(fileName: string, objectTemplate: JsonObject) {
    this.filePath = path.join(process.cwd(), "src", fileName);
    this.objectTemplate = objectTemplate;
  }

  /**
   * Upisuje novi unos sa matricom i podacima.
   * @param matrix - Matrica koja se dodaje.
   */
  write(matrix: Matrix<number>) {
    const entry: JsonObject = {
      timestamp: new Date().toISOString(),
      ...this.objectTemplate,
      [this.matrixKey]: matrix,
    };

    this.saveEntry(entry);
  }

  /**
   * Čuva dati unos u JSON fajl.
   * @param entry - Objekat koji se čuva.
   */
  private saveEntry(entry: JsonObject) {
    let existingData: JsonObject = {};

    if (fs.existsSync(this.filePath)) {
      const data = fs.readFileSync(this.filePath, "utf8");
      existingData = JSON.parse(data);
    }

    existingData[`entry${Object.keys(existingData).length + 1}`] = entry;

    fs.writeFileSync(
      this.filePath,
      JSON.stringify(existingData, null, 2),
      "utf8"
    );
  }
}
