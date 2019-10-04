using back_end.ViewModels.Category;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace back_end.ViewModels.Post
{
    public class PostViewModel
    {
        
        public string IdPost { get; set; }
        
        public string Title { get; set; }

        public string Description { get; set; }

        /// <summary>
        /// Content Post in Html
        /// </summary>
        public string Content { get; set; }
        
        public List<string> KeyWords { get; set; }

        public List<CategoryViewModel> Categories { get; set; }

        public string AuthorId { get; set; }

        public DateTime CreatedAt { get; set; }

        public PostViewModel()
        {
            this.Categories = new List<CategoryViewModel>();
        }
    }
}
