//https://api.weatherapi.com/v1/current.json?key=4faca8cb29d2450abbb91331240305&q=London&aqi=no
const express = require("express");
const axios = require("axios");
const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("homepage");
});

app.get("/location/:city", async (req, res) => {
  try {
    let city = req.params.city;
    const data = await axios.get(
      `https://api.weatherapi.com/v1/current.json?key=4faca8cb29d2450abbb91331240305&q=${city}&aqi=no`
    );
    const temp = data.data.current.temp_c;
    const text = data.data.current.condition.text;
    const code = data.data.current.condition.code
    let activities = [];
    let description;
    console.log(code)
    switch (text) {
      case 'Sunny':
        activities = ["cycling", "picnicking"];
        description = text;
        break;

      case 'Cloudy':
        activities = ["cricket", "swim"];
        description = text;
        break;

      case 'Rainy':
        activities = ["visit meseum", "read books"];
        description = text;
        break;

      default:
        activities = ["tv", "games"];
        description = "take rest";
        break;
    }

    let obj = {
      name: city,
      temperature: temp,
      description,
      activities
    }
    res.send(obj)
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

app.listen(3500, () => {
  console.log("listening on port 3500");
});
