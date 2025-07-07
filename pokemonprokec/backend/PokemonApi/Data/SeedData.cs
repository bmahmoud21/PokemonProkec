using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using PokemonApi.Models;
using System;

namespace PokemonApi.Data
{
    public static class SeedData
    {
        public static void SeedPokemon(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Pokemon>().HasData(
                new Pokemon
                {
                    Id = 1,
                    Name = "Squirtle",
                    ImageUrl = "/imgs/squirtle.webp",
                    Summary = "In the Pokémon anime, Squirtles origin story involves a group of abandoned Squirtle known as the Squirtle Squad, who initially cause trouble before becoming firefighters. Ash encounters this group and eventually catches the Squirtle who leads the squad, who becomes a valuable member of his team.",
                    GifUrl = "/imgs/squirtlegif.gif",
                    Pokedex = "/imgs/squirtlepokedex.png"
                },
        new Pokemon
        {
            Id = 2,
            Name = "Wartortle",
            ImageUrl = "/imgs/wartortlegif.gif",
            Summary = "Notably, Ashs Squirtle, the leader of the Squirtle Squad, evolves into a Wartortle in a heartwarming moment. This evolution takes place after they participate in a firefighting competition, where Ashs Squirtle leads the Squirtle Squad to victory and decides to stay with them for further training as elite firefighters.",
            GifUrl = "/imgs/wargif.gif",
            Pokedex = "/imgs/wartortlepokedex.webp"
        },
        new Pokemon
        {
            Id = 3,
            Name = "Mimikyuu",
            ImageUrl = "/imgs/mimikyu.png",
            Summary = "Mimikyu is introduced as a lonely Pokémon who disguises itself as Pikachu to befriend humans, as its true form is said to be so terrifying that seeing it can cause death or illness. Mimikyus backstory, as portrayed in the anime series \"Sun & Moon\", revolves around its desire for connection and its fear of its own appearance.",
            GifUrl = "/imgs/mimikyuucard.gif",
            Pokedex = "/imgs/mimipokedex.jpg"
        },
        new Pokemon
        {
            Id = 4,
            Name = "Sableye",
            ImageUrl = "/imgs/sableye.png",
            Summary = "In the anime, Sableye has appeared in several episodes, often as a creature that enjoys playing tricks on people. In one instance, a Sableye befriends a group of people, highlighting the connection to the imps desire for friendship. Another episode shows a Sableye being tricked by Team Rocket, further emphasizing its vulnerability and desire for connection.",
            GifUrl = "/imgs/sableeyecard.gif",
            Pokedex = "/imgs/sablepokedex.png"
        },
        new Pokemon
        {
            Id = 5,
            Name = "Oshawott",
            ImageUrl = "/imgs/oshowat.gif",
            Summary = "Oshawott is a brave and playful Water-type Pokémon known for its strong sense of justice. In the anime, it’s loyal and determined but can be a little stubborn at times. Despite its small size, Oshawott faces challenges head-on and grows into a reliable and caring friend.",
            GifUrl = "/imgs/osho.gif",
            Pokedex = "/imgs/oshowatpokedex.webp"
        },
        new Pokemon
        {
            Id = 6,
            Name = "Munchlax",
            ImageUrl = "/imgs/munchlax.gif",
            Summary = "Munchlax is a laid-back and always-hungry Pokémon with a big heart. It’s a bit clumsy and loves to snack, but it’s also very loyal and caring toward its friends. In the anime, Munchlax’s easygoing nature hides its surprising strength and determination when needed.",
            GifUrl = "/imgs/munchlaxcard.gif",
            Pokedex = "/imgs/munchpokedex.webp"
        },
        new Pokemon
        {
            Id = 7,
            Name = "Snorlax",
            ImageUrl = "/imgs/snorlax.gif",
            Summary = "Snorlax is a gentle giant known for its love of sleep and huge appetite. Despite being calm and easygoing most of the time, it can be surprisingly strong and protective when its friends are in trouble. In the anime, Snorlax’s relaxed nature hides a powerful and loyal Pokémon.",
            GifUrl = "/imgs/snorlaxgif.gif",
            Pokedex = "/imgs/snorlaxpokedex.webp"
        },
        new Pokemon
        {
            Id = 8,
            Name = "Giga Snorlax",
            ImageUrl = "/imgs/gigsnorlax.webp",
            Summary = "Gigantamax Snorlax is a massive and even more relaxed version of Snorlax, known for its enormous size and unstoppable appetite. While it still loves to nap, its Gigantamax form gives it incredible strength and power in battles. Despite its size, it remains a calm and loyal friend who protects those it cares about.",
            GifUrl = "/imgs/gigsnorlaxcard.gif",
            Pokedex = "/imgs/gigsnorlaxpokedex.webp"
        },
        new Pokemon
        {
            Id = 9,
            Name = "Blastoise",
            ImageUrl = "/imgs/Blast.gif",
            Summary = "Blastoise is a strong and dependable Water-type Pokémon known for its powerful water cannons. Calm and confident, it’s a natural protector and leader in battle. In the anime, Blastoise is loyal and brave, always ready to defend its friends with strength and skill.",
            GifUrl = "/imgs/blastcard.gif",
            Pokedex = "/imgs/blastpokedex.png"
        }

            );
        }
        public static void Initialize(IServiceProvider serviceProvider)
        {
            using var context = serviceProvider.GetRequiredService<PokemonContext>();

            if (context.Pokemon.Any())
            {
                return;  
            }
            context.Pokemon.AddRange(
                new Pokemon
                {
                    Id = 1,
                    Name = "Squirtle",
                    ImageUrl = "/imgs/squirtle.webp",
                    Summary = "In the Pokémon anime, Squirtles origin story involves a group of abandoned Squirtle known as the Squirtle Squad, who initially cause trouble before becoming firefighters. Ash encounters this group and eventually catches the Squirtle who leads the squad, who becomes a valuable member of his team.",
                    GifUrl = "/imgs/squirtlegif.gif",
                    Pokedex = "/imgs/squirtlepokedex.png"
                }  // No comma here
            );

            context.SaveChanges();
        }

    }
}
