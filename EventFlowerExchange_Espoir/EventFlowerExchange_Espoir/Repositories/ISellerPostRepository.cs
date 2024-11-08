using EventFlowerExchange_Espoir.Models;

namespace EventFlowerExchange_Espoir.Repositories
{
    public interface ISellerPostRepository
    {
        public Task<string> AutoGenerateSellerPostId();
        public Task<string> GetLatestSellerPostIdAsync();
        public Task<string> AutoGeneratePostDetailId();
        public Task<string> GetLatestPostDetailIdAsync();
        public Task<List<SellerPost>> GetListSellerPosts();
        public Task CreateMultiplePostDetails(List<PostDetail> postDetails);
        public Task<SellerPost> GetSellerPostById(string postId);
        public Task<SellerPost> CreatePost(SellerPost sellerPost);
        public Task UpdatePost(SellerPost sellerPost);
    }
}