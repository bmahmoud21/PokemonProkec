import React from "react";
import './Home.css'
import './App.jsx'
import './First.css'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

function Home() {
    return (
        <div className="border">
            <div className ="header">
                <img className="headerimg" src='./src/imgs/FirstHeader.png'></img>
                <Link to="/FindThatPokemon">
                    <button className="button"><img className="buttonimg" src='./src/imgs/Ready.png'></img></button>
                </Link>
            </div>
            <div className="firstEverything">
                <div className="input">
                    <div className="Text"> Add Your Pokemon!</div>
                    <div className="nameinput">name input</div>
                    <div className="summaryinput">Summary input</div>
                    <div className="pokemonimg">Pokemon Gif</div>
                    <div className="cardimginput">Card Image Input!</div>
                    <img className="inputimg" src='./src/imgs/inputimg.jpg'></img>
                </div>
                <img className="grass" src='./src/imgs/claw.png'></img>
                <img className="box" src='./src/imgs/box.png'></img>
            </div>
        </div>
    );

}

export default Home;