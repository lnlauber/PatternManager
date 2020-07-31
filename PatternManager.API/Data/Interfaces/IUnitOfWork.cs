using System.Linq;
using System.Threading.Tasks;

namespace PatternManager.API.Data.Interfaces
{
    public interface IUnitOfWork
    {
        IQueryable<T> Get<T>() where T : class;
        T Add<T>(T entity) where T : class;
        void Update<T>(T entity) where T : class;
        void Delete<T>(T entity) where T : class;
        void Commit();
        Task CommitAsync();
    }
}