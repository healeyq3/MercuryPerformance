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
            pace = runners[runner].wPace.stringToNumber;
            if(max<pace){
                max = runners[runner].wPace;
            }
            if(min>pace){
                min = runners[runner].wPace
            }
        }
    }
    return max + "-" + min
}

export { getAverageTeamPace, getPredictedTimes };