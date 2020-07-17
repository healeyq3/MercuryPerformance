// ---------------- initial research shown below ----------------
// const d1 = new Date()
// const d2 = new Date("2020,07,15")
// const p1 = d1.getFullYear()
// const p2 = d1.getMonth() + 1
// const p3 = d1.getDate()
// const d3 = new Date(p1 + "," + p2 + "," + p3);
// console.log(d3);
// console.log((d2.getTime() - d3.getTime()) / Math.pow(8.64,7));
// console.log(d2)
// ----------------------------------------------------------------


function getCleanDate(date){ // turns an actual date into a string representation
    const p1 = date.getFullYear();
    const p2 = date.getMonth() + 1;
    const p3 = date.getDate();
    const cleanDate = p1 + "-" + p2 + "-" + p3
    return cleanDate;
}

function fixDateSelector(date){ // turns a clean string that is used to represent a date into an actual date that can be used for calculations
    const regex = /-/gi
    const clean = date.replace(regex, ",");
    console.log(clean);
    const toReturn = new Date(clean);
    console.log(toReturn);
    return toReturn;
}

function getMostRecentDate(historyObject){
    const comparisonDate = new Date();
    const dates = [];
    for(const date in historyObject){
        dates.push(date)
    }
    let mostRecent = fixDateSelector(dates[0]);
    dates.map((date) => {
        let diff1 = comparisonDate - fixDateSelector(date);
        let diff2 = comparisonDate - mostRecent;
        if(diff1 < diff2){
            mostRecent = fixDateSelector(date)
        }
    })
    return getCleanDate(mostRecent);
}

function findClosestDate(historyObject, date){
    const comparisonDate = fixDateSelector(date);
    const dates = [];
    for(const date in historyObject){
        dates.push(date)
    }
    let closest = fixDateSelector(dates[0]);
    dates.map((date) => {
        let diff1 = comparisonDate - fixDateSelector(date);
        let diff2 = comparisonDate - closest;
        if(diff1 < diff2){
            closest = fixDateSelector(date)
        }
    })
    return getCleanDate(closest);
}

export { getCleanDate, fixDateSelector, getMostRecentDate, findClosestDate }
