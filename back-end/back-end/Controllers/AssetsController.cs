using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using back_end.Domain.Services.Storage;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
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
        private readonly IConfiguration _configuration;

        public AssetsController(ILogger<AssetsController> logger,
            IAssetService assetService,
            IConfiguration configuration)
        {
            _logger = logger;            
            _assetService = assetService;
            _configuration = configuration;
        }

        [HttpPost,DisableRequestSizeLimit]
        public async Task<ActionResult> Upload()
        {

            try
            {
                var file = Request.Form.Files[0];

                var fileId = await _assetService.UploadFileAsync(file);

                if (fileId == null)
                    return BadRequest();

                DownLoadModel model = await _assetService.DownLoadFileAsync(fileId);

                var result = new
                {
                    //location = "assets/download/" + fileId + ""                    
                    location = model.FilePath
                };
                return Ok(result);
            }
            catch (Exception ex)
            {
                _logger.LogCritical(ex.Message);
                return BadRequest();
            }
        }



        [HttpGet("download/{id}")]        
        public async Task<ActionResult> Download(string id)
        {
            try
            {
                if (id == null)
                    return Content("filename not present");

                /* ========== Return file implementation

                var downLoadModel = await _assetService.DownLoadFile(id);

                if (downLoadModel == null)
                    return NotFound();


                return File(downLoadModel.Memory, downLoadModel.ContentType, downLoadModel.FileName);
                */


                var storageType = this._configuration["storage:storageType"];
                switch (storageType)
                {
                    case "static":
                        {
                            var file = await _assetService.GetById(id);
                            var filePath = Path.Combine(Directory.GetCurrentDirectory(),
                                        "wwwroot", "Upload", file.Name);

                            var contentType = _assetService.GetContentType(file.Path);

                            return PhysicalFile(filePath, contentType);
                        }

                    case "azure":
                        {                            
                            DownLoadModel model = await _assetService.DownLoadFileAsync(id);
                            var contentType = _assetService.GetContentType(model.FilePath);

                            return PhysicalFile(model.FilePath,contentType);
                        }

                    default:
                        return null;
                        
                }
                
            }
            catch (Exception ex)
            {
                _logger.LogCritical(ex.Message);
                return BadRequest();
            }
            
        }

    }
}