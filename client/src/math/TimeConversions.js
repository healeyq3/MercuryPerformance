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

function totalMinutes(hours, minutes, seconds){
    let toRet = 0.0
    toRet +=minutes
    toRet += seconds/60
    toRet += hours*60
    return toRet
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

export { stringToNumber, totalTheTime, distanceToTime, totalMinutes };