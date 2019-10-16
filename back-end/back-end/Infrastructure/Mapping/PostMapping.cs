using AutoMapper;
using back_end.DTOs.Post;
using back_end.models;
using back_end.ViewModels.Category;
using back_end.ViewModels.Post;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace back_end.Infrastructure.Mapping
{
    public class PostMapping : Profile
    {
        private readonly IMapper mapper;

        public PostMapping(IMapper mapper)
        {
            this.mapper = mapper;
        }

        public PostMapping()
        {
            CreateMap<PostCreate, Post>()                
                .ForMember(dest => dest.KeyWords,
                opt => opt.MapFrom(src => JsonConvert.SerializeObject(src.KeyWords)));


            CreateMap<PostEdit, Post>()                
                .ForMember(dest => dest.KeyWords,
                opt => opt.MapFrom(src => JsonConvert.SerializeObject(src.KeyWords)));


            CreateMap<Post, PostViewModel>()
                .ForMember(
                dest => dest.IdPost,
                opt => opt.MapFrom(src => src.Id)
                )
                .ForMember(
                dest => dest.KeyWords,
                opt => opt.MapFrom(src => JsonConvert.DeserializeObject<List<string>>(src.KeyWords))
                )
                .ForMember(
                dest=> dest.AuthorUserName,
                opt => opt.MapFrom(src => src.ApplicationUser.UserName)
                );                          
        }
    }
}
