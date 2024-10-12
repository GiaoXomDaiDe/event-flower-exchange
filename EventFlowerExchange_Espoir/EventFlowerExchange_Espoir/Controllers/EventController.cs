using EventFlowerExchange_Espoir.Models.DTO;
using EventFlowerExchange_Espoir.Models;
using EventFlowerExchange_Espoir.Repositories;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using EventFlowerExchange_Espoir.Helpers;

namespace EventFlowerExchange_Espoir.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EventController : ControllerBase
    {
        private readonly IEventRepository _eventRepository;

        public EventController(IEventRepository eventRepository)
        {
            _eventRepository = eventRepository;
        }

<<<<<<< HEAD
        //[HttpGet]
        //public async Task<ActionResult<IEnumerable<EventDto>>> GetAllEvents()
        //{
        //    var events = await _eventRepository.GetAllAsync();
        //    var eventDtos = events.Select(e => new EventDto
        //    {
        //        EventId = e.EventId,
        //        EventName = e.EventName,
        //        EventDesc = e.EventDesc,
        //        StartTime = e.StartTime,
        //        EndTime = e.EndTime,
        //        Status = e.Status,
        //        CreateBy = e.CreateBy,
        //        CreateAt = e.CreateAt,
        //        UpdateAt = e.UpdateAt,
        //        UpdateBy = e.UpdateBy
        //    }).ToList();

        //    return Ok(eventDtos);
        //}

        //[HttpGet("{id}")]
        //public async Task<ActionResult<EventDto>> GetEventById(string id)
        //{
        //    var eventItem = await _eventRepository.GetByIdAsync(id);
        //    if (eventItem == null)
        //    {
        //        return NotFound();
        //    }
=======
        // GET: api/Event
        [HttpGet]
        public async Task<ActionResult<PaginatedList<EventDto>>> GetAllEvents([FromQuery] int pageNumber = 1, [FromQuery] int pageSize = 10, [FromQuery] string sortField = "eventname", [FromQuery] string sortOrder = "asc", [FromQuery] string searchTerm = "")
        {
            var events = await _eventRepository.GetAllAsync();
            var query = events.AsQueryable();

            // Search functionality
            if (!string.IsNullOrEmpty(searchTerm))
            {
                query = query.Where(e => e.EventName.Contains(searchTerm) || e.EventDesc.Contains(searchTerm));
            }

            // Sorting functionality
            switch (sortField?.ToLower())
            {
                case "eventname":
                    query = sortOrder == "desc" ? query.OrderByDescending(e => e.EventName) : query.OrderBy(e => e.EventName);
                    break;
                case "starttime":
                    query = sortOrder == "desc" ? query.OrderByDescending(e => e.StartTime) : query.OrderBy(e => e.StartTime);
                    break;
                case "endtime":
                    query = sortOrder == "desc" ? query.OrderByDescending(e => e.EndTime) : query.OrderBy(e => e.EndTime);
                    break;
                default:
                    query = query.OrderBy(e => e.EventName); // Default sorting
                    break;
            }

            // Pagination
            var totalItems = query.Count();
            var pagedEvents = query.Skip((pageNumber - 1) * pageSize).Take(pageSize).ToList();

            var eventDtos = pagedEvents.Select(e => new EventDto
            {
                EventId = e.EventId,
                EventName = e.EventName,
                EventDesc = e.EventDesc,
                StartTime = e.StartTime,
                EndTime = e.EndTime,
                Status = e.Status,
                CreateBy = e.CreateBy,
                CreateAt = e.CreateAt,
                UpdateAt = e.UpdateAt,
                UpdateBy = e.UpdateBy
            }).ToList();

            var result = new PaginatedList<EventDto>(eventDtos, totalItems, pageNumber, pageSize);
            return Ok(result);
        }

        // GET: api/Event/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<EventDto>> GetEventById(string id)
        {
            var eventItem = await _eventRepository.GetByIdAsync(id);
            if (eventItem == null)
            {
                return NotFound();
            }
>>>>>>> dev-minh

        //    var eventDto = new EventDto
        //    {
        //        EventId = eventItem.EventId,
        //        EventName = eventItem.EventName,
        //        EventDesc = eventItem.EventDesc,
        //        StartTime = eventItem.StartTime,
        //        EndTime = eventItem.EndTime,
        //        Status = eventItem.Status,
        //        CreateBy = eventItem.CreateBy,
        //        CreateAt = eventItem.CreateAt,
        //        UpdateAt = eventItem.UpdateAt,
        //        UpdateBy = eventItem.UpdateBy
        //    };

        //    return Ok(eventDto);
        //}

<<<<<<< HEAD
        //[HttpPost]
        //public async Task<ActionResult<EventDto>> CreateEvent(EventDto eventDto)
        //{
        //    var eventItem = new Event
        //    {
        //        EventId = eventDto.EventId,
        //        EventName = eventDto.EventName,
        //        EventDesc = eventDto.EventDesc,
        //        StartTime = eventDto.StartTime,
        //        EndTime = eventDto.EndTime,
        //        Status = eventDto.Status,
        //        CreateBy = eventDto.CreateBy,
        //        CreateAt = DateTime.UtcNow,
        //        UpdateAt = DateTime.UtcNow,
        //        UpdateBy = eventDto.UpdateBy // Assume this is populated appropriately
        //    };
=======
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
>>>>>>> dev-minh

        //    await _eventRepository.CreateAsync(eventItem);
        //    return CreatedAtAction(nameof(GetEventById), new { id = eventItem.EventId }, eventDto);
        //}

<<<<<<< HEAD
        //[HttpPut("{id}")]
        //public async Task<IActionResult> UpdateEvent(string id, EventDto eventDto)
        //{
        //    var eventItem = await _eventRepository.GetByIdAsync(id);
        //    if (eventItem == null)
        //    {
        //        return NotFound();
        //    }
=======
        // PUT: api/Event/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateEvent(string id, EventDto eventDto)
        {
            var eventItem = await _eventRepository.GetByIdAsync(id);
            if (eventItem == null)
            {
                return NotFound();
            }
>>>>>>> dev-minh

        //    eventItem.EventName = eventDto.EventName;
        //    eventItem.EventDesc = eventDto.EventDesc;
        //    eventItem.StartTime = eventDto.StartTime;
        //    eventItem.EndTime = eventDto.EndTime;
        //    eventItem.Status = eventDto.Status;
        //    eventItem.UpdateAt = DateTime.UtcNow;
        //    eventItem.UpdateBy = eventDto.UpdateBy;

        //    await _eventRepository.UpdateAsync(eventItem);

        //    return NoContent();
        //}

<<<<<<< HEAD
        //[HttpDelete("{id}")]
        //public async Task<IActionResult> DeleteEvent(string id)
        //{
        //    await _eventRepository.DeleteAsync(id);
        //    return NoContent();
        //}
=======
        // DELETE: api/Event/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteEvent(string id)
        {
            await _eventRepository.DeleteAsync(id);
            return NoContent();
        }
>>>>>>> dev-minh
    }
}