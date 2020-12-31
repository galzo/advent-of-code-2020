import { readFileAsString, readFileAsStrings } from "../common/FileReader";

type PassportData = Record<string, string>;

const requiredPassportFields = [
  "byr", // Birth Year
  "iyr", // Issue Year
  "eyr", // Expiration Year
  "hgt", // Height
  "hcl", // Hair Color
  "ecl", // Eye Color
  "pid", // Passport ID
];

const parsePassportRecord = (record: string) => {
  // Each passport record is represented by key-value pairs
  // of (key:value), separated by spaces.
  const passportData = record.replace("\n", " ").split(/\s+/);

  // Iterate through each key-value pair, and map them to a regular object.
  return passportData.reduce<PassportData>((res, keyValuePair) => {
    const [key, value] = keyValuePair.split(":");
    return { ...res, [key]: value };
  }, {});
};

const parsePassportsData = (rawData: string) => {
  // All passports data are separated by blank lines
  // so we split by \n\n
  return rawData.split("\n\n").map(parsePassportRecord);
};

const isPassportValid = (passport: PassportData) => {
  for (const requiredField of requiredPassportFields) {
    const passportField = passport[requiredField];

    const isMissingField = (passportField?.length ?? 0) === 0;
    if (isMissingField) return false;
  }

  return true;
};

export const day4part1 = async () => {
  const rawData = await readFileAsString("src/day4/input/day4.txt");
  const passportsData = parsePassportsData(rawData);
  const validPassports = passportsData.filter(isPassportValid);

  console.log(`The number of valid passports is: ${validPassports.length}`);
};
