import { promises as fs } from "fs";

export const readFileAsStrings = async (filePath: string): Promise<string[]> => {
    const fileData = await fs.readFile(filePath);
    const fileLines = fileData.toString().split("\n");
    return fileLines;
};

export const readFileAsNumbers = async (filePath: string): Promise<number[]> => {
    const fileLines = await readFileAsStrings(filePath);
    return fileLines.map(line => Number.parseInt(line));
};