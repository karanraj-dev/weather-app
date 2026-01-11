import { API_KEY } from "./keys.js";




const weatherForm = document.querySelector(".input-div");
const inputCity = document.querySelector("#input-city");
const weatherCard = document.querySelector(".weather-card");

weatherForm.addEventListener("submit", (e)=>{
  e.preventDefault();
  const city = inputCity.value;
  weatherCard.innerHTML = "";
  getWeatherData(city);
});

async function getWeatherData(city){

  try{
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`);

    if(!response.ok){
      throw new Error("Error Fetching Weather Data");
      
    }
    const data = await response.json();
    displayWeaterDetails(data);

  }
  catch(error){
    console.error(error);
    displayErrorMsg(error);
  }
  
}

function displayWeaterDetails(data){
  console.log(data);
  const {name,main:{temp,humidity},weather:[{id,main,description}]} = data;
  console.log(name,temp,humidity);
  console.log(id,main,description);

  const cityDiv = document.createElement("h1");
  cityDiv.classList.add("city");
  cityDiv.textContent = name;
  weatherCard.appendChild(cityDiv);

  const tempDiv = document.createElement("h1");
  tempDiv.classList.add("temperature");
  tempDiv.textContent = (temp - 273.15).toFixed(2);
  tempDiv.textContent += "°C";
  weatherCard.appendChild(tempDiv);

  const humidityDiv = document.createElement("p");
  humidityDiv.classList.add("humidity");
  humidityDiv.textContent = humidity + "% Humidity";
  weatherCard.appendChild(humidityDiv);

  const descriptionDiv = document.createElement("p");
  descriptionDiv.classList.add("description");
  descriptionDiv.textContent = description;
  weatherCard.appendChild(descriptionDiv);

  let cloud;

  switch (true) {
    case (id >= 200 && id < 300):
      cloud = "⛈️";
      break;
    case (id >= 300 && id < 500):
      cloud = "🌦️";
      break;
    case (id >= 500 && id < 600):
      cloud = "🌧️";
      break;
    case (id >= 600 && id < 700):
      cloud = "❄️";
      break;
    case (id >= 700 && id < 800):
      cloud = "Atmosphere";
      break;
    case (id == 800):
      cloud = "⛅";
      break;
    case (id >= 801):
      cloud = "😶‍🌫️";
      break;
  
    default:
      cloud = "No Information";
      break;
  }

  const idDiv = document.createElement("p");
  idDiv.classList.add("cloud");
  idDiv.textContent = cloud;
  weatherCard.appendChild(idDiv);
  
  weatherCard.style.display = "flex";

}

function displayErrorMsg(error) { 
  const errorEle = document.createElement("p");
  errorEle.textContent = error;
  weatherCard.appendChild(errorEle);
  weatherCard.style.display = "flex";

 }