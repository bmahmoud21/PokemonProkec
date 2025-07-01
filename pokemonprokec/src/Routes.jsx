// Main.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import App from './App.jsx';     
import Home from './Home.jsx';   
import First from './First.jsx'

function Main() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<First></First>}></Route>
                <Route path="/FindThatPokemon" element={<App />} />
                <Route path="/Binder" element={<Home />} />
            </Routes>
        </Router>
    );
}

export default Main;
