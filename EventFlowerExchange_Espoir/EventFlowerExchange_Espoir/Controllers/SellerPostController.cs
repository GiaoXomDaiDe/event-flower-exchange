using EventFlowerExchange_Espoir.Models.DTO;
using EventFlowerExchange_Espoir.Services;
using EventFlowerExchange_Espoir.Services.Impl;
using FirebaseAdmin.Messaging;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace EventFlowerExchange_Espoir.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SellerPostController : ControllerBase
    {
        private readonly ISellerPostService _sellerPostService;
        private readonly IAccountService _accountService;
        private readonly IEventService _eventService;

        public SellerPostController(ISellerPostService sellerPostService, IAccountService accountService, IEventService eventService)
        {
            _sellerPostService = sellerPostService;
            _accountService = accountService;
            _eventService = eventService;
        }

        [HttpGet("get-list-seller-post")]
        public async Task<IActionResult> GetAllSellerPosts()
        {
            var sellerPosts = await _sellerPostService.GetListSellerPosts();
            if (sellerPosts.Count > 0)
            {
                return Ok(new ApiResponse()
                {
                    StatusCode = 200,
                    Data = sellerPosts
                });
            }
            return NotFound("No seller posts.");
        }

        //[HttpPost("create-post")]
        //[Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        //public async Task<IActionResult> CreateNewPost(CreatePostDTO createPost)
        //{
        //    try
        //    {
        //        var identity = HttpContext.User.Identity as ClaimsIdentity;
        //        var userEmail = identity.Claims.FirstOrDefault().Value;
        //        createPost.AccountEmail = userEmail;
        //        await _sellerPostService.CreatePost(createPost);
        //        return Ok(new ApiResponse()
        //        {
        //            StatusCode = 201,
        //            Message = "Create new post successful!",
        //        });
        //    }
        //    catch (Exception ex)
        //    {
        //        return BadRequest(ex.InnerException);
        //    }
        //}
        [HttpPost("create-post")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public async Task<IActionResult> CreateNewPost(CreatePostDTO createPost)
        {
            try
            {
                var identity = HttpContext.User.Identity as ClaimsIdentity;
                var userEmail = identity.Claims.FirstOrDefault().Value;
                var account = await _accountService.GetAccountByEmailAsync(userEmail);
                if (account != null && account.IsSeller == 0)
                {
                    return BadRequest("You don't have permisson on this function!");
                }
                var postOfEvent = await _eventService.GetTotalPostOfEvent(createPost.EventId);
                if (postOfEvent > 0)
                {
                    return BadRequest("You cannot create multiple post of an event!!");
                }
                createPost.AccountEmail = userEmail;
                await _sellerPostService.CreatePost(createPost);
                return Ok(new ApiResponse()
                {
                    StatusCode = 201,
                    Message = "Create new post successful!",
                });
            }
            catch (Exception ex)
            {
                return BadRequest(ex.InnerException);
            }
        }

        [HttpDelete("delete-post")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public async Task<IActionResult> DeletePost(string postId)
        {
            var identity = HttpContext.User.Identity as ClaimsIdentity;
            var userEmail = identity.Claims.FirstOrDefault().Value;
            var account = await _accountService.GetAccountByEmailAsync(userEmail);
            var post = await _sellerPostService.GetSellerPostById(postId);
            if (post != null)
            {
                await _sellerPostService.DeletePost(postId);
                return Ok(new ApiResponse()
                {
                    StatusCode = 200,
                    Message = "Delete post successful!"
                });
            }
            return BadRequest("Not found post!!");
        }
        [HttpPut("update-post-detail")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public async Task<IActionResult> UpdatePost(UpdatePostDto updatePost)
        {
            try
            {
                var identity = HttpContext.User.Identity as ClaimsIdentity;
                var userEmail = identity.Claims.FirstOrDefault().Value;
                var account = await _accountService.GetAccountByEmailAsync(userEmail);
                updatePost.AccountEmail = account.Email;
                await _sellerPostService.UpdatePost(updatePost);
                return Ok(new ApiResponse()
                {
                    StatusCode = 204,
                    Message = "Update post successful!!"
                });
            }
            catch (Exception ex)
            {
                return BadRequest(ex.StackTrace);
            }
        }

        [HttpGet("get-all-posts")]
        public async Task<IActionResult> GetAllPosts()
        {
            var posts = await _sellerPostService.GetListSellerPosts();
            if (posts.Count > 0)
            {
                return Ok(new ApiResponse()
                {
                    StatusCode = 200,
                    Data = posts
                });
            }
            return NotFound("No posts was found!");

        }

        [HttpGet("get-post")]
        public async Task<IActionResult> GetAllPosts(string postId)
        {
            var post = await _sellerPostService.GetSellerPostById(postId);
            if (post != null)
            {
                return Ok(new ApiResponse()
                {
                    StatusCode = 200,
                    Data = post
                });
            }
            return NotFound("No posts was found!");

        }
    }
}
