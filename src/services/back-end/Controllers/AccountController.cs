using back_end.DTOs;
using back_end.DTOs.Auth;
using back_end.models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace back_end.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly SignInManager<ApplicationUser> _signInManager;
        private readonly IConfiguration _configuration;
        private readonly ILogger<AccountController> _logger;

        public AccountController(
            UserManager<ApplicationUser> userManager,
            SignInManager<ApplicationUser> signInManager,
            IConfiguration configuration,
            ILogger<AccountController> logger)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _logger = logger;
            _configuration = configuration ?? throw new ArgumentNullException(nameof(configuration));
        }

        [HttpPost("Create")]
        [Authorize]
        public async Task<ActionResult<UserToken>> CreateUser([FromBody] UserInfoDto model)
        {
            var user = new ApplicationUser { UserName = model.Email, Email = model.Email, IsEnabled = true };
            var result = await _userManager.CreateAsync(user, model.Password);
            if (result.Succeeded)
            {
                _logger.LogInformation("User created a new account with password.");

                return BuildToken(model);
            }
            else
            {
                return BadRequest("Username or password invalid");
            }

        }

        [HttpPost("Login")]
        public async Task<ActionResult<UserToken>> Login([FromBody] UserInfoDto model)
        {
            var result = await _signInManager.PasswordSignInAsync(model.Email, model.Password, isPersistent: false, lockoutOnFailure: false);
            if (result.Succeeded)
            {
                var user = await _userManager.FindByEmailAsync(model.Email);
                if (user == null)
                {
                    // Don't reveal that the user does not exist or is not confirmed
                    return BadRequest();
                }

                // Check if the user is Enabled
                if (!user.IsEnabled)
                {
                    // Don't return Unauthorized, Because that mean the user exist
                    //return Unauthorized();
                    _logger.LogInformation("User Disabled try to Log in.");
                    return BadRequest();
                }


                _logger.LogInformation("User logged in.");
                return BuildToken(model);
            }
            else
            {
                ModelState.AddModelError(string.Empty, "Invalid login attempt.");
                return BadRequest(ModelState);
            }
        }


        [HttpPost("Logout")]
        [Authorize]
        public async Task<ActionResult> Logout()
        {
            await _signInManager.SignOutAsync();
            _logger.LogInformation("User logged out.");

            return Ok();
        }


        [Authorize]
        [HttpPost("ChangePassword")]
        public async Task<ActionResult> ChangePassword([FromBody] ChangePasswordDto model)
        {
            var user = await _userManager.FindByEmailAsync(model.Email);
            if (user == null)
            {
                // Don't reveal that the user does not exist or is not confirmed
                _logger.LogInformation("Try to change password with wrong email.");
                return BadRequest();
            }

            var code = await _userManager.GeneratePasswordResetTokenAsync(user);
            var result = await _userManager.ResetPasswordAsync(user, code, model.NewPassword);
            if (result.Succeeded)
            {
                _logger.LogInformation("Password change of "+user.Email);
                return Ok("{'Message':'Password Changed'}");
            }

            foreach (var error in result.Errors)
            {
                ModelState.AddModelError(string.Empty, error.Description);
            }

            _logger.LogError(ModelState.ToString());
            return BadRequest(ModelState);
        }

        [Authorize]
        [HttpPut("ChangeEnabled/{userId}")]
        public async Task<ActionResult> ChangeEnabled(string userId, [FromBody] ChangeEnabledDto model)
        {
            var user = await _userManager.FindByIdAsync(userId);
            if (user == null)
            {
                // Don't reveal that the user does not exist or is not confirmed
                _logger.LogInformation("Try to change Enabled user with wrong userId");
                return BadRequest();
            }

            user.IsEnabled = model.IsEnabled;
            var result = await _userManager.UpdateAsync(user);

            if (result.Succeeded)
            {
                _logger.LogInformation("User Activated with user Email: "+ user.Email);
                return Ok();
            }

            foreach (var error in result.Errors)
            {
                ModelState.AddModelError(string.Empty, error.Description);
            }

            _logger.LogError(ModelState.ToString());
            return BadRequest(ModelState);

        }





        private UserToken BuildToken(UserInfoDto userInfo)
        {
            var claims = new[]
            {
            new Claim(JwtRegisteredClaimNames.UniqueName, userInfo.Email),
            new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())            
            //new Claim("customValue", "customData")
            };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["JWT:key"]));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            // expiration time of token. In this case will be an hour
            var expiration = DateTime.UtcNow.AddDays(7);

            JwtSecurityToken token = new JwtSecurityToken(
               issuer: null,
               audience: null,
               claims: claims,
               expires: expiration,
               signingCredentials: creds);

            return new UserToken()
            {
                Token = new JwtSecurityTokenHandler().WriteToken(token),
                Expiration = expiration
            };
        }
    }
}
