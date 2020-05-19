import React from "react"
import "./WeatherInfo.scss"


import CloseX from "../reusable/CloseX/CloseX"

class WeatherInfo extends React.Component {
    state = {
        celsius: 0,
        fahrenheit: 0,
    }
    componentDidMount = () => {
        this.setState({
            celsius: (this.props.weatherInfo.main.temp - 273.15).toFixed(1),
            fahrenheit: ((this.props.weatherInfo.main.temp - 273.15) * 9 / 5).toFixed(0),
        })
    }
    render() {
        const numberOfPanels = this.props.howManyPanels === 5 ?  "fivePanels" : this.props.howManyPanels === 4 ?  "fourPanels" : this.props.howManyPanels === 3 ?  "threePanels" : ""
        return (
            <div className={"weatherInfo " + numberOfPanels}>
                <div className='city'>
                    {this.props.weatherInfo.name}, {this.props.weatherInfo.sys.country}
                    {this.props.howManyPanels < 5 ? <br /> : " "}
                    {this.props.zip}
                </div>
                <div className='temperature' onClick={() => this.props.celsiusOrFahrenheit(this.props.zip)}>
                    {this.props.showFahrenheit ? this.state.fahrenheit : this.state.celsius}&deg; {this.props.showFahrenheit ? "F" : "C"}
                </div>
                <div className='conditions'>
                    {this.props.weatherInfo.weather[0].description}
                </div>
                <CloseX removeZip={this.props.removeZip} zip={this.props.zip} />
            </div>
        )
    }
    
}

export default WeatherInfo