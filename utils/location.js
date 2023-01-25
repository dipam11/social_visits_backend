const axios = require("axios");
const HttpError = require("../models/http-error");

const API_KEY = process.env.LOCATION_API_KEY;

async function getCoordsForAddress(address) {
  const response = await axios.get(
    `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(
      address
    )}&key=${API_KEY}`
  );
  const data = response.data;
  if (!data || data.status === "ZERO_RESULTS") {
    const error = new HttpError(
      "Could not find location for the specified address",
      422
    );
    throw error;
  }

  const coordinates = data.results[0].geometry;

  return coordinates;
}

module.exports = getCoordsForAddress;
// console.log(getCoordsForAddress("Shaniwar Peth, Pune, Maharashtra 411030"));

// const getCoordsForAddress = (address) => {
//   return {
//     lat: 18.5181,
//     lng: 73.8533,
//   };
// };

