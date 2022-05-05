const ArilyQuery = require("./index");

let aq = new ArilyQuery();

/*
async function test() {
    let user = await aq.stat({
        user: "candy",
        //mode: "osu",
        server: "bancho"
    });
    console.log(user);
}

test();
*/
/*
async function test() {
    let recent = await aq.recent({
        user: "exmisser",
        mode: "mania",
        server: "sb"
    });
    console.log(recent);
}

test();
*/
/*
async function test() {
    let best = await aq.best({
        user: "exmisser",
        mode: "mania",
        server: "sb"
    }, "min", 15);
    console.log(best);
}

test();
*/
/*
async function test() {
    try {
        let best = await aq.best({
            user: "candy",
            mode: "osu",
            find: {
                date: {
                    from: { year: 2020, month: 4, day: 3 },
                    to: { year: 2022, month: 4, day: 3 },
                }
            }
        });
        console.log(best);
    }
    catch (ex) {
        console.error(ex)
    }
}

test();
*/
/*
async function test() {
    try {
        let best = await aq.beststat({
            user: "whitecat",
            mode: "osu",
        });
        console.log(best);
    }
    catch (ex) {
        console.error(ex)
    }
}

test();
*/
/*
async function test() {
    let score = await aq.score({
        id: "3539986417",
        mode: "osu",
    });
    console.log(score);
}

test();
*/

async function test() {
    let beststat = await aq.stat({
        user: "tai",
        mode: "osu"
    });
    console.log(beststat);
}

test();