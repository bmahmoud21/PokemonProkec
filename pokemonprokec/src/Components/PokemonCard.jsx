function PokemonCard({ pokemon }) {
    return (
        <div className="pokemon-card">
            <img src={`http://localhost:5255${pokemon.gifUrl}`} className="cardimg" alt={`${pokemon.name} gif`} />
            <img src="./src/imgs/card.png" className="card" alt="card" />
            <div className="pokemon-info">
                <h3 className = "pokemonname">{pokemon.name}</h3>
                <div className="sum">
                    <p>{pokemon.summary}</p>
                </div>
            </div>
        </div>
    );
}
export default PokemonCard;
