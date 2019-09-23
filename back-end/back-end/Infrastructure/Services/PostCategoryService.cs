using back_end.Context;
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
    public class PostCategoryService : Service<Post_Category>, IPost_CategoryService
    {
        private readonly IPost_CategoryRepository repository;
        private readonly ILogger<Service<Post_Category>> logger;
        private readonly ApplicationDbContext context;

        public PostCategoryService(IPost_CategoryRepository repository, 
            ILogger<Service<Post_Category>> logger,
            ApplicationDbContext context) 
            : base(repository, logger)
        {
            this.repository = repository;
            this.logger = logger;
            this.context = context;
        }


        public async Task EditRange(IEnumerable<Post_Category> post_Categories)
        {
            try
            {
                if (post_Categories.Any())
                {
                    // First Remove
                    var listToRemove = context.Post_Categories.Where(x => x.PostId == post_Categories.First().PostId).ToList();

                    context.RemoveRange(listToRemove);

                    await context.SaveChangesAsync();

                    // Add Categories again
                    context.Post_Categories.AddRange(post_Categories);
                    await context.SaveChangesAsync();
                }
            }
            catch (Exception ex)
            {
                logger.LogCritical(ex.Message);
                throw ex;
            }
        }
    }
}
