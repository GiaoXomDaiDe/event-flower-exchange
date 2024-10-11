using EventFlowerExchange_Espoir.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace EventFlowerExchange_Espoir.Repositories.Configuration
{
    public class FlowerConfiguration : IEntityTypeConfiguration<Flower>
    {
        public void Configure(EntityTypeBuilder<Flower> builder)
        {
            builder.HasData
            (
                new Flower
                {
                    FlowerId = "F000000001",
                    FlowerName = "Mini Sun Flower",
                    CateId = "FC00000001",
                    Description = "Mini Sunflowers are a good option if you are looking for a different focal. They are ideal for bright floral arrangements.Mini Sunflowers are a good option if you are looking for a different focal. They are ideal for bright floral arrangements.",
                    Size = "Bouquet",
                    Condition = "New",
                    Quantity = 100,
                    Price = 10,
                    OldPrice = 10,
                    AccountId = "AC00000003",
                    CreatedAt = new DateOnly(2024, 2, 14),
                    DateExpiration = "1 month",
                    UpdateAt = null,
                    UpdateBy = "null",
                    IsDeleted = 0,
                    Status = 1,
                    TagId = "empty",
                    Attachment = "null",
                }
                );
        }
    }
}


