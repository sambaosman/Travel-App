/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./src/client/js/handleSubmit.js


function handleSubmit() {
  console.log("In HandleSubmit");
  // check what text was put into the form field
  let location = document.getElementById("location").value;
  if (location) {
    // getCoordinates
    getCoordinates(location);
    console.log("::: Form Submitted :::");
  }
}



window.handleSubmit = handleSubmit;

// CONCATENATED MODULE: ./src/client/js/app.js


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



// EXTERNAL MODULE: ./src/client/styles/style.css
var style = __webpack_require__(0);

// CONCATENATED MODULE: ./src/client/index.js





/***/ })
/******/ ]);