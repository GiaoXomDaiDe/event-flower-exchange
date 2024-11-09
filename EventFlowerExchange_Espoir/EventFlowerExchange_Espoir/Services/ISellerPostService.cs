using EventFlowerExchange_Espoir.Models;
using EventFlowerExchange_Espoir.Models.DTO;

namespace EventFlowerExchange_Espoir.Services
{
    public interface ISellerPostService
    {
        public Task<dynamic> CreatePost(CreatePostDTO createPost);
        public Task DeletePost(string postId);
        public Task<List<ViewPostDto>> GetListSellerPosts();
        public Task UpdatePost(UpdatePostDto post);
        public Task<ViewPostDto> GetSellerPostById(string postId);

    }
}