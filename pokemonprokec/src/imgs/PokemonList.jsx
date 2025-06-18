function PokemonList({ pokemons }) {
    const backendUrl = 'http://localhost:5255'; // your backend server URL

    return (
        <div>
            {pokemons.map(pokemon => (
                <div key={pokemon.id}>
                    <h3>{pokemon.name}</h3>
                    <img
                        src={`${backendUrl}${pokemon.image}`}
                        alt={pokemon.name}
                        style={{ maxWidth: '150px' }} // optional styling
                    />
                </div>
            ))}
        </div>
    );
}
