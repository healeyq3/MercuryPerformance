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

export { stringToNumber };