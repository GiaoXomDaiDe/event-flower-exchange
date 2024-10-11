using EventFlowerExchange_Espoir.DatabaseConnection;
using EventFlowerExchange_Espoir.Models;
using Google;
using Microsoft.EntityFrameworkCore;

namespace EventFlowerExchange_Espoir.Repositories.Impl
{
    public class EventRepository : IEventRepository
    {
        private readonly EspoirDbContext _context;

        public EventRepository(EspoirDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Event>> GetAllAsync()
        {
            return await _context.Events
                .Where(e => e.IsActive)    // Filter only active events
                .ToListAsync();
        }

        public async Task<Event> GetByIdAsync(string id)
        {
            return await _context.Events.FindAsync(id);
        }

        public async Task<IEnumerable<Event>> GetBySellerAsync(string sellerId)
        {
            //return await _context.Events
            //    .Where(e => e.SellerId == sellerId && e.IsActive)
            //    .ToListAsync();
            return null;
        }

        public async Task<Event> AddAsync(Event eventItem)
        {
            _context.Events.Add(eventItem);
            await _context.SaveChangesAsync();
            return eventItem;
        }

        public async Task UpdateAsync(Event eventItem)
        {
            _context.Entry(eventItem).State = EntityState.Modified;
            await _context.SaveChangesAsync();
        }

        public async Task DeleteAsync(int id)
        {
            var eventItem = await _context.Events.FindAsync(id);
            if (eventItem != null)
            {
                // Soft delete by deactivating
                eventItem.IsActive = false;
                await _context.SaveChangesAsync();
            }
        }

        public Task<IEnumerable<Event>> GetAllEventsAsync()
        {
            throw new NotImplementedException();
        }

        public Task<Event> GetEventByIdAsync(int eventId)
        {
            throw new NotImplementedException();
        }

        public Task<IEnumerable<Event>> GetEventsBySellerIdAsync(int sellerId)
        {
            throw new NotImplementedException();
        }

        public Task<Event> AddEventAsync(Event eventItem)
        {
            throw new NotImplementedException();
        }

        public Task UpdateEventAsync(Event eventItem)
        {
            throw new NotImplementedException();
        }

        public Task DeleteEventAsync(int eventId)
        {
            throw new NotImplementedException();
        }
    }
}
