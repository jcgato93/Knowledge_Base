using back_end.Context;
using back_end.Domain.Repositories;
using back_end.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace back_end.Infrastructure.Repositories
{
    public class AssetRepository : Repository<Asset>, IAssetRepository
    {
        public AssetRepository(ApplicationDbContext dbContext)
            : base(dbContext)
        {
             
        }
    }
}
