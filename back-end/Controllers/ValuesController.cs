using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using back_end.Helpers.Filters;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
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
            _logger.LogCritical("test logger critical");
            _logger.LogError("test logger Error");
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
        [HttpPost]
        public void Post([FromBody] string value)
        {
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
