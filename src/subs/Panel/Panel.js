import React from "react"
import "./Panel.scss"

import WeatherInfo from "../WeatherInfo/WeatherInfo"

class Panel extends React.Component {
    state = {
        weatherInfo: {}
    }
    close = () => this.props.removeZip(this.props.zip_code)
    componentDidMount() {
        fetch(`https://api.openweathermap.org/data/2.5/weather?${this.props.zip_code == Number(this.props.zip_code) ? "zip" : "q"}=${this.props.zip_code},${this.props.country}&appid=${process.env.REACT_APP_OPEN_WEATHER_API_KEY}`)
            .then(response => response.json())
            .then(response => {
                if (response.cod === "404") this.close()
                else this.setState({weatherInfo: response})
            }
        )
    }
    render() {
        const containerClass = (this.state.weatherInfo.weather && this.state.weatherInfo.weather[0].main.toLowerCase()) + " panel"
        return (
            <div className={containerClass}>
                {this.state.weatherInfo.sys && 
                <WeatherInfo 
                    zip={this.props.zip_code} 
                    weatherInfo={this.state.weatherInfo}
                    showFahrenheit={this.props.showFahrenheit}
                    celsiusOrFahrenheit={this.props.celsiusOrFahrenheit}
                    removeZip={this.props.removeZip} 
                    howManyPanels={this.props.howManyPanels} />}
            </div>
        )    
    }
}

export default Panel
