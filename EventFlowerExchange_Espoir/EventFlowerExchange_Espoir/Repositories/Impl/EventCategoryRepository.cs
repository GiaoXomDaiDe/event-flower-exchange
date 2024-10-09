using EventFlowerExchange_Espoir.DatabaseConnection;
using EventFlowerExchange_Espoir.Models;
using Google;
using Microsoft.EntityFrameworkCore;

namespace EventFlowerExchange_Espoir.Repositories.Impl
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
            return await _context.EventCates
                .Where(c => c.IsActive)    // Fetch only active categories
                .ToListAsync();
        }

        public async Task<EventCate> GetByIdAsync(int id)
        {
            return await _context.EventCates.FindAsync(id);
        }

        public async Task<EventCate> CreateAsync(EventCate category)
        {
            _context.EventCates.Add(category);
            await _context.SaveChangesAsync();
            return category;
        }

        public async Task UpdateAsync(EventCate category)
        {
            _context.Entry(category).State = EntityState.Modified;
            await _context.SaveChangesAsync();
        }

        public async Task DeleteAsync(int id)
        {
            var category = await _context.EventCates.FindAsync(id);
            if (category != null)
            {
                // Soft delete by deactivating
                category.IsActive = false;
                await _context.SaveChangesAsync();
            }
        }

        public Task<IEnumerable<EventCate>> GetAllCategoriesAsync()
        {
            throw new NotImplementedException();
        }

        public Task<EventCate> GetCategoryByIdAsync(int categoryId)
        {
            throw new NotImplementedException();
        }

        public Task<EventCate> AddCategoryAsync(EventCate category)
        {
            throw new NotImplementedException();
        }

        public Task UpdateCategoryAsync(EventCate category)
        {
            throw new NotImplementedException();
        }

        public Task DeleteCategoryAsync(int categoryId)
        {
            throw new NotImplementedException();
        }
    }
}
