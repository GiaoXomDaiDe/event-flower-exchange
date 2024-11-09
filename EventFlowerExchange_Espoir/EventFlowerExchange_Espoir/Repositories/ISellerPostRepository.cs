using EventFlowerExchange_Espoir.Models;

namespace EventFlowerExchange_Espoir.Repositories
{
    public interface ISellerPostRepository
    {
        public Task<string> AutoGenerateSellerPostId();
        public Task<string> AutoGeneratePostDetailId();
        public Task<string> GetLatestPostDetailIdAsync();
        public Task<string> GetLatestSellerPostIdAsync();

        public Task CreateMultiplePostDetails(List<PostDetail> postDetails);
        public Task<SellerPost> CreatePost(SellerPost sellerPost);
        public Task DeletePost(SellerPost post);
        public Task DeleteRangePostDetail(List<PostDetail> postDetails);
        public Task DeleteRangeSellerPosts(List<SellerPost> posts);
        public Task<List<PostDetail>> GetAllPostDetailsOfPost(string postId);
        public Task<List<SellerPost>> GetAllSellerPostOfEvent(string eventId);
        public Task<List<SellerPost>> GetListSellerPosts();
        public Task<SellerPost> GetSellerPostById(string postId);
        public Task UpdatePost(SellerPost sellerPost);
        public Task UpdateRangePostDetail(List<PostDetail> postDetails);

    }
}