import { stringToNumber, secondsToMinutes, distanceToTime } from './TimeConversions';

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

function getPredictedTime(runner, rep){//not done
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

function getPredictedTimes(runners, percent){
    let max = 0;
    let min= 100000;
    let pace = 0;
    for(const runner in runners){
        if(runners[runner].hasOwnProperty('wPace')){
            pace = stringToNumber(runners[runner].wPace);
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
    max = max/60;
    let decM = max -Math.floor(max);
    max = max.toFixed(0)
    decM = decM * 60;
    decM = decM.toFixed(0)
    if(decM<10){
        decM = "0" + decM
    }
    min = min/60;
    let decMi = min -Math.floor(min);
    min = min.toFixed(0)
    decMi = decMi*60;
    decMi = decMi.toFixed(0)
    if(decMi<10){
        decMi = "0" + decMi
    }
return max + ":" + decM + "-" + min + ":" + decMi
}

export { getAverageTeamPace, getPredictedTimes, getPredictedTime};