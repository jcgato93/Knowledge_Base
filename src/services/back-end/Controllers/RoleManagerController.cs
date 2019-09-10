using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using back_end.DTOs.Auth;
using back_end.DTOs.RolManager;
using back_end.models;
using back_end.ViewModels.RolManager;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;

namespace back_end.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class RoleManagerController : ControllerBase
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly SignInManager<ApplicationUser> _signInManager;
        private readonly IConfiguration _configuration;
        private readonly ILogger<RoleManagerController> _logger;
        private readonly RoleManager<IdentityRole> _roleManager;

        public RoleManagerController(UserManager<ApplicationUser> userManager,
            SignInManager<ApplicationUser> signInManager,
            IConfiguration configuration,
            ILogger<RoleManagerController> logger,
            RoleManager<IdentityRole> roleManager)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _logger = logger;
            _roleManager = roleManager;
            _configuration = configuration ?? throw new ArgumentNullException(nameof(configuration));
        }


        [HttpPost()]
        public async Task<ActionResult> CreateRole([FromBody] CreateRolDto model)
        {
            bool existRol = await _roleManager.RoleExistsAsync(model.nameRole);
            if (!existRol)
            {
                var rol = new IdentityRole();
                rol.Name = model.nameRole;
                
                var result = await _roleManager.CreateAsync(rol);
                if (result.Succeeded)
                {                    
                    return Created($"/RoleManager/{rol.Id}", new Rol { Id = rol.Id, Name = rol.Name });                    
                }
                else
                {
                    ModelState.AddModelError(string.Empty, "Invalid attempt.");
                    return BadRequest(ModelState);
                }
            }
            else
            {
                return BadRequest();
            }
        }

        [HttpGet]
        public ActionResult<IEnumerable<Rol>> GetRoles()
        {
            var roles =  _roleManager.Roles.Select(x=> new { x.Name ,x.Id}).ToList();
            return Ok(roles);
        }


        [HttpGet("{roleId}",Name ="GetRol")]
        public async Task<ActionResult> GetRole(string roleId)
        {
            
                var result = await _roleManager.FindByIdAsync(roleId);
                if(result != null)
                {
                    var rol = new Rol();
                    rol.Name = result.Name;
                    rol.Id = result.Id;

                    return Ok(rol);
                }

                return NotFound();
            
        }

        [HttpPut("RolId/{roleId}")]
        public async Task<ActionResult> GetRole(string roleId,[FromBody]AddUserToRolDto userInfo)
        {
            var user = await _userManager.FindByEmailAsync(userInfo.Email);
            var rol = await _roleManager.FindByIdAsync(roleId);

            if(user != null && rol != null)
            {
                var isInRole = await _userManager.IsInRoleAsync(user,rol.Name);
                if (isInRole)
                {
                    return Ok();
                }

                var result = await _userManager.AddToRoleAsync(user, rol.Name);
                if (result.Succeeded)
                {
                    return Ok();
                }

                return BadRequest();
            }

            return NotFound();
        }

        [HttpDelete("{roleId}")]
        public async Task<ActionResult> DeleteRole(string roleId)
        {
            var rol = await _roleManager.FindByIdAsync(roleId);
            if(rol != null)
            {
                var result = await _roleManager.DeleteAsync(rol);
                if (result.Succeeded)
                {
                    return NoContent();
                }
                else
                {
                    ModelState.AddModelError(string.Empty, "Invalid attempt.");
                    return BadRequest(ModelState);
                }

            }

            return NotFound();
        }

    }
}