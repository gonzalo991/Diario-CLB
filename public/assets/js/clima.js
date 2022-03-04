window.addEventListener('load', () => {
    let lon;
    let lat;

    let temperaturaValor = document.getElementById('temperatura-valor');
    let tempDescripcion = document.getElementById('temperatura-descripcion');
    let ubicacion = document.getElementById('ubicacion');
    let iconoAnimado = document.getElementById('icono-animado');
    let vientoVelocidad = document.getElementById('viento-velocidad');

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            console.log(position)
            lon = position.coords.longitude;
            lat = position.coords.latitude;

            const url = `https://api.openweathermap.org/data/2.5/weather?lat=-25.4951873&lon=-64.9736233&lang=es&units=metric&appid=ce29f23e8bc6c5bef0462703ac463b75`

            fetch(url).then(respuesta => { return respuesta.json() })
                .then(data => {
                    let temp = Math.round(data.main.temp);
                    temperaturaValor.textContent = `${temp}°C`;
                    let desc = data.weather[0].description;
                    tempDescripcion.textContent = desc.toUpperCase();
                    let ubication = data.name
                    ubicacion.textContent = ubication;
                    let viento = data.wind.speed;
                    vientoVelocidad.textContent = `${viento} m/s`;

                    switch (data.weather[0].main) {
                        case 'Thunderstorm':
                            iconoAnimado.src = 'animated/thunder.svg'
                            console.log('TORMENTA')
                            break;
                        case 'Drizzle':
                            iconoAnimado.src = 'animated/rainy-2.svg'
                            console.log('LLOVIZNA')
                            break;
                        case 'Rain':
                            iconoAnimado.src = 'animated/rainy-7.svg'
                            console.log('LLUVIA')
                            break;
                        case 'Snow':
                            iconoAnimado.src = 'animated/snowy-6.svg'
                            console.log('NIEVE')
                            break;
                        case 'Clear':
                            iconoAnimado.src = 'animated/day.svg'
                            console.log('DESPEJADO')
                            break;
                        case 'Atmosphere':
                            iconoAnimado.src = 'animated/weather.svg'
                            console.log('ATMOSFERA')
                            break;
                        case 'Clouds':
                            iconoAnimado.src = 'animated/cloudy-day-1.svg'
                            console.log('NUBLADO')
                            break;
                        default:
                            iconoAnimado.src = 'animated/cloudy-day-1.svg'
                            console.log('Por defecto')
                    }
                })
                .catch(error => {
                    console.log(error);
                })


        });

    }



});