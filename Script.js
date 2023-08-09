const apiKey= "1bb9639c9cc6b0cb6db4d3f78b57685e";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchbox = document.querySelector(".search input");
const searchbtn = document.querySelector(".search button");
const datetime = document.querySelector("#datetime");
const weatherIcon =document.querySelector(".weather-icon");


// Main Finction
async function checkWeather(city) {
    const response = await fetch(apiUrl+city+`&appid=${apiKey}`);

    if(response.status==404)
    {
        document.querySelector(".weather").style.display = "none";
        document.querySelector(".error").style.display = "block";
    }

    else
    {
        var data = await response.json();
        console.log(data);
        document.querySelector(".city").innerHTML=data.name;
        document.querySelector(".temp").innerHTML=Math.round(data.main.temp)+"°C";
        document.querySelector(".wind").innerHTML=data.wind.speed+"km/h";
        document.querySelector(".humidity").innerHTML=data.main.humidity+"%";
        console.log(data);

        const unixTimestamp = data.dt;
        const humanReadableDate = unixTimestampToHumanReadable(unixTimestamp);
        document.querySelector("#datetime").innerHTML=humanReadableDate;

        if(data.weather[0].main=="Clouds"){
            weatherIcon.src = "clouds.png";
        }
        else if(data.weather[0].main=="Clear"){
            weatherIcon.src = "clear.png";
        }
        else if(data.weather[0].main=="Rain"){
            weatherIcon.src = "rain.png";
        } 
        else if(data.weather[0].main=="Drizzle"){
            weatherIcon.src = "drizzle.png";
        }
        else if(data.weather[0].main=="Mist"){
            weatherIcon.src = "mist.png";
        }  
        
        document.querySelector(".weather").style.display = "block"
        document.querySelector(".error").style.display = "none";
    }   
}

//search 
searchbtn.addEventListener("click",()=>(
    checkWeather(searchbox.value)
))



// Date time

function unixTimestampToHumanReadable(unixTimestamp) {
    const milliseconds = unixTimestamp * 1000;
    const dateObject = new Date(milliseconds);
    const year = dateObject.getFullYear();
    const month = dateObject.toLocaleString('default', { month: 'long' });
    const day = dateObject.getDate();
    const hours = dateObject.getHours();
    const minutes = dateObject.getMinutes();
    const seconds = dateObject.getSeconds();
    const formattedDate = `${year}-${month}-${day.toString().padStart(2, '0')}`;
    const formattedTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  
    return `${formattedDate} ${formattedTime}`;
  }
  
  