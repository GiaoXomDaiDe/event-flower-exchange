using EventFlowerExchange_Espoir.DatabaseConnection;
using EventFlowerExchange_Espoir.Models;
using EventFlowerExchange_Espoir.Models.DTO;
using Microsoft.EntityFrameworkCore;
using System.Diagnostics.Eventing.Reader;
using System.Linq.Dynamic.Core;

namespace EventFlowerExchange_Espoir.Repositories.Impl
{
    public class ProductRepository : IProductRepository
    {
        private readonly EspoirDbContext _context;

        public ProductRepository(EspoirDbContext context)
        {
            _context = context;
        }

        // Get Flower by attribute
        public async Task<Flower> GetFlowerByFlowerIdAsync(string flowerId)
        {
            return await _context.Flowers.FirstOrDefaultAsync(f => f.FlowerId == flowerId);
        }


        // Get the latest flower id
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

        // for crud flower
        public async Task<dynamic> CreateFlowerAsync(Flower newFlower)
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
                throw new Exception($"Error at CreateFlowerAsync() of ProductRepository + {ex}");
            }
        }

        public async Task<dynamic> UpdateFlowerAsync(Flower flower)
        {
            try
            {
                _context.Flowers.Update(flower);
                return await _context.SaveChangesAsync() > 0;
            }
            catch (Exception ex)
            {
                throw new Exception($"Error at UpdateFlowerAsync() in Repository: {ex.Message}");
            }
        }

        // For get list of product + search + sort + pagination
            //var query = _context.Flowers.AsQueryable().Where(f => f.Status == 0 && f.IsDeleted == 0);

            //// search
            //if (!string.IsNullOrEmpty(search))
            //{
            //    int.TryParse(search, out int searchId);
            //    query = query.Where(i => i.FlowerName.Contains(search));
            //}

            //// sorting
            //if (!string.IsNullOrEmpty(sortBy))
            //{
            //    var sortDirection = sortDesc ? "descending" : "ascending";
            //    var sortExpression = $"{sortBy} {sortDirection}";
            //    query = query.OrderBy(sortExpression);
            //}

            //// Total count before paging
            //var totalCount = await query.CountAsync();

            //// Paging
            //var flowers = await query.Skip((pageIndex - 1) * pageSize).Take(pageSize).ToListAsync();
            //return (flowers, totalCount);
        public async Task<(List<Flower> flowers, int totalCount)> GetListFlowerAsync(int pageIndex, int pageSize, string sortBy, bool sortDesc, string search)
        {
            var query = _context.Flowers.Include(f => f.Cate)
                        .Include(f => f.Tag)   
                        .Where(f => f.Status == 0 && f.IsDeleted == 0).AsQueryable();
            //Search
            if (!string.IsNullOrEmpty(search))
            {
                int.TryParse(search, out int searchId);
                query = query.Where(i => i.FlowerName.Contains(search));
            }

            if (!string.IsNullOrEmpty(sortBy))
            {
                var sortDirection = sortDesc ? "descending" : "ascending";
                var sortExpression = $"{sortBy} {sortDirection}";
                query = query.OrderBy(sortExpression);
            }
            if (!string.IsNullOrEmpty(sortBy))
            {
                query = sortBy.ToLower() switch
                {
                    "flowername" => sortDesc ? query.OrderByDescending(co => co.FlowerName) : query.OrderBy(co => co.FlowerName),
                    _ => query
                };
            }

            // Total count before paging
            var totalCount = await query.CountAsync();

            // Paging
            var flowers = await query.Skip((pageIndex - 1) * pageSize).Take(pageSize).ToListAsync();
            return (flowers, totalCount);
        }

        public async Task<(List<Flower> flowers, int totalCount)> GetListFlowerOfSellerAsync(int pageIndex, int pageSize, string accountId, string sortBy, bool sortDesc, string search)
        {
            var query = _context.Flowers.AsQueryable().Include(f => f.Cate).Where(f => f.Account.AccountId == accountId && f.Status == 1 && f.IsDeleted == 0);
            if (!string.IsNullOrEmpty(search))
            {
                int.TryParse(search, out int searchId);
                query = query.Where(i => i.FlowerName.Contains(search));
            }

            if (!string.IsNullOrEmpty(sortBy))
            {
                var sortDirection = sortDesc ? "descending" : "ascending";
                var sortExpression = $"{sortBy} {sortDirection}";
                query = query.OrderBy(sortExpression);
            }

            var totalCount = await query.CountAsync();

            var flowers = await query.Skip((pageIndex - 1) * pageSize).Take(pageSize).ToListAsync();
            return (flowers, totalCount);
        }
    }
}
