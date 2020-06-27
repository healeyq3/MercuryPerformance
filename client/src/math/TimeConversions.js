import { convertKToM, convertMeToMi} from './V02max'
function stringToNumber(prevString) {
    const toSubString = prevString.indexOf(':');
    const minutes = parseFloat(prevString.substring(0, toSubString));
    const seconds = parseFloat(prevString.substring(toSubString + 1));
    return(totalTheTime(minutes, seconds));
}

function totalTheTime(minutes, seconds) {
    let toReturn = 0.0;
    toReturn += minutes * 60;
    toReturn += seconds;
    return toReturn;
}

function secondsToMinutes(seconds){
    return (seconds / 60);
}

function totalMinutes(hours, minutes, seconds){
    let toRet = Number(minutes)
    toRet += Number(seconds)/60
    toRet += Number(hours)*60
    return toRet
}

function totalSeconds(timeData){
    let toReturn = 0;
    if(timeData.hours !== undefined){
        toReturn += (3600 * timeData.hours)
    }
    if(timeData.minutes !== undefined){
        toReturn += (60 * timeData.minutes)
    }
    if(timeData.seconds !== undefined){
        toReturn += timeData.seconds
    }
    return toReturn;
}

function distanceToTime(distance, unit, avPace){
    let d = 0.0
    d = distance
    if(unit==="Kilometers"){
        d = convertKToM(d);
    }
    else if(unit==="Meters"){
        d = convertMeToMi(d);
    }
    d = d * (avPace)
    return d
}

function timeGenerator(timeData){
    let hour;
    let min;
    let seconds;
    let time;
    if(timeData!==undefined){
         hour = timeData.hours;
         min = timeData.minutes;
         seconds = timeData.seconds;
        if(hour===0){
                hour = '00'
            }
        if(min===0){
                min='00'
            }
        if(seconds===0){
                seconds='00'
            }
        time = hour + ":" + min + ":" +seconds
    }
    else{
        time = ''
    }
    return time;
}

export { totalSeconds, stringToNumber, totalTheTime, distanceToTime, totalMinutes, secondsToMinutes, timeGenerator };