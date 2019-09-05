using back_end.Domain.Services;
using back_end.Infrastructure.Services;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace back_end.Configurations
{
    public static partial class ConfigurationExtensions
    {
        public static IServiceCollection ConfigureScopedService(this IServiceCollection services)
        {
            services.AddTransient<IAssetService, AssetService>();
            services.AddTransient<ICategoryService, CategoryService>();
            services.AddTransient<IPostService, PostService>();


            return services;
        }
    }
    
}
