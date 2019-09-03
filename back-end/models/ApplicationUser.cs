using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace back_end.models
{
    public class ApplicationUser: IdentityUser
    {
        // More properties
        
        public bool IsEnabled{ get; set; }
    }
}
