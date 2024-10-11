USE [master]
GO
/****** Object:  Database [EspoirDB]    Script Date: 11/10/2024 9:55:53 CH ******/
CREATE DATABASE [EspoirDB]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'EspoirDB', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL12.HALAM_SE170579\MSSQL\DATA\EspoirDB.mdf' , SIZE = 3264KB , MAXSIZE = UNLIMITED, FILEGROWTH = 1024KB )
 LOG ON 
( NAME = N'EspoirDB_log', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL12.HALAM_SE170579\MSSQL\DATA\EspoirDB_log.ldf' , SIZE = 816KB , MAXSIZE = 2048GB , FILEGROWTH = 10%)
GO
ALTER DATABASE [EspoirDB] SET COMPATIBILITY_LEVEL = 120
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [EspoirDB].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [EspoirDB] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [EspoirDB] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [EspoirDB] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [EspoirDB] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [EspoirDB] SET ARITHABORT OFF 
GO
ALTER DATABASE [EspoirDB] SET AUTO_CLOSE ON 
GO
ALTER DATABASE [EspoirDB] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [EspoirDB] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [EspoirDB] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [EspoirDB] SET CURSOR_DEFAULT  GLOBAL 
GO
ALTER DATABASE [EspoirDB] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [EspoirDB] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [EspoirDB] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [EspoirDB] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [EspoirDB] SET  ENABLE_BROKER 
GO
ALTER DATABASE [EspoirDB] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [EspoirDB] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [EspoirDB] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [EspoirDB] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [EspoirDB] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [EspoirDB] SET READ_COMMITTED_SNAPSHOT OFF 
GO
ALTER DATABASE [EspoirDB] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [EspoirDB] SET RECOVERY SIMPLE 
GO
ALTER DATABASE [EspoirDB] SET  MULTI_USER 
GO
ALTER DATABASE [EspoirDB] SET PAGE_VERIFY CHECKSUM  
GO
ALTER DATABASE [EspoirDB] SET DB_CHAINING OFF 
GO
ALTER DATABASE [EspoirDB] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO
ALTER DATABASE [EspoirDB] SET TARGET_RECOVERY_TIME = 0 SECONDS 
GO
ALTER DATABASE [EspoirDB] SET DELAYED_DURABILITY = DISABLED 
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
