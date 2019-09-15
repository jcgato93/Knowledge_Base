using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace back_end.Domain.Services.Storage
{
    public class DownLoadModel
    {
        public MemoryStream Memory { get; set; }

        public string ContentType { get; set; }

        public string FileName { get; set; }
    }
}
