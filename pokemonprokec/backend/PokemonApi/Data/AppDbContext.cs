using Microsoft.EntityFrameworkCore;
using PokemonApi.Models;

namespace PokemonApi.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
        }

        public DbSet<Pokemon> Pokemon { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Configure Pokemon entity
            modelBuilder.Entity<Pokemon>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.Property(e => e.Name).IsRequired().HasMaxLength(100);
                entity.Property(e => e.ImageUrl).IsRequired();
                entity.Property(e => e.Summary).IsRequired();
                entity.Property(e => e.GifUrl).IsRequired(false);
                entity.Property(e => e.Pokedex).IsRequired(false);
                entity.HasIndex(e => e.Name).IsUnique();
            });

            // Seed the database with initial Pokemon data
            //SeedData.SeedPokemon(modelBuilder);
        }
    }
}
