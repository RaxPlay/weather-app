//Variables
const apiKey = "4fe27b18fca578bcbc853c3872323f64";
const weatherDisplay = document.querySelector(".weather-container");
const placeholder = document.querySelector(".placeholder-h1");
const cityNameDisplay = document.querySelector(".city-name")
const cityTemperatureDisplay = document.querySelector(".city-temp");
const maxTemperatureDisplay = document.querySelector(".max-temp");
const minTemperatureDisplay = document.querySelector(".min-temp")

//Getting information from API and putting it into display.
async function getData() {
    placeholder.remove()

    const cityInput = document.querySelector(".city-input").value.toLowerCase();
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput}&appid=${apiKey}&units=metric`;

    const response = await fetch(url);
    const data = await response.json();
    const cityName = data.name;
    const country = data.sys.country;
    const cityTemperature = data.main.temp;
    const maxTemp = data.main.temp_max;
    const minTemp = data.main.temp_min;

    checkTemp(cityTemperature)

    cityNameDisplay.innerHTML = `${cityName}, ${country}`;
    cityTemperatureDisplay.innerHTML = cityTemperature;
    maxTemperatureDisplay.innerHTML = `H: ${maxTemp}°`
    minTemperatureDisplay.innerHTML = `L: ${minTemp}°`

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