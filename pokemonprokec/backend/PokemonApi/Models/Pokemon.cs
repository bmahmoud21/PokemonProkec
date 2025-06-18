
namespace PokemonApi.Models
{
    public class Pokemon
    {
        public int Id { get; set; }
        public string Name { get; set; } = null!;
        public string ImageUrl { get; set; } = null!;
        public string Summary { get; set; } = null!;
        public string GifUrl { get; set; } = null;
        public string Pokedex { get; set; } = null;

    }
}
