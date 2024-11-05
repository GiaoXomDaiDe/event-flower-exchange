using System.ComponentModel.DataAnnotations;

namespace EventFlowerExchange_Espoir.Models.DTO
{
    public class UpdateFCateDTO
    {
        [Required(ErrorMessage = "Flower Category Id is required")]
        public string FCateId { get; set; }
        public string FcateName { get; set; }
        public string FcateDesc { get; set; }
    }
}
