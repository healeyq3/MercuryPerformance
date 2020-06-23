import { stringToNumber, secondsToMinutes } from './TimeConversions';

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
function getPredictedTimes(runners){
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

export { getAverageTeamPace, getPredictedTimes };