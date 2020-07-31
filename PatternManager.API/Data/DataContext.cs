using System.Linq;
using System.Threading.Tasks;
using PatternManager.API.Data.Interfaces;
using PatternManager.API.Data.Models;
using Microsoft.EntityFrameworkCore;

namespace PatternManager.API.Data
{
    public class DataContext : DbContext, IUnitOfWork
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options){}

        public DbSet<User> Users { get; set; }
        public DbSet<Pattern> Patterns { get; set; }
        public DbSet<Photo> Photos { get; set; }


        IQueryable<T> IUnitOfWork.Get<T>()
        {
            return Set<T>().AsQueryable();
        }
        T IUnitOfWork.Add<T>(T entity)
        {
            var setEntity = Set<T>().Add(entity);
            return setEntity.Entity;
        }
        void IUnitOfWork.Update<T>(T entity)
        {
            Entry<T>(entity).State = EntityState.Modified;
        }
        void IUnitOfWork.Delete<T>(T entity)
        {
            Entry<T>(entity).State = EntityState.Deleted;
        }
        void IUnitOfWork.Commit()
        {
            SaveChanges();
        }
        async Task IUnitOfWork.CommitAsync()
        {
            await SaveChangesAsync();
        } 
    }
}