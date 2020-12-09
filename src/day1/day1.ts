import { readFileAsNumbers } from "../common/FileReader";

const findMatchingPair = (entriesInput: number[], wantedSum: number) => {
    // Transform our array into a more search-efficient datastructure
    const entries = new Set(entriesInput);

    // For every entry, we run a lookup to see if it has a matching
    // entry that sums together to the wantedSum. if such entry exists
    // then we found our pair!
    for (const entry of entries) {
        const wantedNumber = wantedSum - entry;
        
        if (entries.has(wantedNumber)) {
            return [entry, wantedNumber];
        }
    }

    return null;
};

const findMatchingTriplet = (entriesInput: number[], wantedSum: number) => {
    for (const [index, entry] of entriesInput.entries()) {
        const entryCandidates = entriesInput.slice(index + 1, entriesInput.length);
        const wantedPairSum = wantedSum - entry;
        
        const matchingPair = findMatchingPair(entryCandidates, wantedPairSum);
        if (matchingPair) return [entry, ...matchingPair];
    }

    return null;
};

export const day1Part1 = async () => {
    const input = await readFileAsNumbers("src/day1/input/day1.txt");
    
    const res = findMatchingPair(input, 2020);
    if (!res) throw new Error(`Could not find a pair that sums up to ${2020}`);
    
    const [firstEntry, secondEntry] = res;
    console.log(`matching numbers are: ${firstEntry}, ${secondEntry}. 
        multiplied value is: ${firstEntry * secondEntry}`);
};

export const day1Part2 = async () => {
    const input = await readFileAsNumbers("src/day1/input/day1.txt");
    
    const res = findMatchingTriplet(input, 2020);
    if (!res) throw new Error(`Could not find a triplet that sums up to ${2020}`);

    const [firstEntry, secondEntry, thirdEntry] = res;
    console.log(`matching numbers are: ${firstEntry}, ${secondEntry} and ${thirdEntry}. 
        multiplied value is: ${firstEntry * secondEntry * thirdEntry}`);
};
