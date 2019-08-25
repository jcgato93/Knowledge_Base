using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using back_end.Helpers.Filters;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace back_end.Configurations
{
    public static partial class ConfigurationExtensions
    {
        public static IServiceCollection ConfigureFilters(this IServiceCollection services)
        {
            services.AddScoped<CustomActionFilter>();



            return services;
        }
    }

}
