using EventFlowerExchange_Espoir.Models.DTO;
using EventFlowerExchange_Espoir.Models;
using EventFlowerExchange_Espoir.Repositories;
using EventFlowerExchange_Espoir.Repositories.Impl;

namespace EventFlowerExchange_Espoir.Services.Impl
{
    public class EventService : IEventService
    {
        private readonly IEventRepository _eventRepository;

        public EventService(IEventRepository eventRepository)
        {
            _eventRepository = eventRepository;
        }

        //public async Task<IEnumerable<EventDto>> GetAllEventsAsync()
        //{
        //    var events = await _eventRepository.GetAllAsync();
        //    return events.Select(e => new EventDto
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
        //    });
        //}

        //public async Task<EventDto> GetEventByIdAsync(string id)
        //{
        //    var eventItem = await _eventRepository.GetByIdAsync(id);
        //    if (eventItem == null)
        //        return null;

        //    return new EventDto
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
        //}

        //public async Task<EventDto> CreateEventAsync(EventDto eventDto)
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
        //        UpdateBy = eventDto.UpdateBy
        //    };

        //    await _eventRepository.CreateAsync(eventItem);
        //    return eventDto;
        //}

        //public async Task UpdateEventAsync(string id, EventDto eventDto)
        //{
        //    var eventItem = await _eventRepository.GetByIdAsync(id);
        //    if (eventItem == null)
        //        throw new KeyNotFoundException("Event not found.");

        //    eventItem.EventName = eventDto.EventName;
        //    eventItem.EventDesc = eventDto.EventDesc;
        //    eventItem.StartTime = eventDto.StartTime;
        //    eventItem.EndTime = eventDto.EndTime;
        //    eventItem.Status = eventDto.Status;
        //    eventItem.UpdateAt = DateTime.UtcNow;
        //    eventItem.UpdateBy = eventDto.UpdateBy;

        //    await _eventRepository.UpdateAsync(eventItem);
        //}

        //public async Task DeleteEventAsync(string id)
        //{
        //    await _eventRepository.DeleteAsync(id);
        //}
    }
}
