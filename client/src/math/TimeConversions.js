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

function distanceToTime(distance, unit, avPace){
    let d = distance
    if(unit==="Kilometers"){
        d = convertKToM(d);
    }
    else if(unit==="Meters"){
        d = convertMeToMi(d);
    }
    d = d * (avPace)
    return null
}

export { stringToNumber, totalTheTime, distanceToTime };