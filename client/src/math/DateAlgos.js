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

import { isEmptyObject } from "jquery";


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
    const toReturn = new Date(clean);
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

function sevenDaySnapshot(workoutTimeObject, eventTimeObject) { // returns an object with seven entries starting with the current date
    const comparisonDate = fixDateSelector(getCleanDate(new Date())); // this is today at 00:00:00
    const next = 86400000;
    const toReturn = {
        d1 : {
            date : getCleanDate(comparisonDate),
            events : []
        },
        d2 : {
            date: getCleanDate(new Date(comparisonDate.getTime() + (1 * next))),
            events: []
        },
        d3 : {
            date: getCleanDate(new Date(comparisonDate.getTime() + (2 * next))),
            events : []
        },
        d4 : {
            date: getCleanDate(new Date(comparisonDate.getTime() + (3 * next))),
            events : []
        }, 
        d5: {
            date: getCleanDate(new Date(comparisonDate.getTime() + (4 * next))),
            events : []
        }, 
        d6 : {
            date: getCleanDate(new Date(comparisonDate.getTime() + (5 * next))),
            events : []
        }, 
        d7: {
            date: getCleanDate(new Date(comparisonDate.getTime() + (6 * next))),
            events : []
        }
    }
    if(!isEmptyObject(eventTimeObject)){
        for(const event in eventTimeObject){
            const comparisonDate = fixDateSelector(getCleanDate(new Date())).getTime();
            const date = fixDateSelector(eventTimeObject[event].date).getTime();
            const msDay = 86400000;
            const toAdd = {
                type: "event",
                name: eventTimeObject[event].name 
            }
            if(comparisonDate <= date && date < (comparisonDate + (1 * msDay))){
                toReturn.d1.events.push(toAdd)
            } else if(comparisonDate <= date && date < (comparisonDate + (2 * msDay))){
                toReturn.d2.events.push(toAdd)
            } else if(comparisonDate <= date && date < (comparisonDate + (3 * msDay))){
                toReturn.d3.events.push(toAdd)
            } else if(comparisonDate <= date && date < (comparisonDate + (4 * msDay))){
                toReturn.d4.events.push(toAdd)
            } else if(comparisonDate <= date && date < (comparisonDate + (5 * msDay))){
                toReturn.d5.events.push(toAdd)
            } else if(comparisonDate <= date && date < (comparisonDate + (6 * msDay))){
                toReturn.d6.events.push(toAdd)
            } else if(comparisonDate <= date && date < (comparisonDate + (7 * msDay))){
                toReturn.d7.events.push(toAdd)
            }
        }
    }
    
    if(!isEmptyObject(workoutTimeObject)){
        for(const workout in workoutTimeObject){
            const comparisonDate = fixDateSelector(getCleanDate(new Date())).getTime();
            const date = fixDateSelector(workoutTimeObject[workout].date).getTime();
            const msDay = 86400000;
            const toAdd = {
                type: "workout",
                name: workoutTimeObject[workout].name 
            }
            if(comparisonDate <= date && date < (comparisonDate + (1 * msDay))){
                toReturn.d1.events.push(toAdd)
            } else if(comparisonDate <= date && date < (comparisonDate + (2 * msDay))){
                toReturn.d2.events.push(toAdd)
            } else if(comparisonDate <= date && date < (comparisonDate + (3 * msDay))){
                toReturn.d3.events.push(toAdd)
            } else if(comparisonDate <= date && date < (comparisonDate + (4 * msDay))){
                toReturn.d4.events.push(toAdd)
            } else if(comparisonDate <= date && date < (comparisonDate + (5 * msDay))){
                toReturn.d5.events.push(toAdd)
            } else if(comparisonDate <= date && date < (comparisonDate + (6 * msDay))){
                toReturn.d6.events.push(toAdd)
            } else if(comparisonDate <= date && date < (comparisonDate + (7 * msDay))){
                toReturn.d7.events.push(toAdd)
            }
        }
    }
    

    return toReturn;
}

function dayDate(date){ // takes in a clean date
    const d = fixDateSelector(date);
    let p1 = d.getDay();
    if(p1 === 0){
        p1 = "Sunday"
    } else if(p1 === 1){
        p1 = "Monday"
    } else if(p1 === 2){
        p1 = "Tuesday"
    } else if(p1 === 3){
        p1 = "Wednesday"
    } else if(p1 === 4){
        p1 = "Thursday"
    } else if(p1 === 5){
        p1 = "Friday"
    } else if(p1 === 6){
        p1 = "Saturday"
    }
    const p2 = d.getDate();
    const toReturn = p1 + " " + p2;
    return toReturn;
}

function getDay(date){
    const d = fixDateSelector(date);
    let p1 = d.getDay();
    if(p1 === 0){
        p1 = "Sunday"
    } else if(p1 === 1){
        p1 = "Monday"
    } else if(p1 === 2){
        p1 = "Tuesday"
    } else if(p1 === 3){
        p1 = "Wednesday"
    } else if(p1 === 4){
        p1 = "Thursday"
    } else if(p1 === 5){
        p1 = "Friday"
    } else if(p1 === 6){
        p1 = "Saturday"
    }
    return p1;
}

function getDay2(date){ // assumes it is taking in milliseconds
    const d = new Date(Number(date));
    let p1 = d.getDay();
    if(p1 === 0){
        p1 = "Sunday"
    } else if(p1 === 1){
        p1 = "Monday"
    } else if(p1 === 2){
        p1 = "Tuesday"
    } else if(p1 === 3){
        p1 = "Wednesday"
    } else if(p1 === 4){
        p1 = "Thursday"
    } else if(p1 === 5){
        p1 = "Friday"
    } else if(p1 === 6){
        p1 = "Saturday"
    }
    return p1;
}

function getDate(date){
    const d = fixDateSelector(date);
    const p = d.getDate();
    return p;
}

function getWeeklyMileage(mileageObject, dates){
    const msDay = 86400000;
    let toReturn = {};
    let toReturnDates = [];
    let rn = new Date().getTime()
    let firstSunday = getClosestSunday(dates[0]);
    for(let i = firstSunday; i <  rn; i += (7 * msDay)){
        toReturn[i] = {
            mileage : 0
        }
        toReturnDates.push(i)
    }
    toReturn[rn] = {
        mileage : 0
    }
    toReturnDates.push(rn);
    for(const date in dates){
        let day = 0;
        if(dates[date] > toReturnDates[toReturnDates.length - 2]){
            day = toReturnDates[toReturnDates.length - 1]
        } else {
            day = getClosestSunday(Number(dates[date]))
        }
        toReturn[day].mileage += (Math.round(Number(mileageObject[getCleanDate(new Date(dates[date]))].medDist) * 100) / 100)
    }
     return toReturn;
}

function getClosestSunday(day){
    const msDay = 86400000;
    const dayOfWeek = getDay2(day);
    if(dayOfWeek === 'Sunday'){
        return day
    } else if(dayOfWeek === 'Monday'){
        return (day + (msDay * 6))
    } else if(dayOfWeek === 'Tuesday'){
        return (day + (msDay * 5))
    } 
    else if(dayOfWeek === 'Wednesday'){
        return (day + (msDay * 4))
    } 
    else if(dayOfWeek === 'Thursday'){
        return (day + (msDay * 3))
    }
    else if(dayOfWeek === 'Friday'){
        return (day + (msDay * 2))
    }   
    else if(dayOfWeek === 'Saturday'){
        return (day + (msDay * 1))
    } 
}

function inBetween(d1, d2){
    const msDay = 86400000;
    const first = fixDateSelector(d1).getTime();
    const last = fixDateSelector(d2).getTime();
    let answer = [];
    for(let i = first; i <= last; i += msDay){
        answer.push(getCleanDate(new Date(i)))
    }
    return answer;
}

export { inBetween, getWeeklyMileage, getClosestSunday, getDay, getDate, dayDate, getCleanDate, fixDateSelector, getMostRecentDate, findClosestDate, sevenDaySnapshot }
