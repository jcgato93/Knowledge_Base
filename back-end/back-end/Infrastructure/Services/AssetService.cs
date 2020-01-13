using back_end.Domain.Repositories;
using back_end.Domain.Services.Storage;
using back_end.Models;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net.Http.Headers;
using System.Threading.Tasks;

namespace back_end.Infrastructure.Services
{
    public class AssetService : Service<Asset>, IAssetService
    {
        private readonly IAssetRepository _repository;
        private readonly ILogger _logger;
        private readonly IHostingEnvironment _hostingEnvironment;


        public AssetService(IAssetRepository repository, ILogger<Service<Asset>> logger, IHostingEnvironment hostingEnvironment)
            : base(repository, logger)
        {
            _repository = repository;
            _logger = logger;
            _hostingEnvironment = hostingEnvironment;

        }

              
        public async Task<string> UploadFileAsync(IFormFile file)
        {
            try
            {
                _logger.LogInformation("Uploading file");
                // Check valid extension
                string extension = Path.GetExtension(file.FileName);
                var validExtension = GetMimeTypes()[extension];
                if (validExtension == null)
                {
                    _logger.LogWarning("try upload file with wrong extension");
                    return null;
                }

                // Upload and save into the Database
                string folderName = "Upload";
                string webRootPath = _hostingEnvironment.WebRootPath;
                string newPath = Path.Combine(webRootPath, folderName);
                if (!Directory.Exists(newPath))
                {
                    Directory.CreateDirectory(newPath);
                }
                if (file.Length > 0)
                {
                    Asset entity = new Asset();

                    entity.Name = ContentDispositionHeaderValue.Parse(file.ContentDisposition).FileName.Trim('"');
                    entity.Name = entity.Name.Replace(extension,string.Empty) +" "+ DateTime.Now.ToString("yyyy-MM-dd HH:mm ss") + extension;
                    entity.Path = Path.Combine(newPath, entity.Name);

                    using (var stream = new FileStream(entity.Path, FileMode.Create,FileAccess.Write))
                    {
                        await file.CopyToAsync(stream);
                    }

                    

                    _repository.Insert(entity).GetAwaiter();
                    await _repository.Save();
                    
                    _logger.LogInformation("File uploaded ");
                    return entity.Id;
                }
                return null;

            }
            catch (Exception ex)
            {
                _logger.LogCritical(ex.Message);
                return null;
            }
        }

        
        public async Task<DownLoadModel> DownLoadFileAsync(string fileId)
        {
            try
            {
                DownLoadModel model = new DownLoadModel();

                var asset = await GetById(fileId);

                if (asset == null)
                    return null;

                model.ContentType = GetContentType(asset.Path);
                model.FileName = asset.Name;

                model.Memory = new MemoryStream();
                using (var stream = new FileStream(asset.Path, FileMode.Open))
                {
                    await stream.CopyToAsync(model.Memory);
                }
                model.Memory.Position = 0;

                return model;
            }
            catch (Exception ex)
            {
                _logger.LogCritical(ex.Message);               
                return null;
            }
           
        }


        public string GetContentType(string path)
        {
            var types = GetMimeTypes();
            var ext = Path.GetExtension(path).ToLowerInvariant();
            return types[ext];
        }

        private Dictionary<string, string> GetMimeTypes()
        {
            return new Dictionary<string, string>
            {
                {".txt", "text/plain"},
                {".pdf", "application/pdf"},
                {".doc", "application/vnd.ms-word"},
                {".docx", "application/vnd.ms-word"},
                {".xls", "application/vnd.ms-excel"},
                {".xlsx", "application/vnd.openxmlformats officedocument.spreadsheetml.sheet"},
                {".png", "image/png"},
                {".jpg", "image/jpeg"},
                {".jpeg", "image/jpeg"},
                {".gif", "image/gif"},
                {".csv", "text/csv"}
            };
        }
    }
}
