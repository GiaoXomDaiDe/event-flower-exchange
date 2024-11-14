using EventFlowerExchange_Espoir.DatabaseConnection;
using EventFlowerExchange_Espoir.Models;
using EventFlowerExchange_Espoir.Models.DTO;
using Microsoft.EntityFrameworkCore;
using System.Linq.Dynamic.Core;

namespace EventFlowerExchange_Espoir.Repositories.Impl
{
    public class FeedbackRepository : IFeedbackRepository
    {
        private readonly EspoirDbContext _context;

        public FeedbackRepository(EspoirDbContext context)
        {
            _context = context;
        }

        public async Task<Feedback> GetFeedbackByIdAsync(string feedbackId)
        {
            return await _context.Feedbacks.FirstOrDefaultAsync(fb => fb.FeedbackId == feedbackId);
        }

        public async Task<List<ListFeedbackDTO>> GetListOfFeedbackAsync()
        {
            return await _context.Feedbacks.Select(fb => new ListFeedbackDTO
            {
                FeedbackId = fb.FeedbackId,
                Detail = fb.Detail,
                Rating = fb.Rating,
                FlowerId = fb.FlowerId,
                AccountId = fb.AccountId,
                CreateDate = fb.CreateDate,
                IsGoodReview = fb.IsGoodReview,
            }).ToListAsync();
        }

        public async Task<string> GetLatestAccountIdAsync()
        {
            try
            {

                // Fetch the relevant data from the database
                var accountIds = await _context.Accounts
                    .Select(u => u.AccountId)
                    .ToListAsync();

                // Process the data in memory to extract and order by the numeric part
                var latestAccountId = accountIds
                    .Select(id => new { AccountId = id, NumericPart = int.Parse(id.Substring(2)) })
                    .OrderByDescending(u => u.NumericPart)
                    .ThenByDescending(u => u.AccountId)
                    .Select(u => u.AccountId)
                    .FirstOrDefault();

                return latestAccountId;
            }
            catch (Exception e)
            {
                throw new Exception(e.Message, e);
            }
        }
        public async Task<string> GetLatestFeedbackIdAsync()
        {
            try
            {

                // Fetch the relevant data from the database
                var feedbackIds = await _context.Feedbacks
                    .Select(u => u.FeedbackId)
                    .ToListAsync();

                // Process the data in memory to extract and order by the numeric part
                var latestFeedbackId = feedbackIds
                    .Select(id => new { FeedbackId = id, NumericPart = int.Parse(id.Substring(2)) })
                    .OrderByDescending(u => u.NumericPart)
                    .ThenByDescending(u => u.FeedbackId)
                    .Select(u => u.FeedbackId)
                    .FirstOrDefault();

                return latestFeedbackId;
            }
            catch (Exception e)
            {
                throw new Exception(e.Message, e);
            }
        }

        // CRUD Feedback
        public async Task<dynamic> AddFeedbackAsync(Feedback feedback)
        {
            await _context.Feedbacks.AddAsync(feedback);
            return await _context.SaveChangesAsync();
        }

        public async Task<dynamic> UpdateFeedbackAsync(Feedback feedback)
        {
            _context.Feedbacks.Update(feedback);
            return await _context.SaveChangesAsync();
        }

        // Get List of Feedback
        public async Task<(List<FeedbacksDTO> Feebacks, int TotalCount, int TotalPages)> GetListFeedbackOfProduct(int pageIndex, int pageSize, string sortBy, bool sortDesc, string search)
        {
            var flowerName = search;
            var query = _context.Feedbacks.Include(fb => fb.Flower).Where(fb => fb.Flower.FlowerName == flowerName).AsQueryable();
            // search
            if (!string.IsNullOrEmpty(search))
            {
                int.TryParse(search, out int searchId);
                query = query.Where(fb => fb.Flower.FlowerName.Contains(flowerName));
            }
            if (!string.IsNullOrEmpty(sortBy))
            {
                var sortDirection = sortDesc ? "descending" : "ascending";
                var sortExpression = $"{sortBy} {sortDirection}";
                query = query.OrderBy(sortExpression);
            }

            // Total count before paging
            var totalCount = await query.CountAsync();
            var totalPages = (int)Math.Ceiling(totalCount / (double)pageSize);
            var feedbacks = await query.Skip((pageIndex - 1) * pageSize).Take(pageSize).Select(fb => new FeedbacksDTO
            {
                FeedbackId = fb.FeedbackId,
                Detail = fb.Detail,
                AccountId = fb.AccountId,
                Rating = fb.Rating,
                CreateDate = fb.CreateDate,
                IsGoodReview = fb.IsGoodReview,
            }).ToListAsync();
            return (feedbacks, totalCount, totalPages); 
        }


    }
}
