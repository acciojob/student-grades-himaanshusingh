//your JS code here. If required.
import { promises as fs } from "fs";

async function readStudentsAndPrintAverages() {
  try {
    // Read the file asynchronously as text
    const data = await fs.readFile("students.json", "utf-8");

    // Split into rows and remove empty lines
    const lines = data
      .split("\n")
      .map((line) => line.trim())
      .filter((line) => line.length > 0);

    // First line = header
    const header = lines[0].split(","); // e.g. ["name","math","science","english"]

    // Remaining lines = student rows
    const students = lines.slice(1).map((line) => {
      const cols = line.split(",");
      const obj = {};
      header.forEach((key, i) => {
        // Try to convert numeric fields; keep strings for name
        const num = Number(cols[i]);
        obj[key] = Number.isNaN(num) ? cols[i] : num;
      });
      return obj;
    });

    // Calculate average marks per student and log
    students.forEach((student) => {
      // take all numeric fields except "name"
      const entries = Object.entries(student).filter(
        ([key, value]) => key !== "name" && typeof value === "number"
      );

      const total = entries.reduce((sum, [, value]) => sum + value, 0);
      const avg = entries.length > 0 ? total / entries.length : 0;

      console.log(`${student.name}: ${avg}`);
    });
  } catch (err) {
    console.error("Error reading students:", err.message);
  }
}

readStudentsAndPrintAverages();