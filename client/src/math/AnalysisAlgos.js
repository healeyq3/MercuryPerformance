import { stringToNumber, secondsToMinutes, distanceToTime } from './TimeConversions';
import { median, sum } from 'mathjs';

function getAverageTeamPace(runners){
    let totalTime = 0;
    let numberOfTimes = 0;
    for (const runner in runners){
        if(runners[runner].hasOwnProperty('wPace')){
            totalTime += stringToNumber(runners[runner].wPace);
            numberOfTimes +=1;
        }
    }
    let average = totalTime/numberOfTimes;
    return secondsToMinutes(average);
}

function getPredictedTime(runner, rep){
    let pace = 0
    let t = 0
    if(runner.hasOwnProperty('wPace')){
        pace = stringToNumber(runner.wPace)
    }
    pace = pace/ (rep.percent/100)
    if(rep.hasOwnProperty('distance')){
        t = distanceToTime(rep.distance, rep.distanceUnit, pace)
    }
    else{
        t = rep.duration
    }
    return t
}

function getMedianTeamPace(runners){
    console.log(runners)
    let wPaces = [];
    for(const runner in runners){
        if(runners[runner].hasOwnProperty('wPace')){
            wPaces.push(stringToNumber(runners[runner].wPace))
        }
    }
    return secondsToMinutes(median(wPaces));

}

function getMedianTeamV02(runners){
    console.log(runners);
    let v02s = []
    for(const runner in runners){
        if(runners[runner].hasOwnProperty('v02')){
            v02s.push(runners[runner].v02)
        }
    }

    return median(v02s);
}

function getPredictedTimes(runners, percent, rep){
    let max = 0;
    let min= 100000;
    let pace = 0;
    for(const runner in runners){
        console.log(runners[runner])
        if(runners[runner].hasOwnProperty('wPace')){
            pace = stringToNumber(runners[runner].wPace);
            console.log("AAAA")
            if(max<=pace){
                max = stringToNumber(runners[runner].wPace);
            }
            if(min>pace){
                min = stringToNumber(runners[runner].wPace)
            }
        }
    }
    max = max/(percent/100)
    min  = min/(percent/100)
    if(rep.hasOwnProperty('distance')){
    max = distanceToTime(rep.distance, rep.distanceUnit, max)
    min = distanceToTime(rep.distance, rep.distanceUnit, min)
    }
    else{
        max = rep.duration
        min = rep.duration
    }
return max + "-" + min
}

function repActualEffortD(distance /* in miles */, timePerformedIn /* in seconds */, workoutPace){ //this method is for distance reps
    return ((distance * workoutPace * 100)/(timePerformedIn))
}

function residualStandardDeviation(v1) { // Takes in a vector of %E between p and (p^) to determine the residual Standard Deviation
    let v = [];
    v1.map(x => {
        v.push(Math.pow(Math.abs(x), 2))
    })
    let s = sum(v)
    let d = s / v1.length;
    return Math.sqrt(d);
}

function determineWorkoutTrend(v1){ // REMEMBER NEGATIVE MEANS OVERSHOT... Takes in a vector of $E between p and (p^) to determine if the runner overtrained or undertrained during that workout
    if(v1.length === 1 && v1[0] <= -1){
        return 'over';
    } else if(v1.length === 1 && v1[0] >= 1){
        return 'under';
    } else if(v1[0] <= -15){
        return 'over';
    }
}

export { repActualEffortD, residualStandardDeviation, getAverageTeamPace, getPredictedTimes, getPredictedTime, getMedianTeamPace, getMedianTeamV02};