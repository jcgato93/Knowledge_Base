using back_end.Context;
using back_end.Domain.Repositories;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace back_end.Infrastructure.Repositories
{
    public class Repository<TEntity> : IRepository<TEntity>
        where TEntity : class
    {
        private readonly ApplicationDbContext _dbContext;

        public Repository(ApplicationDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public IQueryable<TEntity> GetAll()
        {
            return _dbContext.Set<TEntity>().AsNoTracking().AsQueryable<TEntity>();
        }

        public async Task<TEntity> GetById(dynamic id)
        {
            return await _dbContext.Set<TEntity>().FindAsync(id);
        }

        public async Task Insert(TEntity entity)
        {
            await _dbContext.Set<TEntity>().AddAsync(entity);
        }

        public async Task Update(dynamic id, TEntity entity)
        {
            TEntity current = await _dbContext.Set<TEntity>().FindAsync(id);
            _dbContext.Entry<TEntity>(current).CurrentValues.SetValues(entity);
            //_dbContext.Set<TEntity>().Update(entity);
        }

        public async Task Delete(dynamic id)
        {
            var entity = await GetById(id);
            _dbContext.Set<TEntity>().Remove(entity);
        }


        public async Task Save()
        {
            await _dbContext.SaveChangesAsync();
        }
    }
}
