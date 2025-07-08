//Variables
const apiKey = "4fe27b18fca578bcbc853c3872323f64";
const weatherDisplay = document.querySelector(".weather-container");
const placeholder = document.querySelector(".placeholder-h1");
const cityNameDisplay = document.querySelector(".city-name")
const cityTemperatureDisplay = document.querySelector(".city-temp");
const maxTemperatureDisplay = document.querySelector(".max-temp");
const minTemperatureDisplay = document.querySelector(".min-temp");
const skyStatusDisplay = document.querySelector(".skies");
const windSpeedDisplay = document.querySelector(".wind-speed");
const humidityLevelDisplay = document.querySelector(".humidity");
//labels
const conditionsTxt = document.querySelector(".conditions-text");
const windSpeedLabel = document.querySelector(".wind-speed-label")
const humidityLabel = document.querySelector(".humidity-label")

//Getting information from API and putting it into display.
async function getData() {
    placeholder.remove()
    conditionsTxt.style.display = 'block'
    windSpeedLabel.style.display = 'block'
    humidityLabel.style.display = 'block'

    const cityInput = document.querySelector(".city-input").value.toLowerCase();
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput}&appid=${apiKey}&units=metric`;

    const response = await fetch(url);
    const data = await response.json();
    const cityName = data.name;
    const country = data.sys.country;
    const cityTemperature = Math.round(data.main.temp);
    const maxTemp = Math.round(data.main.temp_max);
    const minTemp = Math.round(data.main.temp_min);
    const humidityLevel = data.main.humidity;
    const windSpeed = data.wind.speed;
    const skyStatus = data.weather[0].description;

    checkTemp(cityTemperature)

    cityNameDisplay.innerHTML = `<i class="fa-solid fa-location-dot"></i> ${cityName}, ${country}`;
    cityTemperatureDisplay.innerHTML = `${cityTemperature}°C`;
    maxTemperatureDisplay.innerHTML = `H: ${maxTemp}°C`
    minTemperatureDisplay.innerHTML = `L: ${minTemp}°C`
    humidityLevelDisplay.innerHTML = `<i class="fa-solid fa-droplet"></i> ${humidityLevel}%`
    windSpeedDisplay.innerHTML = `<i class="fa-solid fa-wind"></i> ${windSpeed}km`
    skyStatusDisplay.innerHTML = `<i class="fa-solid fa-cloud"></i> ${skyStatus}`

    console.log(data); 

    if(!response.ok){
        throw new Error("Could not fetch data... Invalid location");
    }
}

//Function to change weatherDisplay's background and border color according to the temperature of cities.
function checkTemp(cityTemperature){
    if(cityTemperature > 26 && cityTemperature <= 31){
        weatherDisplay.style.background = "linear-gradient(to bottom right,rgb(76, 43, 193), #A05DD9) no-repeat"
        weatherDisplay.style.border = "3px solid rgb(174, 36, 220)"
    }
    if(cityTemperature > 0 && cityTemperature <= 26){
        weatherDisplay.style.background = "linear-gradient(to bottom right,rgb(37, 119, 243), #5DB6D9) no-repeat"
        weatherDisplay.style.border = "3px solid rgb(33, 147, 218)"
    }
    if(cityTemperature > 31){
        weatherDisplay.style.background = "linear-gradient(to bottom right,rgb(178, 28, 28),rgb(193, 197, 62)) no-repeat"
        weatherDisplay.style.border = "3px solid rgb(202, 29, 29)"
    }
}

function restartSearch(){
    window.location.reload(true);
}