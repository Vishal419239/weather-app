const apiKey = "53da202c0fmsh9e3ea118f61016fp165523jsna007a9253531"; // Replace with your actual API key
let isCelsius = true;
async function getWeather() {
    const city = document.getElementById("city").value;
    if (!city) {
        alert("Please enter a city name!");
        return;
    }

    const url = `https://weatherbit-v1-mashape.p.rapidapi.com/current?city=${city}&units=metric&lang=en`;
    const options = {
        method: "GET",
        headers: {
            "x-rapidapi-key": '53da202c0fmsh9e3ea118f61016fp165523jsna007a9253531',
            "x-rapidapi-host": "weatherbit-v1-mashape.p.rapidapi.com"
        }
    };

    try {
        const response = await fetch(url, options);
        const data = await response.json();

        if (!data.data || data.data.length === 0) {
            throw new Error("Invalid city or no data found.");
        }

        const weatherData = data.data[0];

        document.getElementById("weather").innerHTML = `
            <h2>${weatherData.city_name}, ${weatherData.country_code}</h2>
            <p>Temperature: ${convertTemp(weatherData.temp)}</p>
            <p>Condition: ${weatherData.weather.description}</p>
            <img src="https://www.weatherbit.io/static/img/icons/${weatherData.weather.icon}.png" alt="Weather Icon">
        `;
    } catch (error) {
        console.error("Error fetching weather data:", error);
        document.getElementById("weather").innerHTML = "Error fetching weather data.";
    }
}
function convertTemp(temp) {
    return isCelsius ? `${temp}°C` : `${(temp * 9/5 + 32).toFixed(1)}°F`;
}
function toggleUnit() {
    isCelsius = !isCelsius;
    document.getElementById("unitLabel").textContent = isCelsius ? "°C" : "°F";
    getWeather();
}
function toggleDarkMode() {
    document.body.classList.toggle("dark-mode");
}

