using EventFlowerExchange_Espoir.Models.DTO;
using EventFlowerExchange_Espoir.Models;
using EventFlowerExchange_Espoir.Repositories;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

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

        [HttpGet]
        public async Task<ActionResult<IEnumerable<EventDto>>> GetAllEvents()
        {
            var events = await _eventRepository.GetAllAsync();
            var eventDtos = events.Select(e => new EventDto
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

            return Ok(eventDtos);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<EventDto>> GetEventById(string id)
        {
            var eventItem = await _eventRepository.GetByIdAsync(id);
            if (eventItem == null)
            {
                return NotFound();
            }

            var eventDto = new EventDto
            {
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

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateEvent(string id, EventDto eventDto)
        {
            var eventItem = await _eventRepository.GetByIdAsync(id);
            if (eventItem == null)
            {
                return NotFound();
            }

            eventItem.EventName = eventDto.EventName;
            eventItem.EventDesc = eventDto.EventDesc;
            eventItem.StartTime = eventDto.StartTime;
            eventItem.EndTime = eventDto.EndTime;
            eventItem.Status = eventDto.Status;
            eventItem.UpdateAt = DateTime.UtcNow;
            eventItem.UpdateBy = eventDto.UpdateBy;

            await _eventRepository.UpdateAsync(eventItem);

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteEvent(string id)
        {
            await _eventRepository.DeleteAsync(id);
            return NoContent();
        }
    }
}