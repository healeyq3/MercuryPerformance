import { convertKToM, convertMeToMi} from './V02max'

function stringToNumber(prevString) {
    const toSubString = prevString.indexOf(':');
    const minutes = Number(prevString.substring(0, toSubString));
    const seconds = Number(prevString.substring(toSubString + 1));
    return(totalTheTime(minutes, seconds));
}

function totalTheTime(minutes, seconds) { // returns number of seconds per mile
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
        toReturn += Number(timeData.seconds)
    }
    return toReturn;
}

function distanceToTime(distance, unit, avPace /* in seconds */){ // returns how much time a distance rep should take, the avPace should have already taken into account the effort for the rep
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
        if(hour === '00'){
            time = min + ':' + seconds
        } else{
            time = hour + ":" + min + ":" +seconds
        }
        
    }
    else{
        time = ''
    }
    return time;
}

function decomposedTimeGenerator(h, m, s){
    let time;
    let hour;
    let min;
    let seconds;
    console.log(s);
    if(h === 0){
        hour = "00"
    }
    else {
        hour = h
    }
    if(m === 0){
        min = "00"
    }
    else {
        min = m
    }
    if(s ===0){
        seconds = "00"
    } 
    else {
        seconds = s
    }
    if(hour === '00'){
        time = min + ':' + seconds
    }
    else {
        time = hour + ':' + min + ":" + seconds;
    }
    return time;
}

function secondsToAnswer(s1){
    let s = s1;
    let hours = 0;
    let minutes = 0;
    let seconds = s;
    if(s >= 3600){
        hours = s / 3600
        hours = Math.trunc(hours)
        s = s - (hours * 3600)
    } if(s >= 60){
        minutes = s / 60
        minutes = Math.trunc(minutes);
        s = s - (minutes * 60)
    }
    seconds = Math.trunc(s);
    //console.log(`Hours: ${hours} Minutes: ${minutes} Seconds ${seconds}`)
    let secondsAnswer = '';
    if(seconds < 10){
        secondsAnswer = "0" + seconds;
    } else {
        secondsAnswer = '' + seconds;
    }
    if (hours < 1){
        if(minutes < 1){
            return secondsAnswer + " seconds"
        } else {
            return minutes + ":" + secondsAnswer
        }
    } else{
        if(minutes < 1){
            return hours + ":00: " + secondsAnswer
        } else {
            return hours + ':' + minutes + ":" + secondsAnswer
        }
    }
    
}

export { decomposedTimeGenerator, secondsToAnswer, totalSeconds, stringToNumber, totalTheTime, distanceToTime, totalMinutes, secondsToMinutes, timeGenerator };