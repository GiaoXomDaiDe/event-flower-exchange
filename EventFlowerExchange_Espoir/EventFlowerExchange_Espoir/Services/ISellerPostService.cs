using EventFlowerExchange_Espoir.Models;
using EventFlowerExchange_Espoir.Models.DTO;

namespace EventFlowerExchange_Espoir.Services
{
    public interface ISellerPostService
    {
        public Task<List<SellerPost>> GetListSellerPosts();
        public Task<SellerPost> GetSellerPostById(string postId);
        public Task<dynamic> CreatePost(CreatePostDto createPost);
        public Task UpdatePost(SellerPost sellerPost);
    }
}