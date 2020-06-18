import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router'
import { Grid, Header, Message, Image, Button, Search, Input, Label, Popup } from 'semantic-ui-react'


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
    cloudy: '',
    main: '',
    description: ''
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
          cloudy: weather.clouds.all,
          main: weather.weather[0].main,
          description: weather.weather[0].description
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
    console.log(weather),
    <div style={{ height: "100%", marginLeft: "20px" }}>
      <Message
        style={{
          backgroundColor: "rgb(255,250,250, .55)"
        }}>
        <Message.Header>Current Weather Advisories:</Message.Header>
        <marquee behavior="scroll" direction="left">
          <Message.List>{weather.temperature < 40 ? "It's getting cold! Put a frost cloth out to sheild your crops from the weather" : null}</Message.List>
          <Message.List>{weather.main != "Rain" ? "Don't forget to water!" : "The rain will take care of it today"}</Message.List>
          <Message.List>{weather.temperature > 75 && weather.main != "Rain" ? "It's hot today, be sure to water a little extra" : null}</Message.List>
          <Message.List>{weather.windSpeed > 15 ? "It's getting windy! Consider moving potted plants or putting up a wind break" : null}</Message.List>
          <Message.List></Message.List>
        </marquee>
      </Message>

      <Header
        as="h1"
        style={{
          fontSize: "48px",
          border: "1px solid black",
          textAlign: "center",
          color:"green",
          // color: "#9f6d5c",
          textShadow:"2px 2px black"
        }}
      >
        Today's forecast for {weather.city}, {localStorage.zip} </Header>
      <Label
        style={{
          backgroundColor: "green",
          color: "white"
        }}
        size="big">Current temperature in {localStorage.zip}</Label>
      <p style={{
        display: "inline",
        fontSize: "18px"
      }}
      >&emsp;{weather.temperature + " " + String.fromCharCode(176) + "F"}</p>
      <br /> <br />
      <Label style={{
        backgroundColor: "green",
        color: "white"
      }}
        size="big">Humidity: </Label>
      <p style={{
        display: "inline",
        fontSize: "18px"
      }}
      >&emsp;{weather.humidity}%</p>
      <br /> <br />
      <Label style={{
        backgroundColor: "green",
        color: "white"
      }}
        size="big">Wind Speed: </Label>
      <p style={{
        display: "inline",
        fontSize: "18px"
      }}
      >&emsp;{weather.windSpeed} miles/hour </p>
      <br /> <br />
      <Label style={{
        backgroundColor: "green",
        color: "white"
      }}
        size="big">Wind Direction:</Label>
      <p style={{
        display: "inline",
        fontSize: "18px"
      }}
      >&emsp;{() => console.log(weather.windDirection)}
        {getCardinal(weather.windDirection)}</p>
      <br /> <br />
      <Label style={{
        backgroundColor: "green",
        color: "white"
      }}
        size="big">Sunrise:</Label>
      <p style={{
        display: "inline",
        fontSize: "18px"
      }}
      >&emsp;{timeConverter(weather.sunrise)}</p>
      <br /> <br />
      <Label style={{
        backgroundColor: "green",
        color: "white"
      }}
        size="big">Sunset:</Label>
      <p style={{
        display: "inline",
        fontSize: "18px"
      }}
      >&emsp;{timeConverter(weather.sunset)}</p>
      <br /> <br />
      <Label style={{
        backgroundColor: "green",
        color: "white"
      }}
        size="big">Visibility:</Label>
      <p style={{
        display: "inline",
        fontSize: "18px"
      }}
      >&emsp;{weather.visibility} meters</p>
      <br />  <br />
      <Label style={{
        backgroundColor: "green",
        color: "white"
      }}
        size="big">Cloudiness:</Label>
      <p style={{
        display: "inline",
        fontSize: "18px"
      }}
      >&emsp;{weather.cloudy}%</p>
    </div>
  )
}