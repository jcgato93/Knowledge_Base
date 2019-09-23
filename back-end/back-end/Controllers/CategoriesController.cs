using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using back_end.Domain.Services;
using back_end.DTOs.Category;
using back_end.models;
using back_end.ViewModels.Category;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace back_end.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoriesController : ControllerBase
    {
        private readonly ILogger<CategoriesController> _logger;
        private readonly ICategoryService _categoryService;
        private readonly IMapper _mapper;

        public CategoriesController(ILogger<CategoriesController> logger,
            ICategoryService categoryService,
            IMapper mapper)
        {
            _logger = logger;
            _categoryService = categoryService;
            _mapper = mapper;
        }

        /// <summary>
        /// Create category
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        [HttpPost]
        public async Task<ActionResult> CreateCategory([FromBody] CategoryCreate model)
        {
            try
            {                                
                var entity = _mapper.Map<Category>(model);

                await _categoryService.Insert(entity);
                if (entity.Id != null)
                {
                    return Created($"/api/Categories/{entity.Id}", new { IdCategory = entity.Id });
                }
                else
                {
                    ModelState.AddModelError(string.Empty, "Invalid attempt.");
                    return BadRequest(ModelState);
                }                                
            }
            catch (Exception ex)
            {
                _logger.LogCritical(ex.Message);
                return BadRequest();
            }
            
        }


        /// <summary>
        /// Get Categories
        /// </summary>
        /// <param name="page"></param>
        /// <param name="pageSize"></param>
        /// <returns></returns>
        [HttpGet]
        public async Task<ActionResult<IEnumerable<CategoryViewModel>>> GetCategories([FromQuery] int page= 0,[FromQuery] int pageSize = 10)
        {
            try
            {
                return await Task.Run(() =>
                {
                    var categories =
                 _categoryService.GetAll()
                 .OrderByDescending(c => c.Name)
                 .Skip(page * pageSize)
                 .Take(pageSize)
                 .Select(x => _mapper.Map<CategoryViewModel>(x))
                 .ToList();


                   return Ok(categories);
                });
                
            }
            catch (Exception ex)
            {
                _logger.LogCritical(ex.Message);
                return BadRequest();
            }
         
        }

        /// <summary>
        /// Get Category
        /// </summary>
        /// <param name="categoryId"></param>
        /// <returns></returns>
        [HttpGet("{categoryId}")]
        public async Task<ActionResult> GetCategory(string categoryId)
        {
            try
            {
                var result = await _categoryService.GetById(categoryId);
                if (result != null)
                {
                    var category = _mapper.Map<CategoryViewModel>(result);

                    return Ok(category);
                }

                return NotFound();
            }
            catch (Exception ex)
            {
                _logger.LogCritical(ex.Message);
                return BadRequest();
            }

        }


        /// <summary>
        /// Edit the category name
        /// </summary>
        /// <param name="categoryId"></param>
        /// <param name="model"></param>
        /// <returns></returns>
        [HttpPut("{categoryId}")]
        public async Task<ActionResult> EditCategory(string categoryId, [FromBody]CategoryEditName model)
        {
            try
            {
                var category = _mapper.Map<Category>(model);
                category.Id = categoryId;

                await _categoryService.Update(category);

                return NoContent();
            }
            catch (Exception ex)
            {
                _logger.LogCritical(ex.Message);
                return BadRequest();
            }           
        }



        /// <summary>
        /// Delete category
        /// </summary>
        /// <param name="categoryId"></param>
        /// <returns></returns>
        [HttpDelete("{categoryId}")]
        public async Task<ActionResult> DeleteCategory(string categoryId)
        {
            try
            {
                await _categoryService.Delete(categoryId);

                return NoContent();
            }
            catch (Exception ex)
            {
                _logger.LogCritical(ex.Message);
                return BadRequest();
            }
        }

    }
}