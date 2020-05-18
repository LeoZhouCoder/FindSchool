using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace WebApi.Mongo
{
    public interface IRepository<T> where T : IMongoCommon
    {
        T Create();
        Task<IEnumerable<T>> Get(Expression<Func<T, bool>> predicate);
        Task<IEnumerable<T>> FindAsync(Expression<Func<T, bool>> predicate);
        Task<T> GetByIdAsync(object id);
        Task Add(T entity);
        Task Update(T entity);
        Task Delete(T entity);
        Task Drop();
        IQueryable<T> Collection { get; }
        IQueryable<T> GetQueryable(bool includeDeleted = false);
        
    }
}
