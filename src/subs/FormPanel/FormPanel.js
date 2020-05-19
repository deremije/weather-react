import React from "react"
import "./FormPanel.scss"

class FormPanel extends React.Component {
    state = {
        zip_code: "",
        country: ""
    }
    zipCodeHandler = (event) => {
        this.setState({zip_code: event.target.value})
    }
    
    countryHandler = (event) => {
        this.setState({country: event.target.value})
    }
    handleForm = (event) => {
        event.preventDefault()
        this.props.updateNewLocation(this.state.zip_code, this.state.country)
    }
    render() {
        return (
            <div className={"formPanel" + (this.props.zips === 0 ? " fullScreen" : "")}>
                <div className="instructions">
                    Enter a City or Zip Code and a 2-letter Country Code to get weather information
                </div>
                <form onSubmit={this.handleForm}>
                    <input type="text" placeholder="City or Zip" value={this.state.zip_code} onChange={this.zipCodeHandler} />
                    <input type="text" placeholder="Country" value={this.state.country} onChange={this.countryHandler} />
                    <button>Go</button>
                </form>
            </div>
        )    
    }
}

export default FormPanel
