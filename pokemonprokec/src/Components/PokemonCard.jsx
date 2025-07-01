function PokemonCard({ pokemon }) {
    return (
        <div className="pokemon-card">
            <img src={pokemon.image} className="cardimg" ></img>
            <img src="./src/imgs/card.png" className="card" alt="card">
            </img>
            <div className="pokemon-info">
                <h3>{pokemon.name}</h3>
                <div className="sum">
                    <p>{pokemon.summary}</p>
                </div>
            </div>
        </div>
    );
}

export default PokemonCard;