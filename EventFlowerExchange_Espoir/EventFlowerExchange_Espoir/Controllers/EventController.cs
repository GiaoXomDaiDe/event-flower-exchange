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
        [HttpPost("update-event")]
        public async Task<IActionResult> UpdateEventAsync(string accessToken, [FromForm] UpdateEventDTO updateEvent)
        {
            if (!ModelState.IsValid)
            {
                var errors = ModelState.Values.SelectMany(v => v.Errors.Select(e => e.ErrorMessage));
                return BadRequest(new { Errors = errors });
            }

            if (string.IsNullOrEmpty(accessToken))
            {
<<<<<<< HEAD
                EventId = eventItem.EventId,
                EventName = eventItem.EventName,
                EventDesc = eventItem.EventDesc,
                StartTime = eventItem.StartTime,
                EndTime = eventItem.EndTime,
                Status = eventItem.Status,
                CreateBy = eventItem.CreateBy,
                CreateAt = eventItem.CreateAt,
                UpdateAt = eventItem.UpdateAt,
                UpdateBy = eventItem.UpdateBy
            };

            return Ok(eventDto);
        }

        // POST: api/Event
        [HttpPost]
        public async Task<ActionResult<EventDto>> CreateEvent(EventDto eventDto)
        {
            var eventItem = new Event
            {
                EventId = eventDto.EventId,
                EventName = eventDto.EventName,
                EventDesc = eventDto.EventDesc,
                StartTime = eventDto.StartTime,
                EndTime = eventDto.EndTime,
                Status = eventDto.Status,
                CreateBy = eventDto.CreateBy,
                CreateAt = DateTime.UtcNow,
                UpdateAt = DateTime.UtcNow,
                UpdateBy = eventDto.UpdateBy // Assume this is populated appropriately
            };

            await _eventRepository.CreateAsync(eventItem);
            return CreatedAtAction(nameof(GetEventById), new { id = eventItem.EventId }, eventDto);
        }


        // PUT: api/Event/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateEvent(string id, EventDto eventDto)
        {
            var eventItem = await _eventRepository.GetByIdAsync(id);
            if (eventItem == null)
            {
                return NotFound();
=======
                return BadRequest("Access token is required.");
>>>>>>> dev-minh
            }

            if (updateEvent == null)
            {
                return BadRequest("All fields must be filled.");
            }

            var result = await _eventService.UpdateEventAsync(accessToken, updateEvent);
            return Ok(new
            {
                message = "Event updated successfully.",
                UpdatedEvent = result
            });
        }

        // Delete an event
        [Authorize(Policy = "UserOnly")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        [HttpPost("delete-event")]
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
        [Authorize(Policy = "AdminOnly")]
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
        [Authorize(Policy = "AdminOnly")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        [HttpPost("update-event-category")]
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
        [Authorize(Policy = "AdminOnly")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        [HttpPost("delete-event-category")]
        public async Task<IActionResult> DeleteEventCategoryAsync(string categoryId)
        {
            if (!ModelState.IsValid)
            {
                var errors = ModelState.Values.SelectMany(v => v.Errors.Select(e => e.ErrorMessage));
                return BadRequest(new { Errors = errors });
            }

            if (string.IsNullOrEmpty(categoryId))
            {
                return BadRequest("Event Category ID is required.");
            }

            var result = await _categoryService.DeleteEventCateAsync(categoryId);
            return Ok(new
            {
                message = "Event category deleted successfully."
            });
        }

        // Get list of events
        [HttpGet("list-events")]
        public async Task<IActionResult> GetListOfEvents([FromQuery] int pageIndex, [FromQuery] int pageSize, [FromQuery] string sortBy, [FromQuery] bool sortDesc, [FromQuery] string search)
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
        public async Task<IActionResult> GetListOfEventsForSeller([FromQuery] int pageIndex, [FromQuery] int pageSize, [FromQuery] string sellerId, [FromQuery] string sortBy, [FromQuery] bool sortDesc, [FromQuery] string search)
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
    }
}
