using Microsoft.EntityFrameworkCore;
using SecondBrain.Auth;
using SecondBrain.Domain;

namespace SecondBrain.DataAccessLayer
{

    public class BrainContext : DbContext
    {
        public DbSet<Note> Notes { get; set; }
        public DbSet<Block> Blocks { get; set; }
        public DbSet<User> Users { get; set; }

        public string DbPath { get; private set; }

        public BrainContext()
        {
            var folder = Environment.SpecialFolder.LocalApplicationData;
            var path = Environment.GetFolderPath(folder);
            DbPath = $"{path}{System.IO.Path.DirectorySeparatorChar}second-brain.db";
        }

        // The following configures EF to create a Sqlite database file in the
        // special "local" folder for your platform.
        protected override void OnConfiguring(DbContextOptionsBuilder options)
            => options.UseSqlite($"Data Source={DbPath}");
    }
}
