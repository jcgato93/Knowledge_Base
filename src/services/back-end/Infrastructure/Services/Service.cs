using back_end.Domain.Repositories;
using back_end.Domain.Services;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace back_end.Infrastructure.Services
{
    public class Service<TEntity> : IService<TEntity>
        where TEntity : class
    {
        private readonly IRepository<TEntity> _repository;
        private readonly ILogger<Service<TEntity>> _logger;

        public Service(IRepository<TEntity> repository,ILogger<Service<TEntity>> logger)
        {
            _repository = repository;
            _logger = logger;
        }

        /// <summary>
        /// Delete
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public async Task Delete(int id)
        {
            try
            {
                await _repository.Delete(id);

                await _repository.Save();
            }
            catch (Exception ex)
            {
                _logger.LogCritical(ex.Message);
                throw new Exception(ex.Message);
            }
        }

        /// <summary>
        /// Get a IQueryable of the TEntity to work with pagination and more
        /// things that maybe need
        /// </summary>
        /// <returns></returns>
        public IQueryable<TEntity> GetAll()
        {
            try
            {
                return _repository.GetAll();
            }
            catch (Exception ex)
            {
                _logger.LogCritical(ex.Message);
                throw new Exception(ex.Message);
            }
            
        }

        /// <summary>
        /// Get TEntity By Id
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public async Task<TEntity> GetById(int id)
        {
            try
            {
                return await _repository.GetById(id);
            }
            catch (Exception ex) 
            {
                _logger.LogCritical(ex.Message);
                throw new Exception(ex.Message);
            }
            
        }

        /// <summary>
        /// Insert 
        /// </summary>
        /// <param name="entity"></param>
        /// <returns></returns>
        public async Task Insert(TEntity entity)
        {
            try
            {
                await _repository.Insert(entity);

                await _repository.Save();
            }
            catch (Exception ex)
            {
                _logger.LogCritical(ex.Message);
                throw new Exception(ex.Message);
            }
        }

        /// <summary>
        /// Update according to Id
        /// </summary>
        /// <param name="id"></param>
        /// <param name="entity"></param>
        /// <returns></returns>
        public async Task Update(int id, TEntity entity)
        {
            try
            {
                await _repository.Update(id, entity);

                await _repository.Save();
            }
            catch (Exception ex)
            {
                _logger.LogCritical(ex.Message);
                throw new Exception(ex.Message);
            }

        }
    }
}
