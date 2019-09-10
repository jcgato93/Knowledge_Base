using back_end.models;
using back_end.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace back_end.Context
{
    public class ApplicationDbContext : IdentityDbContext<ApplicationUser>
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {

        }


        public DbSet<Asset> Assets { get; set; }
        public DbSet<Category> Categories { get; set; }
        public DbSet<Post> Posts { get; set; }
        public DbSet<Post_Category> Post_Categories { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            builder.Entity<Post_Category>()
            .HasKey(pc => new { pc.PostId, pc.CategoryId });
                builder.Entity<Post_Category>()
                    .HasOne(pc => pc.Post)
                    .WithMany(p => p.Post_Categories)
                    .HasForeignKey(pc => pc.PostId);
                builder.Entity<Post_Category>()
                    .HasOne(pc => pc.Category)
                    .WithMany(c => c.Post_Categories)
                    .HasForeignKey(pc => pc.CategoryId);

            base.OnModelCreating(builder);
        }
    }
}
