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
    public class PostService : Service<Post>, IPostService
    {
        private readonly IPostRepository _repository;

        public PostService(IPostRepository repository, ILogger<Service<Post>> logger) 
            : base(repository, logger)
        {
            _repository = repository;
        }
    }
}
