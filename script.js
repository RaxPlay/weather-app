const apiKey = "4fe27b18fca578bcbc853c3872323f64";
const weatherDisplay = document.querySelector(".weather-container");
const cityNameDisplay = document.querySelector(".city-name");
const cityTemperatureDisplay = document.querySelector(".city-temperature");
const citySkiesDisplay = document.querySelector(".city-skies");
 
//Getting information from API and putting it into display.
async function getData() {
    const cityInput = document.querySelector(".city-input").value.toLowerCase();
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput}&appid=${apiKey}&units=metric`;

    const response = await fetch(url);
    const data = await response.json();
    const cityName = data.name;
    const country = data.sys.country;
    const cityTemperature = data.main.temp;

    checkTemp(cityTemperature)

    weatherDisplay.style.transition = '0.5s';   
    weatherDisplay.style.display = 'block'; 

    cityNameDisplay.append(`${cityName}, ${country}`);
    cityTemperatureDisplay.append(cityTemperature + "°");
    console.log(data);

    if(!response.ok){
        throw new Error("Could not fetch data... Invalid location");
    }
}

//Function to change weatherDisplay's background and border color according to the temperature of cities.
function checkTemp(cityTemperature){
    if(cityTemperature >= 26 && cityTemperature <= 31){
        weatherDisplay.style.background = "linear-gradient(to bottom right,rgb(76, 43, 193), #A05DD9) no-repeat"
        weatherDisplay.style.border = "3px solid rgb(174, 36, 220)"
        let status = "Neutral temperature: ";
        cityTemperatureDisplay.append(status);
    }
    if(cityTemperature >= 10 && cityTemperature <= 25){
        weatherDisplay.style.background = "linear-gradient(to bottom right,rgb(37, 119, 243), #5DB6D9) no-repeat"
        weatherDisplay.style.border = "3px solid rgb(33, 147, 218)"
        let status = "Cold/Cool temperature: ";
        cityTemperatureDisplay.append(status);
    }
    if(cityTemperature > 31){
        weatherDisplay.style.background = "linear-gradient(to bottom right,rgb(178, 28, 28),rgb(193, 197, 62)) no-repeat"
        weatherDisplay.style.border = "3px solid rgb(202, 29, 29)"
        let status = "Hot temperature: ";
        cityTemperatureDisplay.append(status);
    }
}