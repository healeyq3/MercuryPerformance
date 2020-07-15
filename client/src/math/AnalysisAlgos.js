import { stringToNumber, secondsToMinutes, distanceToTime } from './TimeConversions';
import { median } from 'mathjs';

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
    let wPaces = [];
    for(const runner in runners){
        if(runners[runner].hasOwnProperty('wPace')){
            wPaces.push(stringToNumber(runners[runner].wPace))
        }
    }
    return secondsToMinutes(median(wPaces));

}

function getMedianTeamV02(runners){
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

export { getAverageTeamPace, getPredictedTimes, getPredictedTime, getMedianTeamPace, getMedianTeamV02};