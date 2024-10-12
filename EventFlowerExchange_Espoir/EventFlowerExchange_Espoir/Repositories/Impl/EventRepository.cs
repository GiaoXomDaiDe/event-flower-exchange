using EventFlowerExchange_Espoir.DatabaseConnection;
using EventFlowerExchange_Espoir.Models;
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
                .Where(e => e.Status == 1)  
                .ToListAsync();
        }

        public async Task<Event> GetByIdAsync(string id)
        {
            return await _context.Events.FindAsync(id);
        }



        public async Task<IEnumerable<Event>> GetBySellerAsync(string createBy)
        {
            return await _context.Events
                .Where(e => e.CreateBy == createBy && e.Status == 1)  // Maps SellerId to CreateBy
                .ToListAsync();
        }

        public async Task CreateAsync(Event eventItem)
        {
            _context.Events.Add(eventItem);
            await _context.SaveChangesAsync();
        }

        public async Task UpdateAsync(Event eventItem)
        {
            _context.Entry(eventItem).State = EntityState.Modified;
            await _context.SaveChangesAsync();
        }

        
        public async Task DeleteAsync(string id)
        {
            var eventItem = await _context.Events.FindAsync(id);
            if (eventItem != null)
            {
                eventItem.Status = 0;  
                await _context.SaveChangesAsync();
            }
        }

    }
}
