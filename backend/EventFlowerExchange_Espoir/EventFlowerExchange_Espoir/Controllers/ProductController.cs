﻿using CloudinaryDotNet.Actions;
using EventFlowerExchange_Espoir.Models;
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
            if (result == null)
            {
                return StatusCode(500, new { Message = "Failed to create the flower." });
            }
            return Ok(new
            {
                message = "Create new Flower Successfully",
            });
        }


        [Authorize(Policy = "UserOnly")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        [HttpPut("update-flower")]
        public async Task<IActionResult> UpdateFlowerAsync(string accessToken, [FromForm] UpdateFlowerDTO updateFlower)
        {
            if (!ModelState.IsValid)
            {
                var errors = ModelState.Values.SelectMany(v => v.Errors.Select(e => e.ErrorMessage));
                return BadRequest(new { Errors = errors });
            }

            if (string.IsNullOrEmpty(accessToken))
            {
                return BadRequest("Token must be required");
            }
            if (updateFlower == null)
            {
                return BadRequest("Please fill all fields to update flower");
            }
            var result = await _productService.UpdateAFlowerAsync(accessToken, updateFlower);
            if (result == null)
            {
                return StatusCode(500, new { Message = "Failed to edit the flower." });
            }
            return Ok(new
            {
                Message = "Update Flower Successful",
                Result = result
            });
        }

        [Authorize(Policy = "UserOnly")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        [HttpDelete("delete-flower")]
        public async Task<IActionResult> DeleteFlower(string accessToken, [FromForm] List<string> flowerIds)
        {
            if (!ModelState.IsValid)
            {
                var errors = ModelState.Values.SelectMany(v => v.Errors.Select(e => e.ErrorMessage));
                return BadRequest(new { Errors = errors });
            }
            if (string.IsNullOrEmpty(accessToken))
            {
                return BadRequest("Token must be required");
            }

            if (flowerIds == null && flowerIds.Any())
            {
                return BadRequest("Flower Id must be required");
            }

            var result = await _productService.DeleteAFlowerAsync(accessToken, flowerIds);
            if (result == false)
            {
                return StatusCode(500, new { Message = "Failed to delete the flower." });
            }
            return Ok(new
            {
                Message = "Delete this flower successful",
            });
        }
        // FOR INACTIVE AND ACTIVE FLOWER
        [Authorize(Policy = "UserOnly")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        [HttpPost("inactive-and-active-flower")]
        public async Task<IActionResult> InactiveAndActiveFlowerBySellerAsync(string accessToken, string flowerId)
        {
            if (!ModelState.IsValid)
            {
                var errors = ModelState.Values.SelectMany(v => v.Errors.Select(e => e.ErrorMessage));
                return BadRequest(new { Errors = errors });
            }
            if (string.IsNullOrEmpty(accessToken) && string.IsNullOrEmpty(flowerId))
            {
                return BadRequest("All field must be required");
            }
            var result = await _productService.InactiveAndActiveFlowerBySeller(accessToken, flowerId);
            return Ok(result);
        }

        // for flower category
        [Authorize(Policy = "UserOnly")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        [HttpPost("create-flower-category")]
        public async Task<IActionResult> CreateCateAsync([FromForm] NewFCateDTO newCate)
        {
            if (!ModelState.IsValid)
            {
                var errors = ModelState.Values.SelectMany(v => v.Errors.Select(e => e.ErrorMessage));
                return BadRequest(new { Errors = errors });
            }
            var accessToken = HttpContext.Request.Headers["Authorization"].ToString().Replace("Bearer ", "");

            if (string.IsNullOrEmpty(accessToken))
            {
                return BadRequest("Access token is missing or invalid");
            }

            if (newCate == null)
            {
                return BadRequest("All Fields must not be empty");
            }
            var result = await _categoryService.CreateNewFCateAsync(accessToken, newCate);
            if (result == null)
            {
                return StatusCode(500, new { Message = "Failed to create the flower category." });
            }
            return Created(" ", new
            {
                result,
                message = "Create Flower Category Successfully",
            });
        }

        [Authorize(Policy = "UserOnly")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        [HttpPut("update-flower-category")]
        public async Task<IActionResult> UpdateFCateAsync([FromForm] UpdateFCateDTO updateFCate)
        {
            if (!ModelState.IsValid)
            {
                var errors = ModelState.Values.SelectMany(v => v.Errors.Select(e => e.ErrorMessage));
                return BadRequest(new { Errors = errors });
            }

            var accessToken = HttpContext.Request.Headers["Authorization"].ToString().Replace("Bearer ", "");

            if (string.IsNullOrEmpty(accessToken))
            {
                return BadRequest("Access token is missing or invalid");
            }
            if (updateFCate == null)
            {
                return BadRequest("All field must be required");
            }
            var result = await _categoryService.UpdateExistFCateAsync(accessToken, updateFCate);
            if (result is string errorMessage) // Check if the result is an error message
            {
                return BadRequest(new { Message = errorMessage });
            }

            if (result is int successResult && successResult <= 0) // Check if the update was successful
            {
                return StatusCode(500, new { Message = "Failed to update the flower." }); // Handle unexpected cases
            }
            return Ok(result);
        }

        [Authorize(Policy = "UserOnly")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        [HttpDelete("delete-flower-category")]
        public async Task<IActionResult> DeleteFCateAsync(string fCateId)
        {
            var accessToken = HttpContext.Request.Headers["Authorization"].ToString().Replace("Bearer ", "");

            if (string.IsNullOrEmpty(accessToken))
            {
                return BadRequest("Access token is missing or invalid");
            }
            if (!ModelState.IsValid)
            {
                var errors = ModelState.Values.SelectMany(v => v.Errors.Select(e => e.ErrorMessage));
                return BadRequest(new { Errors = errors });
            }

            if (fCateId == null)
            {
                return BadRequest("All field must be required");
            }
            var result = await _categoryService.DeleteFCateAsync(accessToken, fCateId);
            return Ok(new
            {
                Message = "Delete Flower Category Successful",
            });
        }


        // FOR VIEW 

        [HttpGet("flower-detail")]
        public async Task<IActionResult> ViewFlowerDetailAsync(string flowerId)
        {
            if (!ModelState.IsValid)
            {
                var errors = ModelState.Values.SelectMany(v => v.Errors.Select(e => e.ErrorMessage));
                return BadRequest(new { Errors = errors });
            }
            if (string.IsNullOrEmpty(flowerId))
            {
                return BadRequest("Need flowerId for getting flower's detail");
            }
            var result = await _productService.ViewFlowerDetailAsync(flowerId);
            return Ok(result);
        }

        [HttpGet("list-flowers")]
        public async Task<IActionResult> GetListOfFlower([FromQuery] int pageIndex, [FromQuery] int pageSize, [FromQuery] string sortBy, [FromQuery] bool sortDesc, [FromQuery] string search = null)
        {
            try
            {
                var (flowers, totalCount, totalPages) = await _productService.GetListFlowerAsync(pageIndex, pageSize, sortBy, sortDesc, search);
                var response = new
                {
                    TotalCount = totalCount,
                    PageIndex = pageIndex,
                    PageSize = pageSize,
                    TotalPages = totalPages,
                    Data = flowers
                };
                return Ok(response);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"An error occurred while processing your request: {ex.Message}");
            }
        }

        [HttpGet("list-all-flowers")]
        public async Task<IActionResult> GetListOfAllFlower([FromQuery] int pageIndex, [FromQuery] int pageSize, [FromQuery] string sortBy, [FromQuery] bool sortDesc, [FromQuery] string search = null)
        {
            try
            {
                var (flowers, totalCount, totalPages) = await _productService.GetListAllFlowerAsync(pageIndex, pageSize, sortBy, sortDesc, search);
                var response = new
                {
                    TotalCount = totalCount,
                    PageIndex = pageIndex,
                    PageSize = pageSize,
                    TotalPages = totalPages,
                    Data = flowers
                };
                return Ok(response);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"An error occurred while processing your request: {ex.Message}");
            }
        }

        [HttpGet("list-flowers-of-seller")]
        public async Task<IActionResult> GetListFlowersOfSeller([FromQuery] int pageIndex, [FromQuery] int pageSize, [FromQuery] string sortBy, [FromQuery] bool sortDesc, [FromQuery] string search = null)
        {
            try
            {
                var (flowers, totalCount, totalPages) = await _productService.GetListFlowerOfSellerAsync(pageIndex, pageSize, sortBy, sortDesc, search);
                var response = new
                {
                    TotalCount = totalCount,
                    PageIndex = pageIndex,
                    PageSize = pageSize,
                    TotalPages = totalPages,
                    Data = flowers
                };
                return Ok(response);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"An error occurred while processing your request: {ex.Message}");
            }
        }

        [HttpGet("list-all-flowers-of-seller")]
        public async Task<IActionResult> GetListAllFlowersOfSeller([FromQuery] int pageIndex, [FromQuery] int pageSize, [FromQuery] string sortBy, [FromQuery] bool sortDesc, [FromQuery] string search = null)
        {
            try
            {
                var (flowers, totalCount, totalPages) = await _productService.GetListAllFlowerOfSellerAsync(pageIndex, pageSize, sortBy, sortDesc, search);
                var response = new
                {
                    TotalCount = totalCount,
                    PageIndex = pageIndex,
                    PageSize = pageSize,
                    TotalPages = totalPages,
                    Data = flowers
                };
                return Ok(response);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"An error occurred while processing your request: {ex.Message}");
            }
        }
        [HttpGet("list-inactive-flowers")]
        public async Task<IActionResult> GetListInactiveOfFlower([FromQuery] int pageIndex, [FromQuery] int pageSize, [FromQuery] string sortBy, [FromQuery] bool sortDesc, [FromQuery] string search = null)
        {
            try
            {
                var (flowers, totalCount, totalPages) = await _productService.GetListInactiveFlowerAsync(pageIndex, pageSize, sortBy, sortDesc, search);
                var response = new
                {
                    TotalCount = totalCount,
                    PageIndex = pageIndex,
                    PageSize = pageSize,
                    TotalPages = totalPages,
                    Data = flowers
                };
                return Ok(response);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"An error occurred while processing your request: {ex.Message}");
            }
        }

        [HttpGet("list-inactive-flowers-of-seller")]
        public async Task<IActionResult> GetListInactiveFlowersOfSeller([FromQuery] int pageIndex, [FromQuery] int pageSize, [FromQuery] string sortBy, [FromQuery] bool sortDesc, [FromQuery] string search = null)
        {
            try
            {
                var (flowers, totalCount, totalPages) = await _productService.GetListInactiveFlowerOfSellerAsync(pageIndex, pageSize, sortBy, sortDesc, search);
                var response = new
                {
                    TotalCount = totalCount,
                    PageIndex = pageIndex,
                    PageSize = pageSize,
                    TotalPages = totalPages,
                    Data = flowers
                };
                return Ok(response);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"An error occurred while processing your request: {ex.Message}");
            }
        }

        [HttpGet("list-flowers-categories")]
        public async Task<IActionResult> GetListCategoryOfFlower()
        {
            var result = await _categoryService.GetListCategoryOfFlowerAsync();
            return Ok(result);
        }

        [HttpGet("list-flower-active")]
        public async Task<IActionResult> GetAllActiveFlowers()
        {
            var flowers = await _productService.GetAllFlowersActive();
            return Ok(new ApiResponse()
            {
                StatusCode = 200,
                Data = flowers
            });
        }
    }
}
