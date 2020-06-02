function v02max(data) {
    const distance = getDistance(data);
    const time = getTime(data);
    const perMile = getPerMile(distance, time);
}

function getWorkoutPace(data){
    const distance = getDistance(data);
    const time = getTime(data);
    console.log(`time being passed: ${time}`)
    const perMile = getPerMile(distance, time);
    console.log('per mile = ' + perMile);
    const pMax = getPercentMax(time);
    const workoutPace = perMile * pMax;
    console.log('workoutPace = ' + workoutPace);
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
    // console.log(`switch from km to m: ${distance / 1.609}`);
    return (distance / 1.609);
}

function convertMeToMi(distance) {
    return (distance / 1609);
}

function getTime(data){
    let time = 0;
    if(data.hours != null){
        time += (data.hours * 3600);
    }
    if(data.minutes != null){
        time += (data.minutes * 60);
    }
    if(data.seconds != null){
        time += data.seconds
    }
    console.log('time = ' + time);
    return time;
}

function getPerMile(distance, time){
    const perMile = (time / distance);
    return perMile;
}

function getPercentMax(time){
    const e = getE();
    let time2 = secondsToMinutes(time);
    console.log(Math.pow(e, -5));
    console.log((0.1894393 * (Math.pow(e, (-0.012778 * time)))))
    const pMax = .8 + (0.1894393 * (Math.pow(e, (-0.012778 * time2)))) + (.2989558 * (Math.pow(e, (-0.1932605 * time2))));
    console.log('percent max = '+ pMax);
    return pMax;
}

function getE(){
    console.log("e = " + Math.E);
    return Math.E;
}

function getPaceString(seconds){
    const initialMinutes = seconds / 60;
    const minutes = Math.trunc(seconds / 60);
    const minutesAnswer = minutes.toString();
    const remainingSeconds = Math.trunc(seconds - (60 * minutes));
    const remainingSecondsAnswer = remainingSeconds.toString();
    if((seconds - (60 * minutes)) == 0){
        return minutesAnswer + ":00"
    } else if(remainingSeconds < 10 && remainingSeconds != 0){
        return minutesAnswer + ":0" + remainingSecondsAnswer;
    } else {
        return minutesAnswer + ":" + remainingSecondsAnswer;
    }
}

function secondsToMinutes(seconds){
    return seconds/60;
}
export default getWorkoutPace;