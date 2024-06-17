
const speedElement = document.querySelector("#speed")
const startBtn = document.querySelector("#start")
const stopBtn = document.querySelector("#stop")

let wathID = null 
let rideID = null
startBtn.addEventListener("click",()=>{
    if (wathID){
        return
    }
    function handleSuccess(position) {
        addPosition(rideID, position)
        console.log(position)
        const speed = position.coords.speed
        speedElement.textContent = speed ? (speed * 3.6).toFixed(2) : "0";
    
    }
    function handleError(error) {
        console.log(error)
    }
    const options = {
        enableHighAccuracy: true
    }
    rideID = createNewRide()    
    wathID = navigator.geolocation.watchPosition(
        handleSuccess, handleError, options
    )
    

    startBtn.classList.add("d-none")
    stopBtn.classList.remove("d-none")
})

stopBtn.addEventListener("click",()=>{
    if (!wathID){
        return
    }
    navigator.geolocation.clearWatch(wathID)
    wathID = null
    updateStopTime(rideID)
    startBtn.classList.remove("d-none")
    stopBtn.classList.add("d-none")
})