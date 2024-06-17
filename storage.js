function createNewRide() {
    const rideID = Date.now()
    const rideRecord = {
        data: [],	
        startTime: rideID,
        stopTime: null,
    }
    saveRideRecord(rideID, rideRecord)
    return rideID
}  

function getRideRecord(rideId){
    return JSON.parse(localStorage.getItem(rideId))

}    

function saveRideRecord(rideId, rideRecord){
    localStorage.setItem(rideId, JSON.stringify(rideRecord))
}

function addPosition(rideId, position){
    const rideRecord = getRideRecord(rideId)
    if (!rideRecord) {
        console.error(`Ride with ID ${rideId} not found.`);
        return;
    }
    const newData = {
        accuracy: position.coords.accuracy,
        altitude: position.coords.altitude,
        altitudeAccuracy: position.coords.altitudeAccuracy,
        heading: position.coords.heading,
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        speed: position.coords.speed,
    }
    rideRecord.data.push(newData)
    saveRideRecord(rideId, rideRecord)
}

function updateStopTime(rideID){
    const rideRecord = getRideRecord(rideID)
    if (!rideRecord) {
        console.error(`Ride with ID ${rideID} not found.`);
        return;
    }
    rideRecord.stopTime = Date.now()
    saveRideRecord(rideID, rideRecord)
}

function getAllRides(){
    return Object.entries(localStorage) 
}