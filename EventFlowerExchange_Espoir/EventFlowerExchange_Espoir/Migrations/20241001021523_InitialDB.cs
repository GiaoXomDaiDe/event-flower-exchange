using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace EventFlowerExchange_Espoir.Migrations
{
    /// <inheritdoc />
    public partial class InitialDB : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Account",
                columns: table => new
                {
                    AccountID = table.Column<string>(type: "varchar(255)", unicode: false, maxLength: 255, nullable: false),
                    Username = table.Column<string>(type: "varchar(255)", unicode: false, maxLength: 255, nullable: false),
                    Password = table.Column<string>(type: "varchar(255)", unicode: false, maxLength: 255, nullable: false),
                    FullName = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: false),
                    Email = table.Column<string>(type: "varchar(255)", unicode: false, maxLength: 255, nullable: false),
                    Address = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: false),
                    PhoneNumber = table.Column<string>(type: "varchar(50)", unicode: false, maxLength: 50, nullable: false),
                    Birthday = table.Column<DateOnly>(type: "date", nullable: false),
                    Gender = table.Column<int>(type: "int", nullable: false),
                    Role = table.Column<int>(type: "int", nullable: false),
                    Status = table.Column<int>(type: "int", nullable: false),
                    IsEmailConfirm = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__Account__349DA586A4DAAC89", x => x.AccountID);
                });

            migrationBuilder.CreateTable(
                name: "CardProviders",
                columns: table => new
                {
                    CardProviderName = table.Column<string>(type: "varchar(255)", unicode: false, maxLength: 255, nullable: false),
                    CPFullName = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__CardProv__3B8DEBCC39ECA32E", x => x.CardProviderName);
                });

            migrationBuilder.CreateTable(
                name: "EventCate",
                columns: table => new
                {
                    ECateID = table.Column<string>(type: "varchar(255)", unicode: false, maxLength: 255, nullable: false),
                    EName = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: false),
                    EDesc = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: false),
                    Status = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__EventCat__64EE8301B1E91710", x => x.ECateID);
                });

            migrationBuilder.CreateTable(
                name: "FlowerCate",
                columns: table => new
                {
                    FCateID = table.Column<string>(type: "varchar(255)", unicode: false, maxLength: 255, nullable: false),
                    FCateName = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: false),
                    FCateDesc = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: false),
                    FParentCateID = table.Column<string>(type: "varchar(255)", unicode: false, maxLength: 255, nullable: true),
                    Status = table.Column<int>(type: "int", nullable: false),
                    IsDeleted = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__FlowerCa__9CB52A23207E59B9", x => x.FCateID);
                });

            migrationBuilder.CreateTable(
                name: "FlowerTag",
                columns: table => new
                {
                    TagID = table.Column<string>(type: "varchar(255)", unicode: false, maxLength: 255, nullable: false),
                    TagName = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__FlowerTa__657CFA4C25F774B1", x => x.TagID);
                });

            migrationBuilder.CreateTable(
                name: "NotificationType",
                columns: table => new
                {
                    NotifyType = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: false),
                    NTypeDesc = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__Notifica__15D2A72BB930D686", x => x.NotifyType);
                });

            migrationBuilder.CreateTable(
                name: "Orders",
                columns: table => new
                {
                    OrderID = table.Column<string>(type: "varchar(255)", unicode: false, maxLength: 255, nullable: false),
                    Detail = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: false),
                    Date = table.Column<DateOnly>(type: "date", nullable: false),
                    AccountID = table.Column<string>(type: "varchar(255)", unicode: false, maxLength: 255, nullable: false),
                    Status = table.Column<long>(type: "bigint", nullable: false),
                    TotalMoney = table.Column<double>(type: "float", nullable: false),
                    PaymentStatus = table.Column<int>(type: "int", nullable: false),
                    DeliveryUnit = table.Column<string>(type: "varchar(255)", unicode: false, maxLength: 255, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__Orders__C3905BAFDCD4601F", x => x.OrderID);
                    table.ForeignKey(
                        name: "FK_Orders_Account",
                        column: x => x.AccountID,
                        principalTable: "Account",
                        principalColumn: "AccountID");
                });

            migrationBuilder.CreateTable(
                name: "SellerWallet",
                columns: table => new
                {
                    WalletID = table.Column<string>(type: "varchar(255)", unicode: false, maxLength: 255, nullable: false),
                    AccountID = table.Column<string>(type: "varchar(255)", unicode: false, maxLength: 255, nullable: false),
                    Balance = table.Column<long>(type: "bigint", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__SellerWa__84D4F92E09A9F44F", x => x.WalletID);
                    table.ForeignKey(
                        name: "FK_SellerWallet_Account",
                        column: x => x.AccountID,
                        principalTable: "Account",
                        principalColumn: "AccountID");
                });

            migrationBuilder.CreateTable(
                name: "Transactions",
                columns: table => new
                {
                    TransactionID = table.Column<string>(type: "varchar(255)", unicode: false, maxLength: 255, nullable: false),
                    Detail = table.Column<string>(type: "varchar(255)", unicode: false, maxLength: 255, nullable: false),
                    Date = table.Column<DateOnly>(type: "date", nullable: false),
                    Status = table.Column<int>(type: "int", nullable: false),
                    AccountID = table.Column<string>(type: "varchar(255)", unicode: false, maxLength: 255, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__Transact__55433A4B73CCE48A", x => x.TransactionID);
                    table.ForeignKey(
                        name: "FK_Transaction_Account",
                        column: x => x.AccountID,
                        principalTable: "Account",
                        principalColumn: "AccountID");
                });

            migrationBuilder.CreateTable(
                name: "Users",
                columns: table => new
                {
                    UserID = table.Column<string>(type: "varchar(255)", unicode: false, maxLength: 255, nullable: false),
                    AccountID = table.Column<string>(type: "varchar(255)", unicode: false, maxLength: 255, nullable: false),
                    IsSeller = table.Column<int>(type: "int", nullable: false),
                    CardName = table.Column<string>(type: "varchar(255)", unicode: false, maxLength: 255, nullable: true),
                    CardNumber = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true),
                    CardProviderName = table.Column<string>(type: "varchar(255)", unicode: false, maxLength: 255, nullable: true),
                    TaxNumber = table.Column<string>(type: "varchar(255)", unicode: false, maxLength: 255, nullable: true),
                    SellerAvatar = table.Column<string>(type: "varchar(255)", unicode: false, maxLength: 255, nullable: true),
                    SellerAddress = table.Column<string>(type: "varchar(255)", unicode: false, maxLength: 255, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__Users__1788CCACC4A58B01", x => x.UserID);
                    table.ForeignKey(
                        name: "FK_Users_Account",
                        column: x => x.AccountID,
                        principalTable: "Account",
                        principalColumn: "AccountID");
                    table.ForeignKey(
                        name: "FK_Users_CardProviders",
                        column: x => x.CardProviderName,
                        principalTable: "CardProviders",
                        principalColumn: "CardProviderName");
                });

            migrationBuilder.CreateTable(
                name: "Event",
                columns: table => new
                {
                    EventID = table.Column<string>(type: "varchar(255)", unicode: false, maxLength: 255, nullable: false),
                    EventName = table.Column<string>(type: "varchar(255)", unicode: false, maxLength: 255, nullable: false),
                    ECateID = table.Column<string>(type: "varchar(255)", unicode: false, maxLength: 255, nullable: false),
                    EventDesc = table.Column<string>(type: "varchar(255)", unicode: false, maxLength: 255, nullable: false),
                    StartTime = table.Column<DateTime>(type: "datetime", nullable: false),
                    EndTime = table.Column<DateTime>(type: "datetime", nullable: false),
                    Status = table.Column<int>(type: "int", nullable: false),
                    CreateBy = table.Column<string>(type: "varchar(255)", unicode: false, maxLength: 255, nullable: false),
                    CreateAt = table.Column<DateOnly>(type: "date", nullable: false),
                    UpdateAt = table.Column<DateOnly>(type: "date", nullable: false),
                    UpdateBy = table.Column<string>(type: "varchar(255)", unicode: false, maxLength: 255, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__Event__7944C8704F2A4B87", x => x.EventID);
                    table.ForeignKey(
                        name: "FK_Event_ECate",
                        column: x => x.ECateID,
                        principalTable: "EventCate",
                        principalColumn: "ECateID");
                });

            migrationBuilder.CreateTable(
                name: "Flowers",
                columns: table => new
                {
                    FlowerID = table.Column<string>(type: "varchar(255)", unicode: false, maxLength: 255, nullable: false),
                    FlowerName = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: false),
                    CateID = table.Column<string>(type: "varchar(255)", unicode: false, maxLength: 255, nullable: false),
                    Description = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: false),
                    Size = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: false),
                    Condition = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: false),
                    Quantity = table.Column<double>(type: "float", nullable: false),
                    Price = table.Column<double>(type: "float", nullable: false),
                    OldPrice = table.Column<double>(type: "float", nullable: false),
                    AccountID = table.Column<string>(type: "varchar(255)", unicode: false, maxLength: 255, nullable: false),
                    CreatedAt = table.Column<DateOnly>(type: "date", nullable: false),
                    DateExpiration = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: false),
                    UpdateAt = table.Column<DateOnly>(type: "date", nullable: false),
                    UpdateBy = table.Column<string>(type: "varchar(255)", unicode: false, maxLength: 255, nullable: false),
                    IsDeleted = table.Column<int>(type: "int", nullable: false),
                    Status = table.Column<int>(type: "int", nullable: false),
                    TagID = table.Column<string>(type: "varchar(255)", unicode: false, maxLength: 255, nullable: false),
                    Attachment = table.Column<string>(type: "varchar(max)", unicode: false, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__Flowers__97C47C3901C1A129", x => x.FlowerID);
                    table.ForeignKey(
                        name: "FK_Flowers_Account",
                        column: x => x.AccountID,
                        principalTable: "Account",
                        principalColumn: "AccountID");
                    table.ForeignKey(
                        name: "FK_Flowers_Cate",
                        column: x => x.CateID,
                        principalTable: "FlowerCate",
                        principalColumn: "FCateID");
                    table.ForeignKey(
                        name: "FK_Flowers_Tag",
                        column: x => x.TagID,
                        principalTable: "FlowerTag",
                        principalColumn: "TagID");
                });

            migrationBuilder.CreateTable(
                name: "Notifications",
                columns: table => new
                {
                    NotifyID = table.Column<string>(type: "varchar(255)", unicode: false, maxLength: 255, nullable: false),
                    NotifyType = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: false),
                    NotiTitle = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: false),
                    NotiContent = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: false),
                    NotiBy = table.Column<string>(type: "varchar(255)", unicode: false, maxLength: 255, nullable: false),
                    NotiAt = table.Column<DateOnly>(type: "date", nullable: false),
                    AccountID = table.Column<string>(type: "varchar(255)", unicode: false, maxLength: 255, nullable: false),
                    NotiStatus = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__Notifica__AD54A2DC9648A748", x => x.NotifyID);
                    table.ForeignKey(
                        name: "FK_Notifications_Type",
                        column: x => x.NotifyType,
                        principalTable: "NotificationType",
                        principalColumn: "NotifyType");
                });

            migrationBuilder.CreateTable(
                name: "OrderDetails",
                columns: table => new
                {
                    OrderDetailID = table.Column<string>(type: "varchar(255)", unicode: false, maxLength: 255, nullable: false),
                    OrderID = table.Column<string>(type: "varchar(255)", unicode: false, maxLength: 255, nullable: false),
                    FlowerID = table.Column<string>(type: "varchar(255)", unicode: false, maxLength: 255, nullable: false),
                    Quantity = table.Column<double>(type: "float", nullable: false),
                    PaidPrice = table.Column<double>(type: "float", nullable: false),
                    OrderNumber = table.Column<string>(type: "varchar(255)", unicode: false, maxLength: 255, nullable: false),
                    AdminID = table.Column<string>(type: "varchar(255)", unicode: false, maxLength: 255, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__OrderDet__D3B9D30C486AEBD5", x => x.OrderDetailID);
                    table.ForeignKey(
                        name: "FK_OrderDetails_Order",
                        column: x => x.OrderID,
                        principalTable: "Orders",
                        principalColumn: "OrderID");
                });

            migrationBuilder.CreateTable(
                name: "PayoutHistory",
                columns: table => new
                {
                    PayoutID = table.Column<string>(type: "varchar(255)", unicode: false, maxLength: 255, nullable: false),
                    Amount = table.Column<double>(type: "float", nullable: false),
                    PayoutDate = table.Column<DateOnly>(type: "date", nullable: false),
                    Status = table.Column<int>(type: "int", nullable: false),
                    UserID = table.Column<string>(type: "varchar(255)", unicode: false, maxLength: 255, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__PayoutHi__35C3DFAE155177B1", x => x.PayoutID);
                    table.ForeignKey(
                        name: "FK_PayoutHistory_User",
                        column: x => x.UserID,
                        principalTable: "Users",
                        principalColumn: "UserID");
                });

            migrationBuilder.CreateTable(
                name: "Feedback",
                columns: table => new
                {
                    FeedbackID = table.Column<string>(type: "varchar(255)", unicode: false, maxLength: 255, nullable: false),
                    Detail = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: false),
                    Rating = table.Column<double>(type: "float", nullable: false),
                    Attachment = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true),
                    FlowerID = table.Column<string>(type: "varchar(255)", unicode: false, maxLength: 255, nullable: false),
                    AccountID = table.Column<string>(type: "varchar(255)", unicode: false, maxLength: 255, nullable: false),
                    CreateDate = table.Column<DateOnly>(type: "date", nullable: false),
                    IsGoodReview = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__Feedback__6A4BEDF6C7713F3E", x => x.FeedbackID);
                    table.ForeignKey(
                        name: "FK_Feedback_Flower",
                        column: x => x.FlowerID,
                        principalTable: "Flowers",
                        principalColumn: "FlowerID");
                });

            migrationBuilder.CreateTable(
                name: "PostDetail",
                columns: table => new
                {
                    PDetailID = table.Column<string>(type: "varchar(255)", unicode: false, maxLength: 255, nullable: false),
                    FlowerID = table.Column<string>(type: "varchar(255)", unicode: false, maxLength: 255, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__PostDeta__61D4FFEBFE50ED0F", x => x.PDetailID);
                    table.ForeignKey(
                        name: "FK_PostDetail_Flower",
                        column: x => x.FlowerID,
                        principalTable: "Flowers",
                        principalColumn: "FlowerID");
                });

            migrationBuilder.CreateTable(
                name: "Report",
                columns: table => new
                {
                    ReportID = table.Column<string>(type: "varchar(255)", unicode: false, maxLength: 255, nullable: false),
                    Issue = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: false),
                    Content = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true),
                    Attachment = table.Column<string>(type: "varchar(255)", unicode: false, maxLength: 255, nullable: false),
                    CreateAt = table.Column<DateOnly>(type: "date", nullable: false),
                    CreateBy = table.Column<string>(type: "varchar(255)", unicode: false, maxLength: 255, nullable: false),
                    FlowerID = table.Column<string>(type: "varchar(255)", unicode: false, maxLength: 255, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__Report__D5BD48E5D0D0F92F", x => x.ReportID);
                    table.ForeignKey(
                        name: "FK_Report_Flower",
                        column: x => x.FlowerID,
                        principalTable: "Flowers",
                        principalColumn: "FlowerID");
                });

            migrationBuilder.CreateTable(
                name: "Wishlist",
                columns: table => new
                {
                    WishlistID = table.Column<string>(type: "varchar(255)", unicode: false, maxLength: 255, nullable: false),
                    AddBy = table.Column<string>(type: "varchar(255)", unicode: false, maxLength: 255, nullable: false),
                    FlowerID = table.Column<string>(type: "varchar(255)", unicode: false, maxLength: 255, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__Wishlist__233189CB00BCD3B5", x => x.WishlistID);
                    table.ForeignKey(
                        name: "FK_Wishlist_Flower",
                        column: x => x.FlowerID,
                        principalTable: "Flowers",
                        principalColumn: "FlowerID");
                });

            migrationBuilder.CreateTable(
                name: "SellerPost",
                columns: table => new
                {
                    PostID = table.Column<string>(type: "varchar(255)", unicode: false, maxLength: 255, nullable: false),
                    AccountID = table.Column<string>(type: "varchar(255)", unicode: false, maxLength: 255, nullable: false),
                    PDetailID = table.Column<string>(type: "varchar(255)", unicode: false, maxLength: 255, nullable: false),
                    Title = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: false),
                    Content = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: false),
                    Attachment = table.Column<string>(type: "varchar(255)", unicode: false, maxLength: 255, nullable: false),
                    CreateAt = table.Column<DateOnly>(type: "date", nullable: false),
                    hadEvent = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__SellerPo__AA1260382B5E0A50", x => x.PostID);
                    table.ForeignKey(
                        name: "FK_SellerPost_PostDetail",
                        column: x => x.PDetailID,
                        principalTable: "PostDetail",
                        principalColumn: "PDetailID");
                });

            migrationBuilder.CreateIndex(
                name: "IX_Event_ECateID",
                table: "Event",
                column: "ECateID");

            migrationBuilder.CreateIndex(
                name: "IX_Feedback_FlowerID",
                table: "Feedback",
                column: "FlowerID");

            migrationBuilder.CreateIndex(
                name: "IX_Flowers_AccountID",
                table: "Flowers",
                column: "AccountID");

            migrationBuilder.CreateIndex(
                name: "IX_Flowers_CateID",
                table: "Flowers",
                column: "CateID");

            migrationBuilder.CreateIndex(
                name: "IX_Flowers_TagID",
                table: "Flowers",
                column: "TagID");

            migrationBuilder.CreateIndex(
                name: "IX_Notifications_NotifyType",
                table: "Notifications",
                column: "NotifyType");

            migrationBuilder.CreateIndex(
                name: "IX_OrderDetails_OrderID",
                table: "OrderDetails",
                column: "OrderID");

            migrationBuilder.CreateIndex(
                name: "IX_Orders_AccountID",
                table: "Orders",
                column: "AccountID");

            migrationBuilder.CreateIndex(
                name: "IX_PayoutHistory_UserID",
                table: "PayoutHistory",
                column: "UserID");

            migrationBuilder.CreateIndex(
                name: "IX_PostDetail_FlowerID",
                table: "PostDetail",
                column: "FlowerID");

            migrationBuilder.CreateIndex(
                name: "IX_Report_FlowerID",
                table: "Report",
                column: "FlowerID");

            migrationBuilder.CreateIndex(
                name: "IX_SellerPost_PDetailID",
                table: "SellerPost",
                column: "PDetailID");

            migrationBuilder.CreateIndex(
                name: "IX_SellerWallet_AccountID",
                table: "SellerWallet",
                column: "AccountID");

            migrationBuilder.CreateIndex(
                name: "IX_Transactions_AccountID",
                table: "Transactions",
                column: "AccountID");

            migrationBuilder.CreateIndex(
                name: "IX_Users_AccountID",
                table: "Users",
                column: "AccountID");

            migrationBuilder.CreateIndex(
                name: "IX_Users_CardProviderName",
                table: "Users",
                column: "CardProviderName");

            migrationBuilder.CreateIndex(
                name: "IX_Wishlist_FlowerID",
                table: "Wishlist",
                column: "FlowerID");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Event");

            migrationBuilder.DropTable(
                name: "Feedback");

            migrationBuilder.DropTable(
                name: "Notifications");

            migrationBuilder.DropTable(
                name: "OrderDetails");

            migrationBuilder.DropTable(
                name: "PayoutHistory");

            migrationBuilder.DropTable(
                name: "Report");

            migrationBuilder.DropTable(
                name: "SellerPost");

            migrationBuilder.DropTable(
                name: "SellerWallet");

            migrationBuilder.DropTable(
                name: "Transactions");

            migrationBuilder.DropTable(
                name: "Wishlist");

            migrationBuilder.DropTable(
                name: "EventCate");

            migrationBuilder.DropTable(
                name: "NotificationType");

            migrationBuilder.DropTable(
                name: "Orders");

            migrationBuilder.DropTable(
                name: "Users");

            migrationBuilder.DropTable(
                name: "PostDetail");

            migrationBuilder.DropTable(
                name: "CardProviders");

            migrationBuilder.DropTable(
                name: "Flowers");

            migrationBuilder.DropTable(
                name: "Account");

            migrationBuilder.DropTable(
                name: "FlowerCate");

            migrationBuilder.DropTable(
                name: "FlowerTag");
        }
    }
}
