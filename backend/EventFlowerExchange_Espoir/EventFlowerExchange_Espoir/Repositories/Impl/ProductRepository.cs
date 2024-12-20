﻿using EventFlowerExchange_Espoir.DatabaseConnection;
using EventFlowerExchange_Espoir.Models;
using EventFlowerExchange_Espoir.Models.DTO;
using Microsoft.EntityFrameworkCore;
using Microsoft.Identity.Client;
using System.Diagnostics;
using System.Diagnostics.Eventing.Reader;
using System.Linq.Dynamic.Core;

namespace EventFlowerExchange_Espoir.Repositories.Impl
{
    public class ProductRepository : IProductRepository
    {
        private readonly EspoirDbContext _context;
        private readonly IAccountRepository _accountRepository;
        public ProductRepository(EspoirDbContext context, IAccountRepository accountRepository)
        {
            _context = context;
            _accountRepository = accountRepository;
        }

        // Get Flower by attribute
        public async Task<Flower> GetFlowerByFlowerIdAsync(string flowerId)
        {
            return await _context.Flowers.FirstOrDefaultAsync(f => f.FlowerId == flowerId);
        }
        public async Task<Flower> GetFlowerByFlowerNameAsync(string flowerName)
        {
            return await _context.Flowers.FirstOrDefaultAsync(f => f.FlowerId.Equals(flowerName));
        }
        public async Task<string> GetFlowerNameByFlowerId(string flowerId)
        {
            return await _context.Flowers
                     .Where(f => f.FlowerId == flowerId)
                     .Select(f => f.FlowerName)
                     .FirstOrDefaultAsync();
        }
        public async Task<List<Flower>> GetListFlowerByAccountId(string accountId)
        {
            return await _context.Flowers.Where(f => f.AccountId == accountId).ToListAsync();
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

        public async Task<dynamic> DeleteListOfFlowersAsEverAsync(List<Flower> flowers)
        {
            _context.Flowers.RemoveRange(flowers);
            return await _context.SaveChangesAsync() > 0;
        }


        // split string of tagIds for getting tagId
        public static string GetTagNamesByIds(string tagIds, EspoirDbContext context)
        {
            if (string.IsNullOrEmpty(tagIds))
            {
                return string.Empty; // Return an empty string if TagIds is null or empty
            }

            // Split the TagIds into a list
            var tagIdList = tagIds.Split(',').Select(id => id.Trim()).ToList();

            // Fetch all FlowerTags from the database first
            var allTags = context.FlowerTags.ToList();

            // Perform filtering in-memory to avoid SQL syntax issues
            var tagNames = allTags.Where(t => tagIdList.Contains(t.TagId))
                                  .Select(t => t.TagName)
                                  .ToList();

            // Concatenate tag names into a single string
            return string.Join(", ", tagNames);
        }



        public async Task<(List<FlowerListDTO> flowers, int totalCount, int totalPages)> GetListFlowerAsync(int pageIndex, int pageSize, string sortBy, bool sortDesc, string search)
        {
            var query = _context.Flowers.Include(f => f.Cate)
                        .Include(f => f.Account)
                        .Where(f => f.Status == 1 && f.IsDeleted == 0).AsQueryable();
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
                query = ApplySorting(query, sortBy, sortDesc);
            }

            // Total count before paging
            var totalCount = await query.CountAsync();
            var totalPages = (int)Math.Ceiling(totalCount / (double)pageSize);

            // Paging
            var flowers = query.Skip((pageIndex - 1) * pageSize).Take(pageSize).Select(c => new FlowerListDTO
            {
                FlowerId = c.FlowerId,
                FlowerName = c.FlowerName,
                Category = c.CateId,
                Description = c.Description,
                Size = c.Size,
                Condition = c.Condition,
                Quantity = c.Quantity,
                Price = c.Price,
                OldPrice = c.OldPrice,
                Attachment = c.Attachment,
                DateExpiration = c.DateExpiration,
                TagNames = GetTagNamesByIds(c.TagIds, _context),
                Status = c.Status,
                Shop = _context.Users.Where(u => u.AccountId == c.AccountId)
                                  .Select(u => u.ShopName).FirstOrDefault(),

            }).ToList();

            return (flowers, totalCount, totalPages);
        }


        public async Task<(List<FlowerListDTO> flowers, int totalCount, int totalPages)> GetListInactiveFlowerAsync(int pageIndex, int pageSize, string sortBy, bool sortDesc, string search)
        {
            var query = _context.Flowers.Include(f => f.Cate)
                        .Include(f => f.Account)
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
                query = ApplySorting(query, sortBy, sortDesc);
            }

            // Total count before paging
            var totalCount = await query.CountAsync();
            var totalPages = (int)Math.Ceiling(totalCount / (double)pageSize);

            // Paging
            var flowers = query.Skip((pageIndex - 1) * pageSize).Take(pageSize).Select(c => new FlowerListDTO
            {
                FlowerId = c.FlowerId,
                FlowerName = c.FlowerName,
                Category = c.Cate.FcateName,
                Description = c.Description,
                Size = c.Size,
                Condition = c.Condition,
                Quantity = c.Quantity,
                Price = c.Price,
                OldPrice = c.OldPrice,
                Attachment = c.Attachment,
                DateExpiration = c.DateExpiration,
                TagNames = GetTagNamesByIds(c.TagIds, _context),
                Status = c.Status,
                Shop = _context.Users.Where(u => u.AccountId == c.AccountId)
                                  .Select(u => u.ShopName).FirstOrDefault(),

            }).ToList();

            return (flowers, totalCount, totalPages);
        }
        public async Task<(List<FlowerListDTO> flowers, int totalCount, int totalPages)> GetListAllFlowerAsync(int pageIndex, int pageSize, string sortBy, bool sortDesc, string search)
        {
            var query = _context.Flowers.Include(f => f.Cate)
                        .Include(f => f.Account)
                        .Where(f => f.IsDeleted == 0).AsQueryable();
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
                query = ApplySorting(query, sortBy, sortDesc);
            }

            // Total count before paging
            var totalCount = await query.CountAsync();
            var totalPages = (int)Math.Ceiling(totalCount / (double)pageSize);

            // Paging
            var flowers = query.Skip((pageIndex - 1) * pageSize).Take(pageSize).Select(c => new FlowerListDTO
            {
                FlowerId = c.FlowerId,
                FlowerName = c.FlowerName,
                Category = c.Cate.FcateName,
                Description = c.Description,
                Size = c.Size,
                Condition = c.Condition,
                Quantity = c.Quantity,
                Price = c.Price,
                OldPrice = c.OldPrice,
                Attachment = c.Attachment,
                DateExpiration = c.DateExpiration,
                TagNames = GetTagNamesByIds(c.TagIds, _context),
                Status = c.Status,
                Shop = _context.Users.Where(u => u.AccountId == c.AccountId)
                                  .Select(u => u.ShopName).FirstOrDefault(),

            }).ToList();

            return (flowers, totalCount, totalPages);
        }
        public async Task<(List<FlowerListDTO> flowers, int totalCount, int totalPages)> GetListFlowerOfSellerAsync(int pageIndex, int pageSize, string sortBy, bool sortDesc, string search)
        {
            string accountId = await _accountRepository.GetAccountIdByShopName(search);
            var query = _context.Flowers.AsQueryable().Include(f => f.Cate)
                        .Include(f => f.Account).Where(f => f.Status == 0 && f.IsDeleted == 0 && f.AccountId == accountId);
            if (!string.IsNullOrEmpty(search))
            {
                int.TryParse(search, out int searchId);
                query = query.Where(i => i.Account.Users.Select(u => u.ShopName).Contains(search));
            }

            if (!string.IsNullOrEmpty(sortBy))
            {
                var sortDirection = sortDesc ? "descending" : "ascending";
                var sortExpression = $"{sortBy} {sortDirection}";
                query = query.OrderBy(sortExpression);
            }

            if (!string.IsNullOrEmpty(sortBy))
            {
                query = ApplySorting(query, sortBy, sortDesc);
            }
            var totalCount = await query.CountAsync();
            var totalPages = (int)Math.Ceiling(totalCount / (double)pageSize);

            var flowers = await query.Skip((pageIndex - 1) * pageSize).Take(pageSize).Select(c => new FlowerListDTO
            {
                FlowerId = c.FlowerId,
                FlowerName = c.FlowerName,
                Category = c.Cate.FcateName,
                Description = c.Description,
                Size = c.Size,
                Condition = c.Condition,
                Quantity = c.Quantity,
                Price = c.Price,
                OldPrice = c.OldPrice,
                DateExpiration = c.DateExpiration,
                Attachment = c.Attachment,
                TagNames = GetTagNamesByIds(c.TagIds, _context),
                Status = c.Status,
                Shop = _context.Users.Where(u => u.AccountId == c.AccountId)
                                  .Select(u => u.ShopName).FirstOrDefault(),
            }).ToListAsync();
            return (flowers, totalCount, totalPages);
        }

        public async Task<(List<FlowerListDTO> flowers, int totalCount, int totalPages)> GetListAllFlowerOfSellerAsync(int pageIndex, int pageSize, string sortBy, bool sortDesc, string search)
        {
            string accountId = await _accountRepository.GetAccountIdByShopName(search);
            var query = _context.Flowers.AsQueryable().Include(f => f.Cate)
                        .Include(f => f.Account).Where(f => f.IsDeleted == 0 && f.AccountId == accountId);
            if (!string.IsNullOrEmpty(search))
            {
                int.TryParse(search, out int searchId);
                query = query.Where(i => i.Account.Users.Select(u => u.ShopName).Contains(search));
            }

            if (!string.IsNullOrEmpty(sortBy))
            {
                var sortDirection = sortDesc ? "descending" : "ascending";
                var sortExpression = $"{sortBy} {sortDirection}";
                query = query.OrderBy(sortExpression);
            }

            if (!string.IsNullOrEmpty(sortBy))
            {
                query = ApplySorting(query, sortBy, sortDesc);
            }
            var totalCount = await query.CountAsync();
            var totalPages = (int)Math.Ceiling(totalCount / (double)pageSize);

            var flowers = await query.Skip((pageIndex - 1) * pageSize).Take(pageSize).Select(c => new FlowerListDTO
            {
                FlowerId = c.FlowerId,
                FlowerName = c.FlowerName,
                Category = c.Cate.FcateName,
                Description = c.Description,
                Size = c.Size,
                Condition = c.Condition,
                Quantity = c.Quantity,
                Price = c.Price,
                OldPrice = c.OldPrice,
                DateExpiration = c.DateExpiration,
                Attachment = c.Attachment,
                TagNames = GetTagNamesByIds(c.TagIds, _context),
                Status = c.Status,
                Shop = _context.Users.Where(u => u.AccountId == c.AccountId)
                                  .Select(u => u.ShopName).FirstOrDefault(),
            }).ToListAsync();
            return (flowers, totalCount, totalPages);
        }
        public async Task<(List<FlowerListDTO> flowers, int totalCount, int totalPages)> GetListInactiveFlowerOfSellerAsync(int pageIndex, int pageSize, string sortBy, bool sortDesc, string search)
        {
            string accountId = await _accountRepository.GetAccountIdByShopName(search);
            var query = _context.Flowers.AsQueryable().Include(f => f.Cate)
                        .Include(f => f.Account).Where(f => f.Status == 0 && f.IsDeleted == 0 && f.AccountId == accountId);
            if (!string.IsNullOrEmpty(search))
            {
                int.TryParse(search, out int searchId);
                query = query.Where(i => i.Account.Users.Select(u => u.ShopName).Contains(search));
            }

            if (!string.IsNullOrEmpty(sortBy))
            {
                var sortDirection = sortDesc ? "descending" : "ascending";
                var sortExpression = $"{sortBy} {sortDirection}";
                query = query.OrderBy(sortExpression);
            }

            if (!string.IsNullOrEmpty(sortBy))
            {
                query = ApplySorting(query, sortBy, sortDesc);
            }
            var totalCount = await query.CountAsync();
            var totalPages = (int)Math.Ceiling(totalCount / (double)pageSize);

            var flowers = await query.Skip((pageIndex - 1) * pageSize).Take(pageSize).Select(c => new FlowerListDTO
            {
                FlowerId = c.FlowerId,
                FlowerName = c.FlowerName,
                Category = c.Cate.FcateName,
                Description = c.Description,
                Size = c.Size,
                Condition = c.Condition,
                Quantity = c.Quantity,
                Price = c.Price,
                OldPrice = c.OldPrice,
                DateExpiration = c.DateExpiration,
                Attachment = c.Attachment,
                TagNames = GetTagNamesByIds(c.TagIds, _context),
                Status = c.Status,
                Shop = _context.Users.Where(u => u.AccountId == c.AccountId)
                                  .Select(u => u.ShopName).FirstOrDefault(),
            }).ToListAsync();
            return (flowers, totalCount, totalPages);
        }



        private IQueryable<Flower> ApplySorting(IQueryable<Flower> query, string sortBy, bool sortDesc)
        {
            query = sortBy.ToLower() switch
            {
                "flowername" => sortDesc ? query.OrderByDescending(f => f.FlowerName) : query.OrderBy(f => f.FlowerName),
                "cateId" => sortDesc ? query.OrderByDescending(f => f.CateId) : query.OrderBy(f => f.CateId),
                _ => query // Default case if no valid sorting field is provided

            };
            return query;
        }

        public async Task<Account> GetSellerByFlowerId(string flowerId)
        {
            var sellerId = await _context.Flowers
                .FirstOrDefaultAsync(item => item.FlowerId.Equals(flowerId));
            return await _context.Accounts
                .FirstOrDefaultAsync(item => item.AccountId.Equals(sellerId)) ?? new Account();
        }

        public async Task<List<Flower>> GetAllActiveFlowers()
        {
            return await _context.Flowers
                .Where(item => item.Quantity > 0)
                .ToListAsync();
        }
    }
}
