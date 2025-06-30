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