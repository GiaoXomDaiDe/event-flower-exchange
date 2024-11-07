using EventFlowerExchange_Espoir.Models;
using EventFlowerExchange_Espoir.Models.DTO;
using EventFlowerExchange_Espoir.Repositories;
using static System.Runtime.InteropServices.JavaScript.JSType;

namespace EventFlowerExchange_Espoir.Services.Impl
{
    public class FlowerTagService : IFlowerTagService
    {
        private readonly IFlowerTagRepository _tagRepository;

        public FlowerTagService(IFlowerTagRepository tagRepository)
        {
            _tagRepository = tagRepository;
        }

        public async Task<FlowerTag> GetTagByTagNameAsync(string tagName)
        {
            return await _tagRepository.GetTagByTagName(tagName);
        }
        public async Task<FlowerTag> GetTagByTagIdAsync(string tagId)
        {
            return await _tagRepository.GetTagByTagId(tagId);
        }
        public async Task<string> AutoGenerateFlowerTagId()
        {
            string newtagid = "";
            string lastestFTagIds = await _tagRepository.GetLatestFlowerTagIdAsync();
            if (string.IsNullOrEmpty(lastestFTagIds))
            {
                newtagid = "FT00000001";
            }
            else
            {
                int numericpart = int.Parse(lastestFTagIds.Substring(2));
                int newnumericpart = numericpart + 1;
                newtagid = $"FT{newnumericpart:d8}";
            }
            return newtagid;
        }

        public async Task<dynamic> CreateTagAsync(string tagName)
        {
            var existTag = await _tagRepository.GetTagByTagName(tagName);
            if (existTag == null)
            {
                return "This Tag is already exists";
            }
            var ftag = new FlowerTag
            {
                TagId = await AutoGenerateFlowerTagId(),
                TagName = tagName,
            };
            var result = await _tagRepository.AddTagAsync(ftag);
            return result;
        }

        public async Task<dynamic> EditTagAsync(string tagName)
        {
            try
            {
            var tag = await _tagRepository.GetTagByTagName(tagName);
            if (tag == null)
            {
                return "Cannot find this tag";
            }
            if (!string.IsNullOrEmpty(tagName))
            {
                tagName = tag.TagName.Trim();
            }
            tag.TagName = tagName;
            var result = await _tagRepository.UpdateTagAsync(tag);
            return result;
            } catch (Exception ex)
            {
                throw new Exception($"Error at EditTagAsync() of FlowerTagRepository + {ex}");
            }
        }

        public async Task<dynamic> DeleteTagAsync(string tagName)
        {
            try
            {
                var tag = await _tagRepository.GetTagByTagName(tagName);
                if (tag == null)
                {
                    return "Cannot find this tag";
                }
                var result = await _tagRepository.DeleteTagAsync(tag);
                return result;
            } catch (Exception ex)
            {
                throw new Exception($"Error at EditTagAsync() of FlowerTagRepository + {ex}"); ;
            }
        }

    }
}
