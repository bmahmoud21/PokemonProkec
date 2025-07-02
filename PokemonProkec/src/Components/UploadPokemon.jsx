import React, { useState } from "react";

function UploadPokemon({ onPokemonAdded }) {
    const [newPokemon, setNewPokemon] = useState({
        name: "",
        summary: "",
        imageUrl: "",
        gifUrl: "",
        pokedex: "",
    });
    const [imageFile, setImageFile] = useState(null);
    const [gifFile, setGifFile] = useState(null);
    const [pokedexFile, setPokedexFile] = useState(null);

    const handleInput = (e) => {
        const { name, value } = e.target;
        setNewPokemon(prev => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleImageFileChange = (e) => setImageFile(e.target.files[0]);
    const handleGifFileChange = (e) => setGifFile(e.target.files[0]);
    const handlePokedexFileChange = (e) => setPokedexFile(e.target.files[0]);

    const handleAddPokemon = async () => {
        let uploadedImageUrl = newPokemon.imageUrl;
        let uploadedGifUrl = newPokemon.gifUrl;
        let uploadedPokedexUrl = newPokemon.pokedex;

        try {
            if (
                !newPokemon.name.trim() ||
                !newPokemon.summary.trim() ||
                !imageFile ||
                !gifFile ||
                !pokedexFile
            ) {
                alert("You must fill out all fields before submitting!");
                return;
            }

            // Upload image
            if (imageFile) {
                const formData = new FormData();
                formData.append("file", imageFile);
                const res = await fetch("http://localhost:5255/api/pokemon/upload", {
                    method: "POST",
                    body: formData,
                });
                if (!res.ok) throw new Error("Image upload failed");
                uploadedImageUrl = await res.text();
            }

            // Upload gif
            if (gifFile) {
                const formData = new FormData();
                formData.append("file", gifFile);
                const res = await fetch("http://localhost:5255/api/pokemon/upload", {
                    method: "POST",
                    body: formData,
                });
                if (!res.ok) throw new Error("GIF upload failed");
                uploadedGifUrl = await res.text();
            }

            // Upload pokedex
            if (pokedexFile) {
                const formData = new FormData();
                formData.append("file", pokedexFile);
                const res = await fetch("http://localhost:5255/api/pokemon/upload", {
                    method: "POST",
                    body: formData,
                });
                if (!res.ok) throw new Error("Pokedex upload failed");
                uploadedPokedexUrl = await res.text();
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
            if (onPokemonAdded) onPokemonAdded(data);

            setNewPokemon({ name: "", summary: "", imageUrl: "", gifUrl: "", pokedex: "" });
            setImageFile(null);
            setGifFile(null);
            setPokedexFile(null);

        } catch (error) {
            console.error(error);
            alert(error.message);
        }
    };

    return (
        <div className="input">
            <img className="inputimg" src='./src/imgs/inputimg.jpg' alt="input" />
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
    );
}

export default UploadPokemon;