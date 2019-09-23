using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace back_end.DTOs.Post
{
    public class PostEdit
    {
        public string Title { get; set; }

        /// <summary>
        /// Content Post
        /// </summary>
        public string Content { get; set; }

        /// <summary>
        /// Must be an array of key works e.g  ["treasury","transactions","others"]
        /// </summary>
        public List<string> KeyWords { get; set; }

        /// <summary>
        /// Categories Id
        /// </summary>
        public List<string> CategoriesId { get; set; }
    }
}
