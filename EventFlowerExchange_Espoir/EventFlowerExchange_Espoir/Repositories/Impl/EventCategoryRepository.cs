using EventFlowerExchange_Espoir.DatabaseConnection;
using EventFlowerExchange_Espoir.Models;
using Microsoft.EntityFrameworkCore;
using System.Linq.Dynamic.Core;

namespace EventFlowerExchange_Espoir.Repositories.Impl
{
    public class EventCategoryRepository : IEventCategoryRepository
    {
        private readonly EspoirDbContext _context;

        public EventCategoryRepository(EspoirDbContext context)
        {
            _context = context;
        }

        // Get EventCategory by category ID
        public async Task<EventCate> GetEventCateByCateIdAsync(string categoryId)
        {
            return await _context.EventCates.FirstOrDefaultAsync(ec => ec.EcateId == categoryId);
        }

        // Get the latest category ID
        public async Task<string> GetLatestEventCateIdAsync()
        {
            try
            {
                // Fetch the relevant data from the database
                var categoryIds = await _context.EventCates
                    .Select(u => u.EcateId)
                    .ToListAsync();

                // Process the data in memory to extract and order by the numeric part
                var latestCategoryId = categoryIds
                    .Select(id => new { CategoryId = id, NumericPart = int.Parse(id.Substring(2)) }) // Assuming the prefix is 2 characters
                    .OrderByDescending(u => u.NumericPart)
                    .ThenByDescending(u => u.CategoryId)
                    .Select(u => u.CategoryId)
                    .FirstOrDefault();

                return latestCategoryId;
            }
            catch (Exception e)
            {
                throw new Exception(e.Message, e);
            }
        }

        // Create a new EventCategory
        public async Task<dynamic> CreateEventCateAsync(EventCate newCategory)
        {
            try
            {
                await _context.EventCates.AddAsync(newCategory);
                return await _context.SaveChangesAsync() > 0;
            }
            catch (Exception ex)
            {
                throw new Exception($"Error at CreateEventCategoryAsync() - repository: {ex.Message}");
            }
        }

        // Update an existing EventCategory
        public async Task<dynamic> UpdateEventCategoryAsync(EventCate categoryToUpdate)
        {
            try
            {
                _context.EventCates.Update(categoryToUpdate);
                return await _context.SaveChangesAsync() > 0;
            }
            catch (Exception ex)
            {
                throw new Exception($"Error at UpdateEventCategoryAsync: {ex.Message}");
            }
        }

        // Get a list of EventCategories with pagination, sorting, and searching
        public async Task<(List<EventCate> categories, int totalCount)> GetListEventCategoryAsync(int pageIndex, int pageSize, string sortBy, bool sortDesc, string search)
        {
            var query = _context.EventCates.AsQueryable();

            // Searching
            if (!string.IsNullOrEmpty(search))
            {
                query = query.Where(ec => ec.Ename.Contains(search)); // Assuming Name is a property
            }

            // Sorting
            if (!string.IsNullOrEmpty(sortBy))
            {
                var sortDirection = sortDesc ? "descending" : "ascending";
                query = query.OrderBy($"{sortBy} {sortDirection}");
            }

            // Total count before paging
            var totalCount = await query.CountAsync();

            // Paging
            var categories = await query.Skip((pageIndex - 1) * pageSize).Take(pageSize).ToListAsync();
            return (categories, totalCount);
        }

        // Delete an EventCategory by ID
        public async Task<bool> DeleteEventCateAsync(string categoryId)
        {
            try
            {
                var category = await GetEventCateByCateIdAsync(categoryId);
                if (category != null)
                {
                    _context.EventCates.Remove(category);
                    return await _context.SaveChangesAsync() > 0;
                }
                return false; // Category not found
            }
            catch (Exception ex)
            {
                throw new Exception($"Error at DeleteEventCategoryAsync: {ex.Message}");
            }
        }
    }
}
