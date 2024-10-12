using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using EventFlowerExchange_Espoir.Services;
using EventFlowerExchange_Espoir.Models.DTO;
using EventFlowerExchange_Espoir.Helpers;

namespace EventFlowerExchange_Espoir.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class EventCateController : ControllerBase
    {
        private readonly IEventCategoryService _eventCategoryService;

        public EventCateController(IEventCategoryService eventCategoryService)
        {
            _eventCategoryService = eventCategoryService;
        }

        // Get list of event categories with pagination, sorting, and search
        [HttpGet]
        public async Task<IActionResult> GetCategories([FromQuery] int pageNumber = 1, [FromQuery] int pageSize = 10,
                                                       [FromQuery] string sortField = "Ename",
                                                       [FromQuery] string sortOrder = "asc",
                                                       [FromQuery] string searchTerm = "")
        {
            var result = await _eventCategoryService.GetAllCategoriesAsync(pageNumber, pageSize, sortField, sortOrder, searchTerm);
            return Ok(result);
        }

        // Get event category by ID
        [HttpGet("{id}")]
        public async Task<IActionResult> GetCategoryById(string id)
        {
            var category = await _eventCategoryService.GetCategoryByIdAsync(id);
            if (category == null)
                return NotFound();

            return Ok(category);
        }

        // Create new event category
        [HttpPost]
        public async Task<IActionResult> CreateCategory(EventCategoryDto categoryDto)
        {
            var createdCategory = await _eventCategoryService.CreateCategoryAsync(categoryDto);
            return CreatedAtAction(nameof(GetCategoryById), new { id = createdCategory.EcateId }, createdCategory);
        }

        // Update event category
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateCategory(string id, EventCategoryDto categoryDto)
        {
            await _eventCategoryService.UpdateCategoryAsync(id, categoryDto);
            return NoContent();
        }

        // Delete event category (soft delete)
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCategory(string id)
        {
            await _eventCategoryService.DeleteCategoryAsync(id);
            return NoContent();
        }
    }
}
