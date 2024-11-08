using EventFlowerExchange_Espoir.Models;
using EventFlowerExchange_Espoir.Models.DTO;
using EventFlowerExchange_Espoir.Repositories;

namespace EventFlowerExchange_Espoir.Services.Impl
{
    public class SellerPostService : ISellerPostService
    {
        private readonly ISellerPostRepository _sellerPostRepository;
        private readonly IAccountRepository _accountRepository;

        public SellerPostService(ISellerPostRepository sellerPostRepository, IAccountRepository accountRepository)
        {
            _sellerPostRepository = sellerPostRepository;
            _accountRepository = accountRepository;
        }

        public async Task<dynamic> CreatePost(CreatePostDto createPost)
        {
            try
            {
                var account = await _accountRepository.GetAccountByEmailAsync(createPost.AccountEmail);
                var sellerPost = await _sellerPostRepository.CreatePost(new SellerPost()
                {
                    AccountId = account.AccountId,
                    Attachment = createPost.Attachment,
                    Content = createPost.Content,
                    CreateAt = DateOnly.FromDateTime(DateTime.Now),
                    EventId = createPost.EventId,
                    Title = createPost.Title,
                    HadEvent = createPost.HadEvent,
                    PostId = await _sellerPostRepository.AutoGenerateSellerPostId()
                });
                List<PostDetail> postDetails = new List<PostDetail>();
                foreach (var item in createPost.PostDetails)
                {
                    postDetails.Add(new PostDetail()
                    {
                        PdetailId = await _sellerPostRepository.AutoGeneratePostDetailId(),
                        FlowerId = item.FlowerId,
                        PostId = sellerPost.PostId
                    });
                }
                await _sellerPostRepository.CreateMultiplePostDetails(postDetails);
                return sellerPost;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<List<SellerPost>> GetListSellerPosts()
        {
            return await _sellerPostRepository.GetListSellerPosts();
        }

        public Task<SellerPost> GetSellerPostById(string postId)
        {
            throw new NotImplementedException();
        }

        public Task UpdatePost(SellerPost sellerPost)
        {
            throw new NotImplementedException();
        }
    }
}