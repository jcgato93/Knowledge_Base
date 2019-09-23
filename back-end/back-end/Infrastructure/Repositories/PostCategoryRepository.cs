using back_end.Context;
using back_end.Domain.Repositories;
using back_end.models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace back_end.Infrastructure.Repositories
{
    public class PostCategoryRepository : Repository<Post_Category>, IPost_CategoryRepository
    {
        public PostCategoryRepository(ApplicationDbContext dbContext) 
            : base(dbContext)
        {
        }
    }
}
