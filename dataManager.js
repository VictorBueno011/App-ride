async function getLocationData(latitude, longitude) {
    const url = `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=pt`
    const response = await fetch(url)
    return await response.json()
}

function getMaxSpeed(positions) {
    let maxSpeed = 0;
    positions.forEach(position => {
        if (position.speed == null){
            maxSpeed = 0
        }else if (position.speed > maxSpeed){
            maxSpeed = position.speed
        }
    })
    return (maxSpeed * 3.6).toFixed(2)
}

function getDistance(positions) {
    const earthRadius = 6371;
    let TotalDistance = 0;
    for(let i = 0; i < positions.length - 1; i++){
        const p1 = {
            latitude: positions[i].latitude,
            longitude: positions[i].longitude
        }
        const p2 = {
            latitude: positions[i+1].latitude,
            longitude: positions[i+1].longitude
        }
        const dLat = degreesToRadians(p2.latitude - p1.latitude)
        const dLon = degreesToRadians(p2.longitude - p1.longitude)
        const a = Math.sin(dLat/2) * Math.sin(dLat/2) + Math.cos(degreesToRadians(p1.latitude)) * Math.cos(degreesToRadians(p2.latitude)) * Math.sin(dLon/2) * Math.sin(dLon/2)
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a))
        const distance = earthRadius * c
        TotalDistance += distance
    }
    return TotalDistance
}
function degreesToRadians(degrees) {
    return degrees * Math.PI / 180
}

function getDuration(ride) {
    
    function format(number,digits){
        return String(number.toFixed(0)).padStart(2, '0')
    }
    const interval = (ride.stopTime - ride.startTime) / 1000
    const minutes = Math.trunc(interval / 60)
    const seconds = interval % 60
    return `${format(minutes,2)}:${format(seconds,2)}`
}

function getStartDate(ride) {
    const date = new Date(ride.startTime)
    const startTime = date.toLocaleTimeString(date, {hour: '2-digit', minute: '2-digit'});
    return `${date.toLocaleDateString()} ${startTime}`;
}