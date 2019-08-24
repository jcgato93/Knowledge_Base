using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using back_end.Helpers.Filters;
using Microsoft.AspNetCore.Mvc;

namespace back_end.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [ServiceFilter(typeof(CustomActionFilter))]
    public class ValuesController : ControllerBase
    {
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
