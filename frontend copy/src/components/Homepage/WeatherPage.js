import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router'
import { Grid, Header, Image, Button, Search, Input, Label, Popup } from 'semantic-ui-react'


export default function WeatherPage() {

  let user = useSelector(state => state.user)
  let params = useParams()
  let [weather, setWeather] = useState({
    //farenheit
    temperature: '',
    humidity: '',
    feelsLike: '',
    windSpeed: '',
    windDirection: '',
    //in milliseconds
    sunrise: '',
    sunset: '',
    //visibility in meters
    visibility: '',
    //perc clouds
    cloudy: ''
  })


  //consider moving this so it render's automatically?
  let API_key = "03b80556af981e9f9a6a57906ecf2438"
  let API_address = "http://api.openweathermap.org/data/2.5/weather?zip="
  //http://api.openweathermap.org/data/2.5/weather?q=Houston&appid=03b80556af981e9f9a6a57906ecf2438
  useEffect(() => {
    fetch(`${API_address}${localStorage.zip},us&units=imperial&appid=${API_key}`)
      .then(res => res.json())
      .then(weather => {
        // dispatch({type: 'SET_WEATHER', weather})
        console.log("weather", weather)
        setWeather({
          //farenheit
          city: weather.name,
          temperature: weather.main.temp,
          humidity: weather.main.humidity,
          feelsLike: weather.main.feels_like,
          windSpeed: weather.wind.speed,
          windDirection: weather.wind.deg,
          //in milliseconds
          sunrise: weather.sys.sunrise,
          sunset: weather.sys.sunset,
          //visibility in meters
          visibility: weather.visibility,
          cloudy: weather.clouds.all
        })
      })
  }, [])


  function msToTime(duration) {
    var milliseconds = parseInt((duration % 1000) / 100),
      seconds = Math.floor((duration / 1000) % 60),
      minutes = Math.floor((duration / (1000 * 60)) % 60),
      hours = Math.floor((duration / (1000 * 60 * 60)) % 24);

    hours = (hours < 10) ? "0" + hours : hours;
    minutes = (minutes < 10) ? "0" + minutes : minutes;
    seconds = (seconds < 10) ? "0" + seconds : seconds;

    return hours + ":" + minutes + ":" + seconds + "." + milliseconds;
  }
  // console.log(msToTime(300000))
  function timeConverter(seconds) {
    let date = new Date(seconds * 1000);
    let timestr = date.toLocaleTimeString();
    console.log(timestr)
    return timestr
  }

  //direction logic
  function getCardinal(angle) {
    /** 
     * Customize by changing the number of directions you have
     * We have 8
     */
    const degreePerDirection = 360 / 8;

    /** 
     * Offset the angle by half of the degrees per direction
     * Example: in 4 direction system North (320-45) becomes (0-90)
     */
    const offsetAngle = angle + degreePerDirection / 2;

    return (offsetAngle >= 0 * degreePerDirection && offsetAngle < 1 * degreePerDirection) ? "N"
      : (offsetAngle >= 1 * degreePerDirection && offsetAngle < 2 * degreePerDirection) ? "NE"
        : (offsetAngle >= 2 * degreePerDirection && offsetAngle < 3 * degreePerDirection) ? "E"
          : (offsetAngle >= 3 * degreePerDirection && offsetAngle < 4 * degreePerDirection) ? "SE"
            : (offsetAngle >= 4 * degreePerDirection && offsetAngle < 5 * degreePerDirection) ? "S"
              : (offsetAngle >= 5 * degreePerDirection && offsetAngle < 6 * degreePerDirection) ? "SW"
                : (offsetAngle >= 6 * degreePerDirection && offsetAngle < 7 * degreePerDirection) ? "W"
                  : "NW";
  }

  //figure out why loading time is so long
  //decide what to for when a user isnt logged in on the home page
  console.log(localStorage.zip, weather)
  if (weather.temperature == "") {
    return <h1>Loading...</h1>
  }
  return (
    <div style={{ height:"100%", marginLeft:"20px" }}>
      <Header
        as="h1"
        color="blue">
        Today's forecast for {weather.city}, {localStorage.zip} </Header>
      <Label size="big">Current temperature in {localStorage.zip}</Label>
      {weather.temperature + String.fromCharCode(176) + "F"}
      <br /> <br />
      <Label size="big">Humidity: </Label>
      {weather.humidity}%
      <br /> <br />
      <Label size="big">Wind Speed: </Label>
      {weather.windSpeed} miles/hour
      <br /> <br />
      <Label size="big">Wind Direction:</Label>
      {() => console.log(weather.windDirection)}
      {getCardinal(weather.windDirection)}
      <br /> <br />
      <Label size="big">Sunrise:</Label>
      {timeConverter(weather.sunrise)}
      <br /> <br />
      <Label size="big">Sunset:</Label>
      {timeConverter(weather.sunset)}
      <br /> <br />
      <Label size="big">Visibility:</Label>
      {weather.visibility}meters
      <br />  <br />
      <Label size="big">Cloudiness:</Label>
      {weather.cloudy}%
    </div>
  )
}