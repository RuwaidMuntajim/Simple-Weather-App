var d = new Date();
var d1 = d.getHours();



window.addEventListener('load', () => {
    let long;
    let lat;
    let location = document.querySelector('.location');
    let degree = document.querySelector('.degree');
    let icon = document.querySelector("img");
    let description = document.querySelector('.description');
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            console.log(position);
            lat = position.coords.latitude;
            long = position.coords.longitude;
            fetch("https://aerisweather1.p.rapidapi.com/forecasts/" + lat + "," + long + "/?plimit=3&filter=1hr", {
                "method": "GET",
                "headers": {
                "x-rapidapi-key": "7397ce9bf9mshdc43476e31b2172p1676c5jsn4a6eaa56dabf",
                "x-rapidapi-host": "aerisweather1.p.rapidapi.com"
                }
            })
            .then(response => {
                return response.json();
            })
            .then(data => {
                console.log(data);
                var C = data.response[0].periods[0].maxTempC;
                var F = (C) * (9/5) + 32;
                location.innerHTML = data.response[0].profile.tz;
                degree.innerHTML = C + "°C" + " | " + F.toFixed(0) + "°F";
                description.innerHTML = data.response[0].periods[0].weather;
    
    
                if (data.response[0].periods[0].weather == "Mostly Clear") {
                    icon.src = 'animated/cloudy-night-1.svg';
                    
                } else if (data.response[0].periods[0].weather == "Mostly Sunny") {
                    icon.src = 'animated/cloudy-day-1.svg';
                    
                } else if (data.response[0].periods[0].weather == "Mostly Clear") {
                    icon.src = 'animated/cloudy-night-1.svg';
                    
                } else if (data.response[0].periods[0].weather == "Sunny") {
                    icon.src = 'animated/day.svg';
                    
                } else if (data.response[0].periods[0].weather == "Clear") {
                    icon.src = 'animated/night.svg';
                    
                } else if (data.response[0].periods[0].weather == "Partly Cloudy") {
                    if (6 <= d1 && d1 < 18) {
                        icon.src = 'animated/cloudy-day-2.svg';
                    } else {
                        icon.src = 'animated/cloudy-night-2.svg';
                    }
                } else if (data.response[0].periods[0].weather == "Thunderstorms" || data.response[0].periods[0].weather == "Scattered Thunderstorms") {
                    icon.src = 'animated/thunder.svg';
                } else if (data.response[0].periods[0].weather == "Mostly Cloudy") {
                    if (6 <= d1 && d1 < 18) {
                        icon.src = 'animated/cloudy-day-3.svg';
                    } else {
                        icon.src = 'animated/cloudy-night-3.svg';
                    }
                } else if (data.response[0].periods[0].weather == "Cloudy") {
                    icon.src = 'animated/cloudy.svg';

                } else if (data.response[0].periods[0].weather == "Light Rainy") {
                    console.log("E");
                    
                }
            })
            .catch(err => {
                console.error(err);
            });
            
        });
    }
    
})
