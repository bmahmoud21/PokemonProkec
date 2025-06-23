function PokemonCard({ pokemon }) {
    return (
        <div className="pokemon-card">
            <div className="holographic-wrapper">
                <img src="./src/imgs/card.png" className="card"></img>
            </div>
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