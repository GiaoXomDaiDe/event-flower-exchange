using EventFlowerExchange_Espoir.Models;
using EventFlowerExchange_Espoir.Models.DTO;
using EventFlowerExchange_Espoir.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.Security.Claims;

namespace EventFlowerExchange_Espoir.Controllers
{
    [Route("api/event")]
    [ApiController]
    [EnableCors("AllowAllOrigins")]
    public class EventController : ControllerBase
    {
        private readonly IEventService _eventService;
        private readonly IEventCategoryService _categoryService;

        public EventController(IEventService eventService, IEventCategoryService categoryService)
        {
            _eventService = eventService;
            _categoryService = categoryService;
        }

        // Create a new event
        [Authorize(Policy = "UserOnly")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        [HttpPost("create-event")]
        public async Task<IActionResult> CreateEventAsync(string accessToken, [FromForm] CreateEventDTO newEvent)
        {
            if (!ModelState.IsValid)
            {
                var errors = ModelState.Values.SelectMany(v => v.Errors.Select(e => e.ErrorMessage));
                return BadRequest(new { Errors = errors });
            }

            if (string.IsNullOrEmpty(accessToken))
            {
                return BadRequest("Access token is required.");
            }

            if (newEvent == null)
            {
                return BadRequest("All fields must be filled.");
            }

            var result = await _eventService.CreateNewEventAsync(accessToken, newEvent);
            return Ok(new
            {
                message = "Event created successfully.",
                NewEvent = result
            });
        }

        // Update an existing event
        [Authorize(Policy = "UserOnly")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        [HttpPut("update-event")]
        public async Task<IActionResult> UpdateEventAsync(string accessToken, [FromForm] UpdateEventDTO updateEvent)
        {
            if (!ModelState.IsValid)
            {
                var errors = ModelState.Values.SelectMany(v => v.Errors.Select(e => e.ErrorMessage));
                return BadRequest(new { Errors = errors });
            }

            if (string.IsNullOrEmpty(accessToken))
            {
                return BadRequest("Access token is required.");
            }

            if (updateEvent == null)
            {
                return BadRequest("All fields must be filled.");
            }

            var result = await _eventService.UpdateEventAsync(accessToken, updateEvent);
            return Ok(new
            {
                message = "Event updated successfully.",
                result
            });
        }

        // Delete an event
        [Authorize(Policy = "UserOnly")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        [HttpDelete("delete-event")]
        public async Task<IActionResult> DeleteEventAsync(string accessToken, string eventId)
        {
            if (!ModelState.IsValid)
            {
                var errors = ModelState.Values.SelectMany(v => v.Errors.Select(e => e.ErrorMessage));
                return BadRequest(new { Errors = errors });
            }

            if (string.IsNullOrEmpty(accessToken))
            {
                return BadRequest("Access token is required.");
            }

            if (string.IsNullOrEmpty(eventId))
            {
                return BadRequest("Event ID is required.");
            }

            var result = await _eventService.DeleteEventAsync(accessToken, eventId);
            return Ok(new
            {
                message = "Event deleted successfully."
            });
        }

        // Create a new event category
        [Authorize(Policy = "UserOnly")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        [HttpPost("create-event-category")]
        public async Task<IActionResult> CreateEventCategoryAsync([FromForm] NewEventCateDTO newCate)
        {
            if (!ModelState.IsValid)
            {
                var errors = ModelState.Values.SelectMany(v => v.Errors.Select(e => e.ErrorMessage));
                return BadRequest(new { Errors = errors });
            }

            if (newCate == null)
            {
                return BadRequest("All fields must be filled.");
            }

            var result = await _categoryService.CreateNewEventCateAsync(newCate);
            return Ok(new
            {
                message = "Event category created successfully.",
                NewCate = result
            });
        }

        // Update an existing event category
        [Authorize(Policy = "UserOnly")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        [HttpPut("update-event-category")]
        public async Task<IActionResult> UpdateEventCategoryAsync([FromForm] UpdateEventCateDTO updateCategory)
        {
            if (!ModelState.IsValid)
            {
                var errors = ModelState.Values.SelectMany(v => v.Errors.Select(e => e.ErrorMessage));
                return BadRequest(new { Errors = errors });
            }

            if (updateCategory == null)
            {
                return BadRequest("All fields must be filled.");
            }

            var result = await _categoryService.UpdateExistEventCateAsync(updateCategory);
            return Ok(new
            {
                message = "Event category updated successfully.",
                UpdatedCategory = result
            });
        }

        // Delete an event category
        [Authorize(Policy = "UserOnly")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        [HttpDelete("delete-event-category")]
        public async Task<IActionResult> DeleteEventCategoryAsync(string eventCateId)
        {
            if (!ModelState.IsValid)
            {
                var errors = ModelState.Values.SelectMany(v => v.Errors.Select(e => e.ErrorMessage));
                return BadRequest(new { Errors = errors });
            }

            if (string.IsNullOrEmpty(eventCateId))
            {
                return BadRequest("Event Category ID is required.");
            }

            var result = await _categoryService.DeleteEventCateAsync(eventCateId);
            return Ok(new
            {
                message = "Event category deleted successfully."
            });
        }
        [Authorize(Policy = "UserOnly")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        [HttpPut("inactive-active-event")]
        public async Task<IActionResult> InactiveAndActiveEventAsync(string eventId)
        {
            if (!ModelState.IsValid)
            {
                var errors = ModelState.Values.SelectMany(v => v.Errors.Select(e => e.ErrorMessage));
                return BadRequest(new { Errors = errors });
            }
            var identity = HttpContext.User.Identity as ClaimsIdentity;
            var userEmail = identity.Claims.FirstOrDefault().Value;
            if (string.IsNullOrEmpty(eventId))
            {
                return BadRequest("Event ID is required.");
            }

            var result = await _eventService.InactiveAndActiveEventAsync(userEmail, eventId);
            return Ok(new
            {
                result
            });
        }
        // Get list of events
        [HttpGet("list-events")]
        public async Task<IActionResult> GetListOfEvents([FromQuery] int pageIndex, [FromQuery] int pageSize, [FromQuery] string sortBy, [FromQuery] bool sortDesc, [FromQuery] string search = null)
        {
            try
            {
                var (events, totalCount) = await _eventService.GetListEventsAsync(pageIndex, pageSize, sortBy, sortDesc, search);
                var response = new
                {
                    TotalCount = totalCount,
                    PageIndex = pageIndex,
                    PageSize = pageSize,
                    Data = events
                };
                return Ok(response);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"An error occurred while processing your request: {ex.Message}");
            }
        }

        // Get list of events for a specific seller
        [HttpGet("list-events-of-seller")]
        public async Task<IActionResult> GetListOfEventsForSeller([FromQuery] int pageIndex, [FromQuery] int pageSize, [FromQuery] string sellerId, [FromQuery] string sortBy, [FromQuery] bool sortDesc, [FromQuery] string search = null)
        {
            try
            {
                var (events, totalCount) = await _eventService.GetListEventsOfSellerAsync(pageIndex, pageSize, sellerId, sortBy, sortDesc, search);
                return Ok(new { events, totalCount });
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"An error occurred while processing your request: {ex.Message}");
            }
        }

        [HttpGet("list-all-events-of-seller")]
        public async Task<IActionResult> GetListAllEventsForSeller([FromQuery] int pageIndex, [FromQuery] int pageSize, [FromQuery] string sellerId, [FromQuery] string sortBy, [FromQuery] bool sortDesc, [FromQuery] string search = null)
        {
            try
            {
                var (events, totalCount) = await _eventService.GetListAllEventsOfSellerAsync(pageIndex, pageSize, sellerId, sortBy, sortDesc, search);
                return Ok(new { events, totalCount });
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"An error occurred while processing your request: {ex.Message}");
            }
        }
        [HttpGet("list-event-categories")]
        public async Task<IActionResult> GetListEventCategoriesAsync()
        {
            if (!ModelState.IsValid)
            {
                var errors = ModelState.Values.SelectMany(v => v.Errors.Select(e => e.ErrorMessage));
                return BadRequest(new { Errors = errors });
            }
            var result = await _categoryService.GetListEventCategory();
            return Ok(result);
        }

        [HttpGet("view-event-detail")]
        public async Task<IActionResult> ViewEventDetailAsync([FromForm]string eventId)
        {
            if (!ModelState.IsValid)
            {
                var errors = ModelState.Values.SelectMany(v => v.Errors.Select(e => e.ErrorMessage));
                return BadRequest(new { Errors = errors });
            }
            if (eventId == null)
            {
                return BadRequest("EventId must be required");
            }
            var result = await _eventService.GetEventDetailByEventIdAsync(eventId);
            return Ok(result);
        }
    }
}
