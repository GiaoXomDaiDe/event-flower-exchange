using EventFlowerExchange_Espoir.Models.DTO;
using EventFlowerExchange_Espoir.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;

namespace EventFlowerExchange_Espoir.Controllers
{
    [Route("api/flower")]
    [ApiController]
    [EnableCors("AllowAllOrigins")]
    public class ProductController : ControllerBase
    {
        private readonly IProductService _productSerice;
        private readonly IFlowerCategoryService _categorySerice;

        public ProductController(IProductService productSerice)
        {
            _productSerice = productSerice;
        }

        // for flower
        [Authorize(Policy = "UserOnly")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        [HttpPost("create-flower")]
        public async Task<IActionResult> CreateFlowerAsync(string accessToken, [FromForm] CreateProductDTO newProduct)
        {
            if (!ModelState.IsValid)
            {
                var errors = ModelState.Values.SelectMany(v => v.Errors.Select(e => e.ErrorMessage));
                return BadRequest(new { Errors = errors });
            }
            if (string.IsNullOrEmpty(accessToken))
            {
                return BadRequest("Must be have access token");
            }
            if (newProduct == null)
            {
                return BadRequest("All field must be filled.");
            }
            var result = await _productSerice.CreateNewFlowerAsync(accessToken, newProduct);
            return Ok(new
            {
                message = "Create new Flower Successfully",
                NewFlower = result.Flower
            });
        }


        // for flower category
        [Authorize(Policy = "AdminOnly")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        [HttpPost("create-flower-category")]
        public async Task<IActionResult> CreateCateAsync([FromForm] NewFCateDTO newCate)
        {
            if (!ModelState.IsValid)
            {
                var errors = ModelState.Values.SelectMany(v => v.Errors.Select(e => e.ErrorMessage));
                return BadRequest(new { Errors = errors });
            }

            if (newCate == null)
            {
                return BadRequest("All Fields must not be empty");
            }
            var result = await _categorySerice.CreateNewFCateAsync(newCate);
            return Ok(new
            {
                message = "Create Flower Category Successfully",
                NewFCate = result.FCate
            });
        }

    }
}
