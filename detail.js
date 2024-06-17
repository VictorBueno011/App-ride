const params = new URLSearchParams(window.location.search)
const rideId = params.get('id')
const ride = getRideRecord(rideId)
const btnDelete = document.querySelector("#deletar")

document.addEventListener('DOMContentLoaded', async () => {
    const firtPosition = ride.data[0];
    const FirstlocationData = await getLocationData(firtPosition.latitude, firtPosition.longitude)

    const dataElement = document.createElement('div');
    dataElement.className='flex-fill text-secundary d-flex flex-column p-2 rounded-4 text-light'; 
    
    const cityDiv = document.createElement('div');
    cityDiv.innerText = `${FirstlocationData.city} - ${FirstlocationData.countryCode}`
    cityDiv.className = 'text-primary mb-2'
    const maxSpeedDiv = document.createElement('div');
    maxSpeedDiv.innerText = `Max Speed: ${getMaxSpeed(ride.data)} Km/h`
    maxSpeedDiv.className = 'text-warning'

    const distanceDiv = document.createElement('div');
    distanceDiv.innerText = `Distance: ${getDistance(ride.data).toFixed(2)} km`

    const durationDiv = document.createElement('div');
    durationDiv.innerText = `Duration: ${getDuration(ride)} min`

    const startDateDiv = document.createElement('div');
    startDateDiv.innerText = `${getStartDate(ride)}`
    startDateDiv.className = 'text-secondary'

    dataElement.appendChild(cityDiv);
    dataElement.appendChild(maxSpeedDiv);
    dataElement.appendChild(distanceDiv);
    dataElement.appendChild(durationDiv);
    dataElement.appendChild(startDateDiv);

    document.querySelector("#data").appendChild(dataElement);
    const map = L.map("mapDetail",{attributionControl:false,})
    map.setView([firtPosition.latitude, firtPosition.longitude],15)
    L.tileLayer('https://tile.openstreetmap.de/{z}/{x}/{y}.png', {
        maxZoom: 20,
        minZoom: 10,
    }).addTo(map);

    // quero que o l.marker seja criado no start e no end
    L.marker([ride.data[0].latitude, ride.data[0].longitude]).addTo(map)
    L.polyline(ride.data.map((position) => [position.latitude, position.longitude]), {color: 'red'}).addTo(map)
    map.fitBounds(L.polyline(ride.data.map((position) => [position.latitude, position.longitude])).getBounds())
})

btnDelete.addEventListener("click",()=>{
    const confirmDelet = confirm("Tem certeza que deseja excluir?");
    if (confirmDelet){
        localStorage.removeItem(rideId)
        window.location.href = "index.html"
    }else{
        return
    }
})