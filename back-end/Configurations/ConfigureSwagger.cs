using Microsoft.Extensions.DependencyInjection;
using Swashbuckle.AspNetCore.Swagger;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Reflection;
using System.Threading.Tasks;

namespace back_end.Configurations
{
    public static partial class ConfigurationExtensions
    {
        public static IServiceCollection ConfigureSwagger(this IServiceCollection services)
        {
            services.AddSwaggerGen(config =>
            {
                config.SwaggerDoc("v1", new Info
                {
                    Title = "Knowledge Base API",
                    Version = "v1",
                    Description = "Knowledge Base API",
                    TermsOfService = "N/A",
                    License = new License()
                    {
                        Name = "MIT",
                        Url = "https://opensource.org/licenses/MIT"
                    },
                    Contact = new Contact()
                    {
                        Name = "Juan Camilo Castillo",
                        Url = "https://juan-castillo.web.app/"
                    }
                });

                var security = new Dictionary<string, IEnumerable<string>>
                {
                    {"Bearer", new string[0] }
                };

                config.AddSecurityDefinition("Bearer", securityScheme: new ApiKeyScheme
                {
                    Description = "JWT Authorization header using the bearer scheme",
                    Name = "Authorization",
                    In = "header",
                    Type = "apiKey"
                });
                config.AddSecurityRequirement(security);

                var xmlFile = $"{Assembly.GetExecutingAssembly().GetName().Name}.xml";
                var xmlPath = Path.Combine(AppContext.BaseDirectory, xmlFile);
                config.IncludeXmlComments(xmlPath);
            });

            return services;
        }
    }
}
