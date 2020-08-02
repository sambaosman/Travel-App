import { handleSubmit } from "./handleSubmit";

const geoNamesUrl = "http://api.geonames.org/geoCodeAddressJSON?q=";
const geoNamesKey = "&username=sherorox";

const weatherCurrentUrl = "https://api.weatherbit.io/v2.0/current";
const weatherForecastUrl = "https://api.weatherbit.io/v2.0/forecast/daily";
const weatherKey = "e8f30827ad404087893a19676b05c82f";

const pixaUrl = "https://pixabay.com/api/";
const pixaKey = "17737691-ffb0e3b9f1b10bdc03a3a8df8";

document.getElementById("submitButton").addEventListener("click", handleSubmit);
document.getElementById("saveButton").addEventListener("click", saveTrip);
document.getElementById("removeButton").addEventListener("click", removeTrip);

function getCoordinates(location) {
  location = location.replace(" ", "+");
  fetch(`${geoNamesUrl}${location}${geoNamesKey}`)
    .then((res) => res.json())
    .then(function (res) {
      //got the coordinates
      console.log(res);
      let lat = res.address.lat;
      let lng = res.address.lng;

      //now get the weather
      let date = document.getElementById("date").value;
      if (date) {
        getWeather(date, lat, lng);
      }
    });
}

function getWeather(date, lat, lng) {
  let tripDate = new Date(date);
  let weatherUrl;
  let isWithinWeek;
  if (dateWithinWeek(tripDate)) {
    weatherUrl = weatherCurrentUrl;
    isWithinWeek = true;
  } else {
    weatherUrl = weatherForecastUrl;
    isWithinWeek = false;
  }
  //get current weather
  fetch(`${weatherUrl}?lat=${lat}&lon=${lng}&key=${weatherKey}`)
    .then((res) => res.json())
    .then(function (res) {
      //got the weather
      console.log(res);

      //set the weather
      if (isWithinWeek) {
        document.getElementById("weather").innerHTML =
          res.data[0].temp + " Degrees Celsius";
      } else {
        res.data.forEach((date) => {
          let currDate = new Date(date.valid_date);
          if (tripDate.getDate() === currDate.getDate()) {
            document.getElementById("weather").innerHTML =
              date.temp + " Degrees Celsius";
          }
        });
      }

      //now get the picture
      getPicture();
    });
}

function dateWithinWeek(tripDate) {
  let now = new Date();
  let nextWeek = new Date(now.setDate(now.getDate() + 7));
  if (tripDate < nextWeek) {
    return true;
  } else {
    return false;
  }
}

function getPicture() {
  let location = document.getElementById("location").value;
  fetch(`${pixaUrl}?key=${pixaKey}&q=${location}`)
    .then((res) => res.json())
    .then(function (res) {
      //got the image
      let imgUrl = res.hits[0].previewURL;
      document.getElementById("locationImage").src = imgUrl;
    });
}

function saveTrip() {
  let location = document.getElementById("location").value;
  let date = document.getElementById("date").value;

  let payload = {
    date: date,
    location: location,
  };
  fetch("http://localhost:8000/saveTrip", {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  })
    .then((res) => res.json())
    .then(function (res) {
      console.log(res);
    });
}

function removeTrip() {
  let location = document.getElementById("location").value;
  let date = document.getElementById("date").value;

  let payload = {
    date: date,
    location: location,
  };
  fetch("http://localhost:8000/removeTrip", {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  })
    .then((res) => res.json())
    .then(function (res) {
      console.log(res);
    });
}

export { getCoordinates };
