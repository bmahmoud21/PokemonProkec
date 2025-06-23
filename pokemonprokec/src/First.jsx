import React, { useEffect, useState } from "react";
import './Home.css'
import './App.jsx'
import './First.css'
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';

function Home() {

    const [pokemonList, setPokemonList] = useState([]);
    const [selectedPokemon, setSelectedPokemon] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetch("http://localhost:5255/api/pokemon")
            .then((res) => res.json())
            .then((data) => {
                setPokemonList(data);
            })
            .catch((err) => console.error("Error fetching Pokemon:", err));
    }, []);

    //only nine pokemon allowed to be chosen
    const handlePokemonSelect = (pokemon) => {
        if (selectedPokemon.find(p => p.id === pokemon.id)) {
            setSelectedPokemon(selectedPokemon.filter(p => p.id !== pokemon.id));
        } else if (selectedPokemon.length < 9) {
            setSelectedPokemon([...selectedPokemon, pokemon]);
        }
    };

    //can only hit the ready button when nine are chosen
    const handleStartGame = () => {
        if (selectedPokemon.length === 9) {
            localStorage.setItem('selectedPokemon', JSON.stringify(selectedPokemon));
            navigate('/FindThatPokemon')
        }
    }

    //getting the images
    const [imageFile, setImageFile] = useState(null);
    const [gifFile, setGifFile] = useState(null);
    const [pokedexFile, setPokedexFile] = useState(null);

    const [newPokemon, setNewPokemon] = useState({
        name: "",
        summary: "",
        imageUrl: "",
        gifUrl: "",
        pokedex: "",
    });


    const handleImageFileChange = (e) => {
        setImageFile(e.target.files[0]);
    };

    const handleGifFileChange = (e) => {
        setGifFile(e.target.files[0]);
    };

    const handlePokedexFileChange = (e) => {
        setPokedexFile(e.target.files[0]);
    };

    const handleAddPokemon = async () => {
        let uploadedImageUrl = newPokemon.imageUrl;
        let uploadedGifUrl = newPokemon.gifUrl;
        let uploadedPokedexUrl = newPokemon.pokedex;

        try {
            if (imageFile) {
                console.log("Uploading file:", imageFile.name, imageFile.type, imageFile.size);
                const formData = new FormData();
                formData.append("file", imageFile); 

                const res = await fetch("http://localhost:5255/api/pokemon/upload", {
                    method: "POST",
                    body: formData,
                });

                if (!res.ok) {
                    const errorText = await res.text();
                    console.error("Upload failed:", errorText);
                    throw new Error("Image upload failed");
                }

                const uploadedUrl = await res.text();
                console.log("Uploaded to:", uploadedUrl);
                uploadedImageUrl = uploadedUrl;  

            }

            if (gifFile) {
                console.log("Uploading GIF file:", gifFile.name, gifFile.type, gifFile.size);
                const formData = new FormData();
                formData.append("file", gifFile);
                const uploadRes = await fetch("http://localhost:5255/api/pokemon/upload", {
                    method: "POST",
                    body: formData,
                });
                if (!uploadRes.ok) {
                    const errorText = await uploadRes.text();
                    throw new Error(`GIF upload failed: ${errorText}`);
                }
                uploadedGifUrl = await uploadRes.text();
            }


            if (pokedexFile) {
                console.log("Uploading Pokedex file:", pokedexFile.name, pokedexFile.type, pokedexFile.size);
                const formData = new FormData();
                formData.append("file", pokedexFile);
                const uploadRes = await fetch("http://localhost:5255/api/pokemon/upload", {
                    method: "POST",
                    body: formData,
                });
                if (!uploadRes.ok) {
                    const errorText = await uploadRes.text();
                    throw new Error(`Pokedex upload failed: ${errorText}`);
                }
                uploadedPokedexUrl = await uploadRes.text();
            }



            const pokemonData = {
                ...newPokemon,
                imageUrl: uploadedImageUrl,
                gifUrl: uploadedGifUrl,
                pokedex: uploadedPokedexUrl,
            };

            const res = await fetch("http://localhost:5255/api/pokemon", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(pokemonData),
            });

            if (!res.ok) throw new Error("Failed to add Pokémon");

            const data = await res.json();

            setPokemonList(prevList => [...prevList, data]);
            setNewPokemon({ name: "", summary: "", imageUrl: "", gifUrl: "", pokedex: "" });
            setImageFile(null);
            setGifFile(null);
            setPokedexFile(null);

        } catch (error) {
            console.error(error);
            alert(error.message);
        }
    };


    const handleInput = (e) => {
        const { name, value } = e.target;
        setNewPokemon(prev => ({
            ...prev,
            [name]: value,
        }));
    };

    return (
        <div className="border">
            <div className ="header">
                <img className="headerimg" src='./src/imgs/FirstHeader.png'></img>
                <button className="button" onClick={handleStartGame} disabled={selectedPokemon.length !== 9}>
                    <img className="buttonimg" src='./src/imgs/Ready.png' />
                </button>
            </div>
            {/*Input Buttons*/}
            <div className="firstEverything">
                <div className="input">
                    <img className="inputimg" src='./src/imgs/inputimg.jpg'></img>
                    <div className="inputButtons">
                        <div className="input-text">Input Your Pokemon!</div>

                        <label htmlFor="name">Name:</label>
                        <input type="text" id="name" name="name" value={newPokemon.name} onChange={handleInput} />

                        <label htmlFor="summary">Summary:</label>
                        <input type="text" id="summary" name="summary" value={newPokemon.summary} onChange={handleInput} />

                        <label htmlFor="image">Standing Pokemon GIF:</label>
                        <input type="file" id="image" accept="image/*" onChange={handleImageFileChange} />

                        <label htmlFor="gif">Card GIF:</label>
                        <input type="file" id="gif" accept="image/gif" onChange={handleGifFileChange} />

                        <label htmlFor="pokedex">Pokedex Image:</label>
                        <input type="file" id="pokedex" accept="image/*" onChange={handlePokedexFileChange} />

                        <button className="addpokemon" onClick={handleAddPokemon}>Finished!</button>
                    </div>
                </div>
                {/*Grass area where you select the pokemon*/}
                <div className="pokemon-selection-container">
                    <p className="choose">You Have {selectedPokemon.length} Pokemon Selected Out Of 9</p>
                    <div className="pokemon-grid">
                        {pokemonList
                            .filter(p => !selectedPokemon.find(sp => sp.id === p.id))
                            .map((pokemon) => (
                            <div
                                key={pokemon.id}
                                className={`pokemon-selection-card ${selectedPokemon.find(p => p.id === pokemon.id) ? 'selected' : ''
                                    }`}
                                onClick={() => handlePokemonSelect(pokemon)}
                            >
                                <img
                                    src={`http://localhost:5255${pokemon.imageUrl}`}
                                    alt={pokemon.name}
                                    className="pokemon-selection-img"
                                />
                                {selectedPokemon.find(p => p.id === pokemon.id) && (
                                    <div className="selection-indicator">✓</div>
                                )}
                            </div>
                        ))}
                    </div>
                    <button className="arrowbutton">
                        <img className="rightButton" src='./src/imgs/Arrow.webp'></img>
                    </button>
                    <button className="arrowbutton">
                        <img className="leftButton" src='./src/imgs/Arrow.webp'></img>
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
                <h3 className = "titleSelection">Your Selected Pokemon</h3>
            </div>
        </div>
    );

}

export default Home;