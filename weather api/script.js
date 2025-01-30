let city = document.getElementById('city');
let submit = document.getElementById('submitbtn');
let temp = document.getElementById('temp');
let max_temp = document.getElementById('max_temp');
let min_temp = document.getElementById('min_temp');
let humidity = document.getElementById('humidity');
let wind_speed = document.getElementById('wind_speed');
let wind_degrees = document.getElementById('wind_degrees');
let feelslike = document.getElementById('feelslike');
let sunrise = document.getElementById('sunrise');
let sunset = document.getElementById('sunset');

// Using Yahoo Weather API to fetch weather of different cities
async function fetchweather(city) {
    const url = `https://yahoo-weather5.p.rapidapi.com/weather?location=${city}&format=json&u=f`;
    const options = {
        method: 'GET',
        headers: {
            'x-rapidapi-key': '6cd625cd02mshaa1025599cb5758p136f0cjsn9da6c8168956', // Use your API key here
            'x-rapidapi-host': 'yahoo-weather5.p.rapidapi.com'
        }
    };

    try {
        const response = await fetch(url, options);
        const result = await response.json();
        console.log(result); // Checking the structure of the response

        // Assuming the response contains these keys (adjust if necessary based on the response structure)
        temp.innerHTML = result.current_observation.condition.temperature;
        max_temp.innerHTML = result.forecasts[0].high;
        min_temp.innerHTML = result.forecasts[0].low;
        humidity.innerHTML = result.current_observation.atmosphere.humidity;
        wind_speed.innerHTML = result.current_observation.wind.speed;
        wind_degrees.innerHTML = result.current_observation.wind.direction;
        feelslike.innerHTML = result.current_observation.condition.temperature; // Assuming this is the feels like temp
        sunrise.innerHTML = result.current_observation.astronomy.sunrise;
        sunset.innerHTML = result.current_observation.astronomy.sunset;

        document.getElementById("card-temp").innerHTML = result.current_observation.condition.temperature + "°F";
        document.getElementById("card-feelslike").innerHTML = result.current_observation.condition.temperature + "°F"; // Adjust if feelslike is different
        if (result.current_observation.atmosphere.humidity === 0) {
            document.getElementById("card-weather").innerHTML = "Completely Sunny Day";
        } else if (result.current_observation.atmosphere.humidity < 50) {
            document.getElementById("card-weather").innerHTML = "Partially Sunny Day";
        } else {
            document.getElementById("card-weather").innerHTML = "Humid Day";
        }

        if (result.current_observation.atmosphere.humidity >= 80) {
            document.getElementById("imglogo").src = "img/logorain.svg";
        } else {
            document.getElementById("imglogo").src = "img/logosunny.svg";
        }

    } catch (error) {
        console.error(error);
    }
}

submit.addEventListener('click', (e) => {
    e.preventDefault();
    fetchweather(city.value);
});
