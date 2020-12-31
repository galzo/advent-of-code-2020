import { day1Part1, day1Part2 } from "./day1/day1";
import { day2part1, day2part2 } from "./day2/day2";
import { day3part1, day3part2 } from "./day3/day3";
import { day4part1 } from "./day4/day4";

async function runExcersie(exerciseFn: () => Promise<void>) {
    try {
        await exerciseFn();       
    } catch(e) {
        console.log(e);
    }
}

runExcersie(day4part1).then(() => {
    console.log("finished run");
})