import { day1Part1, day1Part2 } from "./day1/day1";
import { day2part1 } from "./day2/day2";

async function runExcersie(exerciseFn: () => Promise<void>) {
    try {
        await exerciseFn();       
    } catch(e) {
        console.log(e);
    }
}

runExcersie(day2part1).then(() => {
    console.log("finished run");
})