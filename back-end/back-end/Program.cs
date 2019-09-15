using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;

using Serilog;
using Serilog.Core;
using Serilog.Events;
using Serilog.Sinks.Elasticsearch;
using Serilog.Sinks.File;

namespace back_end
{
    public class Program
    {
        public static void Main(string[] args)
        {
            Log.Logger = new LoggerConfiguration()
            .MinimumLevel.Debug()
            .MinimumLevel.Override("Microsoft", LogEventLevel.Information)
            .Enrich.FromLogContext()
              .WriteTo.Elasticsearch(new ElasticsearchSinkOptions(new Uri("http://elasticsearch:9200"))
              {
                  AutoRegisterTemplate = true,
                  AutoRegisterTemplateVersion = AutoRegisterTemplateVersion.ESv7                  
              }).CreateLogger();



            try
            {
                Log.Information("Starting web host");
                CreateWebHostBuilder(args).Build().Run();
                
            }
            catch (Exception ex)
            {
                Log.Fatal(ex, "Host terminated unexpectedly");                
            }
            finally
            {
                Log.CloseAndFlush();
            }

        }

        public static IWebHostBuilder CreateWebHostBuilder(string[] args) =>
            WebHost.CreateDefaultBuilder(args)
                 .ConfigureAppConfiguration((env, config) =>
                 {
                     // aquí colocamos la configuración de proveedores 
                     var environment = env.HostingEnvironment.EnvironmentName;
                     config.AddJsonFile("appsettings.json", optional: true, reloadOnChange: true);
                     config.AddJsonFile($"appsettings.{environment}.json", optional: true, reloadOnChange: true);
                     config.AddEnvironmentVariables();

                     if (args != null)
                     {
                         config.AddCommandLine(args);
                     }
                 })
                .UseStartup<Startup>()
                .UseSerilog();
    }
}
