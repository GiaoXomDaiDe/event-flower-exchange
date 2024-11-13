using EventFlowerExchange_Espoir.DatabaseConnection;
using EventFlowerExchange_Espoir.Models;
using Microsoft.EntityFrameworkCore;
using System.Linq.Dynamic.Core;

namespace EventFlowerExchange_Espoir.Repositories.Impl
{
    public class EventRepository : IEventRepository
    {
        private readonly EspoirDbContext _context;

        public EventRepository(EspoirDbContext context)
        {
            _context = context;
        }

        // Get Event by ID
        public async Task<Event> GetEventByEventIdAsync(string eventId)
        {
            return await _context.Events.FirstOrDefaultAsync(e => e.EventId == eventId );
        }

        // Get the latest event ID
        public async Task<string> GetLatestEventIdAsync()
        {
            try
            {
                var eventIds = await _context.Events
                    .Select(e => e.EventId)
                    .ToListAsync();

                var latestEventId = eventIds
                    .Select(id => new { EventId = id, NumericPart = int.Parse(id.Substring(1)) })
                    .OrderByDescending(u => u.NumericPart)
                    .ThenByDescending(u => u.EventId)
                    .Select(u => u.EventId)
                    .FirstOrDefault();

                return latestEventId;
            }
            catch (Exception e)
            {
                throw new Exception(e.Message, e);
            }
        }

        // Create a new Event
        public async Task<dynamic> CreateEventAsync(Event newEvent)
        {
            try
            {
                await _context.Events.AddAsync(newEvent);
                return await _context.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                throw new Exception($"Error at CreateEventAsync() of EventRepository + {ex.Message}");
            }
        }

        // Update an existing Event
        public async Task<dynamic> UpdateEventAsync(Event eventToUpdate)
        {
            try
            {
                _context.Events.Update(eventToUpdate);
                return await _context.SaveChangesAsync() > 0;
            }
            catch (Exception ex)
            {
                throw new Exception($"Error at UpdateEventAsync() in Repository: {ex.Message}");
            }
        }

        // Get a list of Events with search, sort, and pagination
        public async Task<(List<Event> events, int totalCount)> GetListEventAsync(int pageIndex, int pageSize, string sortBy, bool sortDesc, string search)
        {
            var query = _context.Events.AsQueryable().Where(e => e.Status == 1);

            // Search
            if (!string.IsNullOrEmpty(search))
            {
                query = query.Where(e => e.EventName.Contains(search));
            }

            // Sorting
            if (!string.IsNullOrEmpty(sortBy))
            {
                var sortDirection = sortDesc ? "descending" : "ascending";
                var sortExpression = $"{sortBy} {sortDirection}";
                query = query.OrderBy(sortExpression);
            }

            // Total count before paging
            var totalCount = await query.CountAsync();

            // Paging
            var events = await query.Skip((pageIndex - 1) * pageSize).Take(pageSize).ToListAsync();
            return (events, totalCount);
        }

        // Get a list of Events for a specific seller with search, sort, and pagination
        public async Task<(List<Event> events, int totalCount)> GetListEventsOfSellerAsync(int pageIndex, int pageSize, string sellerId, string sortBy, bool sortDesc, string search)
        {
            var query = _context.Events.AsQueryable().Where(e => e.CreateBy == sellerId && e.Status == 1);

            // Search
            if (!string.IsNullOrEmpty(search))
            {
                query = query.Where(e => e.EventName.Contains(search));
            }

            // Sorting
            if (!string.IsNullOrEmpty(sortBy))
            {
                var sortDirection = sortDesc ? "descending" : "ascending";
                var sortExpression = $"{sortBy} {sortDirection}";
                query = query.OrderBy(sortExpression);
            }

            // Total count before paging
            var totalCount = await query.CountAsync();

            // Paging
            var events = await query.Skip((pageIndex - 1) * pageSize).Take(pageSize).ToListAsync();
            return (events, totalCount);
        }

        public async Task<(List<Event> events, int totalCount)> GetListAllEventsOfSellerAsync(int pageIndex, int pageSize, string sellerId, string sortBy, bool sortDesc, string search)
        {
            var query = _context.Events.AsQueryable().Where(e => e.CreateBy == sellerId);

            // Search
            if (!string.IsNullOrEmpty(search))
            {
                query = query.Where(e => e.EventName.Contains(search));
            }

            // Sorting
            if (!string.IsNullOrEmpty(sortBy))
            {
                var sortDirection = sortDesc ? "descending" : "ascending";
                var sortExpression = $"{sortBy} {sortDirection}";
                query = query.OrderBy(sortExpression);
            }

            // Total count before paging
            var totalCount = await query.CountAsync();

            // Paging
            var events = await query.Skip((pageIndex - 1) * pageSize).Take(pageSize).ToListAsync();
            return (events, totalCount);
        }
        // Soft delete an Event
        public async Task<bool> DeleteEventAsync(string eventId)
        {
            try
            {
                var eventToDelete = await GetEventByEventIdAsync(eventId);
                if (eventToDelete == null)
                {
                    return false; // Event not found
                }

                // Soft delete
                eventToDelete.Status = 0; // Mark as deleted
                _context.Events.Update(eventToDelete);
                return await _context.SaveChangesAsync() > 0;
            }
            catch (Exception ex)
            {
                throw new Exception($"Error at DeleteEventAsync() in Repository: {ex.Message}");
            }
        }
        public async Task<int> GetNumberOfPostOfEvent(string eventId)
        {
            return await _context.SellerPosts
                .CountAsync(item => item.EventId.Equals(eventId));
        }
    }
}
