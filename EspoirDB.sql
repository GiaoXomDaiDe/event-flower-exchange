USE [master]
GO
/****** Object:  Database [EspoirDB]    Script Date: 11/10/2024 9:55:53 CH ******/
CREATE DATABASE [EspoirDB]
GO
USE [EspoirDB]
GO
/****** Object:  Table [dbo].[__EFMigrationsHistory]    Script Date: 11/10/2024 9:55:53 CH ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[__EFMigrationsHistory](
	[MigrationId] [nvarchar](150) NOT NULL,
	[ProductVersion] [nvarchar](32) NOT NULL,
 CONSTRAINT [PK___EFMigrationsHistory] PRIMARY KEY CLUSTERED 
(
	[MigrationId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[Account]    Script Date: 11/10/2024 9:55:53 CH ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[Account](
	[AccountID] [varchar](255) NOT NULL,
	[Username] [varchar](255) NOT NULL,
	[Password] [varchar](255) NOT NULL,
	[FullName] [nvarchar](255) NOT NULL,
	[Email] [varchar](255) NOT NULL,
	[Address] [nvarchar](255) NOT NULL,
	[PhoneNumber] [varchar](50) NOT NULL,
	[Birthday] [date] NOT NULL,
	[Gender] [int] NOT NULL,
	[Role] [int] NOT NULL,
	[Status] [int] NOT NULL,
	[IsEmailConfirm] [int] NOT NULL,
	[IsSeller] [int] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[AccountID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[CardProviders]    Script Date: 11/10/2024 9:55:53 CH ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[CardProviders](
	[CardProviderName] [varchar](255) NOT NULL,
	[CPFullName] [nvarchar](255) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[CardProviderName] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[Event]    Script Date: 11/10/2024 9:55:53 CH ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[Event](
	[EventID] [varchar](255) NOT NULL,
	[EventName] [varchar](255) NOT NULL,
	[ECateID] [varchar](255) NOT NULL,
	[EventDesc] [varchar](255) NOT NULL,
	[StartTime] [datetime] NOT NULL,
	[EndTime] [datetime] NOT NULL,
	[Status] [int] NOT NULL,
	[CreateBy] [varchar](255) NOT NULL,
	[CreateAt] [date] NOT NULL,
	[UpdateAt] [date] NOT NULL,
	[UpdateBy] [varchar](255) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[EventID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[EventCate]    Script Date: 11/10/2024 9:55:53 CH ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[EventCate](
	[ECateID] [varchar](255) NOT NULL,
	[EName] [nvarchar](255) NOT NULL,
	[EDesc] [nvarchar](255) NOT NULL,
	[Status] [int] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[ECateID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[Feedback]    Script Date: 11/10/2024 9:55:53 CH ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[Feedback](
	[FeedbackID] [varchar](255) NOT NULL,
	[Detail] [nvarchar](255) NOT NULL,
	[Rating] [float] NOT NULL,
	[Attachment] [nvarchar](255) NULL,
	[FlowerID] [varchar](255) NOT NULL,
	[AccountID] [varchar](255) NOT NULL,
	[CreateDate] [date] NOT NULL,
	[IsGoodReview] [bit] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[FeedbackID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[FlowerCate]    Script Date: 11/10/2024 9:55:53 CH ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[FlowerCate](
	[FCateID] [varchar](255) NOT NULL,
	[FCateName] [nvarchar](255) NOT NULL,
	[FCateDesc] [nvarchar](255) NOT NULL,
	[FParentCateID] [varchar](255) NULL,
	[Status] [int] NOT NULL,
	[IsDeleted] [int] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[FCateID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[Flowers]    Script Date: 11/10/2024 9:55:53 CH ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[Flowers](
	[FlowerID] [varchar](255) NOT NULL,
	[FlowerName] [nvarchar](255) NOT NULL,
	[CateID] [varchar](255) NOT NULL,
	[Description] [nvarchar](255) NOT NULL,
	[Size] [nvarchar](255) NOT NULL,
	[Condition] [nvarchar](255) NOT NULL,
	[Quantity] [float] NOT NULL,
	[Price] [float] NOT NULL,
	[OldPrice] [float] NOT NULL,
	[AccountID] [varchar](255) NOT NULL,
	[CreatedAt] [date] NOT NULL,
	[DateExpiration] [nvarchar](255) NOT NULL,
	[UpdateAt] [date] NOT NULL,
	[UpdateBy] [varchar](255) NOT NULL,
	[IsDeleted] [int] NOT NULL,
	[Status] [int] NOT NULL,
	[TagID] [varchar](255) NOT NULL,
	[Attachment] [varchar](max) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[FlowerID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[FlowerTag]    Script Date: 11/10/2024 9:55:53 CH ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[FlowerTag](
	[TagID] [varchar](255) NOT NULL,
	[TagName] [nvarchar](255) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[TagID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[Notifications]    Script Date: 11/10/2024 9:55:53 CH ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[Notifications](
	[NotifyID] [varchar](255) NOT NULL,
	[NotifyType] [nvarchar](255) NOT NULL,
	[NotiTitle] [nvarchar](255) NOT NULL,
	[NotiContent] [nvarchar](255) NOT NULL,
	[NotiBy] [varchar](255) NOT NULL,
	[NotiAt] [date] NOT NULL,
	[AccountID] [varchar](255) NOT NULL,
	[NotiStatus] [bit] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[NotifyID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[NotificationType]    Script Date: 11/10/2024 9:55:53 CH ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[NotificationType](
	[NotifyType] [nvarchar](255) NOT NULL,
	[NTypeDesc] [nvarchar](max) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[NotifyType] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]

GO
/****** Object:  Table [dbo].[OrderDetails]    Script Date: 11/10/2024 9:55:53 CH ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[OrderDetails](
	[OrderDetailID] [varchar](255) NOT NULL,
	[OrderID] [varchar](255) NOT NULL,
	[FlowerID] [varchar](255) NOT NULL,
	[Quantity] [float] NOT NULL,
	[PaidPrice] [float] NOT NULL,
	[OrderNumber] [varchar](255) NOT NULL,
	[AdminID] [varchar](255) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[OrderDetailID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[Orders]    Script Date: 11/10/2024 9:55:53 CH ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[Orders](
	[OrderID] [varchar](255) NOT NULL,
	[Detail] [nvarchar](255) NOT NULL,
	[Date] [date] NOT NULL,
	[AccountID] [varchar](255) NOT NULL,
	[Status] [bigint] NOT NULL,
	[TotalMoney] [float] NOT NULL,
	[PaymentStatus] [int] NOT NULL,
	[DeliveryUnit] [varchar](255) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[OrderID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[PayoutHistory]    Script Date: 11/10/2024 9:55:53 CH ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[PayoutHistory](
	[PayoutID] [varchar](255) NOT NULL,
	[Amount] [float] NOT NULL,
	[PayoutDate] [date] NOT NULL,
	[Status] [int] NOT NULL,
	[UserID] [varchar](255) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[PayoutID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[PostDetail]    Script Date: 11/10/2024 9:55:53 CH ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[PostDetail](
	[PDetailID] [varchar](255) NOT NULL,
	[FlowerID] [varchar](255) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[PDetailID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[Report]    Script Date: 11/10/2024 9:55:53 CH ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[Report](
	[ReportID] [varchar](255) NOT NULL,
	[Issue] [nvarchar](255) NOT NULL,
	[Content] [nvarchar](255) NULL,
	[Attachment] [varchar](255) NOT NULL,
	[CreateAt] [date] NOT NULL,
	[CreateBy] [varchar](255) NOT NULL,
	[FlowerID] [varchar](255) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[ReportID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[SellerPost]    Script Date: 11/10/2024 9:55:53 CH ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[SellerPost](
	[PostID] [varchar](255) NOT NULL,
	[AccountID] [varchar](255) NOT NULL,
	[PDetailID] [varchar](255) NOT NULL,
	[Title] [nvarchar](255) NOT NULL,
	[Content] [nvarchar](255) NOT NULL,
	[Attachment] [varchar](255) NOT NULL,
	[CreateAt] [date] NOT NULL,
	[hadEvent] [int] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[PostID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[SellerWallet]    Script Date: 11/10/2024 9:55:53 CH ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[SellerWallet](
	[WalletID] [varchar](255) NOT NULL,
	[AccountID] [varchar](255) NOT NULL,
	[Balance] [bigint] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[WalletID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[Transactions]    Script Date: 11/10/2024 9:55:53 CH ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[Transactions](
	[TransactionID] [varchar](255) NOT NULL,
	[Detail] [varchar](255) NOT NULL,
	[Date] [date] NOT NULL,
	[Status] [int] NOT NULL,
	[AccountID] [varchar](255) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[TransactionID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[Users]    Script Date: 11/10/2024 9:55:53 CH ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[Users](
	[UserID] [varchar](255) NOT NULL,
	[AccountID] [varchar](255) NOT NULL,
	[CardName] [varchar](255) NULL,
	[CardNumber] [nvarchar](255) NULL,
	[CardProviderName] [varchar](255) NULL,
	[TaxNumber] [varchar](255) NULL,
	[SellerAvatar] [varchar](255) NULL,
	[SellerAddress] [varchar](255) NULL,
	[ShopName] [nvarchar](250) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[UserID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[Wishlist]    Script Date: 11/10/2024 9:55:53 CH ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[Wishlist](
	[WishlistID] [varchar](255) NOT NULL,
	[AddBy] [varchar](255) NOT NULL,
	[FlowerID] [varchar](255) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[WishlistID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
ALTER TABLE [dbo].[Feedback] ADD  DEFAULT ((0)) FOR [Rating]
GO
ALTER TABLE [dbo].[Event]  WITH CHECK ADD  CONSTRAINT [FK_Event_ECate] FOREIGN KEY([ECateID])
REFERENCES [dbo].[EventCate] ([ECateID])
GO
ALTER TABLE [dbo].[Event] CHECK CONSTRAINT [FK_Event_ECate]
GO
ALTER TABLE [dbo].[Feedback]  WITH CHECK ADD  CONSTRAINT [FK_Feedback_Flower] FOREIGN KEY([FlowerID])
REFERENCES [dbo].[Flowers] ([FlowerID])
GO
ALTER TABLE [dbo].[Feedback] CHECK CONSTRAINT [FK_Feedback_Flower]
GO
ALTER TABLE [dbo].[Flowers]  WITH CHECK ADD  CONSTRAINT [FK_Flowers_Account] FOREIGN KEY([AccountID])
REFERENCES [dbo].[Account] ([AccountID])
GO
ALTER TABLE [dbo].[Flowers] CHECK CONSTRAINT [FK_Flowers_Account]
GO
ALTER TABLE [dbo].[Flowers]  WITH CHECK ADD  CONSTRAINT [FK_Flowers_Cate] FOREIGN KEY([CateID])
REFERENCES [dbo].[FlowerCate] ([FCateID])
GO
ALTER TABLE [dbo].[Flowers] CHECK CONSTRAINT [FK_Flowers_Cate]
GO
ALTER TABLE [dbo].[Flowers]  WITH CHECK ADD  CONSTRAINT [FK_Flowers_Tag] FOREIGN KEY([TagID])
REFERENCES [dbo].[FlowerTag] ([TagID])
GO
ALTER TABLE [dbo].[Flowers] CHECK CONSTRAINT [FK_Flowers_Tag]
GO
ALTER TABLE [dbo].[Notifications]  WITH CHECK ADD  CONSTRAINT [FK_Notifications_Type] FOREIGN KEY([NotifyType])
REFERENCES [dbo].[NotificationType] ([NotifyType])
GO
ALTER TABLE [dbo].[Notifications] CHECK CONSTRAINT [FK_Notifications_Type]
GO
ALTER TABLE [dbo].[OrderDetails]  WITH CHECK ADD  CONSTRAINT [FK_OrderDetails_Order] FOREIGN KEY([OrderID])
REFERENCES [dbo].[Orders] ([OrderID])
GO
ALTER TABLE [dbo].[OrderDetails] CHECK CONSTRAINT [FK_OrderDetails_Order]
GO
ALTER TABLE [dbo].[Orders]  WITH CHECK ADD  CONSTRAINT [FK_Orders_Account] FOREIGN KEY([AccountID])
REFERENCES [dbo].[Account] ([AccountID])
GO
ALTER TABLE [dbo].[Orders] CHECK CONSTRAINT [FK_Orders_Account]
GO
ALTER TABLE [dbo].[PayoutHistory]  WITH CHECK ADD  CONSTRAINT [FK_PayoutHistory_User] FOREIGN KEY([UserID])
REFERENCES [dbo].[Users] ([UserID])
GO
ALTER TABLE [dbo].[PayoutHistory] CHECK CONSTRAINT [FK_PayoutHistory_User]
GO
ALTER TABLE [dbo].[PostDetail]  WITH CHECK ADD  CONSTRAINT [FK_PostDetail_Flower] FOREIGN KEY([FlowerID])
REFERENCES [dbo].[Flowers] ([FlowerID])
GO
ALTER TABLE [dbo].[PostDetail] CHECK CONSTRAINT [FK_PostDetail_Flower]
GO
ALTER TABLE [dbo].[Report]  WITH CHECK ADD  CONSTRAINT [FK_Report_Flower] FOREIGN KEY([FlowerID])
REFERENCES [dbo].[Flowers] ([FlowerID])
GO
ALTER TABLE [dbo].[Report] CHECK CONSTRAINT [FK_Report_Flower]
GO
ALTER TABLE [dbo].[SellerPost]  WITH CHECK ADD  CONSTRAINT [FK_SellerPost_PostDetail] FOREIGN KEY([PDetailID])
REFERENCES [dbo].[PostDetail] ([PDetailID])
GO
ALTER TABLE [dbo].[SellerPost] CHECK CONSTRAINT [FK_SellerPost_PostDetail]
GO
ALTER TABLE [dbo].[SellerWallet]  WITH CHECK ADD  CONSTRAINT [FK_SellerWallet_Account] FOREIGN KEY([AccountID])
REFERENCES [dbo].[Account] ([AccountID])
GO
ALTER TABLE [dbo].[SellerWallet] CHECK CONSTRAINT [FK_SellerWallet_Account]
GO
ALTER TABLE [dbo].[Transactions]  WITH CHECK ADD  CONSTRAINT [FK_Transaction_Account] FOREIGN KEY([AccountID])
REFERENCES [dbo].[Account] ([AccountID])
GO
ALTER TABLE [dbo].[Transactions] CHECK CONSTRAINT [FK_Transaction_Account]
GO
ALTER TABLE [dbo].[Users]  WITH CHECK ADD  CONSTRAINT [FK_Users_Account] FOREIGN KEY([AccountID])
REFERENCES [dbo].[Account] ([AccountID])
GO
ALTER TABLE [dbo].[Users] CHECK CONSTRAINT [FK_Users_Account]
GO
ALTER TABLE [dbo].[Users]  WITH CHECK ADD  CONSTRAINT [FK_Users_CardProviders] FOREIGN KEY([CardProviderName])
REFERENCES [dbo].[CardProviders] ([CardProviderName])
GO
ALTER TABLE [dbo].[Users] CHECK CONSTRAINT [FK_Users_CardProviders]
GO
ALTER TABLE [dbo].[Wishlist]  WITH CHECK ADD  CONSTRAINT [FK_Wishlist_Flower] FOREIGN KEY([FlowerID])
REFERENCES [dbo].[Flowers] ([FlowerID])
GO
ALTER TABLE [dbo].[Wishlist] CHECK CONSTRAINT [FK_Wishlist_Flower]
GO
USE [master]
GO
ALTER DATABASE [EspoirDB] SET  READ_WRITE 
GO

USE EspoirDB
GO
ALTER TABLE FlowerCate 
ALTER COLUMN FcateDesc NVARCHAR(500);
INSERT INTO FlowerCate (FcateId, FcateName, FcateDesc, FparentCateId, Status, IsDeleted) VALUES 
('FC00000001', 'Sun Flower', 'Not only do sunflowers resemble miniature suns, their blooms also follow the sun across the sky. They have their own biological clocks which help them to follow the sun as it moves from east to west during the day, and then move back to their original position at night.', NULL, 1, 0),
('FC00000002', 'Rose', 'A symbol of love and beauty, roses have enchanted civilizations throughout history with their stunning blossoms and enchanting fragrance.', NULL, 1, 0),
('FC00000003', 'Tulip', 'Known for their vibrant colors and elegant cup-shaped blooms, tulips symbolize perfect love and have a rich history in Europe, especially in the Netherlands.', NULL, 1, 0),
('FC00000004', 'Lily', 'Lilies are associated with purity and refined beauty. They often grace weddings and special events with their delicate petals and strong fragrance.', NULL, 1, 0),
('FC00000005', 'Daisy', 'Daisies symbolize innocence and purity. With their simple yet charming appearance, they are a favorite choice for gardens and bouquets.', NULL, 1, 0),
('FC00000006', 'Orchid', 'Orchids are exotic flowers that symbolize luxury, strength, and beauty. Their intricate blooms are admired worldwide for their stunning variety of shapes and colors.', NULL, 1, 0),
('FC00000007', 'Chrysanthemum', 'Chrysanthemums, known for their full, rich blooms, are symbols of happiness and long life. They are often used in celebrations in many cultures.', NULL, 1, 0),
('FC00000008', 'Daffodil', 'A cheerful spring flower, daffodils symbolize renewal and hope. Their bright yellow petals bring joy after the long winter months.', NULL, 1, 0),
('FC00000009', 'Peony', 'Peonies are revered for their lush, full blooms and delicate scent. They are often associated with prosperity and romance.', NULL, 1, 0),
('FC00000010', 'Lavender', 'Lavender is a beloved herb and flower known for its calming fragrance. It is often used in aromatherapy and symbolizes tranquility and serenity.', NULL, 1, 0),
('FC00000011', 'Jasmine', 'Jasmine flowers are renowned for their sweet fragrance, often associated with love, beauty, and sensuality.', NULL, 1, 0);
GO
INSERT INTO Users (UserId, AccountId, CardName, CardNumber, CardProviderName, TaxNumber, SellerAddress, ShopName, SellerAvatar)
VALUES 
('US00000001', 'AC00000003', 'NGUYEN MINH PHUONG', '90273928384471924', 'ACB', '7286378282', 'HCM', 'Meraki', NULL);
GO
INSERT INTO Account (AccountId, Email, Password, Role, FullName, PhoneNumber, Birthday, Address, Status, IsSeller, Gender, Username, IsEmailConfirm) 
VALUES
('AC00000001', 'nghalam1210@gmail.com', 'sXv+pkUgkVrOiyy4pzqBADSz/f+eQIxoCmfB9vqXEKU=', 1, 'Admin Văn 1', '0123456789', '1999-10-10', 'HCM', 1, 0, 3, 'user@1', 1),
('AC00000002', 'duchao696@gmail.com', 'sXv+pkUgkVrOiyy4pzqBADSz/f+eQIxoCmfB9vqXEKU=', 1, 'Admin Văn 2', '0123456788', '1998-11-11', 'HN', 1, 0, 3, 'user@2', 1),
('AC00000003', 'nhattulam12102003@gmail.com', 'sXv+pkUgkVrOiyy4pzqBADSz/f+eQIxoCmfB9vqXEKU=', 2, 'Nguyen Minh Phuong', '0987654322', '1989-11-20', 'HN', 1, 1, 3, 'user@3', 1),
('AC00000004', 'customer2@gmail.com', 'sXv+pkUgkVrOiyy4pzqBADSz/f+eQIxoCmfB9vqXEKU=', 2, 'Dang Phuong Thao', '0987654333', '1983-02-14', 'ND', 1, 0, 3, 'user@4', 1),
('AC00000005', 'customer3@gmail.com', 'sXv+pkUgkVrOiyy4pzqBADSz/f+eQIxoCmfB9vqXEKU=', 2, 'Tran Hoang Phu', '0987654444', '1990-01-02', 'BD', 1, 0, 3, 'user@5', 1),
('AC00000006', 'customer4@gmail.com', 'sXv+pkUgkVrOiyy4pzqBADSz/f+eQIxoCmfB9vqXEKU=', 2, 'Tran Quoc Tuan', '0987655555', '1979-07-28', 'HCM', 1, 0, 3, 'user@6', 1),
('AC00000007', 'anhnnqe170248@fpt.edu.vn', 'sXv+pkUgkVrOiyy4pzqBADSz/f+eQIxoCmfB9vqXEKU=', 2, 'Truong Yen Nhi', '0987666666', '2003-05-20', 'PY', 1, 0, 3, 'user@7', 1),
('AC00000011', 'customer11@gmail.com', 'sXv+pkUgkVrOiyy4pzqBADSz/f+eQIxoCmfB9vqXEKU=', 2, 'Tran Quoc', '0987666666', '2001-12-20', 'PT', 1, 0, 3, 'user@8', 1),
('AC00000012', 'customer12@gmail.com', 'sXv+pkUgkVrOiyy4pzqBADSz/f+eQIxoCmfB9vqXEKU=', 2, 'Quoc Tuan', '0987666666', '2002-08-20', 'NH', 1, 0, 3, 'user@9', 1),
('AC00000013', 'vietnam@gmail.com', 'sXv+pkUgkVrOiyy4pzqBADSz/f+eQIxoCmfB9vqXEKU=', 2, 'Trương Tấn Sang', '0987666666', '2002-08-20', 'TPHCM', 1, 0, 3, 'user@10', 1),
('AC00000020', 'thanhdanhnguyenvinh@gmail.com', 'sXv+pkUgkVrOiyy4pzqBADSz/f+eQIxoCmfB9vqXEKU=', 2, 'Nyn Anh', '0987668876', '2002-01-20', 'Q9', 1, 0, 3, 'user@11', 1),
('AC00000021', 'customer21@gmail.com', 'sXv+pkUgkVrOiyy4pzqBADSz/f+eQIxoCmfB9vqXEKU=', 2, 'Tran Bao', '0987662566', '2002-01-20', 'Q9', 1, 0, 3, 'user@12', 1),
('AC00000022', 'customer2@gmail.com', 'sXv+pkUgkVrOiyy4pzqBADSz/f+eQIxoCmfB9vqXEKU=', 2, 'Quoc Toan', '0987123666', '2002-01-20', 'Q9', 1, 0, 3, 'user@13', 1),
('AC00000023', 'customer3@gmail.com', 'sXv+pkUgkVrOiyy4pzqBADSz/f+eQIxoCmfB9vqXEKU=', 2, 'Van Anh', '0987346666', '2002-01-20', 'Q9', 1, 0, 3, 'user@14', 1),
('AC00000024', 'customer4@gmail.com', 'sXv+pkUgkVrOiyy4pzqBADSz/f+eQIxoCmfB9vqXEKU=', 2, 'Yn Anh', '0987666456', '1999-01-20', 'Q9', 1, 0, 3, 'user@15', 1),
('AC00000025', 'customer5@gmail.com', 'sXv+pkUgkVrOiyy4pzqBADSz/f+eQIxoCmfB9vqXEKU=', 2, 'Ly Thien Huong', '0987666400', '1989-11-20', 'HN', 1, 0, 3, 'user@16', 1);
GO
INSERT INTO FlowerTag (TagId, TagName)
VALUES 
('FT00000001', 'Bright Colors'),
('FT00000002', 'Fragrant'),
('FT00000003', 'Low Maintenance');
GO
INSERT INTO Flowers (FlowerId, FlowerName, CateId, Description, Size, Condition, Quantity, Price, OldPrice, AccountId, CreatedAt, DateExpiration, UpdateAt, UpdateBy, IsDeleted, Status, TagId, Attachment)
VALUES 
('F000000001', 'Mini Sun Flower', 'FC00000001', 'Mini Sunflowers are a good option if you are looking for a different focal. They are ideal for bright floral arrangements. Mini Sunflowers are a good option if you are looking for a different focal. They are ideal for bright floral arrangements.', 'Bouquet', 'New', 100, 10, 10, 'AC00000003', '2024-02-14', '1 month', NULL, NULL, 0, 1, 'FT00000001', 'empty');
GO