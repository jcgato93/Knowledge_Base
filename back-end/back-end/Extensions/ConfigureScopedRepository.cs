using back_end.Domain.Repositories;
using back_end.Infrastructure.Repositories;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace back_end.Configurations
{
    public static partial class ConfigurationExtensions
    {
        public static IServiceCollection ConfigureScopedRepository(this IServiceCollection services)
        {
            services.AddScoped<IAssetRepository, AssetRepository>();
            services.AddScoped<ICategoryRepository, CategoryRepository>();
            services.AddScoped<IPostRepository, PostRepository>();
            services.AddScoped<IPost_CategoryRepository, PostCategoryRepository>();

            return services;
        }
    }
    
}
