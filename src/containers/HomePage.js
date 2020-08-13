import React from 'react'
import { Card, Dimmer, Loader, Image, Segment, Button, Icon } from 'semantic-ui-react'


class HomePage extends React.Component{
  constructor(){
    super()
    this.state = {
      search: "",
      weather: null
    }
  }

  onSearchChange = (event) => {
    this.setState({search: event.target.value})
  }

  searchWeather = (event, zipcode) => {
    event.preventDefault()
    fetch(`https://api.openweathermap.org/data/2.5/weather?zip=${zipcode}&units=imperial&appid=${process.env.REACT_APP_WEATHER_API_KEY}`)
    .then(resp => resp.json())
    .then(data => {
      this.setState({ weather: data })
    })
  }

  render(){
    return(
      <div>
        <h1 style={{textAlign: 'center', paddingTop: '30px'}}> Welcome to the Weather App</h1>
        <br />
        <p style={{textAlign: "center"}}> Type in zip code to check your daily weather</p>
        <form 
          style={{textAlign: "center"}}
          onSubmit={(event) => this.searchWeather(event, this.state.search)} >
          <input
            placeholder="Enter a Zip Code" 
            onChange={this.onSearchChange} 
          />
          <br />
          <Button type='submit'>Submit</Button>
          {/* <input type="submit" /> */}
        </form>
        <br /> <br />  <br />
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
          <h1>{this.state.weather.name}</h1>
          <div className="main-weather" >
            <div className="weather-div">
              <img className="inner-weather-left" src={`http://openweathermap.org/img/wn/${this.state.weather.weather[0].icon}@2x.png`}/>
              <span className="inner-weather-right" style={{verticalAlign: 'middle'}}>{this.state.weather.main.temp} F </span>
            </div>

            <div>
              <h3 style={{textAlign: "center", color: 'white'}}>{this.state.weather.weather[0].description}</h3>
            </div>
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