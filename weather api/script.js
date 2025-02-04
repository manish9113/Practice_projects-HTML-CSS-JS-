document.addEventListener('DOMContentLoaded', () => {

    const API_KEY = '2680eebbd173a14ce0bbf1e936d73101';

    let city = document.getElementById('city');
    let submit = document.getElementById('submitbtn');
    let unitToggle = document.getElementById('unitToggle');
    let tempUnit = 'metric';

    async function fetchWeather(city) {
        try {
            const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather`, {
                params: {
                    q: city,
                    units: tempUnit,
                    appid: API_KEY
                }
            });
            updateUI(response.data);
        } catch (error) {
            showError(error.response ? error.response.data.message : "Failed to fetch weather data");
        }
    }

    function updateUI(data) {
        const unitSymbol = tempUnit === 'metric' ? '°C' : '°F';

        document.getElementById('temp').innerHTML = `${Math.round(data.main.temp)}${unitSymbol}`;
        document.getElementById('max_temp').innerHTML = `${Math.round(data.main.temp_max)}${unitSymbol}`;
        document.getElementById('min_temp').innerHTML = `${Math.round(data.main.temp_min)}${unitSymbol}`;
        document.getElementById('humidity').innerHTML = `${data.main.humidity}%`;
        document.getElementById('wind_speed').innerHTML = `${data.wind.speed} m/s`;
        document.getElementById('wind_degrees').innerHTML = `${data.wind.deg}°`;
        document.getElementById('feelslike').innerHTML = `${Math.round(data.main.feels_like)}${unitSymbol}`;

        const sunriseTime = new Date(data.sys.sunrise * 1000).toLocaleTimeString();
        const sunsetTime = new Date(data.sys.sunset * 1000).toLocaleTimeString();
        document.getElementById('sunrise').innerHTML = sunriseTime;
        document.getElementById('sunset').innerHTML = sunsetTime;

        document.getElementById('card-temp').innerHTML = `${Math.round(data.main.temp)}${unitSymbol}`;
        document.getElementById('card-feelslike').innerHTML = `${Math.round(data.main.feels_like)}${unitSymbol}`;
        document.getElementById('card-weather').innerHTML = data.weather[0].main;

        const weatherIcon = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
        document.getElementById('imglogo').src = weatherIcon;

        updateCards(data);
    }

    function updateCards(data) {
        const tempCard = document.querySelector('.temperature-card');
        const weatherCard = document.querySelector('.weather-card');
        const overallCard = document.querySelector('.overall-card');

        tempCard.innerHTML = `Current temperature is ${Math.round(data.main.temp)}${tempUnit === 'metric' ? '°C' : '°F'}`;
        weatherCard.innerHTML = `Weather conditions: ${data.weather[0].description}`;
        overallCard.innerHTML = `Feels like ${Math.round(data.main.feels_like)}${tempUnit === 'metric' ? '°C' : '°F'} with ${data.main.humidity}% humidity`;
    }

    function showError(message) {
        const cards = document.querySelectorAll('.card-body');
        cards.forEach(card => {
            card.innerHTML = `<p class="error-message">${message}</p>`;
        });
    }

    function getLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                position => fetchWeatherByCoords(position.coords.latitude, position.coords.longitude),
                error => showError('Unable to get location')
            );
        }
    }

    async function fetchWeatherByCoords(lat, lon) {
        try {
            const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather`, {
                params: {
                    lat: lat,
                    lon: lon,
                    units: tempUnit,
                    appid: API_KEY
                }
            });
            city.value = response.data.name;
            updateUI(response.data);
        } catch (error) {
            showError(error.response ? error.response.data.message : "Failed to fetch weather data");
        }
    }

    submit.addEventListener('click', (e) => {
        e.preventDefault();
        if (city.value) fetchWeather(city.value);
    });

    unitToggle.addEventListener('click', () => {
        tempUnit = tempUnit === 'metric' ? 'imperial' : 'metric';
        unitToggle.innerText = tempUnit === 'metric' ? 'Switch to °F' : 'Switch to °C';
        if (city.value) fetchWeather(city.value);
    });

    getLocation();
});
