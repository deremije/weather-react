import React from "react"
import "./App.scss"

import Panel from "./subs/Panel/Panel"
import FormPanel from "./subs/FormPanel/FormPanel"
import AddButton from "./subs/AddButton/AddButton"

class App extends React.Component {
    state = {
        zips: [
            // {
            //     zip_code: "",
            //     country: "US",
            //     showFahrenheit: true
            // }
        ],
        showForm: true
    }

    componentDidMount = () => {
        console.log('mounted', localStorage.getItem('zips'))
        if (localStorage.getItem('zips')) {
            this.setState({zips: JSON.parse(localStorage.getItem('zips'))})
        }
    }

    removeZip = (zip) => {
        let newZips = this.state.zips.filter(existingZip => existingZip.zip_code !== zip)
        this.setState({
            zips: newZips,
            showForm: !newZips.length
        })
    }
    
    getNewZip = () => this.setState({showForm: true})

    thisZip = zip_code => this.state.zips.filter(zip => zip.zip_code === zip_code)[0]

    celsiusOrFahrenheit = (zip_code) => {
        let this_zip = this.thisZip(zip_code)
        this_zip.showFahrenheit = !this_zip.showFahrenheit
        this.setState({zips: this.state.zips.map(zip => (zip.zip_code === zip_code) ? this_zip : zip)})
    }

    updateNewLocation = (zip_code, country) => {
        country = country.length ? country : "US"
        if (!this.thisZip(zip_code) && this.state.zips.length < 5) {
            let newEntry = [{
                zip_code: zip_code,
                country: country,
                showFahrenheit: country === "US"
            }]
            localStorage.setItem('zips', JSON.stringify(newEntry.concat(this.state.zips)))
            this.setState(
                {
                    zips: newEntry.concat(this.state.zips),
                    showForm: false
                }
            )
            
        }
    }
    render() {
        const allZips = this.state.zips.map(zip => <Panel zip_code={zip.zip_code} key={zip.zip_code + zip.country} country={zip.country} showFahrenheit={zip.showFahrenheit} celsiusOrFahrenheit={this.celsiusOrFahrenheit} removeZip={this.removeZip} howManyPanels={this.state.zips.length} />)
        return (
            <div className="app">
                {allZips}
                {this.state.showForm && <FormPanel updateNewLocation={this.updateNewLocation} zips={this.state.zips.length}/>}
                {!this.state.showForm && this.state.zips.length > 0 && this.state.zips.length < 5 && <AddButton getNewZip={this.getNewZip} />}
            </div>
        )
    }
}

export default App