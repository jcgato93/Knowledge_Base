using back_end;
using Microsoft.AspNetCore.Mvc.Testing;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace back_end_test.Controllers
{
    [TestClass]
    public class ValuesControllerTests
    {
        private WebApplicationFactory<Startup> _factory;

        [TestInitialize]
        public void Initialize()
        {
            _factory = new WebApplicationFactory<Startup>();
        }

        [TestMethod]
        public async Task Get_DevuelveArregloDeDosElementos()
        {
            try
            {
                var client = _factory.CreateClient();
                var url = "/api/values";
                var response = await client.GetAsync(url);

                if (!response.IsSuccessStatusCode)
                {
                    Assert.IsTrue(false, "C�digo de estatus no exitoso: " + response.StatusCode);
                }

                var result = JsonConvert.DeserializeObject<string[]>(
                    await response.Content.ReadAsStringAsync());
                Assert.AreEqual(expected: 3, actual: result.Length);
            }
            catch (Exception ex)
            {
                
                throw;
            }
            
        }
    }
}
