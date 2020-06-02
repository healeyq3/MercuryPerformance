function v02max(data) {
    const distance = getDistance(data);
    const time = getTime(data);
    const perMile = getPerMile(distance, time);
}

function getWorkoutPace(data){
    const distance = getDistance(data);
    const time = getTime(data);
    const perMile = getPerMile(distance, time);
    const pMax = getPercentMax(time);
    const workoutPace = perMile * pMax;
    const toReturn = getPaceString(workoutPace);
    return toReturn;
}

function getDistance(data){
    if(data.units == 'kilometers'){
        return convertKToM(data.distance)
    } else if(data.units == 'meters'){
        return convertMeToMi(data.distance)
    } else {
        return data.distance
    }
}

function convertKToM(distance){
    return (distance / 1.609);
}

function convertMeToMi(distance) {
    return (distance / 1609);
}

function getTime(data){
    const time = 0;
    if(data.hours != null){
        time += (data.hours * 3600);
    }
    if(data.minutes != null){
        time += (data.minutes * 60);
    }
    if(data.seconds != null){
        time += data.seconds
    }
    return time;
}

function getPerMile(distance, time){
    const perMile = (time / distance);
    return perMile;
}

function getPercentMax(time){
    const e = getE();
    const pMax = .8 + .1894393 * (Math.pow(e, (-.012778*time))) + .2989558 * (Math.pow(e, (-.1932605 * time)));
    return pMax;
}

function getE(){
    return Math.E;
}

function getPaceString(seconds){
    const initialMinutes = seconds / 60;
    const minutes = Math.trunc(seconds / 60);
    const minutesAnswer = minutes.toString();
    const remainingSeconds = Math.trunc(seconds - (60 * minutes));
    const remainingSecondsAnswer = remainingSeconds.toString();
    if((seconds - (60 * initialMinutes)) == 0){
        return minutesAnswer + ":00"
    } else if(remainingSeconds < 10 && remainingSeconds != 0){
        return minutesAnswer + ":0" + remainingSecondsAnswer;
    } else {
        return minutesAnswer + ":" + remainingSecondsAnswer;
    }
}