using back_end.Domain.Repositories;
using back_end.Domain.Services;
using back_end.models;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace back_end.Infrastructure.Services
{
    public class CategoryService : Service<Category>, ICategoryService
    {
        private readonly ICategoryRepository _repository;

        public CategoryService(ICategoryRepository repository, ILogger<Service<Category>> logger) 
            : base(repository, logger)
        {
            _repository = repository;
        }
    }
}
