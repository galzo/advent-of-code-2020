import { readFileAsStrings } from "../common/FileReader";

type MapData = {
  map: (0 | 1)[][];
  height: number;
  width: number;
};

type Slope = {
  right: number;
  down: number;
};

/**
 * The tobbogan map is represented by "." and "#".
 * "." means an empty land
 * "#" means a tree.
 * converts the strings array into a binary matrix,
 * where "." is represented by 0 and "#" is represented by 1.
 */
const parseMapData = (rawData: string[]): (0 | 1)[][] => {
  return rawData.map((line) => {
    return line.split("").map((coordinate) => (coordinate === "." ? 0 : 1));
  });
};

const resolveMapDimensions = (map: (0 | 1)[][]) => {
  return {
    width: map[0].length,
    height: map.length,
  };
};

const getTobogganMapData = async () => {
  const rawData = await readFileAsStrings("src/day3/input/day3.txt");
  const map = parseMapData(rawData);
  const dimensions = resolveMapDimensions(map);

  return {
    map: map,
    ...dimensions,
  };
};

const calculateTreesOnSlope = (mapData: MapData, slope: Slope) => {
  const { map, height, width } = mapData;
  const { right, down } = slope;

  let totalTrees = 0,
    currentRow = 0,
    currentCol = 0;

  while (currentRow < height) {
    const cordinate = map[currentRow][currentCol];
    totalTrees += cordinate;

    currentRow += down;
    currentCol = (currentCol + right) % width;
  }

  return totalTrees;
};

export const day3part1 = async () => {
  const mapData = await getTobogganMapData();
  const treesOnSlope = calculateTreesOnSlope(mapData, { right: 3, down: 1 });
  console.log(`Trees encountered on slope: ${treesOnSlope}`);
};

export const day3part2 = async () => {
    const mapData = await getTobogganMapData();

    const slopes = [
        {right: 1, down: 1},
        {right: 3, down: 1},
        {right: 5, down: 1},
        {right: 7, down: 1},
        {right: 1, down: 2}
    ];

    const treesOnSlopes = slopes.map(slope => {
        return calculateTreesOnSlope(mapData, slope);
    });

    const multipliedResult = treesOnSlopes.reduce((res, currSlopeTrees) => {
        return res * currSlopeTrees;
    });

    console.log(`Trees multiplication result: ${multipliedResult}`);
};
