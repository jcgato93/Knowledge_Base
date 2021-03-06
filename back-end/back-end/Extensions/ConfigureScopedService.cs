﻿using back_end.Domain.Services;
using back_end.Domain.Services.Storage;
using back_end.Infrastructure.Services;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace back_end.Configurations
{
    public static partial class ConfigurationExtensions
    {        
        public static IServiceCollection ConfigureScopedService(this IServiceCollection services, IConfiguration configuration)
        {
            var storageType = configuration["storage:storageType"];
            switch (storageType)
            {
                case "static":
                    services.AddTransient<IAssetService, AssetService>();
                    break;

                case "azure":
                    services.AddTransient<IAssetService, AzureStorageBlodService>();
                    break;

                default:
                    services.AddTransient<IAssetService, AssetService>();
                    break;
            }
            
            services.AddTransient<ICategoryService, CategoryService>();
            services.AddTransient<IPostService, PostService>();
            services.AddTransient<IPost_CategoryService, PostCategoryService>();


            return services;
        }
    }
    
}
