import React, { Component } from "react";
import { generateStore } from "@drizzle/store";
import { DrizzleProvider } from "@drizzle/react-plugin";
import { LoadingContainer } from "@drizzle/react-components";
import { BrowserRouter as Router } from "react-router-dom";

import options from "./drizzleOptions";
import Home from "./Home";

import "./App.css";

const store = {
    drizzleOptions: options
}

const drizzleStore = generateStore(store);

class App extends Component {
    
    render() {
        return (
            <DrizzleProvider options={options} store={drizzleStore}>
                <LoadingContainer>
                    <Router>
                        <Home/>
                    </Router>
                </LoadingContainer>
            </DrizzleProvider>
        );
    }
}

export default App;
