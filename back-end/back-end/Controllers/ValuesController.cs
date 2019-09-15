using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using back_end.Domain.Services.Storage;
using back_end.Helpers.Filters;
using back_end.Models;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace back_end.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [ServiceFilter(typeof(CustomActionFilter))]
    //[Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    public class ValuesController : ControllerBase
    {

        private readonly ILogger<ValuesController> _logger;   

        public ValuesController(ILogger<ValuesController> logger)
        {
            _logger = logger;           
        }

        // GET api/values
        [HttpGet]
        public ActionResult<IEnumerable<string>> Get()
        {            
            return new string[] { "value1", "value2", DateTime.Now.Second.ToString() };
        }

        // GET api/values/5
        [HttpGet("{id}")]
        [ResponseCache(VaryByHeader = "User-Agent", Duration = 30)]
        public ActionResult<string> Get(int id)
        {
             _logger.LogInformation($"oh hai there! : {DateTime.UtcNow}");

            try
            {
                throw new Exception("oops. i haz cause error in UR codez.");
            }
            catch (Exception ex)
            {
                _logger.LogCritical("ur app haz critical error", ex);
                _logger.LogError(ex, "ur code iz buggy.");
            }
            return DateTime.Now.Second.ToString();
        }
      

        // POST api/values
        [HttpPost, DisableRequestSizeLimit]
        public async Task<ActionResult> Post()
        {

            return Ok();
        }

        // PUT api/values/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/values/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }

        
    }
}
