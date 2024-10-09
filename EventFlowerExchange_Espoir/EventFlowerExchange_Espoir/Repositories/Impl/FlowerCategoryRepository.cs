using EventFlowerExchange_Espoir.DatabaseConnection;
using EventFlowerExchange_Espoir.Models;
using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;

namespace EventFlowerExchange_Espoir.Repositories.Impl
{
    public class FlowerCategoryRepository : IFlowerCategoryRepository
    {
        private readonly EspoirDbContext _context;

        public FlowerCategoryRepository(EspoirDbContext context)
        {
            _context = context;
        }

        public async Task<string> GetLatestFlowerCateIdAsync()
        {
            try
            {

                // Fetch the relevant data from the database
                var flowerCateIds = await _context.FlowerCates
                    .Select(u => u.FcateId)
                    .ToListAsync();

                // Process the data in memory to extract and order by the numeric part
                var latestFlowerCateId = flowerCateIds
                    .Select(id => new { FCateId = id, NumericPart = int.Parse(id.Substring(2)) })
                    .OrderByDescending(u => u.NumericPart)
                    .ThenByDescending(u => u.FCateId)
                    .Select(u => u.FCateId)
                    .FirstOrDefault();

                return latestFlowerCateId;
            }
            catch (Exception e)
            {
                throw new Exception(e.Message, e);
            }
        }

        public async Task<dynamic> CreateFlowerCateAsync(FlowerCate cate)
        {
            try
            {
                using (var context = new EspoirDbContext())
                {
                    await context.FlowerCates.AddAsync(cate);
                    return await context.SaveChangesAsync();
                }
            } catch (Exception ex)
            {
                throw new Exception($"Error at CreateFlowerCateAsync() - repository: + {ex.Message}");
            }

        }
    }
}
