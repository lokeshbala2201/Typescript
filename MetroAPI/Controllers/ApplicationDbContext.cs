using System;
using Microsoft.EntityFrameworkCore;
using MetroAPI.data;

namespace MetroAPI.Controllers
{
    public class ApplicationDbContext:DbContext,IDisposable
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext>options):base(options)
        {
            AppContext.SetSwitch("Npgsql.EnableLegacyTimestampBehavior", true);

        }
        public DbSet<OrderDetails> order{get; set;}
        public DbSet<TravelData> travelData{get; set;}
        public DbSet<PersonDetails> person{get; set;}
    }
    
}