using EventFlowerExchange_Espoir.DatabaseConnection;
using EventFlowerExchange_Espoir.Models;
using Microsoft.EntityFrameworkCore;

namespace EventFlowerExchange_Espoir.Repositories.Impl
{
    public class FlowerTagRepository : IFlowerTagRepository
    {
        private readonly EspoirDbContext _context;

        public FlowerTagRepository(EspoirDbContext context)
        {
            _context = context;
        }

        public async Task<FlowerTag> GetTagByTagName(string tagName)
        {
            return await _context.FlowerTags.FirstOrDefaultAsync(ft => ft.TagName == tagName);
        }

        public async Task<FlowerTag> GetTagByTagId(string tagId)
        {
            return await _context.FlowerTags.FirstOrDefaultAsync(ft => ft.TagId == tagId);
        }

        public async Task<string> GetLatestFlowerTagIdAsync()
        {
            try
            {

                // Fetch the relevant data from the database
                var flowerTagIds = await _context.FlowerTags
                    .Select(u => u.TagId)
                    .ToListAsync();

                // Process the data in memory to extract and order by the numeric part
                var latestFlowerTagId = flowerTagIds
                    .Select(id => new { TagId = id, NumericPart = int.Parse(id.Substring(2)) })
                    .OrderByDescending(u => u.NumericPart)
                    .ThenByDescending(u => u.TagId)
                    .Select(u => u.TagId)
                    .FirstOrDefault();

                return latestFlowerTagId;
            }
            catch (Exception e)
            {
                throw new Exception(e.Message, e);
            }
        }
        public async Task<dynamic> AddTagAsync(FlowerTag tag)
        {
            try
            {
                await _context.FlowerTags.AddAsync(tag);
                return _context.SaveChangesAsync();
            } catch (Exception ex)
            {
                throw new Exception($"Error at AddTagAsync() of FlowerTagRepository + {ex}");
            }
        }

        public async Task<dynamic> UpdateTagAsync(FlowerTag tag)
        {
            try
            {
                _context.FlowerTags.Update(tag);
                return await _context.SaveChangesAsync() > 0;
            } catch (Exception ex)
            {
                throw new Exception($"Error at UpdateTagAsync() of FlowerTagRepository + {ex}");
            }
        }

        public async Task<dynamic> DeleteTagAsync(FlowerTag tag)
        {
            try
            {
            _context.FlowerTags.Remove(tag);
            return await _context.SaveChangesAsync();
            } catch(Exception ex)
            {
                throw new Exception($"Error at DeleteTagAsync() of FlowerTagRepository + {ex}");
            }
        }
    }
}
