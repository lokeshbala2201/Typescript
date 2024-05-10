using System;
using Microsoft.EntityFrameworkCore;
using GroceryAPI.data;



namespace GroceryAPI.Controllers
{
 
    public class ApplicationDbContext : DbContext,IDisposable
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext>options):base(options)
        {
            AppContext.SetSwitch("Npgsql.EnableLegacyTimestampBehavior", true);

        }
        public DbSet<OrderDetails> order{get; set;}
        public DbSet<ItemDetails> ItemData{get; set;}
        public DbSet<UserDetails> Users{get; set;}
    }
}