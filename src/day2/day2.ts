import { readFileAsStrings } from "../common/FileReader";

type PasswordDetails = {
  minReqLetterCount: number;
  maxReqLetterCount: number;
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
      minReqLetterCount: numbersRange[0],
      maxReqLetterCount: numbersRange[1],
      requiredLetter: recordDetails[1].replace(":", ""),
      password: recordDetails[2],
    };
  });
};

const isPasswordValid = ({
  minReqLetterCount,
  maxReqLetterCount,
  requiredLetter,
  password,
}: PasswordDetails) => {
  const targetLetterCount =
    password.match(new RegExp(`${requiredLetter}`, "g"))?.length ?? 0;
  return (
    targetLetterCount >= minReqLetterCount &&
    targetLetterCount <= maxReqLetterCount
  );
};

export const day2part1 = async () => {
  const passwordsFile = await readFileAsStrings("src/day2/input/day2part1.txt");
  const passwordsData = parsePasswords(passwordsFile);
  const validPasswords = passwordsData.filter(isPasswordValid);
  console.log(`number of valid passwords is: ${validPasswords.length}`);
};
