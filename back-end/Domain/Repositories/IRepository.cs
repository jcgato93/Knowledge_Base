using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace back_end.Domain.Repositories
{
    public interface IRepository<TEntity>
        where TEntity: class
    {
        IQueryable<TEntity> GetAll();

        Task<TEntity> GetById(int id);

        Task Insert(TEntity entity);

        Task Update(int id, TEntity entity);

        Task Delete(int id);

        Task Save();
    }
}
