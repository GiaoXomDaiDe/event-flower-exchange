using EventFlowerExchange_Espoir.Models;
using EventFlowerExchange_Espoir.Services.Common;
using Microsoft.Extensions.Options;
using CloudinaryDotNet;
using CloudinaryDotNet.Actions;

namespace EventFlowerExchange_Espoir.Services.Impl
{
    public class ImageService : IImageService
    {
        private readonly CloudinaryDotNet.Cloudinary _cloudinary;

        public ImageService(IOptions<CloudinarySetting> options)
        {
            var account = new CloudinaryDotNet.Account(options.Value.CloudName, options.Value.ApiKey, options.Value.ApiSecret);
            _cloudinary = new CloudinaryDotNet.Cloudinary(account);
        }

        public async Task<ImageUploadResult> UploadImageAsync(IFormFile file)
        {
            var result = await _cloudinary.UploadAsync(
                new ImageUploadParams()
                {
                    File = new FileDescription(file.FileName, file.OpenReadStream()),
                    DisplayName = file.FileName,
                    Folder = "espoir"
                }
            );
            if (result != null && result.StatusCode == System.Net.HttpStatusCode.OK)
            {
                return result;
            }
            return null;
        }
    }
}
