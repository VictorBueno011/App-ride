const rideListElement = document.getElementById('rideList');
const allRides = getAllRides();

allRides.forEach(async ([rideId, data]) => {
    const ride = JSON.parse(data);
    ride.id = rideId;

    const rideElement = document.createElement('li');
    rideElement.id = rideId;
    rideElement.className ='d-flex p-1 align-items-center gap-3 justify-content-between shadow-sm'
    rideListElement.appendChild(rideElement);
    
    rideElement.addEventListener('click', async () => {
        window.location.href = `./detail.html?id=${rideId}`
    })
   


    const firtPosition = ride.data[0];
    const FirstlocationData = await getLocationData(firtPosition.latitude, firtPosition.longitude)
    const mapID = `map${rideId}`;
    const mapElement = document.createElement('div');
    mapElement.id = `map${rideId}`;
    mapElement.style= "width: 100px; height: 100px;";
    mapElement.classList.add('bg-secondary');
    mapElement.classList.add('rounded-4');  


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
    rideElement.appendChild(mapElement);
    rideElement.appendChild(dataElement);

    const map = L.map(mapID,{
        zoomControl:false,
        dragging:false,
        scrollWheelZoom:false,
        attributionControl:false,
    })
    map.setView([firtPosition.latitude, firtPosition.longitude],15)
    L.tileLayer('https://tile.openstreetmap.de/{z}/{x}/{y}.png', {
        maxZoom: 20,
        minZoom: 10,
    }).addTo(map);
    L.marker([ride.data[0].latitude, ride.data[0].longitude]).addTo(map)
    
    
});

