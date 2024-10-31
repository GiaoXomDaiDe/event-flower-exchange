using EventFlowerExchange_Espoir.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace EventFlowerExchange_Espoir.Repositories.Configuration
{
    public class AccountConfiguration : IEntityTypeConfiguration<Account>
    {
        public void Configure(EntityTypeBuilder<Account> builder)
        {
            builder.HasData
            (
                //password : NET09@Team2
                new Account
                {
                    AccountId = "AC00000001",
                    Email = "nghalam1210@gmail.com",
                    Password = "TmI+KMwiswm6Mewpl97NSF86arbhUVyZnXmBI+4gdRA=",
                    Role = 1,
                    FullName = "Nguyễn Hà Lâm",
                    Username = "Admin1",
                    PhoneNumber = "0123456789",
                    Birthday = new DateOnly(1999, 10, 10),
                    Address = "HCM",
                    Gender = 2,
                    IsEmailConfirm = 1,
                    IsSeller = 0,
                    Status = 1,
                },
    new Account
    {
        AccountId = "AC00000002",
        Email = "admin2@example.com",
        Password = "TmI+KMwiswm6Mewpl97NSF86arbhUVyZnXmBI+4gdRA=",
        Role = 1,
        FullName = "Admin Two",
        Username = "Admin2",
        PhoneNumber = "0123456781",
        Birthday = new DateOnly(1990, 5, 15),
        Address = "Hanoi",
        Gender = 1,
        IsEmailConfirm = 1,
        IsSeller = 0,
        Status = 1
    },

    // User accounts
    new Account
    {
        AccountId = "AC00000003",
        Email = "user1@example.com",
        Password = "TmI+KMwiswm6Mewpl97NSF86arbhUVyZnXmBI+4gdRA=",
        Role = 2,
        FullName = "User One",
        Username = "User1",
        PhoneNumber = "0123456782",
        Birthday = new DateOnly(1995, 3, 10),
        Address = "Da Nang",
        Gender = 1,
        IsEmailConfirm = 1,
        IsSeller = 1,
        Status = 1
    },
    new Account
    {
        AccountId = "AC00000004",
        Email = "user2@example.com",
        Password = "TmI+KMwiswm6Mewpl97NSF86arbhUVyZnXmBI+4gdRA=",
        Role = 2,
        FullName = "User Two",
        Username = "User2",
        PhoneNumber = "0123456783",
        Birthday = new DateOnly(1992, 7, 20),
        Address = "Hanoi",
        Gender = 2,
        IsEmailConfirm = 1,
        IsSeller = 0,
        Status = 1
    },
    new Account
    {
        AccountId = "AC00000005",
        Email = "user3@example.com",
        Password = "TmI+KMwiswm6Mewpl97NSF86arbhUVyZnXmBI+4gdRA=",
        Role = 2,
        FullName = "User Three",
        Username = "User3",
        PhoneNumber = "0123456784",
        Birthday = new DateOnly(1985, 12, 25),
        Address = "HCM",
        Gender = 1,
        IsEmailConfirm = 0,
        IsSeller = 1,
        Status = 1
    },
    new Account
    {
        AccountId = "AC00000006",
        Email = "user4@example.com",
        Password = "TmI+KMwiswm6Mewpl97NSF86arbhUVyZnXmBI+4gdRA=",
        Role = 2,
        FullName = "User Four",
        Username = "User4",
        PhoneNumber = "0123456785",
        Birthday = new DateOnly(1993, 9, 8),
        Address = "Hanoi",
        Gender = 1,
        IsEmailConfirm = 1,
        IsSeller = 0,
        Status = 1
    },
    new Account
    {
        AccountId = "AC00000007",
        Email = "user5@example.com",
        Password = "TmI+KMwiswm6Mewpl97NSF86arbhUVyZnXmBI+4gdRA=",
        Role = 2,
        FullName = "User Five",
        Username = "User5",
        PhoneNumber = "0123456786",
        Birthday = new DateOnly(1998, 2, 14),
        Address = "Da Nang",
        Gender = 2,
        IsEmailConfirm = 1,
        IsSeller = 1,
        Status = 1
    },
    new Account
    {
        AccountId = "AC00000008",
        Email = "user6@example.com",
        Password = "TmI+KMwiswm6Mewpl97NSF86arbhUVyZnXmBI+4gdRA=",
        Role = 2,
        FullName = "User Six",
        Username = "User6",
        PhoneNumber = "0123456787",
        Birthday = new DateOnly(2000, 11, 30),
        Address = "HCM",
        Gender = 2,
        IsEmailConfirm = 0,
        IsSeller = 0,
        Status = 1
    },
    new Account
    {
        AccountId = "AC00000009",
        Email = "user7@example.com",
        Password = "TmI+KMwiswm6Mewpl97NSF86arbhUVyZnXmBI+4gdRA=",
        Role = 2,
        FullName = "User Seven",
        Username = "User7",
        PhoneNumber = "0123456788",
        Birthday = new DateOnly(1994, 4, 18),
        Address = "Hanoi",
        Gender = 1,
        IsEmailConfirm = 1,
        IsSeller = 1,
        Status = 1
    },
    new Account
    {
        AccountId = "AC00000010",
        Email = "user8@example.com",
        Password = "TmI+KMwiswm6Mewpl97NSF86arbhUVyZnXmBI+4gdRA=",
        Role = 2,
        FullName = "User Eight",
        Username = "User8",
        PhoneNumber = "0123456789",
        Birthday = new DateOnly(1989, 6, 22),
        Address = "HCM",
        Gender = 2,
        IsEmailConfirm = 0,
        IsSeller = 1,
        Status = 1
    }
                );
        }
    }
}
