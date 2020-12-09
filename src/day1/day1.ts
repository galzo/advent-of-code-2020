import { readFileAsNumbers } from "../common/FileReader";


const findMatchingEntries = (entriesInput: number[], wantedSum: number) => {
    // Transform our array into a more search-efficient datastructure
    const entries = new Set(entriesInput);

    // For every entry, we run a lookup to see if it has a matching
    // entry that sums together to the wantedSum. if such entry exists
    // then we found our wanted pair!
    for (const entry of entries) {
        const wantedNumber = wantedSum - entry;
        
        if (entries.has(wantedNumber)) {
            return [entry, wantedNumber];
        }
    }

    throw new Error(`Could not find a pair that sums up to ${wantedSum}`);
};

export const day1Part1 = async () => {
    const input = await readFileAsNumbers("src/day1/input/day1part1.txt");
    const [firstEntry, secondEntry] = findMatchingEntries(input, 2020);
    console.log(`matching numbers are: ${firstEntry}, ${secondEntry}. multiplied value is: ${firstEntry * secondEntry}`);
};
