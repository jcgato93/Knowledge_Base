using AutoMapper;
using back_end.DTOs.Category;
using back_end.models;
using back_end.ViewModels.Category;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace back_end.Infrastructure.Mapping
{
    public class CategoryMapping : Profile
    {

        public CategoryMapping()
        {
            CreateMap<CategoryCreate, Category>();
            CreateMap<CategoryEditName, Category>();

            CreateMap<Category, CategoryViewModel>()
                .ForMember(
                dest => dest.IdCategory,
                opt => opt.MapFrom(src => src.Id)
                );           
        }
    }
}
