import React from "react";
import './Home.css'
import './App.jsx'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

function Home() {
    return (
        <div className="background">
            <div class="boxes1"></div>
            <div class="boxes2"></div>
            <div class="boxes3"></div>
            <div class="boxes4"></div>
            <div class="boxes5"></div>
            <div class="boxes6"></div>
            <div class="boxes7"></div>
            <div class="boxes8"></div>
            <div class="boxes9"></div>


            <div class="trapezoid-container"></div>
            <div class="flip-container">
                <div class="flipper">
                    <div class="front">
                        <img src ='/src/imgs/binderimg.png'></img>
                    </div>
                    <div class="back">
                        <img src='/src/imgs/binderimg.png'></img>
                    </div>
                </div>
            </div>
            <div class="trapezoid-container-two"></div>
            <Link to="/FindThatPokemon">
                <button className="homebutton"><img className= "homebuttonimg" src = '/src/imgs/Home.png'></img></button>
            </Link>
        </div>
    );

}

export default Home;