using EventFlowerExchange_Espoir.Models;
using EventFlowerExchange_Espoir.Models.DTO;
using EventFlowerExchange_Espoir.Models.DTO.Post;
using EventFlowerExchange_Espoir.Repositories;
using EventFlowerExchange_Espoir.Repositories.Impl;

namespace EventFlowerExchange_Espoir.Services.Impl
{
    public class SellerPostService : ISellerPostService
    {
        private readonly ISellerPostRepository _sellerPostRepository;
        private readonly IAccountRepository _accountRepository;
        private readonly IEventRepository _eventRepository;
        private readonly IProductRepository _productRepository;

        public SellerPostService(ISellerPostRepository sellerPostRepository, IAccountRepository accountRepository, IEventRepository eventRepository, IProductRepository productRepository)
        {
            _sellerPostRepository = sellerPostRepository;
            _accountRepository = accountRepository;
            _eventRepository = eventRepository;
            _productRepository = productRepository;
        }

        public async Task<dynamic> CreatePost(CreatePostDTO createPost)
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
        public async Task DeletePost(string postId)
        {
            var sellerPost = await _sellerPostRepository.GetSellerPostById(postId);
            var eventOfPost = await _eventRepository.GetEventByEventIdAsync(sellerPost.EventId);
            var postDetails = await _sellerPostRepository.GetAllPostDetailsOfPost(postId);
            await _sellerPostRepository.DeleteRangePostDetail(postDetails);
            var sellerPosts = await _sellerPostRepository.GetAllSellerPostOfEvent(eventOfPost.EventId);
            await _sellerPostRepository.DeleteRangeSellerPosts(sellerPosts);
            await _eventRepository.DeleteEventAsync(eventOfPost.EventId);
        }
        //public async Task<SellerPost> GetSellerPostById(string postId)
        //{
        //    return await _sellerPostRepository.GetSellerPostById(postId);
        //}

        //public async Task<List<SellerPost>> GetListSellerPosts()
        //{
        //    return await _sellerPostRepository.GetListSellerPosts();
        //}
        public async Task<List<ViewPostDto>> GetListSellerPosts()
        {
            var posts = await _sellerPostRepository.GetListSellerPosts();
            List<ViewPostDto> viewPostDtos = new List<ViewPostDto>();
            foreach (var post in posts)
            {
                ViewPostDto postDto = new ViewPostDto()
                {
                    Content = post.Content,
                    CreatedAt = post.CreateAt,
                    Attachment = post.Attachment,
                    Title = post.Title,
                    PostId = post.PostId
                };
                var eventPost = await _eventRepository.GetEventByEventIdAsync(post.EventId);
                postDto.ViewEvent = new ViewEventDto()
                {
                    EventId = eventPost.EventId,
                    EndTime = eventPost.EndTime,
                    EventDescription = eventPost.EventDesc,
                    EventName = eventPost.EventName,
                    StartTime = eventPost.StartTime
                };
                var postDetails = await _sellerPostRepository.GetAllPostDetailsOfPost(post.PostId);
                List<ViewPostDetailDto> viewPostDetailDtos = new List<ViewPostDetailDto>();
                foreach (var item in postDetails)
                {
                    var flower = await _productRepository.GetFlowerByFlowerIdAsync(item.FlowerId);
                    var postDetailDto = new ViewPostDetailDto()
                    {
                        PostDetailId = item.PdetailId,
                        ViewFlower = new ViewFlowerDto()
                        {
                            FlowerId = flower.FlowerId,
                            FlowerName = flower.FlowerName,
                            FlowerCondition = flower.Condition,
                            FlowerDescription = flower.Description,
                            FlowerExpiration = flower.DateExpiration,
                            FlowerOldPrice = flower.OldPrice,
                            FlowerPrice = flower.Price,
                            FlowerQuantity = flower.Quantity,
                            FlowerSize = flower.Size,
                            FlowerTags = flower.TagIds
                        }
                    };
                    viewPostDetailDtos.Add(postDetailDto);
                }
                postDto.ViewPostDetail = viewPostDetailDtos;
                viewPostDtos.Add(postDto);
            }
            return viewPostDtos;
        }

        public async Task UpdatePost(UpdatePostDto post)
        {
            try
            {
                var account = await _accountRepository.GetAccountByEmailAsync(post.AccountEmail);
                await _sellerPostRepository.UpdatePost(new SellerPost()
                {
                    AccountId = account.AccountId,
                    Attachment = post.Attachment,
                    Content = post.Content,
                    UpdatedAt = DateOnly.FromDateTime(DateTime.Now),
                    EventId = post.EventId,
                    Title = post.Title,
                    HadEvent = post.HadEvent,
                    PostId = post.PostId
                });
                List<PostDetail> postDetails = new List<PostDetail>();
                foreach (var item in post.ListPostDetails)
                {
                    postDetails.Add(new PostDetail()
                    {
                        PdetailId = item.PostDetailId,
                        FlowerId = item.FlowerId,
                        PostId = post.PostId
                    });
                }
                await _sellerPostRepository.UpdateRangePostDetail(postDetails);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
        public async Task<ViewPostDto> GetSellerPostById(string postId)
        {
            var viewPost = await _sellerPostRepository.GetSellerPostById(postId);
            if (viewPost == null) return null;
            ViewPostDto postDto = new ViewPostDto()
            {
                Content = viewPost.Content,
                CreatedAt = viewPost.CreateAt,
                Attachment = viewPost.Attachment,
                Title = viewPost.Title,
                PostId = viewPost.PostId
            };
            var eventPost = await _eventRepository.GetEventByEventIdAsync(viewPost.EventId);
            postDto.ViewEvent = new ViewEventDto()
            {
                EventId = eventPost.EventId,
                EndTime = eventPost.EndTime,
                EventDescription = eventPost.EventDesc,
                EventName = eventPost.EventName,
                StartTime = eventPost.StartTime
            };
            var postDetails = await _sellerPostRepository.GetAllPostDetailsOfPost(viewPost.PostId);
            List<ViewPostDetailDto> viewPostDetailDtos = new List<ViewPostDetailDto>();
            foreach (var item in postDetails)
            {
                var flower = await _productRepository.GetFlowerByFlowerIdAsync(item.FlowerId);
                var postDetailDto = new ViewPostDetailDto()
                {
                    PostDetailId = item.PdetailId,
                    ViewFlower = new ViewFlowerDto()
                    {
                        FlowerId = flower.FlowerId,
                        FlowerName = flower.FlowerName,
                        FlowerCondition = flower.Condition,
                        FlowerDescription = flower.Description,
                        FlowerExpiration = flower.DateExpiration,
                        FlowerOldPrice = flower.OldPrice,
                        FlowerPrice = flower.Price,
                        FlowerQuantity = flower.Quantity,
                        FlowerSize = flower.Size,
                        FlowerTags = flower.TagIds
                    }
                };
                viewPostDetailDtos.Add(postDetailDto);
            }
            postDto.ViewPostDetail = viewPostDetailDtos;
            return postDto;
        }
    }
}