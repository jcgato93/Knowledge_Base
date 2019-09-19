using back_end.Domain.Services;
using FluentValidation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace back_end.DTOs.Category.Validators
{
    public class CategoryCreateValidator : AbstractValidator<CategoryCreate>
    {
        private readonly ICategoryService categoryService;

        public CategoryCreateValidator(ICategoryService categoryService)
        {
            this.categoryService = categoryService;

            RuleFor(x => x.Name)
                .NotEmpty()
                .MaximumLength(100)
                .Must(UniqueName).WithMessage("The Category Exist");
            
        }

        /// <summary>
        /// Check the name is unique
        /// </summary>
        /// <param name="name"></param>
        /// <returns></returns>
        private bool UniqueName(string name)
        {
            var category = categoryService.GetAll().Where(x => x.Name.ToLower().Equals(name)).FirstOrDefault();

            if (category == null)
                return true;
            else
                return false;
        }

   
    }
}
