using back_end.Domain.Repositories;
using back_end.Domain.Services.Storage;
using back_end.Models;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Azure;
using Microsoft.Azure.Storage;
using Microsoft.Azure.Storage.Blob;
using Microsoft.Extensions.Configuration;
using System.IO;
using System.Net.Http.Headers;

namespace back_end.Infrastructure.Services
{
    public class AzureStorageBlodService : Service<Asset>, IAssetService
    {
        private readonly IAssetRepository _repository;
        private readonly ILogger _logger;
        private readonly IHostingEnvironment _hostingEnvironment;
        private readonly IConfiguration _configuration;

        private CloudBlobContainer blobContainer;
        private string containerBlobName;
        private CloudStorageAccount storageAccount;

        public AzureStorageBlodService(IAssetRepository repository, 
            ILogger<Service<Asset>> logger, 
            IHostingEnvironment hostingEnvironment,
            IConfiguration configuration)
            : base(repository, logger)
        {
            _repository = repository;
            _logger = logger;
            _hostingEnvironment = hostingEnvironment;
            _configuration = configuration;


            this.containerBlobName = this._configuration["storage:azureContainerImagesName"];

            var connectionString = this._configuration["storage:connectionString"];
            this.storageAccount = CloudStorageAccount.Parse(connectionString);

            CloudBlobClient cloudBlobClient = storageAccount.CreateCloudBlobClient();

            this.blobContainer = cloudBlobClient.GetContainerReference(containerBlobName);
            blobContainer.CreateIfNotExists();
            blobContainer.SetPermissions(new BlobContainerPermissions
            {
                PublicAccess = BlobContainerPublicAccessType.Blob
            });
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
                model.FilePath = Path.Combine(this.storageAccount.BlobEndpoint.AbsoluteUri , asset.Path);                

                return model;
            }
            catch (Exception ex)
            {
                _logger.LogCritical(ex.Message);
                return null;
            }
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
              
                if (file.Length > 0)
                {
                    Asset entity = new Asset();

                    entity.Name = ContentDispositionHeaderValue.Parse(file.ContentDisposition).FileName.Trim('"');
                    entity.Name = entity.Name.Replace(extension, string.Empty) + " " + DateTime.Now.ToString("yyyy-MM-dd HH:mm ss") + extension;
                    entity.Path = Path.Combine(this.containerBlobName, entity.Name);


                    // Obtiene la referencia del blob dandole el nombre con el que se guardara
                    CloudBlockBlob cloudBlock = this.blobContainer.GetBlockBlobReference(entity.Name);

                    using (var stream = file.OpenReadStream())
                    {
                        await cloudBlock.UploadFromStreamAsync(stream);
                    }

                                  
                    _repository.Insert(entity).GetAwaiter();
                    await _repository.Save();

                    _logger.LogInformation("File uploaded");
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
