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

export { getAverageTeamPace };