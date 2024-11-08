using EventFlowerExchange_Espoir.Models.DTO;
using EventFlowerExchange_Espoir.Services;
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
        public SellerPostController(ISellerPostService sellerPostService)
        {
            _sellerPostService = sellerPostService;
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

        [HttpPost("create-post")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public async Task<IActionResult> CreateNewPost(CreatePostDto createPost)
        {
            try
            {
                var identity = HttpContext.User.Identity as ClaimsIdentity;
                var userEmail = identity.Claims.FirstOrDefault().Value;
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


    }
}
