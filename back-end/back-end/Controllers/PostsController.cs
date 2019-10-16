using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using back_end.Domain.Services;
using back_end.DTOs.Post;
using back_end.models;
using back_end.ViewModels.Post;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Microsoft.AspNetCore.Identity;
using System.Security.Claims;
using Newtonsoft.Json;
using Microsoft.AspNetCore.Authorization;
using back_end.Context;
using Microsoft.EntityFrameworkCore;
using back_end.ViewModels.Category;
using back_end.Domain;

namespace back_end.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class PostsController : ControllerBase
    {
        private readonly ILogger<PostsController> _logger;
        private readonly IPostService _postService;
        private readonly IMapper _mapper;
        private readonly IPost_CategoryService _post_CategoryService;
        private readonly UserManager<ApplicationUser> _userManager;


        public PostsController(ILogger<PostsController> logger,
            IPostService postService,
            IMapper mapper,
            IPost_CategoryService post_CategoryService,
            UserManager<ApplicationUser> userManager)
        {
            _logger = logger;
            _postService = postService;
            _mapper = mapper;
            _post_CategoryService = post_CategoryService;
            _userManager = userManager;
        }

        /// <summary>
        /// Create Post
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        [HttpPost]
        public async Task<ActionResult> CreatePost([FromBody] PostCreate model)
        {
            try
            {
                var entity = _mapper.Map<Post>(model);
                entity.AuthorId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
                entity.CreatedAt = DateTime.Now;

                await _postService.Insert(entity);
                if (entity.Id != null)
                {
                    if (model.CategoriesId.Any())
                    {
                        List<Post_Category> post_Categories = model.CategoriesId.Select(x =>
                         new Post_Category
                         {
                             CategoryId = x,
                             PostId = entity.Id
                         }).ToList();

                        await _post_CategoryService.InsertRange(post_Categories);
                    }


                    return Created($"/api/Posts/{entity.Id}", new { IdPost = entity.Id });
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
        /// Get Posts
        /// </summary>
        /// <param name="page"></param>
        /// <param name="pageSize"></param>
        /// <param name="search"></param>
        /// <returns></returns>
        [HttpGet]
        public async Task<ActionResult<IEnumerable<PostViewModel>>> GetPost([FromQuery] int page= 0, [FromQuery] int pageSize = 10,[FromQuery] string search = "")
        {
            try
            {
                var user = await _userManager.GetUserAsync(HttpContext.User);
                var roles = await _userManager.GetRolesAsync(user);
                var role = roles.FirstOrDefault();

                List<Post> data = new List<Post>();
                IQueryable<Post> query;

                /**
                 Filter role, when is member user just return own post
                 */
                if (role.Equals(RolesEnum.Member.ToString()))
                {
                   query = _postService.GetAll()
                         .Include(x => ((Post_Category)x.Post_Categories).Category)
                         .Include(x => x.ApplicationUser)
                         .Where(x => x.AuthorId == user.Id)                         
                         .AsQueryable();
                }
                else
                {
                    query = _postService.GetAll()
                          .Include(x => ((Post_Category)x.Post_Categories).Category)
                          .Include(x => x.ApplicationUser)
                          .AsQueryable();
                }

                // filter by search
                if (!string.IsNullOrEmpty(search)) { 

                    var searchNormalized = search.ToUpper();
                    query = query.Where(x => x.Title.ToUpper().Contains(searchNormalized) ||
                        x.Description.ToUpper().Contains(searchNormalized) ||
                        x.KeyWords.ToUpper().Contains(searchNormalized) ||
                        x.Post_Categories.FirstOrDefault().Category.Name.ToUpper().Contains(searchNormalized))
                        .AsQueryable();
                }

                data = await query
                          .OrderByDescending(c => c.CreatedAt)
                          .Skip(page * pageSize)
                          .Take(pageSize)
                          .ToListAsync();
                
                IEnumerable<PostViewModel> posts = data.Select(x => _mapper.Map<PostViewModel>(x)).ToList();
                    
                // get categories of each post
                posts = posts.Select(postsList => {
                        var post = data.Where(x => x.Id == postsList.IdPost).First();
                        for (int i = 0; i < post.Post_Categories.Count; i++)
                        {
                            var post_category = post.Post_Categories.ToList()[i];
                            postsList.Categories.Add(
                                _mapper.Map<CategoryViewModel>(post_category.Category)
                                );
                        }
                        return postsList;  
                        }
                        ).ToList(); 

                return Ok(posts);               

            }
            catch (Exception ex)
            {
                _logger.LogCritical(ex.Message);
                return BadRequest();
            }

        }

        
        /// <summary>
        /// GetPost
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpGet("{id}")]
        public async Task<ActionResult> GetPost(string id)
        {
            try
            {
                var data = await 
                         _postService.GetAll()
                         .Include(x => ((Post_Category)x.Post_Categories).Category)
                         .Include(x => x.ApplicationUser)
                         .OrderByDescending(c => c.Title)
                         .Where(p => p.Id == id)
                         .FirstOrDefaultAsync();                
                
                if (data != null)
                {
                    var post = _mapper.Map<PostViewModel>(data);

                    for (int i = 0; i < data.Post_Categories.Count; i++)
                    {
                        var post_category = data.Post_Categories.ToList()[i];
                        post.Categories.Add(
                            _mapper.Map<CategoryViewModel>(post_category.Category)
                         );
                    }

                   

                    return Ok(post);
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
        /// Edit Post
        /// </summary>
        /// <param name="id"></param>
        /// <param name="model"></param>
        /// <returns></returns>
        [HttpPut("{id}")]
        public async Task<ActionResult> EditPost(string id, [FromBody]PostEdit model)
        {
            try
            {
                var entity = _mapper.Map<Post>(model);
                entity.Id = id;
                entity.AuthorId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;                

                await _postService.Update(entity);
                if (model.CategoriesId.Any())
                {
                    List<Post_Category> post_Categories = model.CategoriesId.Select(x =>
                     new Post_Category
                     {
                         CategoryId = x,
                         PostId = entity.Id
                     }).ToList();

                    await _post_CategoryService.EditRange(post_Categories);
                }


                return NoContent();
            }
            catch (Exception ex)
            {
                _logger.LogCritical(ex.Message);
                return BadRequest();
            }
        }


        
        /// <summary>
        /// Delete Post
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpDelete("{id}")]
        public async Task<ActionResult> DeletePost(string id)
        {
            try
            {
                await _postService.Delete(id);

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