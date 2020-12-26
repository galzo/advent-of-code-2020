import { readFileAsStrings } from "../common/FileReader";

type PasswordDetails = {
  policyMinimum: number;
  policyMaximum: number;
  requiredLetter: string;
  password: string;
};

const parsePasswords = (passwordsData: string[]): PasswordDetails[] => {
  return passwordsData.map((record) => {
    const recordDetails = record.split(" ");
    const numbersRange = recordDetails[0]
      .split("-")
      .map((num) => Number.parseInt(num));

    return {
      policyMinimum: numbersRange[0],
      policyMaximum: numbersRange[1],
      requiredLetter: recordDetails[1].replace(":", ""),
      password: recordDetails[2],
    };
  });
};

const getPasswordsData = async () => {
  const passwordsFile = await readFileAsStrings("src/day2/input/day2.txt");
  return parsePasswords(passwordsFile);
};

/**
 * Fetch all indices where the policy letter appears in the password
 * @param password current password to inspect
 * @param policyLetter the policy letter we search for
 */
const getLetterLocationsInPassword = (
  password: string,
  policyLetter: string
) => {
  const regex = new RegExp(policyLetter, "gi");
  const occouranceIndices = _searchForOccouranceIndices(password, regex, []);
  return occouranceIndices;
};

/**
 * Recursivley searches within a password for the given regex pattern. 
 * accomulates all results and returns an array of all indices, 
 * where the password matches the regex pattern
 * @param password - The input password
 * @param regex - The regex to use for searching within the pasword. the regex should use a /g flag.
 * @param results - accomulated results of all match indices within the password
 */
const _searchForOccouranceIndices = (
  password: string,
  regex: RegExp,
  results: number[]
): number[] => {
  const match = regex.exec(password);

  // In case the regex matches a result - we should add it to the previous results
  // and continue searching for the next match in the password, by recursivley calling this function
  // otherwise we reached the base case, and we can return all results.
  const currResults = match
    ? _searchForOccouranceIndices(password, regex, [...results, match.index])
    : results;

  return currResults;
};

export const day2part1 = async () => {
  const passwordsData = await getPasswordsData();

  const validPasswords = passwordsData.filter((passData) => {
    const policyLetterLocations = getLetterLocationsInPassword(
      passData.password,
      passData.requiredLetter
    );

    // Check the amount of matching letters, and see if its within
    // the acceptable policy range
    return (
      policyLetterLocations.length >= passData.policyMinimum &&
      policyLetterLocations.length <= passData.policyMaximum
    );
  });

  console.log(`number of valid passwords is: ${validPasswords.length}`);
};

export const day2part2 = async () => {
  const passwordsData = await getPasswordsData();

  const validPasswords = passwordsData.filter((passData) => {
    const policyLetterLocations = getLetterLocationsInPassword(
      passData.password,
      passData.requiredLetter
    );

    const locationsMatching = policyLetterLocations.filter((letterLocation) => {
      // Check how many indices match the provided policy locations
      // The policy is unaware of index zero, so we need to bump our index up :(
      const adjustedLocation = letterLocation + 1;

      return (
        adjustedLocation === passData.policyMinimum ||
        adjustedLocation === passData.policyMaximum
      );
    });

    // the policy dictates that only one index can match the provided
    // policy letter locations in order for a password to be valid
    return locationsMatching.length === 1;
  });

  console.log(`number of valid passwords is: ${validPasswords.length}`);
};
