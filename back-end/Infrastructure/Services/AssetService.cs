using back_end.Domain.Repositories;
using back_end.Domain.Services;
using back_end.Models;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace back_end.Infrastructure.Services
{
    public class AssetService : Service<Asset>, IAssetService
    {
        private readonly IAssetRepository _repository;

        public AssetService(IAssetRepository repository, ILogger<Service<Asset>> logger) 
            : base(repository, logger)
        {
            _repository = repository;
        }        
    }
}
