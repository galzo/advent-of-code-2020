import { day1Part1 } from "./day1/day1";

async function runExcersie(exerciseFn: () => Promise<void>) {
    try {
        await exerciseFn();       
    } catch(e) {
        console.log(e);
    }
}

runExcersie(day1Part1).then(() => {
    console.log("finished run");
})