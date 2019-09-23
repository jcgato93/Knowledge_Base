using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace back_end.Domain.Services
{
    public interface IService<TEntity>
        where TEntity : class
    {
        IQueryable<TEntity> GetAll();

        Task<TEntity> GetById(dynamic id);

        Task Insert(TEntity entity);

        Task InsertRange(IEnumerable<TEntity> entities);

        Task Update(TEntity entity);

        Task Delete(dynamic id );
    }
}
