import { getCoordinates } from "./app.js";

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

export { handleSubmit };

window.handleSubmit = handleSubmit;
