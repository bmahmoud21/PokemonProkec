import React from "react";

function UploadPokemon({
    onAddPokemon,
    newPokemon,
    setNewPokemon,
    imageFile,
    setImageFile,
    gifFile,
    setGifFile,
    pokedexFile,
    setPokedexFile
}) {
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

                <button className="addpokemon" onClick={onAddPokemon}>Finished!</button>
            </div>
        </div>
    );
}

export default UploadPokemon;   