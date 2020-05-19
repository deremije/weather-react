import React from "react"
import "./CloseX.scss"

class CloseX extends React.Component {
    close = () => this.props.removeZip(this.props.zip)
    render() {
        return (
            <div className="closeX" onClick={this.close}>
                <span>
                    +
                </span>
            </div>
        )
    }
}


export default CloseX