function Pokedex({ image }) {
    return (
        <div className="pokemon-img">
            <img src={image.img}></img>
        </div>
    );
}

export default Pokedex;