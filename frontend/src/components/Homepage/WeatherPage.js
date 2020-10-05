import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router'
import a_sky_image from '../images/a_sky_image.jpeg'
import skyimage from '../images/skyimage.jpg'
import { Grid, Container, Header, Message, Image, Button, Search, Input, Label, Popup } from 'semantic-ui-react'
import { createMedia } from "@artsy/fresnel";


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
    description: '',
    city: ''
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

  const { MediaContextProvider, Media } = createMedia({
    breakpoints: {
        sm: 0,
        md: 768,
        ml: 890,
        lg: 1024,
        xl: 1192,
    },
})

  //figure out why loading time is so long
  //decide what to for when a user isnt logged in on the home page
  console.log(localStorage.zip, weather)
  if (weather.temperature == "") {
    return <h1>Loading...</h1>
  }
  return (
    console.log(weather),
       <div className="weather-page" style={{
          backgroundImage: `url(${skyimage})`,
          backgroundSize:'cover',
       }}>
       <MediaContextProvider>
       <Media greaterThanOrEqual="ml">
      <div style={{
        marginBottom: "30px",
        marginTop:"90px",
        border: "2px solid black",
        borderRadius: "25px",
        padding: "20px",
        fontWeight: "bold",
        backgroundColor: "#1b1c1d",
        opacity: "75%"
      }}>
        <Header
          as="h1"
          style={{
            fontSize: "48px",
            textAlign: "center",
            color: "rgb(255,250,250)",
            // color: "#9f6d5c",
            textShadow: "2px 2px black",
          }}
        >
          Today's forecast for {weather.city}, {localStorage.zip} </Header>
      </div>
      </Media>
      </MediaContextProvider>
      <Grid divided columns={2}
      style={{
        justifyContent:"center"
      }} >
        <Grid.Column style={{
          backgroundColor: "rgb(255,250,250, .55)",
          border: "2px solid black",
          borderRadius: "25px",
          boxShadow: "5px 5px",
          padding: "20px",
          marginBottom: "20px",
          marginRight:"5%",
          width:"35%"
        }}>
          <Label
            style={{
              backgroundColor: "green",
              color: "white"
            }}
            size="big">Current temperature in {localStorage.zip}</Label>
          <h1 style={{
            display: "inline",
            color: "black",
            // textShadow: "1px 1px white"
            // fontSize: "18px",
          }}
          >&emsp;{weather.temperature + " " + String.fromCharCode(176) + "F"}</h1>
          <br /> <br />
          <Label style={{
            backgroundColor: "green",
            color: "white"
          }}
            size="big">Humidity: </Label>
          <h1 style={{
            display: "inline",
            color: "black",
            // textShadow: "1px 1px black"
          }}
          >&emsp;{weather.humidity}%</h1>
          <br /> <br />
          <Label style={{
            backgroundColor: "green",
            color: "white"
          }}
            size="big">Wind Speed: </Label>
          <h1 style={{
            display: "inline",
            color: "black",
            // textShadow: "1px 1px black"
          }}
          >&emsp;{weather.windSpeed} miles/hour </h1>
          <br /> <br />
          <Label style={{
            backgroundColor: "green",
            color: "white"
          }}
            size="big">Wind Direction:</Label>
          <h1 style={{
            display: "inline",
            color: "black",
            // textShadow: "1px 1px black"
          }}
          >&emsp;{() => console.log(weather.windDirection)}
            {getCardinal(weather.windDirection)}</h1>
          <br /> <br />
          <Label style={{
            backgroundColor: "green",
            color: "white"
          }}
            size="big">Sunrise:</Label>
          <h1 style={{
            display: "inline",
            color: "black",
            // textShadow: "1px 1px black"
          }}
          >&emsp;{timeConverter(weather.sunrise)}</h1>
          <br /> <br />
          <Label style={{
            backgroundColor: "green",
            color: "white"
          }}
            size="big">Sunset:</Label>
          <h1 style={{
            display: "inline",
            color: "black",
            // textShadow: "1px 1px black"
          }}
          >&emsp;{timeConverter(weather.sunset)}</h1>
          <br /> <br />
          <Label style={{
            backgroundColor: "green",
            color: "white"
          }}
            size="big">Visibility:</Label>
          <h1 style={{
            display: "inline",
            color: "black",
            // textShadow: "1px 1px black"
          }}
          >&emsp;{weather.visibility} meters</h1>
          <br />  <br />
          <Label style={{
            backgroundColor: "green",
            color: "white"
          }}
            size="big">Cloudiness:</Label>
          <h1 style={{
            display: "inline",
            color: "black",
            // textShadow: "1px 1px black"
          }}
          >&emsp;{weather.cloudy}%</h1>
        
          <br />  <br />
            <Label style={{
            backgroundColor: "green",
            color: "white"
          }}
            size="big">Description:</Label>
          <h1 style={{
            display: "inline",
            color: "black",
            // textShadow: "1px 1px black"
          }}
          >&emsp;{weather.description}</h1>
        </Grid.Column>
        <Grid.Column 
        style={{
          backgroundColor: "rgb(255,250,250, .55)",
          border: "2px solid black",
          borderRadius: "25px",
          boxShadow: "5px 5px",
          padding: "20px",
          marginBottom: "20px",
          width:"35%"
        }}>
          
            <Label
            style={{
            backgroundColor: "green",
            color: "white"
          }} size="big" >Current Weather Advisories:</Label>
            {/* <marquee behavior="scroll" direction="left"></marquee> */}
            <ul>
            {/* under 40F */}
            <h1>{weather.temperature < 40 ? <li> It's getting cold! Put a frost cloth out to sheild your crops from the weather</li> : null}</h1>
            {/* No rain vs rain */}
            <h1>{weather.main != "Rain" ? <li>Don't forget to water!</li> : <li>No need to water, the rain will take care of it today</li>}</h1>
            {/* Over 75 and no rain */}
            <h1>{weather.temperature > 75 && weather.main != <li>Rain</li> ? <li>It's hot today, be sure to water a little extra</li> : null}</h1>
            {/* Windy */}
            <h1>{weather.windSpeed > 15 ? <li>It's getting windy! Consider moving potted plants or putting up a wind break</li> : null}</h1>
            <h1></h1>
            </ul>

          
        </Grid.Column>
      </Grid>
      </div>
  )
}