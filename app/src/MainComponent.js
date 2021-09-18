import React, { Component } from "react";
import PropTypes from "prop-types";

import logo from "./logo.png";

class MainComponent extends Component {

    constructor(props, context) {
        super(props);
        this.contracts = context.drizzle.contracts;
    }


    render () {

        return (
            <div className="container">
                <img src={logo} alt="drizzle-logo" />
                
            </div>
        )
    }
}

// legacy context API
// The legacy API will continue working for all 16.x releases.
MainComponent.contextTypes = {
    drizzle: PropTypes.object
}

export default MainComponent;
