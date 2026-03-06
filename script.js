'use strict';

const apiKey = 'YOUR_API_KEY'; // Replace 'YOUR_API_KEY' with a valid API key
const form = document.getElementById('search-form');
const searchInput = document.getElementById('search-input');
const weatherContainer = document.getElementById('weather-container');

form.addEventListener('submit', function(event) {
    event.preventDefault();
    const city = searchInput.value;
    if (city) {
        fetchWeatherData(city);
    }
});

function fetchWeatherData(city) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;  // Adjust units as necessary

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('City not found');
            }
            return response.json();
        })
        .then(data => displayWeatherData(data))
        .catch(error => console.error(error));
}

function displayWeatherData(data) {
    const { name, main, weather } = data;
    const weatherHTML = `
        <h2>Weather in ${name}</h2>
        <p>Temperature: ${main.temp} °C</p>
        <p>Condition: ${weather[0].description}</p>
    `;
    weatherContainer.innerHTML = weatherHTML;
}

