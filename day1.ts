import { promises as fs } from "fs";
import * as path from "path";

export async function readFileToString(filePath: string): Promise<string> {
  try {
    // Read the file contents
    const data = await fs.readFile(filePath, "utf8");

    // Convert Buffer to string
    const content = data.toString();

    return content;
  } catch (error) {
    console.error(`Error reading file ${filePath}:`, error);
    throw error;
  }
}

// Usage example
async function main() {
  const filePath = "./day_1_challenge.txt";
  try {
    const fileContent = await readFileToString(filePath);
    const fileArr = fileContent.split("\n");
    let total = 0
    for (let i = 0; i < fileArr.length; i++) {
      let item = fileArr[i].replace(/[a-zA-Z]/g, "");
      let firstInt = item[0];
      let lastInt = item[item.length - 1];
      if (item.length < 2) {
        item = `${firstInt}${firstInt}`;
      } else {
        item = `${firstInt}${lastInt}`;
      }
      total = total + Number(item)
    }
    return total
  } catch (error) {
    console.error("Failed to read file:", error);
  }
}

main();
