using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace back_end.ViewModels.Auth
{
    public class UserViewModel
    {
        public bool IsEnabled { get; set; }
        public string AvatarImgUrl { get; set; }
        public string Id { get; set; }
        public string UserName { get; set; }
        public string Email { get; set; }
    }
}
