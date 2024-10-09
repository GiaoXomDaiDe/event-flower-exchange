using EventFlowerExchange_Espoir.DatabaseConnection;
using EventFlowerExchange_Espoir.Models;
using Microsoft.EntityFrameworkCore;

namespace EventFlowerExchange_Espoir.Repositories.Impl
{
    public class ProductRepository : IProductRepository
    {
        private readonly EspoirDbContext _context;

        public ProductRepository(EspoirDbContext context)
        {
            _context = context;
        }
        public async Task<string> GetLatestFlowerIdAsync()
        {
            try
            {

                // Fetch the relevant data from the database
                var flowerIds = await _context.Flowers
                    .Select(u => u.FlowerId)
                    .ToListAsync();

                // Process the data in memory to extract and order by the numeric part
                var latestFlowerId = flowerIds
                    .Select(id => new { FlowerId = id, NumericPart = int.Parse(id.Substring(1)) })
                    .OrderByDescending(u => u.NumericPart)
                    .ThenByDescending(u => u.FlowerId)
                    .Select(u => u.FlowerId)
                    .FirstOrDefault();

                return latestFlowerId;
            }
            catch (Exception e)
            {
                throw new Exception(e.Message, e);
            }
        }
        public async Task<dynamic> CreateFlower(Flower newFlower)
        {
            try
            {
                using (var context = new EspoirDbContext())
                {
                    await context.Flowers.AddAsync(newFlower);
                    return await context.SaveChangesAsync();
                }
            }
            catch (Exception ex)
            {
                throw new Exception($"Error at CreateFlower() of ProductRepository + {ex}");
            }
        }
    }
}
