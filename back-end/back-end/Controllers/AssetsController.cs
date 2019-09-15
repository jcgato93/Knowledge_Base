using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using back_end.Domain.Services.Storage;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace back_end.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    //[Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    public class AssetsController : ControllerBase
    {
        private readonly ILogger<AssetsController> _logger;
        private readonly IAssetService _assetService;

        public AssetsController(ILogger<AssetsController> logger,
            IAssetService assetService)
        {
            _logger = logger;            
            _assetService = assetService;
        }

        [HttpPost,RequestSizeLimit(1024)]
        public async Task<ActionResult> Upload()
        {

            try
            {
                var file = Request.Form.Files[0];

                var fileId = await _assetService.UploadFile(file);

                if (fileId == null)
                    return BadRequest();

                var result = new
                {
                    location = "api/assets/download/" + fileId + ""
                };
                return Ok(result);
            }
            catch (Exception ex)
            {
                _logger.LogCritical(ex.Message);
                return BadRequest("Upload Failed: " + ex.Message);
            }
        }



        [HttpGet("download/{id}")]
        [ResponseCache(VaryByHeader = "User-Agent", Duration = 600)]
        public async Task<ActionResult> Download(string id)
        {
            try
            {
                if (id == null)
                    return Content("filename not present");

                var downLoadModel = await _assetService.DownLoadFile(id);

                if (downLoadModel == null)
                    return NotFound();


                return File(downLoadModel.Memory, downLoadModel.ContentType, downLoadModel.FileName);
            }
            catch (Exception ex)
            {
                _logger.LogCritical(ex.Message);
                return BadRequest();
            }
            
        }

    }
}