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
        private readonly IProductService _productService;
        private readonly IFlowerCategoryService _categoryService;

        public ProductController(IProductService productService, IFlowerCategoryService categoryService)
        {
            _productService = productService;
            _categoryService = categoryService;
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
            var result = await _productService.CreateNewFlowerAsync(accessToken, newProduct);
            return Ok(new
            {
                message = "Create new Flower Successfully",
                NewFlower = result.Flower
            });
        }


        [Authorize(Policy = "UserOnly")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        [HttpPost("update-flower")]
        public async Task<IActionResult> UpdateFlowerAsync(string accessToken, [FromForm] UpdateFlowerDTO updateFlower)
        {
            if (!ModelState.IsValid)
            {
                var errors = ModelState.Values.SelectMany(v => v.Errors.Select(e => e.ErrorMessage));
                return BadRequest(new {Errors = errors});
            }

            if (!string.IsNullOrEmpty(accessToken))
            {
                return BadRequest("Token must be required");
            }
            if (updateFlower == null)
            {
                return BadRequest("Please fill all fields to update flower");
            }
            var result = await _productService.UpdateAFlowerAsync(accessToken, updateFlower);
            return Ok(new
            {
                Message = "Update Flower Successful",
                UpdateFlower = result.flower
            });
        }

        [Authorize(Policy = "UserOnly")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        [HttpPost("delete-flower")]
        public async Task<IActionResult> DeleteFlower(string accessToken, string flowerId)
        {
            if (!ModelState.IsValid)
            {
                var errors = ModelState.Values.SelectMany(v => v.Errors.Select(e => e.ErrorMessage));
                return BadRequest(new { Errors = errors });
            }
            if (!string.IsNullOrEmpty(accessToken))
            {
                return BadRequest("Token must be required");
            }
            if (!string.IsNullOrEmpty(flowerId))
            {
                return BadRequest("Flower Id must be required");
            }

            var result = await _productService.DeleteAFlowerAsync(accessToken, flowerId);
            return Ok(new
            {
                Message = "Delete this flower successful"
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
            var result = await _categoryService.CreateNewFCateAsync(newCate);
            return Ok(new
            {
                message = "Create Flower Category Successfully",
                NewFCate = result.FCate
            });
        }

        [Authorize(Policy = "AdminOnly")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        [HttpPost("update-flower-category")]
        public async Task<IActionResult> UpdateFCateAsync([FromForm]  UpdateFCateDTO updateFCate)
        {
            if (!ModelState.IsValid)
            {
                var errors = ModelState.Values.SelectMany(v => v.Errors.Select(e => e.ErrorMessage));
                return BadRequest(new { Errors = errors });
            }

            if (updateFCate == null)
            {
                return BadRequest("All field must be required");
            }
            var result = await _categoryService.UpdateExistFCateAsync(updateFCate);
            return Ok(new
            {
                Message = "Update Flower Category Successful",
                UpdateFCate = result.FCate
            });
        }

        [Authorize(Policy = "AdminOnly")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        [HttpPost("delete-flower-category")]
        public async Task<IActionResult> DeleteFCateAsync(string fCateId)
        {
            if (!ModelState.IsValid)
            {
                var errors = ModelState.Values.SelectMany(v => v.Errors.Select(e => e.ErrorMessage));
                return BadRequest(new { Errors = errors });
            }

            if (fCateId == null)
            {
                return BadRequest("All field must be required");
            }
            var result = await _categoryService.DeleteFCateAsync(fCateId);
            return Ok(new
            {
                Message = "Delete Flower Category Successful",
            });
        }

        // FOR VIEW LIST
        [HttpGet("list-flowers")]
        public async Task<IActionResult> GetListOfFlower([FromQuery] int pageIndex, [FromQuery] int pageSize, [FromQuery] string sortBy, [FromQuery] bool sortDesc, [FromQuery] string search)
        {
            try
            {
                var (flowers, totalCount) = await _productService.GetListFlowerAsync(pageIndex, pageSize, sortBy, sortDesc, search);
                return Ok(new { flowers, totalCount });
            } catch (Exception ex)
            {
                return StatusCode(500, $"An error occurred while processing your request: {ex.Message}");
            }
        }

        [HttpGet("list-flowers-of-seller")]
        public async Task<IActionResult> GetListFlowersOfSeller([FromQuery] int pageIndex, [FromQuery] int pageSize, [FromQuery] string accountId, [FromQuery] string sortBy, [FromQuery] bool sortDesc, [FromQuery] string search)
        {
            try
            {
                var (flowers, totalCount) = await _productService.GetListFlowerOfSeller(pageIndex, pageSize, accountId, sortBy, sortDesc, search);
                return Ok(new { flowers, totalCount });
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"An error occurred while processing your request: {ex.Message}");
            }
        }
    }
}
