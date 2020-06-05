function getV02max(data) {
    const distance = getDistance(data); //in miles
    const time = getTime(data); //in seconds
    // eslint-disable-next-line
    const perMile = getPerMile(distance, time); //in miles per second
    const pMax = getPercentMax(time); //works
    const velocity = getVelocity(distance, time);
    const v02 = getV02(velocity);
    return v02 / pMax;
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
    if(data.units === 'Kilometers'){
        return convertKToM(data.distance)
    } else if(data.units === 'Meters'){
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
    let time = 0;
    if(data.hours != null){
        console.log('hours was logged');
        time += (data.hours * 3600);
    }
    if(data.minutes != null){
        time += (data.minutes * 60);
    }
    if(data.seconds != null){
        console.log("seconds: " + data.seconds);
        console.log(`time: ${time + (data.seconds * 1)}`)
        time += (data.seconds * 1);
    }
    console.log(`toReturn ${time}`)
    return time;
}

function getPerMile(distance, time){
    const perMile = (time / distance);
    return perMile;
}

function getPercentMax(time){
    const e = Math.E;
    let time2 = secondsToMinutes(time);
    const pMax = .8 + (0.1894393 * (Math.pow(e, (-0.012778 * time2)))) + (.2989558 * (Math.pow(e, (-0.1932605 * time2))));
    return pMax;
}

function getPaceString(seconds){
    // eslint-disable-next-line
    const initialMinutes = seconds / 60;
    const minutes = Math.trunc(seconds / 60);
    const minutesAnswer = minutes.toString();
    const remainingSeconds = Math.trunc(seconds - (60 * minutes));
    const remainingSecondsAnswer = remainingSeconds.toString();
    if((seconds - (60 * minutes)) === 0){
        return minutesAnswer + ":00"
    } else if(remainingSeconds < 10 && remainingSeconds !== 0){
        return minutesAnswer + ":0" + remainingSecondsAnswer;
    } else {
        return minutesAnswer + ":" + remainingSecondsAnswer;
    }
}

function secondsToMinutes(seconds){
    return seconds/60;
}

function milesToMeters(distance){
    return distance * 1609;
}

function getVelocity(distance, time){
    console.log(distance + "d");
    let d = milesToMeters(distance);
   let t = secondsToMinutes(time);
   console.log(d + "d");
    return d / t;
}

function getV02(v){
    const toReturn = -4.6 + (.182258 * (v)) + (.000104 * Math.pow(v, 2));
    return toReturn;
}
export { getWorkoutPace, getV02max };
