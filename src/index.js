import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route } from "react-router-dom";
/* import React, { useState, useEffect } from "react"; */
import React from "react";
/* ---------------------------------------------------- */

import "./css/reset.css"

import Home from './components/Home.js'


function App() {

    /* const URL_BACK = "https://projeto14-drivenshoes.herokuapp.com"; */

    /* const [token, setToken] = useState(""); */

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
            </Routes>
        </BrowserRouter>
    );
}

ReactDOM.render(<App />, document.querySelector(".root"));