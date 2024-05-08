using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using LibraryAPI.data;
using Microsoft.EntityFrameworkCore;

namespace LibraryAPI.Controllers
{
    public class ApplicationDbcontext:DbContext,IDisposable
    {
        public ApplicationDbcontext(DbContextOptions<ApplicationDbcontext>options):base(options)
        {
            AppContext.SetSwitch("Npgsql.EnableLegacyTimestampBehavior", true);
        }  
        public DbSet<UserDetails> userDatails{get; set;}
        public DbSet<OrderDetails> orderDetails{get; set;}
        public DbSet<BookDetails> bookdetails{get; set;}
    }
}