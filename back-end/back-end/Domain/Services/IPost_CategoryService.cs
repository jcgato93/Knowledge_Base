using back_end.models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace back_end.Domain.Services
{
    public interface IPost_CategoryService : IService<Post_Category>
    {
        Task EditRange(IEnumerable<Post_Category> post_Categories);
    }
}
