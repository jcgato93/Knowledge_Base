using back_end.models;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace back_end.Context
{
    public static class ApplicationDbContextExtensions
    {
        // Insert the default data into database
        public static void EnsureDatabaseSeeded(this ApplicationDbContext context,IServiceProvider serviceProvider)
        {
            CreateRoles(serviceProvider).Wait();
           
        }


        /// <summary>
        /// Create Default Roles and Create User Admin
        /// </summary>
        /// <param name="serviceProvider"></param>
        /// <returns></returns>
        private static async Task CreateRoles(IServiceProvider serviceProvider)
        {
            //initializing custom roles 
            var RoleManager = serviceProvider.GetRequiredService<RoleManager<IdentityRole>>();
            var UserManager = serviceProvider.GetRequiredService<UserManager<ApplicationUser>>();
            var Configuration = serviceProvider.GetRequiredService<IConfiguration>();


            string[] roleNames = { "Admin", "Manager", "Member" };
            IdentityResult roleResult;

            foreach (var roleName in roleNames)
            {
                var roleExist = await RoleManager.RoleExistsAsync(roleName);
                if (!roleExist)
                {
                    //create the roles and seed them to the database: Question 1
                    roleResult = await RoleManager.CreateAsync(new IdentityRole(roleName));
                }
            }
            
            //Here you could create a super user who will maintain the web app
            var poweruser = new ApplicationUser
            {
                EmailConfirmed = true,
                IsEnabled = true,
                UserName = Configuration["UserAdmin:UserName"],
                Email = Configuration["UserAdmin:Email"]
            };
            //Ensure you have these values in your appsettings.json file
            string userPWD = Configuration["UserAdmin:Password"];
            var _user = await UserManager.FindByEmailAsync(Configuration["UserAdmin:Email"]);

            if (_user == null)
            {
                var createPowerUser = await UserManager.CreateAsync(poweruser, userPWD);
                if (createPowerUser.Succeeded)
                {
                    //here we tie the new user to the role
                    await UserManager.AddToRoleAsync(poweruser, "Admin");

                }
            }
        }
    }
}
