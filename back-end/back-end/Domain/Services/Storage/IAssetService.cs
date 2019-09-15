using back_end.Models;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace back_end.Domain.Services.Storage
{
    public interface IAssetService : IService<Asset>
    {
        /// <summary>
        /// Save image in storage and into database
        /// </summary>
        /// <param name="file"></param>
        /// <returns>id of Asset</returns>
        /// <returns>null</returns>
        Task<string> UploadFile(IFormFile file);


        /// <summary>
        /// Get DownLoad model for use a return File in
        /// HttpResponse
        /// </summary>
        /// <param name="fileId"></param>
        /// <returns>DownLoadModel or null</returns>
        Task<DownLoadModel> DownLoadFile(string fileId);
    }
}
