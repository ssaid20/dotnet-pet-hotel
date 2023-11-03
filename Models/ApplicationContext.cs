using Microsoft.EntityFrameworkCore;

namespace pet_hotel.Models;

public class ApplicationContext : DbContext
{
  public ApplicationContext(DbContextOptions<ApplicationContext> options) : base(options) { }
  public DbSet<PetOwner> PetOwners { get; set; } //setting database table owners
  public DbSet<Pets> Pets { get; set; } //setting DB table pets

  //public DbSet<Transaction> Transaction { get; set; } //setting DB Transaction table
}