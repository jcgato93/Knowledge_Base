using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using back_end.Configurations;
using back_end.Helpers.Filters;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using AutoMapper;
using Swashbuckle.AspNetCore.Swagger;
using System.Reflection;
using System.IO;

[assembly: ApiConventionType(typeof(DefaultApiConventions))]

namespace back_end
{
    public class Startup
    {        
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;           
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {                        
            // Must be first meddleware
            services.AddCors();
           
            // Enable Caching
            services.AddResponseCaching();

            // Filters
            services.ConfigureFilters();

            // AutoMapper
            services.AddAutoMapper(typeof(Startup));

            // Swagger
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

                var xmlFile = $"{Assembly.GetExecutingAssembly().GetName().Name}.xml";
                var xmlPath = Path.Combine(AppContext.BaseDirectory, xmlFile);
                config.IncludeXmlComments(xmlPath);
            });

            services.AddMvc(options=>
            {
                options.Filters.Add(typeof(CustomExceptionFilter));
            }).SetCompatibilityVersion(CompatibilityVersion.Version_2_2);
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                app.UseHsts();
            }

            app.UseHttpsRedirection();

            // Enable CORS
            app.UseCors(builder => builder.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader());

            // Enable Caching
            app.UseResponseCaching();

            app.UseSwagger();
            app.UseSwaggerUI(config =>
            {
                config.SwaggerEndpoint("/swagger/v1/swagger.json", "Knowledge Base API");
            });

            app.UseMvc();
        }
    }
}
