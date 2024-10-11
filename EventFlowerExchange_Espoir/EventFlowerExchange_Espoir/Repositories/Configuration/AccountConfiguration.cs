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
    //password : Espoir@123
    new Account
    {
        AccountId = "AC00000001",
        Email = "nghalam1210@gmail.com",
        Password = "u93zTwjKn5EGES4DRXBqHNgggYmp7amf/9rUl9lZnNM=",
        Role = 1,
        FullName = "Admin Văn 1",
        PhoneNumber = "0123456789",
        Birthday = new DateOnly(1999, 10, 10),
        Address = "HCM",
        Status = 1,
        IsSeller = 0,
        Gender = 3,
        Username = "user@1",
        IsEmailConfirm = 1
    },
    new Account
    {
        AccountId = "AC00000002",
        Email = "duchao696@gmail.com",
        Password = "u93zTwjKn5EGES4DRXBqHNgggYmp7amf/9rUl9lZnNM=",
        Role = 1,
        FullName = "Admin Văn 2",
        PhoneNumber = "0123456788",
        Birthday = new DateOnly(1998, 11, 11),
        Address = "HN",
        Status = 1,
        IsSeller = 0,
        Gender = 3,
        Username = "user@2",
        IsEmailConfirm = 1
    },
     new Account
     {
         AccountId = "AC00000003",
         Email = "nhattulam12102003@gmail.com",
         Password = "u93zTwjKn5EGES4DRXBqHNgggYmp7amf/9rUl9lZnNM=",//NET09@Team2
         Role = 2,
         FullName = "Nguyen Minh Phuong",
         PhoneNumber = "0987654322",
         Birthday = new DateOnly(1989, 11, 20),
         Address = "HN",
         Status = 1,
         IsEmailConfirm = 1,
         IsSeller = 1,
         Gender = 3,
         Username = "user@3"
         //AdminComment = "string"
     },
     new Account
     {
         AccountId = "AC00000004",
         Email = "customer2@gmail.com",
         Password = "u93zTwjKn5EGES4DRXBqHNgggYmp7amf/9rUl9lZnNM=",
         Role = 2,
         FullName = "Dang Phuong Thao",
         PhoneNumber = "0987654333",
         Birthday = new DateOnly(1983, 2, 14),
         Address = "ND",
         Status = 1,
         IsSeller = 0,
         Gender = 3,
         Username = "user@4",
         IsEmailConfirm = 1
     },
     new Account
     {
         AccountId = "AC00000005",
         Email = "customer3@gmail.com",
         Password = "u93zTwjKn5EGES4DRXBqHNgggYmp7amf/9rUl9lZnNM=",
         Role = 2,
         FullName = "Tran Hoang Phu",
         PhoneNumber = "0987654444",
         Birthday = new DateOnly(1990, 1, 2),
         Address = "BD",
         Status = 1,
         IsSeller = 0,
         Gender = 3,
         Username = "user@5",
         IsEmailConfirm = 1
     },
     new Account
     {
         AccountId = "AC00000006",
         Email = "customer4@gmail.com",
         Password = "u93zTwjKn5EGES4DRXBqHNgggYmp7amf/9rUl9lZnNM=",
         Role = 2,
         FullName = "Tran Quoc Tuan",
         PhoneNumber = "0987655555",
         Birthday = new DateOnly(1979, 7, 28),
         Address = "HCM",
         Status = 1,
         IsSeller = 0,
         Gender = 3,
         Username = "user@6",
         IsEmailConfirm = 1
     },
     new Account
     {
         AccountId = "AC00000007",
         Email = "anhnnqe170248@fpt.edu.vn",
         Password = "u93zTwjKn5EGES4DRXBqHNgggYmp7amf/9rUl9lZnNM=",
         Role = 2,
         FullName = "Truong Yen Nhi",
         PhoneNumber = "0987666666",
         Birthday = new DateOnly(2003, 5, 20),
         Address = "PY",
         Status = 1,
         IsSeller = 0,
         Gender = 3,
         Username = "user@7",
         IsEmailConfirm = 1
     },
     new Account
     {
         AccountId = "AC00000011",
         Email = "customer11@gmail.com",
         Password = "u93zTwjKn5EGES4DRXBqHNgggYmp7amf/9rUl9lZnNM=",
         Role = 2,
         FullName = "Tran Quoc",
         PhoneNumber = "0987666666",
         Birthday = new DateOnly(2001, 12, 20),
         Address = "PT",
         Status = 1,
         IsSeller = 0,
         Gender = 3,
         Username = "user@8",
         IsEmailConfirm = 1
     },
     new Account
     {
         AccountId = "AC00000012",
         Email = "customer12@gmail.com",
         Password = "u93zTwjKn5EGES4DRXBqHNgggYmp7amf/9rUl9lZnNM=",
         Role = 2,
         FullName = "Quoc Tuan",
         PhoneNumber = "0987666666",
         Birthday = new DateOnly(2002, 8, 20),
         Address = "NH",
         Status = 1,
         IsSeller = 0,
         Gender = 3,
         Username = "user@9",
         IsEmailConfirm = 1
         //AdminComment = "string"
     },
     new Account
     {
         AccountId = "AC00000013",
         Email = "vietnam@gmail.com",
         Password = "u93zTwjKn5EGES4DRXBqHNgggYmp7amf/9rUl9lZnNM=",
         Role = 2,
         FullName = "Trương Tấn Sang",
         PhoneNumber = "0987666666",
         Birthday = new DateOnly(2002, 8, 20),
         Address = "TPHCM",
         Status = 1,
         IsEmailConfirm = 1,
         IsSeller = 0,
         Gender = 3,
         Username = "user@10"
         //AdminComment = "string"
     },
     new Account
     {
         AccountId = "AC00000020",
         Email = "thanhdanhnguyenvinh@gmail.com",
         Password = "u93zTwjKn5EGES4DRXBqHNgggYmp7amf/9rUl9lZnNM=",
         Role = 2,
         FullName = "Nyn Anh",
         PhoneNumber = "0987668876",
         Birthday = new DateOnly(2002, 1, 20),
         Address = "Q9",
         Status = 1,
         IsSeller = 0,
         Gender = 3,
         Username = "user@11",
         IsEmailConfirm = 1
     },
     new Account
     {
         AccountId = "AC00000021",
         Email = "customer21@gmail.com",
         Password = "u93zTwjKn5EGES4DRXBqHNgggYmp7amf/9rUl9lZnNM=",
         Role = 2,
         FullName = "Tran Bao",
         PhoneNumber = "0987662566",
         Birthday = new DateOnly(2002, 1, 20),
         Address = "Q9",
         Status = 1,
         IsSeller = 0,
         Gender = 3,
         Username = "user@12",
         IsEmailConfirm = 1
     },
     new Account
     {
         AccountId = "AC00000022",
         Email = "student2@gmail.com",
         Password = "u93zTwjKn5EGES4DRXBqHNgggYmp7amf/9rUl9lZnNM=",
         Role = 2,
         FullName = "Quoc Toan",
         PhoneNumber = "0987123666",
         Birthday = new DateOnly(2002, 1, 20),
         Address = "Q9",
         Status = 1,
         IsSeller = 0,
         Gender = 3,
         Username = "user@13",
         IsEmailConfirm = 1
     },
     new Account
     {
         AccountId = "AC00000023",
         Email = "student3@gmail.com",
         Password = "u93zTwjKn5EGES4DRXBqHNgggYmp7amf/9rUl9lZnNM=",
         Role = 2,
         FullName = "Van Anh",
         PhoneNumber = "0987346666",
         Birthday = new DateOnly(2002, 1, 20),
         Address = "Q9",
         Status = 1,
         IsSeller = 0,
         Gender = 3,
         Username = "user@14",
         IsEmailConfirm = 1
     },
     new Account
     {
         AccountId = "AC00000024",
         Email = "student4@gmail.com",
         Password = "u93zTwjKn5EGES4DRXBqHNgggYmp7amf/9rUl9lZnNM=",
         Role = 2,
         FullName = "Yn Anh",
         PhoneNumber = "0987666456",
         Birthday = new DateOnly(1999, 1, 20),
         Address = "Q9",
         Status = 1,
         IsSeller = 0,
         Gender = 3,
         Username = "user@15",
         IsEmailConfirm = 1
     },
     new Account
     {
         AccountId = "AC00000025",
         Email = "vuhuyhoangdeptrai@gmail.com",
         Password = "u93zTwjKn5EGES4DRXBqHNgggYmp7amf/9rUl9lZnNM=",
         Role = 2,
         FullName = "Ly Thien Huong",
         PhoneNumber = "0987666400",
         Birthday = new DateOnly(1989, 11, 20),
         Address = "HN",
         Status = 1,
         IsEmailConfirm = 1,
         IsSeller = 0,
         Gender = 3,
         Username = "user@16"
     }
);
        }
    }
}

