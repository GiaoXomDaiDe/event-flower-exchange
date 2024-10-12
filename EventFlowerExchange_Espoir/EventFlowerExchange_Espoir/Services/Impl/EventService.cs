using EventFlowerExchange_Espoir.Models.DTO;
using EventFlowerExchange_Espoir.Models;
using EventFlowerExchange_Espoir.Repositories;
using EventFlowerExchange_Espoir.Helpers;

namespace EventFlowerExchange_Espoir.Services.Impl
{
    public class EventService : IEventService
    {
        private readonly IEventRepository _eventRepository;

        public EventService(IEventRepository eventRepository)
        {
            _eventRepository = eventRepository;
        }

<<<<<<< HEAD
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
=======
        public Task<EventDto> CreateEventAsync(EventDto eventDto)
        {
            throw new NotImplementedException();
        }

        public Task DeleteEventAsync(string id)
        {
            throw new NotImplementedException();
        }

        public async Task<PaginatedList<EventDto>> GetAllEventsAsync(int pageNumber, int pageSize, string sortField, string sortOrder, string searchTerm)
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
                    query = query.OrderBy(e => e.EventName);  // Default sorting
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
                Status = e.Status,  // Maps Status to IsActive
                CreateBy = e.CreateBy,  // Maps CreateBy to Seller
                CreateAt = e.CreateAt,
                UpdateAt = e.UpdateAt,
                UpdateBy = e.UpdateBy
            }).ToList();

            return new PaginatedList<EventDto>(eventDtos, totalItems, pageNumber, pageSize);
        }

        public Task<EventDto> GetEventByIdAsync(string id)
        {
            throw new NotImplementedException();
        }

        public Task UpdateEventAsync(string id, EventDto eventDto)
        {
            throw new NotImplementedException();
        }

        // Other methods remain the same
>>>>>>> dev-minh
    }
}
