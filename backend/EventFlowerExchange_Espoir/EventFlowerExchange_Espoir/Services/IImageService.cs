using CloudinaryDotNet.Actions;
using CloudinaryDotNet.Actions;
namespace EventFlowerExchange_Espoir.Services
{
    public interface IImageService
    {
        public Task<ImageUploadResult> UploadImageAsync(IFormFile file);
    }
}
