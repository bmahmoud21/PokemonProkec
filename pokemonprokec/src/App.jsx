import './App.css'
import React, { useEffect, useState } from "react";
import background from "/src/imgs/bkgrd.jpg";
import pokedeximg from "/src/imgs/pokedex.png";
import PokemonCard from './Components/PokemonCard.jsx';
import poof from '/src/imgs/poof.gif';
import finished from '/src/imgs/End.png'
import pikachu from '/src/imgs/pikachu.gif'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';


function App() {
    const delay = (ms) => new Promise((res) => setTimeout(res, ms));

    const [pokemonList, setPokemonList] = useState([]);
    const [uiStates, setUiStates] = useState({});
    const [guestPokemon, setGuestPokemon] = useState([]);
    const allCaught = pokemonList.every(pokemon => uiStates[pokemon.name]?.pokedex);


    useEffect(() => {
        // Read from localStorage, but do NOT clear or overwrite selectedPokemon
        const selectedFromStorage = JSON.parse(localStorage.getItem('selectedPokemon')) || [];

        fetch("http://localhost:5255/api/pokemon")
            .then((res) => res.json())
            .then((data) => {
                const selectedIds = selectedFromStorage.map(p => p.id);
                const filteredData = data.filter(p => selectedIds.includes(p.id));

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

                setPokemonList(filteredData);
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
                isVisible: true,
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
                <img src='/src/imgs/findthatpokemon.png' className="topimage"></img>
                <Link to="/Binder">
                    <button><img className="pokemonbinderimg" src='/src/imgs/pokemonbinder.png'></img></button>
                </Link>
            </div>

            {allCaught && (
                <>
                    <img className="pikachuleft" src={pikachu}></img> 
                    <img className="pikachuright" src={pikachu}></img> 
                    <img className="endtitle" src={finished}></img>
                </>
            )}

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
                                    <>
                                        <button
                                            onClick={() => togglePokemon(pokemon.name)}
                                            className="button"
                                        >
                                        {/*the pokemon buttons*/}
                                            <img
                                                src={`http://localhost:5255${pokemon.imageUrl}`}
                                                alt={pokemon.name}
                                                className="pokemon-img"
                                            />
                                        </button>
                                    </>

                                )}

                                {/*makes page unclickable*/}
                                {state.isVisible && (
                                    <div className="unclickable"></div>
                                )}

                                {/*throwing the pokeball*/}
                                {state.showPoof && (
                                    <>
                                        <img src={`${poof}?t=${Date.now()}`} className="poof" />
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
                                    src={`http://localhost:5255${pokemon.pokedex}`}
                                    className={state.pokedex ? "pokedexInactive" : "pokedexActive"}
                                />
                            );
                        })}

                    </div>

            </div>
            </div>
        </div>
    );

}
export default App;
