using EventFlowerExchange_Espoir.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace EventFlowerExchange_Espoir.Repositories.Configuration
{
    public class FlowerCategoriesConfiguration : IEntityTypeConfiguration<FlowerCate>
    {
        public void Configure(EntityTypeBuilder<FlowerCate> builder)
        {
            builder.HasData
            (
                new FlowerCate
                {
                    FcateId = "FC00000001",
                    FcateName = "Sun Flower",
                    FcateDesc = "Not only do sunflowers resemble miniature suns, their blooms also follow the sun across the sky. They have their own biological clocks which help them to follow the sun as it moves from east to west during the day, and then move back to their original position at night.",
                    FparentCateId = "NULL",
                    Status = 1,
                    IsDeleted = 0
                },
                new FlowerCate
                {
                    FcateId = "FC00000002",
                    FcateName = "Rose",
                    FcateDesc = "A symbol of love and beauty, roses have enchanted civilizations throughout history with their stunning blossoms and enchanting fragrance.",
                    FparentCateId = "NULL",
                    Status = 1,
                    IsDeleted = 0
                },
new FlowerCate
{
    FcateId = "FC00000003",
    FcateName = "Tulip",
    FcateDesc = "Known for their vibrant colors and elegant cup-shaped blooms, tulips symbolize perfect love and have a rich history in Europe, especially in the Netherlands.",
    FparentCateId = "NULL",
    Status = 1,
    IsDeleted = 0
},
new FlowerCate
{
    FcateId = "FC00000004",
    FcateName = "Lily",
    FcateDesc = "Lilies are associated with purity and refined beauty. They often grace weddings and special events with their delicate petals and strong fragrance.",
    FparentCateId = "NULL",
    Status = 1,
    IsDeleted = 0
},
new FlowerCate
{
    FcateId = "FC00000005",
    FcateName = "Daisy",
    FcateDesc = "Daisies symbolize innocence and purity. With their simple yet charming appearance, they are a favorite choice for gardens and bouquets.",
    FparentCateId = "NULL",
    Status = 1,
    IsDeleted = 0
},
new FlowerCate
{
    FcateId = "FC00000006",
    FcateName = "Orchid",
    FcateDesc = "Orchids are exotic flowers that symbolize luxury, strength, and beauty. Their intricate blooms are admired worldwide for their stunning variety of shapes and colors.",
    FparentCateId = "NULL",
    Status = 1,
    IsDeleted = 0
},
new FlowerCate
{
    FcateId = "FC00000007",
    FcateName = "Chrysanthemum",
    FcateDesc = "Chrysanthemums, known for their full, rich blooms, are symbols of happiness and long life. They are often used in celebrations in many cultures.",
    FparentCateId = "NULL",
    Status = 1,
    IsDeleted = 0
},
new FlowerCate
{
    FcateId = "FC00000008",
    FcateName = "Daffodil",
    FcateDesc = "A cheerful spring flower, daffodils symbolize renewal and hope. Their bright yellow petals bring joy after the long winter months.",
    FparentCateId = "NULL",
    Status = 1,
    IsDeleted = 0
},
new FlowerCate
{
    FcateId = "FC00000009",
    FcateName = "Peony",
    FcateDesc = "Peonies are revered for their lush, full blooms and delicate scent. They are often associated with prosperity and romance.",
    FparentCateId = "NULL",
    Status = 1,
    IsDeleted = 0
},
new FlowerCate
{
    FcateId = "FC00000010",
    FcateName = "Lavender",
    FcateDesc = "Lavender is a beloved herb and flower known for its calming fragrance. It is often used in aromatherapy and symbolizes tranquility and serenity.",
    FparentCateId = "NULL",
    Status = 1,
    IsDeleted = 0
},
new FlowerCate
{
    FcateId = "FC00000011",
    FcateName = "Jasmine",
    FcateDesc = "Jasmine flowers are renowned for their sweet fragrance, often associated with love, beauty, and sensuality.",
    FparentCateId = "NULL",
    Status = 1,
    IsDeleted = 0
}
                );
        }
    }
}
