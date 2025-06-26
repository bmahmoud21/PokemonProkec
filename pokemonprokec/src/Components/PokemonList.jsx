function PokemonList({ pokemons }) {
    const backendUrl = 'http://localhost:5255';

    return (
        <div>
            {pokemons.map(pokemon => (
                <div key={pokemon.id}>
                    <h3>{pokemon.name}</h3>
                    <img
                        src={`${backendUrl}${pokemon.image}`}
                        alt={pokemon.name}
                    />
                </div>
            ))}
        </div>
    );
}
