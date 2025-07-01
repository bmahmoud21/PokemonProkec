using Microsoft.EntityFrameworkCore;
using PokemonApi.Models;

namespace PokemonApi.Data
{
    public class PokemonContext : DbContext
    {
        public PokemonContext(DbContextOptions<PokemonContext> options) : base(options)
        {
        }

        public DbSet<Pokemon> Pokemon { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<UserPokemon> UserPokemons { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

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

            modelBuilder.Entity<User>(entity =>
            {
                entity.HasKey(u => u.UserId);
                entity.Property(u => u.Username).IsRequired().HasMaxLength(100);
                entity.Property(u => u.PasswordHash).IsRequired();
                entity.HasIndex(u => u.Username).IsUnique();
            });

            modelBuilder.Entity<UserPokemon>(entity =>
            {
                entity.ToTable("UserPokemon");
                entity.HasKey(up => up.Id);

                entity.HasOne(up => up.User)
                      .WithMany(u => u.UserPokemons)
                      .HasForeignKey(up => up.UserId)
                      .OnDelete(DeleteBehavior.Cascade);

                entity.HasOne(up => up.Pokemon)
                      .WithMany()
                      .HasForeignKey(up => up.PokemonId)
                      .OnDelete(DeleteBehavior.Cascade);
            });

            SeedData.SeedPokemon(modelBuilder);
        }
    }
}
