//import { useState } from 'react'
//import reactLogo from './assets/react.svg'
//import viteLogo from '/vite.svg'
import './App.css'
import React, { useEffect, useState } from "react";
import background from "./imgs/bkgrd.jpg";
import pokedeximg from "./imgs/pokedex.png";
import PokemonCard from './Components/PokemonCard.jsx';
import poof from './imgs/poof.gif';
import finished from './imgs/End.png'
import pikachu from './imgs/pikachu.gif'


function App() {
    const delay = (ms) => new Promise((res) => setTimeout(res, ms));

    const [pokemonList, setPokemonList] = useState([]);
    const [uiStates, setUiStates] = useState({});

    useEffect(() => {
        fetch("http://localhost:5255/api/pokemon")
            .then((res) => res.json())
            .then((data) => {
                const container = document.querySelector('.background-container');
                const containerWidth = container?.offsetWidth || 400;
                const containerHeight = container?.offsetHeight || 400;

                const initialUIState = {};
                data.forEach((pokemon) => {
                    const minX = 50; 
                    const maxX = containerWidth - 150; 

                    const minY = 50; 
                    const maxY = containerHeight - 150;

                    const randomX = Math.floor(Math.random() * (maxX - minX) + minX);
                    const randomY = Math.floor(Math.random() * (maxY - minY) + minY);


                    initialUIState[pokemon.name] = {
                        showButton: true,
                        showPoof: false,
                        showCard: false,
                        isVisible: false,
                        pokedex: false,
                        position: {
                            top: `${randomY}px`,
                            left: `${randomX}px`,
                        },
                    };
                });

                setPokemonList(data);
                setUiStates(initialUIState);
            })
            .catch((err) => console.error("Error fetching Pokemon:", err));
    }, []);



    async function togglePokemon(name) {
        // Show poof and disable button
        setUiStates((prev) => ({
            ...prev,
            [name]: {
                ...prev[name],
                showPoof: true,
                isVisible: true,
            },
        }));

        await delay(1800);

        // Hide poof, show card
        setUiStates((prev) => ({
            ...prev,
            [name]: {
                ...prev[name],
                showPoof: false,
                showCard: true,
                showButton: false,
            },
        }));
    }

    function catchPokemon(name) {
        // Hide card, show button again, show pokedex active
        setUiStates((prev) => ({
            ...prev,
            [name]: {
                ...prev[name],
                showCard: false,
                showButton: false,
                isVisible: false,
                pokedex: true,
            },
        }));
    }


    return (
        <div className="everything">
            {/*The top header, "Find That Pokemon"*/}
            <div className="topText">
                <img src='./src/imgs/findthatpokemon.png' className="topimage"></img>
            </div>
            {/*the background img for the pokemon finder section*/}
            <div className="allimgs">
                <div className="background-container">
                    <img src={background} className="backgroundimg"></img>


                {/*getting each pokemon*/}
                <div className="pokemon-list">
                    {pokemonList.map((pokemon) => {
                        const state = uiStates[pokemon.name] || {};

                        return (
                            <div key={pokemon.id} className={`pokemon-container ${pokemon.name}`} style={state.position || {}}>
                                {state.showButton && (
                                    <button
                                        onClick={() => togglePokemon(pokemon.name)}
                                        className="button"
                                    >
                                    {/*the pokemon buttons*/}
                                        <img
                                            src={pokemon.imageUrl}
                                            alt={pokemon.name}
                                            className="pokemon-img"
                                        />

                                    </button>
                                )}

                                {/*throwing the pokeball*/}
                                {state.showPoof && (
                                    <>
                                        <img src={`${poof}?t=${Date.now()}`} className="poof" />
                                        <div className="unclickable"></div>
                                    </>
                                )}

                                {/*The Poke Cards*/}
                                {state.showCard && (
                                    <div className="pokemon-card-wrapper">
                                        <PokemonCard pokemon={pokemon} />
                                        <button
                                            onClick={() => catchPokemon(pokemon.name)}
                                            className="cardButton"
                                        >
                                            <div className="btn-text">Catch me!</div>
                                        </button>
                                        <div className="unclickable"></div>
                                    </div>
                                )}
                            </div>
                        );
                    })}
                    </div>
                </div>
                    


                <div className="pokedex-container">
                {/*pokedex image*/}
                    <img src={pokedeximg} className="pokedeximg"></img>

                    {/*showing the pokemon blacked out but then colored when caught*/}
                    <div className="pokedex-grid">
                        {pokemonList.map((pokemon) => {
                            const state = uiStates[pokemon.name] || {};

                            return (
                                <img
                                    key={pokemon.id}
                                    src={pokemon.pokedex}
                                    className={state.pokedex ? "pokedexInactive" : "pokedexActive"}
                                />
                            );
                        })}

                    </div>

            {/*{!showOshoPokex && !showBlastPokex && !showGigSnorlaxPokex && !showMimiPokex && !showMunchPokex && !showSablePokex && !showSnorlaxPokex && !showSquirtlePokex && !showWartortlePokex &&*/}
            {/*    <img className="endtitle" src={finished}></img>*/}
            {/*}*/}

            {/*{!showOshoPokex && !showBlastPokex && !showGigSnorlaxPokex && !showMimiPokex && !showMunchPokex && !showSablePokex && !showSnorlaxPokex && !showSquirtlePokex && !showWartortlePokex &&*/}
            {/*    <img className="pikachuleft" src={pikachu}></img>*/}
            {/*}*/}
            {/*{!showOshoPokex && !showBlastPokex && !showGigSnorlaxPokex && !showMimiPokex && !showMunchPokex && !showSablePokex && !showSnorlaxPokex && !showSquirtlePokex && !showWartortlePokex &&*/}
            {/*    <img className="pikachuright" src={pikachu}></img>*/}
                    {/*    }*/}
            </div>
            </div>
        </div>
    );

}
export default App;
