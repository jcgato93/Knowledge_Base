using FluentValidation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace back_end.DTOs.Post.Validators
{
    public class PostEditValidator : AbstractValidator<PostEdit>
    {
        public PostEditValidator()
        {
            RuleFor(x => x.Title)
               .NotEmpty()
               .NotNull()
               .MaximumLength(100);

            RuleFor(x => x.Content)
                .NotNull()
                .NotEmpty();

            RuleFor(x => x.CategoriesId)
                 .NotNull()
                 .Must(x => x.Count > 0).WithMessage("Se debe asignar por lo menos una categoria");            

        }
    }
}
