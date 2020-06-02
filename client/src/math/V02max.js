v02max = (data) => {
    data.distance = getDistance(data)
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