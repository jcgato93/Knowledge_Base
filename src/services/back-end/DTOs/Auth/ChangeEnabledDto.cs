using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace back_end.DTOs.Auth
{
    public class ChangeEnabledDto
    {      
        [Required]        
        [Display(Name = "Is Enabled")]
        public bool IsEnabled { get; set; }
    }
}
