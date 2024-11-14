using EventFlowerExchange_Espoir.DatabaseConnection;
using EventFlowerExchange_Espoir.Models;
using Microsoft.EntityFrameworkCore;

namespace EventFlowerExchange_Espoir.Repositories.Impl
{
    public class SellerPostRepository : ISellerPostRepository
    {
        private readonly EspoirDbContext _context;

        public SellerPostRepository()
        {
            _context = new EspoirDbContext();
        }

        public async Task<string> AutoGeneratePostDetailId()
        {
            string newPostDetailId = "";
            string latestPostDetailId = await GetLatestPostDetailIdAsync();
            if (string.IsNullOrEmpty(latestPostDetailId))
            {
                newPostDetailId = "PD00000001";
            }
            else
            {
                int numericpart = int.Parse(latestPostDetailId.Substring(2));
                int newnumericpart = numericpart + 1;
                newPostDetailId = $"PD{newnumericpart:d8}";
            }
            return newPostDetailId;
        }

        public async Task<string> AutoGenerateSellerPostId()
        {
            string newSellerPostId = "";
            string latestSellerPostId = await GetLatestSellerPostIdAsync();
            if (string.IsNullOrEmpty(latestSellerPostId))
            {
                newSellerPostId = "SP00000001";
            }
            else
            {
                int numericpart = int.Parse(latestSellerPostId.Substring(2));
                int newnumericpart = numericpart + 1;
                newSellerPostId = $"SP{newnumericpart:d8}";
            }
            return newSellerPostId;
        }

        public async Task CreateMultiplePostDetails(List<PostDetail> postDetails)
        {
            await _context.PostDetails.AddRangeAsync(postDetails);
            await _context.SaveChangesAsync();
        }

        public async Task<SellerPost> CreatePost(SellerPost sellerPost)
        {
            await _context.SellerPosts.AddAsync(sellerPost);
            await _context.SaveChangesAsync();
            return sellerPost;
        }

        public async Task DeletePost(SellerPost post)
        {
            _context.Remove(post);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteRangePostDetail(List<PostDetail> postDetails)
        {
            _context.RemoveRange(postDetails);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteRangeSellerPosts(List<SellerPost> posts)
        {
            _context.RemoveRange(posts);
            await _context.SaveChangesAsync();
        }

        public async Task<List<PostDetail>> GetAllPostDetailsOfPost(string postId)
        {
            return await _context.PostDetails
                .Where(item => item.PostId.Equals(postId))
                .ToListAsync();
        }

        public async Task<List<SellerPost>> GetAllSellerPostOfEvent(string eventId)
        {
            return await _context.SellerPosts
                .Where(item => item.EventId.Equals(eventId))
                .ToListAsync();
        }

        public async Task<string> GetLatestPostDetailIdAsync()
        {
            try
            {

                // Fetch the relevant data from the database
                var postDetailIds = await _context.PostDetails
                    .Select(u => u.PostId)
                    .ToListAsync();

                // Process the data in memory to extract and order by the numeric part
                var latestPostDetailId = postDetailIds
                    .Select(id => new { PdetailId = id, NumericPart = int.Parse(id.Substring(2)) })
                    .OrderByDescending(u => u.NumericPart)
                    .ThenByDescending(u => u.PdetailId)
                    .Select(u => u.PdetailId)
                    .FirstOrDefault();

                return latestPostDetailId;
            }
            catch (Exception e)
            {
                throw new Exception(e.Message, e);
            }
        }

        public async Task<string> GetLatestSellerPostIdAsync()
        {
            try
            {

                // Fetch the relevant data from the database
                var sellerPostIds = await _context.SellerPosts
                    .Select(u => u.PostId)
                    .ToListAsync();

                // Process the data in memory to extract and order by the numeric part
                var latestSellerPostId = sellerPostIds
                    .Select(id => new { PostId = id, NumericPart = int.Parse(id.Substring(2)) })
                    .OrderByDescending(u => u.NumericPart)
                    .ThenByDescending(u => u.PostId)
                    .Select(u => u.PostId)
                    .FirstOrDefault();

                return latestSellerPostId;
            }
            catch (Exception e)
            {
                throw new Exception(e.Message, e);
            }
        }

        public async Task<List<SellerPost>> GetListSellerPosts()
        {
            return await _context.SellerPosts.ToListAsync();
        }

        public async Task<SellerPost> GetSellerPostById(string postId)
        {
            return await _context.SellerPosts
                .FirstOrDefaultAsync(item => item.PostId.Equals(postId));
        }

        public async Task UpdatePost(SellerPost sellerPost)
        {
            _context.Attach(sellerPost).State = EntityState.Modified;
            await _context.SaveChangesAsync();
        }

        public async Task UpdateRangePostDetail(List<PostDetail> postDetails)
        {
            foreach (var postDetail in postDetails)
            {
                _context.Attach(postDetail).State = EntityState.Modified;
                await _context.SaveChangesAsync();
            }
        }
    }
}