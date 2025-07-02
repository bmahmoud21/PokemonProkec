using System.Collections.Generic;

public class PokemonSelectionDto
{
    public int UserId { get; set; }
    public List<int> PokemonIds { get; set; } = new List<int>();
}
