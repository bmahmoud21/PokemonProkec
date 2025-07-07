import React, { useEffect, useState } from "react";
import './Home.css'
import './App.jsx'
import './First.css'
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import Login from "./Components/Login";
import Register from "./Components/Register";
import UploadPokemon from "./Components/UploadPokemon";

function Home() {
    //all pokemon or just not used
    const [isUsed, setIsUsed] = useState(false);
    const [usedPokemonIds, setUsedPokemonIds] = useState(new Set());

    //for log in
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isGuest, setIsGuest] = useState(false);
    const [showRegister, setShowRegister] = useState(false);

    const [userId, setUserId] = useState(() => localStorage.getItem("userId"));

    const handleLoginOrSignup = async (action = "login", username, password) => {
        if (!username.trim() || !password.trim()) {
            alert("Username and password are required.");
            return;
        }

        const url = action === "register"
            ? "http://localhost:5255/api/auth/register"
            : "http://localhost:5255/api/auth/login";

        try {
            const res = await fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    username: username.trim(),
                    password: password.trim(),
                }),
            });

            if (!res.ok) {
                const errorText = await res.text();
                throw new Error(errorText || "Authentication failed");
            }

            if (action === "register") {
                const message = await res.text();
                alert(message); 
            } else {
                const result = await res.json();
                let userId, token;
                if (typeof result === "number") {
                    userId = result;
                    token = null;
                } else {
                    userId = result.userId;
                    token = result.token;
                }
                localStorage.setItem("userId", userId);
                localStorage.setItem("token", token);
                setUserId(userId);
                setIsAuthenticated(true);
            }

        } catch (err) {
            console.error(err);
            alert("Login/Signup failed: " + err.message);
        }
    };

    useEffect(() => {
        const token = localStorage.getItem("token");

        // Prevent running the fetch if userId is undefined
        if (!isAuthenticated || !userId || !token) return;

        fetch(`http://localhost:5255/api/userpokemon/selected/${userId}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(res => {
                if (!res.ok) throw new Error("Failed to fetch saved Pokémon");
                return res.json();
            })
            .then(data => {
                setSelectedPokemon([]);
                const usedIds = new Set(data.map(p => p.id));
                setUsedPokemonIds(usedIds);
            })
            .catch(err => console.error("Error loading saved Pokémon:", err));
    }, [isAuthenticated, userId]); 


    const [pokemonList, setPokemonList] = useState([]);
    const [selectedPokemon, setSelectedPokemon] = useState([]);
    const navigate = useNavigate();

    //only show 12 at a time on each page
    const [currentPage, setCurrentPage] = useState(0);
    const pageSize = 12;

    useEffect(() => {
        if (!isAuthenticated || !userId) return;

        const url = isUsed
            ? `http://localhost:5255/api/pokemon/unused/${userId}`
            : "http://localhost:5255/api/pokemon";

        fetch(url)
            .then((res) => res.json())
            .then((data) => {
                setPokemonList(data);
                setCurrentPage(0); // Optionally reset to first page on toggle
            })
            .catch((err) => console.error("Error fetching Pokemon:", err));
    }, [isUsed, isAuthenticated, userId]);

    const filteredPokemon = pokemonList;
    const paginatedPokemon = filteredPokemon.slice(currentPage * pageSize, (currentPage + 1) * pageSize);
    const maxPage = Math.ceil(filteredPokemon.length / pageSize) - 1;

    //only nine pokemon allowed to be chosen
    const handlePokemonSelect = (pokemon) => {
        if (selectedPokemon.find(p => p.id === pokemon.id)) {
            setSelectedPokemon(selectedPokemon.filter(p => p.id !== pokemon.id));
        } else if (selectedPokemon.length < 9) {
            setSelectedPokemon([...selectedPokemon, pokemon]);
        }
    };

    //can only hit the ready button when nine are chosen
    const handleStartGame = async () => {
        if (selectedPokemon.length !== 9) return;

        // Save selected Pokemon for both guests and logged-in users
        localStorage.setItem("selectedPokemon", JSON.stringify(selectedPokemon));

        if (isGuest) {
            navigate('/FindThatPokemon');
            return;
        }

        const userId = localStorage.getItem("userId");
        if (!userId) {
            alert("Please log in to save your Pokémon.");
            return;
        }

        try {
            const res = await fetch("http://localhost:5255/api/userpokemon/select", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    userId: parseInt(userId),
                    pokemonIds: selectedPokemon.map(p => p.id),
                }),
            });

            if (!res.ok) throw new Error("Failed to save selection");

            // Already saved above
            navigate('/FindThatPokemon');

        } catch (err) {
            console.error(err);
            alert("Unable to save your selection.");
        }
    };

    return (
        <>
            {!isAuthenticated && (
                <div className="login-overlay">
                    <div className="border">
                        <h3 className="signup">Sign Up or Log In</h3>
                        <div className="userpw">
                            {showRegister ? (
                                <Register
                                    onRegister={(username, password) =>
                                        handleLoginOrSignup("register", username, password)
                                    }
                                    onSwitchToLogin={() => setShowRegister(false)}
                                    onGuest={() => {
                                        setIsAuthenticated(true);
                                        setIsGuest(true);
                                    }}
                                />
                            ) : (
                                <Login
                                    onLogin={(username, password) =>
                                        handleLoginOrSignup("login", username, password)
                                    }
                                    onSwitchToRegister={() => setShowRegister(true)}
                                    onGuest={() => {
                                        setIsAuthenticated(true);
                                        setIsGuest(true);
                                    }}
                                />
                            )}
                        </div>
                    </div>
                </div>
            )}

            <div className={isAuthenticated ? "" : "blurred"}>
                <div className="header">
                    <img className="headerimg" src='/src/imgs/FirstHeader.png'></img>
                    <button className="button" onClick={handleStartGame} disabled={selectedPokemon.length !== 9}>
                        <img className="buttonimg" src='/src/imgs/Ready.png' />
                    </button>
                </div>

                {/*button to choose used or all*/}
                {!isGuest && (
                    <button className="used" onClick={() => setIsUsed(prev => !prev)}>
                        {isUsed ? "Show All Pokemon" : "Show only unused"}
                    </button>
                )}

                <div className="firstEverything">
                {/*uploading pokemon*/}
                    <UploadPokemon onPokemonAdded={pokemon => setPokemonList(prevList => [...prevList, pokemon])} />
                    {/*Grass area where you select the pokemon*/}
                    <div className="pokemon-selection-container">
                        <p className="choose">You Have {selectedPokemon.length} Pokemon Selected Out Of 9</p>
                        <div className="pokemon-grid">
                            {paginatedPokemon.map(pokemon => (
                                <div
                                    key={pokemon.id}
                                    className={`pokemon-selection-card ${selectedPokemon.find(p => p.id === pokemon.id) ? 'selected' : ''}`}
                                    onClick={() => handlePokemonSelect(pokemon)}
                                >
                                    <img
                                        src={
                                            pokemon.imageUrl.startsWith('http')
                                                ? pokemon.imageUrl
                                                : `http://localhost:5255${pokemon.imageUrl}`
                                        }
                                        alt={pokemon.name}
                                        className="pokemon-selection-img"
                                    />
                                </div>
                            ))}
                        </div>
                        <button
                            className="arrowbutton left"
                            onClick={() => setCurrentPage(p => Math.max(0, p - 1))}
                            disabled={currentPage === 0}
                        >
                            <img className="leftButton" src='./src/imgs/Arrow.png' alt="Previous" />
                        </button>
                        <button
                            className="arrowbutton right"
                            onClick={() => setCurrentPage(p => Math.min(maxPage, p + 1))}
                        >
                            <img className="rightButton" src='./src/imgs/Arrow.png' alt="Next" />
                        </button>
                    </div>
                    {/*Showing the selected pokemon to the selected box*/}
                    <div className="selected">
                        <div className="selected-pokemon-preview">
                            <div className="selected-grid">
                                {selectedPokemon.map((pokemon, index) => (
                                    <div key={pokemon.id} className="selected-pokemon-mini">
                                        <img
                                            src={`http://localhost:5255${pokemon.imageUrl}`}
                                            className="selected-mini-img"
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/*images*/}
                    <img className="grass" src='./src/imgs/claw.png'></img>
                    <img className="box" src='./src/imgs/box.png'></img>
                    <h3 className="titleSelection">Your Selected Pokemon</h3>
                </div>
            </div>
        </>
    );
}

export default Home;