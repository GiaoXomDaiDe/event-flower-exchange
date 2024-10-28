using EventFlowerExchange_Espoir.Models.DTO;
using EventFlowerExchange_Espoir.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Net;

namespace EventFlowerExchange_Espoir.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ImageController : ControllerBase
    {
        private readonly IImageService _imageService;

        public ImageController(IImageService imageService)
        {
            _imageService = imageService;
        }

        [HttpPost("upload")]
        public async Task<IActionResult> UploadImageAsync(IFormFile file)
        {
            var result = await _imageService.UploadImageAsync(file);
            if (result == null)
            {
                ModelState.AddModelError("Upload image", " Something went wrong");
                return Problem("Something went wrong", null, (int)HttpStatusCode.InternalServerError);
            }
            return Ok(new ApiResponse()
            {
                StatusCode = 200,
                Message = "Upload new image successful!",
                Data = new ImageUploadResponse()
                {
                    Link = result.SecureUri.AbsoluteUri,
                    PublicId = result.PublicId
                }
            });
        }
    }
}
