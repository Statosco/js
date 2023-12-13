const cityInput = document.querySelector(".city-input")
const searchButton = document.querySelector(".search-btn");
const currentweatherCardsDiv = document.querySelector(".current-weather");
const weatherCardsDiv = document.querySelector(".weather-cards");

const API_key = "f697fec9dc19ced06492c15e7a169b03"

const createWeatherCard = (cityName, weatherItem, index) => {
    if(index === 0){

    }else{
        return `<li class="card">
        <h3>(${weatherItem.dt_txt.split(" ")[0]})</h3>
        <img src="https://openweathermap.org/img/wn/${weatherItem.weather[0].icon}@2x.png" alt="weather image">
        <h4>Temperature: ${(weatherItem.main.temp - 273.15).toFixed(2)}°C</h4>
        <h4>Wind: ${weatherItem.wind.speed} M/S</h4>
        <h4>Humidity: ${weatherItem.main.humidity}%</h4>
        </li>`
    }
};

const getWeatherDetails = (cityName, lat, lon) => {
    const WEATHER_API_URL = `https://api.openweathermap.org/data/2.5/forecast/?lat=${lat}&lon=${lon}&appid=${API_key}`;

    fetch(WEATHER_API_URL).then(res => res.json()).then(data => {
        const uniqeForecastDays = [];

        const fiveDaysForecast = data.list.filter(f => {

            
            const forecastDate = new Date(f.dt_txt).getDate();
            if(!uniqeForecastDays.includes(forecastDate)){
                return uniqeForecastDays.push(forecastDate);
            }
            
        });

        cityInput.value = "";
        weatherCardsDiv.innerHTML= "";
        currentweatherCardsDiv.innerHTML= "";

        console.log(fiveDaysForecast)
        fiveDaysForecast.forEach((weatherItem, index) => {
            if(index === 0){
                weatherCardsDiv.insertAdjacentHTML("beforeend", createWeatherCard(cityName, weatherItem, index));
            }else{
                weatherCardsDiv.insertAdjacentHTML("beforeend", createWeatherCard(cityName, weatherItem, index));
            }
        });
    }).catch(() => {
        alert("An error occured while fetching the weather forecast");
    });
}


const getCityCoordinate = () => {
    const cityName = cityInput.value.trim();
    if(!cityName) return;
    const GEOCODING_API_URL = `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=${API_key}`

    fetch(GEOCODING_API_URL).then(res => res.json()).then(data => {
        if(data.length ==0) return alert(`No coordinates found for ${cityName}`);
        const {name, lat, lon} = data[0];
        getWeatherDetails(name, lat, lon);
    }).catch(() => {
        alert("an error occured while fetching the coordinates")
    })
} 

searchButton.addEventListener("click", getCityCoordinate);