using EventFlowerExchange_Espoir.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace EventFlowerExchange_Espoir.Repositories.Configuration
{
    public class UsersConfiguration : IEntityTypeConfiguration<User>
    {
        public void Configure(EntityTypeBuilder<User> builder)
        {
            builder.HasData
            (
                new User
                {
                    UserId = "US00000001",
                    AccountId = "AC00000003",
                    CardName = "NGUYEN MINH PHUONG",
                    CardNumber = "90273928384471924",
                    CardProviderName = "ACB",
                    TaxNumber = "7286378282",
                    SellerAddress = "HCM",
                    ShopName = "Meraki",
                    SellerAvatar = "null",
                }
                );
        }
    }
}
