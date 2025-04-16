const weatherData = {
    main: {
        temp: 28 
    },
    weather: [
        { description: "Sunny with scattered clouds" }
    ],
    wind: {
        speed: 3 
    }
};

function populateWeather(data) {
    const windSpeedKmh = (data.wind.speed * 3.6).toFixed(1);
    
    document.querySelector(".temperature").textContent = `Temperature: ${data.main.temp}°C`;
    document.querySelector(".condition").textContent = `Condition: ${data.weather[0].description}`;
    document.querySelector(".windspeed").textContent = `Wind: ${windSpeedKmh} km/h`;
    
    calculateWindChill(data);
}

function calculateWindChill(data) {
    const temperature = parseFloat(data.main.temp);
    const windSpeedKmh = parseFloat(data.wind.speed) * 3.6;
    
    if (temperature <= 10 && windSpeedKmh > 4.8) {
        const windChill = 13.12 + 0.6215 * temperature - 11.37 * Math.pow(windSpeedKmh, 0.16) + 0.3965 * temperature * Math.pow(windSpeedKmh, 0.16);
        document.querySelector(".windchill").textContent = `Wind Chill: ${windChill.toFixed(1)}°C`;
    } else {
        document.querySelector(".windchill").textContent = `Wind Chill: N/A (not applicable for current weather)`;
    }
}

populateWeather(weatherData);

const options = {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric"
};

const modified = new Date(document.lastModified);
document.getElementById("lastModified").textContent = `Last Modified: ${modified.toLocaleDateString("en-US", options)}`;
document.getElementById("currentyear").textContent = modified.getFullYear();