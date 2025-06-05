//import { useState } from 'react'
//import reactLogo from './assets/react.svg'
//import viteLogo from '/vite.svg'
import './App.css'
import React from 'react';
import sableye from "./imgs/Sableye.png";
import mimikyuu from "./imgs/mimikyu.png";
import background from "./imgs/bkgrd.jpg";
import pokedeximg from "./imgs/pokedex.png";
import PokemonCard from './Components/PokemonCard.jsx';
import sablepokedex from './imgs/sablepokedex.png';
import mimipokedex from './imgs/mimipokedex.jpg';
import poof from './imgs/poof.gif';


function App() {
    const delay = (ms) => new Promise((res) => setTimeout(res, ms));

    const [showSablePokex, setSablePokedex] = React.useState(true);
    const [sableShowButton, sableSetShowbutton] = React.useState(true);
    const [showSableButton, sableSetCard] = React.useState(false);
    const [showSablePoof, setSablePoof] = React.useState(false);
    const sableToggleButton = async () => {
        setSablePoof(!showSablePoof);
        await delay(1000);
        sableSetShowbutton(!sableShowButton);
        setTimeout(() => {
            setSablePoof(showSablePoof);
        }, 1000);
        await delay(1000);
        sableSetCard(!showSableButton);
    }
    const handleClickSableCard = () => {
        sableSetCard(!showSableButton);
        setSablePokedex(false);
    }

    const [showMimiPokex, setMimiPokedex] = React.useState(true);
    const [mimiShowButton, mimiSetShowbutton] = React.useState(true);
    const [showMimiButton, mimiSetCard] = React.useState(false);
    const [showMimiPoof, setMimiPoof] = React.useState(false);
    const mimiToggleButton = async () => {
        setMimiPoof(!showMimiPoof);
        await delay(1000);
        mimiSetShowbutton(!mimiShowButton);
        setTimeout(() => {
            setMimiPoof(showMimiPoof);
        }, 1000);
        await delay(1000);
        mimiSetCard(!showMimiButton);
    }
    const handleClickMimiCard = () => {
        mimiSetCard(!showMimiButton);
        setMimiPokedex(false);
    }
   
    function SableCard() {
        return (
            <div className = "cards">
                <PokemonCard pokemon={{
                    image: './src/Components/sableeyecard.gif',
                    name: "Sableye",
                    summary: "Sableye is a mischievous trickster who, like Squirtle, loved pulling pranks and felt lonely, wanting a best friend. While it manipulated May and others into interacting with Ash and Brock, it later regretted its actions."
                }}>
                </PokemonCard>
                <div className="unclickable"></div>
            </div>
        )
    }
    function MimikyuuCard() {
        return (
            <div className = "cards">
                <PokemonCard pokemon={{
                    image: './src/Components/mimikyuucard.gif',
                    name: "Mimikyuu",
                    summary: "Mimikyu is a Pokemon disguised as Pikachu, a disguise that is said to be a curse. Mimikyu's true form is hidden and can cause painful shock or death if seen, making it extremely lonely. It chooses to disguise itself as Pikachu to gain popularity and make friends, as Pikachu is a beloved Pokemon."
                }}>
                </PokemonCard>
                <div className="unclickable"></div>
            </div>
        )
    }

    return (
        <div className="everything">
            <div className="topText">
                <img src='./src/imgs/findthatpokemon.png' className="topimage"></img>
            </div>
            <div className="allimgs">
                <div className="background-container">
                    <img src={background} className = "backgroundimg"></img>

                    <div className="sable">
                        {sableShowButton && <button className="button" onClick={sableToggleButton}>
                            <img className="sableimg" src={sableye}></img>
                        </button>}
                        {showSablePoof && <img className="sablepoof" src={poof}></img>}
                        {showSableButton && <SableCard />}
                        {showSableButton && <button className="cardButton" onClick={handleClickSableCard}><div class="btn-text">Catch me!</div></button>}
                    </div>

                    <div className="mimi">
                        {mimiShowButton && <button className="button" onClick={mimiToggleButton}>
                            <img className="mimiimg" src={mimikyuu}></img>
                        </button>}
                        {showMimiPoof && <img className="mimipoof" src={poof}></img>}
                        {showMimiButton && <MimikyuuCard />}
                        {showMimiButton && <button className="cardButton" onClick={handleClickMimiCard}><div class="btn-text">Catch me!</div></button>}
                    </div>

                </div>

                <div className="pokedex-container">
                    <img src={pokedeximg} className="pokedeximg"></img>
                    {showSablePokex && <img src={sablepokedex} className="sablepokedex"></img>}
                    {!showSablePokex && <img src={sablepokedex} className="sablepokedexActive"></img>}
                    {showMimiPokex && <img src={mimipokedex} className="mimipokedex"></img>}
                    {!showMimiPokex && <img src={mimipokedex} className="mimipokedexActive"></img>}
                </div>
            </div>
        </div>
    );

}
export default App;
