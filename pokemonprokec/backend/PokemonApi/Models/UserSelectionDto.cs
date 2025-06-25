using System.Collections.Generic;

public class UserSelectionDto
{
    public int UserId { get; set; }
    public List<int> PokemonIds { get; set; } = new List<int>();
}
