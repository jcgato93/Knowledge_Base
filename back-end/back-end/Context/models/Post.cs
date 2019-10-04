using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace back_end.models
{
    public class Post
    {
        [Key]
        public string Id { get; set; }

        [Required]
        [StringLength(100, ErrorMessage = "The {0} must be at least {2} and at max {1} characters long.", MinimumLength = 1)]
        [Display(Name ="Title")]
        public string Title { get; set; }


        [StringLength(500, ErrorMessage = "The {0} must be at least {2} and at max {1} characters long.", MinimumLength = 1)]
        [Display(Name = "Title")]
        public string Description { get; set; }


        /// <summary>
        /// Content Post
        /// </summary>
        public string Content { get; set; }

        /// <summary>
        /// Must be an array of key works e.g  ["treasury","transactions","others"]
        /// </summary>
        public string KeyWords { get; set; }

        [Required]
        public string AuthorId { get; set; }

        public DateTime CreatedAt { get; set; }

        public virtual ICollection<Post_Category> Post_Categories { get; set; }


        // ========== Foreign keys ===========
        [ForeignKey(nameof(AuthorId))]
        public virtual ApplicationUser ApplicationUser { get; set; }

    }
}