import React from 'react'
import { Card, Dimmer, Loader, Image, Segment, Button } from 'semantic-ui-react'
import swal from 'sweetalert'


class HomePage extends React.Component{
  constructor(){
    super()
    this.state = {
      search: "",
      weather: null,
      weatherFourDays: null
    }
  }

  onSearchChange = (event) => {
    this.setState({search: event.target.value})
  }

  searchWeather = (event, zipcode) => {
    event.preventDefault()
    fetch(`https://api.openweathermap.org/data/2.5/weather?zip=${zipcode}&units=imperial&appid=${process.env.REACT_APP_WEATHER_API_KEY}`)
    .then(resp => {
      if (resp.status >= 200 && resp.status <= 299) {
        return resp.json();
      } else {
        swal({
          icon: "warning",
          text: "Enter Valid Zip Code"
      })
      }
    })
    .then(data => data === undefined ? null : this.setState({ weather: data }))
  }

  // searchWeather4Days = (event, zipcode) => {
  //   event.preventDefault()
  //   fetch(`https://api.openweathermap.org/data/2.5/forecast/daily?zip=${zipcode}&units=imperial&appid=${process.env.REACT_APP_WEATHER_WEEKLY_API_KEY}`)
  //   .then(resp => resp.json())
  //   .then(data => {
  //     this.setState({ weatherFourDays: data })
  //   })
  // }

  render(){
    return(
      <div>
        {this.props.user ? 
        <h1 style={{textAlign: 'center', paddingTop: '30px'}}> Welcome to the Weather App {this.props.user.name} !</h1>
          :
        <h1 style={{textAlign: 'center', paddingTop: '30px'}}> Welcome to the Weather App</h1>
        }
        <br />
        <p style={{textAlign: "center"}}> Type in zip code to check your daily weather</p>
        <form 
          style={{textAlign: "center"}}
          onSubmit={(event) => {
            this.searchWeather(event, this.state.search)
            // this.searchWeather4Days(event, this.state.search)
            }} >
          <input
            className= "input-box-home-page"
            placeholder="Enter a Zip Code" 
            onChange={this.onSearchChange} 
            required
          />
          <br />
          <br />
          <Button type='submit'>Submit</Button>
          {/* <input type="submit" /> */}
        </form>
        <br /> 
        {
        this.state.weather === null ?
        <Segment>
          <Dimmer active>
           <Loader size='massive'>Loading</Loader>
          </Dimmer>
          <Image centered className="homepage-dimmer-image" src='https://wi-images.condecdn.net/image/doEYpG6Xd87/crop/2040/f/weather.jpg' />
        </Segment>
        :
        <div>
          <h1 style={{color: 'black', textAlign: 'center'}}>City: {this.state.weather.name}</h1>
          <div className="main-weather" >
            <div className="weather-div">
              <img className="inner-weather-left" src={`http://openweathermap.org/img/wn/${this.state.weather.weather[0].icon}@2x.png`}/>
              <span className="inner-weather-right">{this.state.weather.main.temp} F </span>
            </div>

            <div>
              <h3 style={{textAlign: "center", color: 'white'}}>Currently: {this.state.weather.weather[0].description}</h3>
            </div>
          </div>
          <br />
          <div className="weather-specifics">
              <img src={process.env.PUBLIC_URL + '/wind.png'} alt="wind" style={{height: '50px'}}/>
              <span>{this.state.weather.wind.speed} MPH </span>
              <img src={process.env.PUBLIC_URL + '/humidity.png'} style={{height: '40px'}}/>
              <span>{this.state.weather.main.humidity} F </span>
          </div>
        </div>
        }
        <br /><br /><br />
      </div>
    )
  }
}

export default HomePage
// http://openweathermap.org/img/wn/03d@2x.png