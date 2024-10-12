using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using EventFlowerExchange_Espoir.DatabaseConnection;
using EventFlowerExchange_Espoir.Models;
using Google;
using Microsoft.EntityFrameworkCore;

namespace EventFlowerExchange_Espoir.Repositories
{
    public class EventCategoryRepository : IEventCategoryRepository
    {
        private readonly EspoirDbContext _context;

        public EventCategoryRepository(EspoirDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<EventCate>> GetAllAsync()
        {
            return await _context.EventCates.ToListAsync();
        }

        public async Task<EventCate> GetByIdAsync(string id)
        {
            return await _context.EventCates.FindAsync(id);
        }

        public async Task CreateAsync(EventCate category)
        {
            _context.EventCates.Add(category);
            await _context.SaveChangesAsync();
        }

        public async Task UpdateAsync(EventCate category)
        {
            _context.Entry(category).State = EntityState.Modified;
            await _context.SaveChangesAsync();
        }
    }
}
