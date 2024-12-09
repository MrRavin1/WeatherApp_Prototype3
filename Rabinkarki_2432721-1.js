
const apiUrl = "http://rabinweather.lovestoblog.com/Prototype2/connection.php";


const findWeatherByCity = async (query) => {
  try {
    if (navigator.onLine) {
    const response = await fetch(`${apiUrl}?q=${query}`);
    const data = await response.json();
    localStorage.setItem(query, JSON.stringify(data));

    if (data.length > 0) {
      const cityData = data[0];


      document.getElementById("temperature").innerHTML = cityData.temperature + "&deg;C";
      document.getElementById("location").innerText = cityData.city;
      document.getElementById("feelsLike").innerHTML = cityData.temperature+ "&deg;C";
      document.getElementById("humidity").innerHTML = cityData.humidity + "%";
      document.getElementById("pressure").innerHTML = cityData.pressure + " hPa";
      document.getElementById("wind").innerHTML = cityData.wind + " m/s";

     
      const timestamp = Math.floor(Date.now() / 1000)+parseInt(data[0].timezone);
      const date = new Date(timestamp * 1000);
      const localDateTime = date.toLocaleString('en-US', {
        weekday: 'short',
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
        timeZone: 'UTC'
      });
      document.getElementById("date-time").textContent = localDateTime;
      if(data[0].weather == "Clouds"){
          weatherIcon.src = "https://openweathermap.org/img/wn/03d@2x.png";
      }
      else if(data[0].weather=="Clear"){
          weatherIcon.src = "https://openweathermap.org/img/wn/01d@2x.png";
      }
      else if(data[0].weatherr=="Rain"){
          weatherIcon.src = "https://openweathermap.org/img/wn/10d@2x.png";
      }
      else if(data[0].weather=="Drizzle"){
          weatherIcon.src = "https://openweathermap.org/img/wn/09d@2x.png";
      }
      else if(data[0].weather=="Mist"){
          weatherIcon.src = "https://openweathermap.org/img/wn/50d@2x.png";
      }
      else if(data[0].weather=="Snow"){
          weatherIcon.src = "https://openweathermap.org/img/wn/13d@2x.png";
      }
      else if(data[0].weather=="thunderstorm"){
          weatherIcon.src = "https://openweathermap.org/img/wn/11d@2x.png";
      }
      
    } else {
      console.log("No weather data found for the city");
    }
    //document.getElementById("date-time").textContent = localDateTime;



  }
  else {
    // Offline: Retrieve data from localStorage
    const q = localStorage.getItem(query)
    let cityData = JSON.parse(localStorage.getItem(query))[0];
    document.getElementById("temperature").innerHTML = cityData.temperature + "&deg;C";
      document.getElementById("location").innerText = cityData.city;
      document.getElementById("feelsLike").innerHTML = cityData.temperature+ "&deg;C";
      document.getElementById("humidity").innerHTML = cityData.humidity + "%";
      document.getElementById("pressure").innerHTML = cityData.pressure + " hPa";
      document.getElementById("wind").innerHTML = cityData.wind + " m/s";
}

  

}catch (error) {
  console.error("Error fetching weather data:", error);
  
}
}



const searchButton = document.getElementById("searchbutton");

const handleSearchClick = (event) => {
  event.preventDefault();
  const query = document.getElementById("searchInput").value;
  findWeatherByCity(query);
}

searchButton.addEventListener("click", handleSearchClick);


findWeatherByCity("braintree");
