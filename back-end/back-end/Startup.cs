﻿using System;
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
using back_end.Context;
using Microsoft.EntityFrameworkCore;
using FluentValidation.AspNetCore;
using Microsoft.Extensions.FileProviders;
using Microsoft.AspNetCore.Http;

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

            // Auth - using idendity
            services.ConfigureAuth(Configuration);

            // Scoped Repositories
            services.ConfigureScopedRepository();

            // Scoped Services
            services.ConfigureScopedService(Configuration);

            // Swagger
            services.ConfigureSwagger();

            services.AddMvc(options=>
            {
                //options.Filters.Add(typeof(CustomExceptionFilter));
                options.Filters.Add<ValidationFilter>();

            }).SetCompatibilityVersion(CompatibilityVersion.Version_2_2)
            .AddJsonOptions(options => options.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore)
            .AddFluentValidation(mvcConfiguration => mvcConfiguration.RegisterValidatorsFromAssemblyContaining<Startup>());
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env,IServiceProvider serviceProvider)
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


            // How to use storage
            var storageType = Configuration["storage:storageType"];
            if(storageType != null && storageType.Equals("azure"))
            {
                var cachePeriod = env.IsDevelopment() ? "600" : "604800";
                app.UseStaticFiles(new StaticFileOptions
                {
                    RequestPath = "/StaticFiles",
                    OnPrepareResponse = ctx =>
                    {
                        // Requires the following import:
                        // using Microsoft.AspNetCore.Http;
                        ctx.Context.Response.Headers.Append("Cache-Control", $"public, max-age={cachePeriod}");
                    }
                });
            }
            else
            {
                app.UseSpaStaticFiles();   
            }
        

            // Enable CORS
            app.UseCors(builder => builder.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader());

            // Enable Caching
            app.UseResponseCaching();

            app.UseSwagger();
            app.UseSwaggerUI(config =>
            {
                config.SwaggerEndpoint("/swagger/v1/swagger.json", "Knowledge Base API");
            });


            var environmentVariable = Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT");
                if (environmentVariable != null && !environmentVariable.Equals("GIT_LAB"))
                {
                    // Configuracion de data por defecto en la base de datos
                    using (var scope = app.ApplicationServices.GetRequiredService<IServiceScopeFactory>().CreateScope())
                    {
                        var context = scope.ServiceProvider.GetService<ApplicationDbContext>();
                        try
                        {
                            context.Database.Migrate();
                        }
                        catch (Exception ex)
                        {
                        Console.WriteLine(ex);
                        }
                    
                        context.EnsureDatabaseSeeded(serviceProvider);
                    }
                }
                    

            app.UseAuthentication();

            app.UseMvc();
        }
    }
}
