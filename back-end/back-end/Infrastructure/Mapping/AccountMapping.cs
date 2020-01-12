using AutoMapper;
using back_end.models;
using back_end.ViewModels.Auth;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace back_end.Infrastructure.Mapping
{
    public class AccountMapping : Profile
    {
        public AccountMapping()
        {
            CreateMap<ApplicationUser, UserViewModel>();
        }
    }
}
