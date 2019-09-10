using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace back_end.models
{
    public class ApplicationUser : IdentityUser
    {
        // More properties
        [Required]
        public bool IsEnabled{ get; set; }
        
        public string Description { get; set; }

        public string AvatarImgUrl { get; set; }

        public virtual ICollection<Post> Posts { get; set; }
    }
}
