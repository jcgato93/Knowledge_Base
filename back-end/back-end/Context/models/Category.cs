using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace back_end.models
{
    public class Category
    {
        [Key]
        public string Id { get; set; }

        [Required]
        [StringLength(100, ErrorMessage = "The {0} must be at least {2} and at max {1} characters long.", MinimumLength = 1)]
        [Display(Name = "Category Name")]
        public string Name { get; set; }        

        public virtual ICollection<Post_Category> Post_Categories { get; set; }
    }
}