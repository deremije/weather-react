import React from "react"
import "./AddButton.scss"

class AddButton extends React.Component {
    render() {
        return (
            <div className='addButton' onClick={this.props.getNewZip}>
                +
            </div>
        )
    }
}

export default AddButton