USE [EspoirDB]
GO
/****** Object:  Table [dbo].[__EFMigrationsHistory]    Script Date: 23/10/2024 2:29:01 CH ******/
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
/****** Object:  Table [dbo].[Account]    Script Date: 23/10/2024 2:29:01 CH ******/
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
/****** Object:  Table [dbo].[CardProviders]    Script Date: 23/10/2024 2:29:01 CH ******/
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
/****** Object:  Table [dbo].[Event]    Script Date: 23/10/2024 2:29:01 CH ******/
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
/****** Object:  Table [dbo].[EventCate]    Script Date: 23/10/2024 2:29:01 CH ******/
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
/****** Object:  Table [dbo].[Feedback]    Script Date: 23/10/2024 2:29:01 CH ******/
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
/****** Object:  Table [dbo].[FlowerCate]    Script Date: 23/10/2024 2:29:01 CH ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[FlowerCate](
	[FCateID] [varchar](255) NOT NULL,
	[FCateName] [nvarchar](255) NOT NULL,
	[FCateDesc] [nvarchar](500) NULL,
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
/****** Object:  Table [dbo].[Flowers]    Script Date: 23/10/2024 2:29:01 CH ******/
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
	[UpdateAt] [datetime] NULL,
	[UpdateBy] [nvarchar](255) NULL,
	[IsDeleted] [int] NOT NULL,
	[Status] [int] NOT NULL,
	[Attachment] [varchar](max) NOT NULL,
	[TagIds] [varchar](500) NULL,
PRIMARY KEY CLUSTERED 
(
	[FlowerID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[FlowerTag]    Script Date: 23/10/2024 2:29:01 CH ******/
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
/****** Object:  Table [dbo].[Notifications]    Script Date: 23/10/2024 2:29:01 CH ******/
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
/****** Object:  Table [dbo].[NotificationType]    Script Date: 23/10/2024 2:29:01 CH ******/
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
/****** Object:  Table [dbo].[OrderDetails]    Script Date: 23/10/2024 2:29:01 CH ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[OrderDetails](
	[OrderDetailID] [varchar](255) NOT NULL,
	[OrderID] [varchar](255) NULL,
	[FlowerID] [varchar](255) NOT NULL,
	[Quantity] [float] NOT NULL,
	[PaidPrice] [float] NOT NULL,
	[OrderNumber] [varchar](255) NULL,
	[AccountID] [varchar](255) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[OrderDetailID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[Orders]    Script Date: 23/10/2024 2:29:01 CH ******/
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
	[AdminID] [varchar](255) NULL,
PRIMARY KEY CLUSTERED 
(
	[OrderID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[PayoutHistory]    Script Date: 23/10/2024 2:29:01 CH ******/
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
/****** Object:  Table [dbo].[PostDetail]    Script Date: 23/10/2024 2:29:01 CH ******/
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
/****** Object:  Table [dbo].[Report]    Script Date: 23/10/2024 2:29:01 CH ******/
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
/****** Object:  Table [dbo].[SellerPost]    Script Date: 23/10/2024 2:29:01 CH ******/
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
/****** Object:  Table [dbo].[SellerWallet]    Script Date: 23/10/2024 2:29:01 CH ******/
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
/****** Object:  Table [dbo].[Transactions]    Script Date: 23/10/2024 2:29:01 CH ******/
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
/****** Object:  Table [dbo].[Users]    Script Date: 23/10/2024 2:29:01 CH ******/
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
/****** Object:  Table [dbo].[Wishlist]    Script Date: 23/10/2024 2:29:01 CH ******/
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
INSERT [dbo].[Account] ([AccountID], [Username], [Password], [FullName], [Email], [Address], [PhoneNumber], [Birthday], [Gender], [Role], [Status], [IsEmailConfirm], [IsSeller]) VALUES (N'AC00000001', N'user@1', N'TmI+KMwiswm6Mewpl97NSF86arbhUVyZnXmBI+4gdRA=', N'Admin Van 1', N'nghalam1210@gmail.com', N'HCM', N'0123456789', CAST(N'1999-10-10' AS Date), 3, 1, 0, 1, 0)
INSERT [dbo].[Account] ([AccountID], [Username], [Password], [FullName], [Email], [Address], [PhoneNumber], [Birthday], [Gender], [Role], [Status], [IsEmailConfirm], [IsSeller]) VALUES (N'AC00000002', N'user@2', N'TmI+KMwiswm6Mewpl97NSF86arbhUVyZnXmBI+4gdRA=', N'Admin Van 2', N'duchao696@gmail.com', N'HN', N'0123456788', CAST(N'1998-11-11' AS Date), 3, 1, 0, 1, 0)
INSERT [dbo].[Account] ([AccountID], [Username], [Password], [FullName], [Email], [Address], [PhoneNumber], [Birthday], [Gender], [Role], [Status], [IsEmailConfirm], [IsSeller]) VALUES (N'AC00000003', N'user@3', N'TmI+KMwiswm6Mewpl97NSF86arbhUVyZnXmBI+4gdRA=', N'Nguyen Minh Phuong', N'nhattulam12102003@gmail.com', N'HN', N'0987654322', CAST(N'1989-11-20' AS Date), 3, 2, 0, 1, 1)
INSERT [dbo].[Account] ([AccountID], [Username], [Password], [FullName], [Email], [Address], [PhoneNumber], [Birthday], [Gender], [Role], [Status], [IsEmailConfirm], [IsSeller]) VALUES (N'AC00000004', N'user@4', N'TmI+KMwiswm6Mewpl97NSF86arbhUVyZnXmBI+4gdRA=', N'Dang Phuong Thao', N'customer2@gmail.com', N'ND', N'0987654333', CAST(N'1983-02-14' AS Date), 3, 2, 0, 1, 1)
INSERT [dbo].[Account] ([AccountID], [Username], [Password], [FullName], [Email], [Address], [PhoneNumber], [Birthday], [Gender], [Role], [Status], [IsEmailConfirm], [IsSeller]) VALUES (N'AC00000005', N'user@5', N'TmI+KMwiswm6Mewpl97NSF86arbhUVyZnXmBI+4gdRA=', N'Tran Hoang Phu', N'nguyenly@gmail.com', N'BD', N'0987654444', CAST(N'1990-01-02' AS Date), 0, 2, 0, 1, 1)
INSERT [dbo].[Account] ([AccountID], [Username], [Password], [FullName], [Email], [Address], [PhoneNumber], [Birthday], [Gender], [Role], [Status], [IsEmailConfirm], [IsSeller]) VALUES (N'AC00000006', N'user@6', N'TmI+KMwiswm6Mewpl97NSF86arbhUVyZnXmBI+4gdRA=', N'Tran Quoc Tuan', N'customer4@gmail.com', N'HCM', N'0987655555', CAST(N'1979-07-28' AS Date), 3, 2, 0, 1, 1)
INSERT [dbo].[Account] ([AccountID], [Username], [Password], [FullName], [Email], [Address], [PhoneNumber], [Birthday], [Gender], [Role], [Status], [IsEmailConfirm], [IsSeller]) VALUES (N'AC00000007', N'user@7', N'TmI+KMwiswm6Mewpl97NSF86arbhUVyZnXmBI+4gdRA=', N'Truong Yen Nhi', N'anhnnqe170248@fpt.edu.vn', N'PY', N'0987666666', CAST(N'2003-05-20' AS Date), 3, 2, 0, 1, 1)
INSERT [dbo].[Account] ([AccountID], [Username], [Password], [FullName], [Email], [Address], [PhoneNumber], [Birthday], [Gender], [Role], [Status], [IsEmailConfirm], [IsSeller]) VALUES (N'AC00000011', N'user@8', N'u93zTwjKn5EGES4DRXBqHNgggYmp7amf/9rUl9lZnNM=', N'Tran Quoc', N'customer11@gmail.com', N'PT', N'0987666666', CAST(N'2001-12-20' AS Date), 3, 2, 0, 1, 0)
INSERT [dbo].[Account] ([AccountID], [Username], [Password], [FullName], [Email], [Address], [PhoneNumber], [Birthday], [Gender], [Role], [Status], [IsEmailConfirm], [IsSeller]) VALUES (N'AC00000012', N'user@9', N'u93zTwjKn5EGES4DRXBqHNgggYmp7amf/9rUl9lZnNM=', N'Quoc Tuan', N'customer12@gmail.com', N'NH', N'0987666666', CAST(N'2002-08-20' AS Date), 3, 2, 0, 1, 0)
INSERT [dbo].[Account] ([AccountID], [Username], [Password], [FullName], [Email], [Address], [PhoneNumber], [Birthday], [Gender], [Role], [Status], [IsEmailConfirm], [IsSeller]) VALUES (N'AC00000013', N'user@10', N'u93zTwjKn5EGES4DRXBqHNgggYmp7amf/9rUl9lZnNM=', N'Truong T?n Sang', N'vietnam@gmail.com', N'TPHCM', N'0987666666', CAST(N'2002-08-20' AS Date), 3, 2, 0, 1, 0)
INSERT [dbo].[Account] ([AccountID], [Username], [Password], [FullName], [Email], [Address], [PhoneNumber], [Birthday], [Gender], [Role], [Status], [IsEmailConfirm], [IsSeller]) VALUES (N'AC00000020', N'user@11', N'TmI+KMwiswm6Mewpl97NSF86arbhUVyZnXmBI+4gdRA=', N'Nyn Anh', N'thanhdanhnguyenvinh@gmail.com', N'Q9', N'0987668876', CAST(N'2002-01-20' AS Date), 3, 2, 0, 1, 1)
INSERT [dbo].[Account] ([AccountID], [Username], [Password], [FullName], [Email], [Address], [PhoneNumber], [Birthday], [Gender], [Role], [Status], [IsEmailConfirm], [IsSeller]) VALUES (N'AC00000021', N'user@12', N'u93zTwjKn5EGES4DRXBqHNgggYmp7amf/9rUl9lZnNM=', N'Tran Bao', N'customer21@gmail.com', N'Q9', N'0987662566', CAST(N'2002-01-20' AS Date), 3, 2, 0, 1, 0)
INSERT [dbo].[Account] ([AccountID], [Username], [Password], [FullName], [Email], [Address], [PhoneNumber], [Birthday], [Gender], [Role], [Status], [IsEmailConfirm], [IsSeller]) VALUES (N'AC00000022', N'user@13', N'u93zTwjKn5EGES4DRXBqHNgggYmp7amf/9rUl9lZnNM=', N'Quoc Toan', N'student2@gmail.com', N'Q9', N'0987123666', CAST(N'2002-01-20' AS Date), 3, 2, 0, 1, 0)
INSERT [dbo].[Account] ([AccountID], [Username], [Password], [FullName], [Email], [Address], [PhoneNumber], [Birthday], [Gender], [Role], [Status], [IsEmailConfirm], [IsSeller]) VALUES (N'AC00000023', N'user@14', N'u93zTwjKn5EGES4DRXBqHNgggYmp7amf/9rUl9lZnNM=', N'Van Anh', N'student3@gmail.com', N'Q9', N'0987346666', CAST(N'2002-01-20' AS Date), 3, 2, 0, 1, 0)
INSERT [dbo].[Account] ([AccountID], [Username], [Password], [FullName], [Email], [Address], [PhoneNumber], [Birthday], [Gender], [Role], [Status], [IsEmailConfirm], [IsSeller]) VALUES (N'AC00000024', N'user@15', N'u93zTwjKn5EGES4DRXBqHNgggYmp7amf/9rUl9lZnNM=', N'Yn Anh', N'student4@gmail.com', N'Q9', N'0987666456', CAST(N'1999-01-20' AS Date), 3, 2, 0, 1, 0)
INSERT [dbo].[Account] ([AccountID], [Username], [Password], [FullName], [Email], [Address], [PhoneNumber], [Birthday], [Gender], [Role], [Status], [IsEmailConfirm], [IsSeller]) VALUES (N'AC00000025', N'user@16', N'u93zTwjKn5EGES4DRXBqHNgggYmp7amf/9rUl9lZnNM=', N'Ly Thien Huong', N'vuhuyhoangdeptrai@gmail.com', N'HN', N'0987666400', CAST(N'1989-11-20' AS Date), 3, 2, 0, 1, 0)
INSERT [dbo].[Account] ([AccountID], [Username], [Password], [FullName], [Email], [Address], [PhoneNumber], [Birthday], [Gender], [Role], [Status], [IsEmailConfirm], [IsSeller]) VALUES (N'AC00000026', N'string', N'TmI+KMwiswm6Mewpl97NSF86arbhUVyZnXmBI+4gdRA=', N'string', N'user@example.com', N'string', N'324509463', CAST(N'2024-10-13' AS Date), 1, 2, 0, 1, 0)
INSERT [dbo].[CardProviders] ([CardProviderName], [CPFullName]) VALUES (N'ABBANK', N'Ngân hàng TMCP An Bình')
INSERT [dbo].[CardProviders] ([CardProviderName], [CPFullName]) VALUES (N'ACB', N'Ngân hàng TMCP Á Châu')
INSERT [dbo].[CardProviders] ([CardProviderName], [CPFullName]) VALUES (N'Agribank', N'Ngân hàng Nông nghi?p và Phát tri?n Nông thôn Vi?t Nam')
INSERT [dbo].[CardProviders] ([CardProviderName], [CPFullName]) VALUES (N'BacABank', N'Ngân hàng TMCP B?c Á')
INSERT [dbo].[CardProviders] ([CardProviderName], [CPFullName]) VALUES (N'BaoVietBank', N'Ngân hàng TMCP B?o Vi?t')
INSERT [dbo].[CardProviders] ([CardProviderName], [CPFullName]) VALUES (N'BIDV', N'Ngân hàng TMCP Ð?u tu và Phát tri?n Vi?t Nam')
INSERT [dbo].[CardProviders] ([CardProviderName], [CPFullName]) VALUES (N'CAKE', N'TMCP Vi?t Nam Th?nh Vu?ng - Ngân hàng s? CAKE by VPBank')
INSERT [dbo].[CardProviders] ([CardProviderName], [CPFullName]) VALUES (N'CBBank', N'Ngân hàng Thuong m?i TNHH MTV Xây d?ng Vi?t Nam')
INSERT [dbo].[CardProviders] ([CardProviderName], [CPFullName]) VALUES (N'CIMB', N'Ngân hàng TNHH MTV CIMB Vi?t Nam')
INSERT [dbo].[CardProviders] ([CardProviderName], [CPFullName]) VALUES (N'Citibank', N'Ngân hàng Citibank, N.A. - Chi nhánh Hà N?i')
INSERT [dbo].[CardProviders] ([CardProviderName], [CPFullName]) VALUES (N'COOPBANK', N'Ngân hàng H?p tác xã Vi?t Nam')
INSERT [dbo].[CardProviders] ([CardProviderName], [CPFullName]) VALUES (N'DBSBank', N'DBS Bank Ltd - Chi nhánh Thành ph? H? Chí Minh')
INSERT [dbo].[CardProviders] ([CardProviderName], [CPFullName]) VALUES (N'DongABank', N'Ngân hàng TMCP Ðông Á')
INSERT [dbo].[CardProviders] ([CardProviderName], [CPFullName]) VALUES (N'Eximbank', N'Ngân hàng TMCP Xu?t Nh?p kh?u Vi?t Nam')
INSERT [dbo].[CardProviders] ([CardProviderName], [CPFullName]) VALUES (N'GPBank', N'Ngân hàng Thuong m?i TNHH MTV D?u Khí Toàn C?u')
INSERT [dbo].[CardProviders] ([CardProviderName], [CPFullName]) VALUES (N'HDBank', N'Ngân hàng TMCP Phát tri?n Thành ph? H? Chí Minh')
INSERT [dbo].[CardProviders] ([CardProviderName], [CPFullName]) VALUES (N'HongLeong', N'Ngân hàng TNHH MTV Hong Leong Vi?t Nam')
INSERT [dbo].[CardProviders] ([CardProviderName], [CPFullName]) VALUES (N'HSBC', N'Ngân hàng TNHH MTV HSBC (Vi?t Nam)')
INSERT [dbo].[CardProviders] ([CardProviderName], [CPFullName]) VALUES (N'IBKHCM', N'Ngân ha`ng Công nghiê?p Ha`n Quô´c - Chi nha´nh TP. Hô` Chi´ Minh')
INSERT [dbo].[CardProviders] ([CardProviderName], [CPFullName]) VALUES (N'IBKHN', N'Ngân ha`ng Công nghiê?p Ha`n Quô´c - Chi nha´nh Ha` Nô?i')
INSERT [dbo].[CardProviders] ([CardProviderName], [CPFullName]) VALUES (N'IndovinaBank', N'Ngân hàng TNHH Indovina')
INSERT [dbo].[CardProviders] ([CardProviderName], [CPFullName]) VALUES (N'KBank', N'Ngân hàng Ð?i chúng TNHH Kasikornbank')
INSERT [dbo].[CardProviders] ([CardProviderName], [CPFullName]) VALUES (N'KEBHanaHCM', N'Ngân hàng KEB Hana – Chi nhánh Thành ph? H? Chí Minh')
INSERT [dbo].[CardProviders] ([CardProviderName], [CPFullName]) VALUES (N'KEBHANAHN', N'Công ty Tài chính TNHH MTV Mirae Asset (Vi?t Nam)')
INSERT [dbo].[CardProviders] ([CardProviderName], [CPFullName]) VALUES (N'KienLongBank', N'Ngân hàng TMCP Kiên Long')
INSERT [dbo].[CardProviders] ([CardProviderName], [CPFullName]) VALUES (N'KookminHCM', N'Ngân hàng Kookmin - Chi nhánh Thành ph? H? Chí Minh')
INSERT [dbo].[CardProviders] ([CardProviderName], [CPFullName]) VALUES (N'KookminHN', N'Ngân hàng Kookmin - Chi nhánh Hà N?i')
INSERT [dbo].[CardProviders] ([CardProviderName], [CPFullName]) VALUES (N'LienVietPostBank', N'Ngân hàng TMCP Buu Ði?n Liên Vi?t')
INSERT [dbo].[CardProviders] ([CardProviderName], [CPFullName]) VALUES (N'MBBank', N'Ngân hàng TMCP Quân d?i')
INSERT [dbo].[CardProviders] ([CardProviderName], [CPFullName]) VALUES (N'MSB', N'Ngân ha`ng TMCP Ha`ng Ha?i')
INSERT [dbo].[CardProviders] ([CardProviderName], [CPFullName]) VALUES (N'NamABank', N'Ngân hàng TMCP Nam Á')
INSERT [dbo].[CardProviders] ([CardProviderName], [CPFullName]) VALUES (N'NCB', N'Ngân hàng TMCP Qu?c Dân')
INSERT [dbo].[CardProviders] ([CardProviderName], [CPFullName]) VALUES (N'Nonghyup', N'Ngân hàng Nonghyup - Chi nhánh Hà N?i')
INSERT [dbo].[CardProviders] ([CardProviderName], [CPFullName]) VALUES (N'OCB', N'Ngân hàng TMCP Phuong Ðông')
INSERT [dbo].[CardProviders] ([CardProviderName], [CPFullName]) VALUES (N'Oceanbank', N'Ngân hàng Thuong m?i TNHH MTV Ð?i Duong')
INSERT [dbo].[CardProviders] ([CardProviderName], [CPFullName]) VALUES (N'PGBank', N'Ngân hàng TMCP Xang d?u Petrolimex')
INSERT [dbo].[CardProviders] ([CardProviderName], [CPFullName]) VALUES (N'PublicBank', N'Ngân hàng TNHH MTV Public Vi?t Nam')
INSERT [dbo].[CardProviders] ([CardProviderName], [CPFullName]) VALUES (N'PVcomBank', N'Ngân ha`ng TMCP Ða?i Chu´ng Viê?t Nam')
INSERT [dbo].[CardProviders] ([CardProviderName], [CPFullName]) VALUES (N'Sacombank', N'Ngân hàng TMCP Sài Gòn Thuong Tín')
INSERT [dbo].[CardProviders] ([CardProviderName], [CPFullName]) VALUES (N'SaigonBank', N'NgânNgân hàng TMCP Sài Gòn Công Thuong')
INSERT [dbo].[CardProviders] ([CardProviderName], [CPFullName]) VALUES (N'SCB', N'Ngân hàng TMCP Sài Gòn')
INSERT [dbo].[CardProviders] ([CardProviderName], [CPFullName]) VALUES (N'SeABank', N'Ngân ha`ng TMCP Ðông Nam A´')
INSERT [dbo].[CardProviders] ([CardProviderName], [CPFullName]) VALUES (N'SHB', N'Ngân hàng TMCP Sài Gòn - Hà N?i')
INSERT [dbo].[CardProviders] ([CardProviderName], [CPFullName]) VALUES (N'ShinhanBank', N'Ngân hàng TNHH MTV Shinhan Vi?t Nam')
INSERT [dbo].[CardProviders] ([CardProviderName], [CPFullName]) VALUES (N'StandardChartered', N'Ngân hàng TNHH MTV Standard Chartered Bank Vi?t Nam')
INSERT [dbo].[CardProviders] ([CardProviderName], [CPFullName]) VALUES (N'Techcombank', N'Ngân hàng TMCP K? thuong Vi?t Nam')
INSERT [dbo].[CardProviders] ([CardProviderName], [CPFullName]) VALUES (N'Timo', N'Ngân hàng s? Timo by Ban Viet Bank (Timo by Ban Viet Bank)')
INSERT [dbo].[CardProviders] ([CardProviderName], [CPFullName]) VALUES (N'TPBank', N'Ngân hàng TMCP Tiên Phong')
INSERT [dbo].[CardProviders] ([CardProviderName], [CPFullName]) VALUES (N'Ubank', N'NgânTMCP Vi?t Nam Th?nh Vu?ng - Ngân hàng s? Ubank by VPBank')
INSERT [dbo].[CardProviders] ([CardProviderName], [CPFullName]) VALUES (N'UnitedOverseas', N'Ngân hàng United Overseas - Chi nhánh TP. H? Chí Minh')
INSERT [dbo].[CardProviders] ([CardProviderName], [CPFullName]) VALUES (N'VBSP', N'Ngân hàng Chính sách Xã h?i')
INSERT [dbo].[CardProviders] ([CardProviderName], [CPFullName]) VALUES (N'VIB', N'Ngân ha`ng TMCP Qu?c t? Vi?t Nam')
INSERT [dbo].[CardProviders] ([CardProviderName], [CPFullName]) VALUES (N'VietABank', N'Ngân hàng TMCP Vi?t Á')
INSERT [dbo].[CardProviders] ([CardProviderName], [CPFullName]) VALUES (N'VietBank', N'Ngân hàng TMCP Vi?t Nam Thuong Tín')
INSERT [dbo].[CardProviders] ([CardProviderName], [CPFullName]) VALUES (N'VietCapitalBank', N'Ngân ha`ng TMCP Ba?n Viê?t')
INSERT [dbo].[CardProviders] ([CardProviderName], [CPFullName]) VALUES (N'Vietcombank', N'Ngân ha`ng TMCP Ngoa?i Thuong Viê?t Nam')
INSERT [dbo].[CardProviders] ([CardProviderName], [CPFullName]) VALUES (N'VietinBank', N'Ngân hàng TMCP Công thuong Vi?t Nam')
INSERT [dbo].[CardProviders] ([CardProviderName], [CPFullName]) VALUES (N'ViettelMoney', N'T?ng Công ty D?ch v? s? Viettel - Chi nhánh t?p doàn công nghi?p vi?n thông Quân Ð?i')
INSERT [dbo].[CardProviders] ([CardProviderName], [CPFullName]) VALUES (N'VNPTMoney', N'VNPT Money')
INSERT [dbo].[CardProviders] ([CardProviderName], [CPFullName]) VALUES (N'VPBank', N'Ngân hàng TMCP Vi?t Nam Th?nh Vu?ng')
INSERT [dbo].[CardProviders] ([CardProviderName], [CPFullName]) VALUES (N'VRB', N'Ngân hàng Liên doanh Vi?t - Nga')
INSERT [dbo].[CardProviders] ([CardProviderName], [CPFullName]) VALUES (N'Woori', N'Ngân hàng TNHH MTV Woori Vi?t Nam')
INSERT [dbo].[FlowerCate] ([FCateID], [FCateName], [FCateDesc], [FParentCateID], [Status], [IsDeleted]) VALUES (N'FC00000001', N'Sun Flower', N'Not only do sunflowers resemble miniature suns, their blooms also follow the sun across the sky. They have their own biological clocks which help them to follow the sun as it moves from east to west during the day, and then move back to their original position at night.', NULL, 1, 0)
INSERT [dbo].[FlowerCate] ([FCateID], [FCateName], [FCateDesc], [FParentCateID], [Status], [IsDeleted]) VALUES (N'FC00000002', N'Rose', N'A symbol of love and beauty, roses have enchanted civilizations throughout history with their stunning blossoms and enchanting fragrance.', NULL, 1, 0)
INSERT [dbo].[FlowerCate] ([FCateID], [FCateName], [FCateDesc], [FParentCateID], [Status], [IsDeleted]) VALUES (N'FC00000003', N'Tulip', N'Known for their vibrant colors and elegant cup-shaped blooms, tulips symbolize perfect love and have a rich history in Europe, especially in the Netherlands.', NULL, 1, 0)
INSERT [dbo].[FlowerCate] ([FCateID], [FCateName], [FCateDesc], [FParentCateID], [Status], [IsDeleted]) VALUES (N'FC00000004', N'Lily', N'Lilies are associated with purity and refined beauty. They often grace weddings and special events with their delicate petals and strong fragrance.', NULL, 1, 0)
INSERT [dbo].[FlowerCate] ([FCateID], [FCateName], [FCateDesc], [FParentCateID], [Status], [IsDeleted]) VALUES (N'FC00000005', N'Daisy', N'Daisies symbolize innocence and purity. With their simple yet charming appearance, they are a favorite choice for gardens and bouquets.', NULL, 1, 0)
INSERT [dbo].[FlowerCate] ([FCateID], [FCateName], [FCateDesc], [FParentCateID], [Status], [IsDeleted]) VALUES (N'FC00000006', N'Orchid', N'Orchids are exotic flowers that symbolize luxury, strength, and beauty. Their intricate blooms are admired worldwide for their stunning variety of shapes and colors.', NULL, 1, 0)
INSERT [dbo].[FlowerCate] ([FCateID], [FCateName], [FCateDesc], [FParentCateID], [Status], [IsDeleted]) VALUES (N'FC00000007', N'Chrysanthemum', N'Chrysanthemums, known for their full, rich blooms, are symbols of happiness and long life. They are often used in celebrations in many cultures.', NULL, 1, 0)
INSERT [dbo].[FlowerCate] ([FCateID], [FCateName], [FCateDesc], [FParentCateID], [Status], [IsDeleted]) VALUES (N'FC00000008', N'Daffodil', N'A cheerful spring flower, daffodils symbolize renewal and hope. Their bright yellow petals bring joy after the long winter months.', NULL, 1, 0)
INSERT [dbo].[FlowerCate] ([FCateID], [FCateName], [FCateDesc], [FParentCateID], [Status], [IsDeleted]) VALUES (N'FC00000009', N'Peony', N'Peonies are revered for their lush, full blooms and delicate scent. They are often associated with prosperity and romance.', NULL, 1, 0)
INSERT [dbo].[FlowerCate] ([FCateID], [FCateName], [FCateDesc], [FParentCateID], [Status], [IsDeleted]) VALUES (N'FC00000010', N'Lavender', N'Lavender is a beloved herb and flower known for its calming fragrance. It is often used in aromatherapy and symbolizes tranquility and serenity.', NULL, 1, 0)
INSERT [dbo].[FlowerCate] ([FCateID], [FCateName], [FCateDesc], [FParentCateID], [Status], [IsDeleted]) VALUES (N'FC00000011', N'Jasmine', N'Jasmine flowers are renowned for their sweet fragrance, often associated with love, beauty, and sensuality.', NULL, 1, 0)
INSERT [dbo].[Flowers] ([FlowerID], [FlowerName], [CateID], [Description], [Size], [Condition], [Quantity], [Price], [OldPrice], [AccountID], [CreatedAt], [DateExpiration], [UpdateAt], [UpdateBy], [IsDeleted], [Status], [Attachment], [TagIds]) VALUES (N'F000000001', N'Mini Sun Flower', N'FC00000001', N'Mini Sunflowers are a good option if you are looking for a different focal. They are ideal for bright floral arrangements. Mini Sunflowers are a good option if you are looking for a different focal. They are ideal for bright floral arrangements.', N'Bouquet', N'New', 100, 10, 10, N'AC00000003', CAST(N'2024-02-14' AS Date), N'1 month', CAST(N'2024-10-12 00:00:00.000' AS DateTime), N'empty', 0, 0, N'empty', N'FT00000003, FT00000002')
INSERT [dbo].[Flowers] ([FlowerID], [FlowerName], [CateID], [Description], [Size], [Condition], [Quantity], [Price], [OldPrice], [AccountID], [CreatedAt], [DateExpiration], [UpdateAt], [UpdateBy], [IsDeleted], [Status], [Attachment], [TagIds]) VALUES (N'F000000002', N'Pink Rose', N'FC00000002', N'The Pink Rose represents elegance and grace. It is a symbol of admiration and joy.', N'Bouquet', N'Fresh', 50, 15, 12, N'AC00000003', CAST(N'2024-03-01' AS Date), N'1 month', NULL, NULL, 0, 0, N'Empty', N'FT00000002')
INSERT [dbo].[Flowers] ([FlowerID], [FlowerName], [CateID], [Description], [Size], [Condition], [Quantity], [Price], [OldPrice], [AccountID], [CreatedAt], [DateExpiration], [UpdateAt], [UpdateBy], [IsDeleted], [Status], [Attachment], [TagIds]) VALUES (N'F000000003', N'White Tulip', N'FC00000003', N'White Tulips symbolize new beginnings, purity, and innocence.', N'Bouquet', N'New', 70, 18, 16, N'AC00000003', CAST(N'2024-03-05' AS Date), N'1 month', NULL, NULL, 0, 0, N'Empty', N'FT00000001')
INSERT [dbo].[Flowers] ([FlowerID], [FlowerName], [CateID], [Description], [Size], [Condition], [Quantity], [Price], [OldPrice], [AccountID], [CreatedAt], [DateExpiration], [UpdateAt], [UpdateBy], [IsDeleted], [Status], [Attachment], [TagIds]) VALUES (N'F000000004', N'Lily of the Valley', N'FC00000004', N'Lily of the Valley is known for its sweet fragrance and delicate white bell-shaped flowers.', N'Bouquet', N'Fresh', 60, 25, 20, N'AC00000003', CAST(N'2024-03-10' AS Date), N'1 month', NULL, NULL, 0, 0, N'Empty', N'FT00000001, FT00000003')
INSERT [dbo].[Flowers] ([FlowerID], [FlowerName], [CateID], [Description], [Size], [Condition], [Quantity], [Price], [OldPrice], [AccountID], [CreatedAt], [DateExpiration], [UpdateAt], [UpdateBy], [IsDeleted], [Status], [Attachment], [TagIds]) VALUES (N'F000000005', N'Daisy Dream', N'FC00000005', N'A bouquet of fresh daisies symbolizing purity and innocence.', N'Bouquet', N'New', 80, 12, 10, N'AC00000003', CAST(N'2024-03-15' AS Date), N'1 month', NULL, NULL, 0, 0, N'Empty', N'FT00000003')
INSERT [dbo].[Flowers] ([FlowerID], [FlowerName], [CateID], [Description], [Size], [Condition], [Quantity], [Price], [OldPrice], [AccountID], [CreatedAt], [DateExpiration], [UpdateAt], [UpdateBy], [IsDeleted], [Status], [Attachment], [TagIds]) VALUES (N'F000000006', N'Orchid Elegance', N'FC00000006', N'Elegant Orchids represent strength, luxury, and beauty.', N'Single Stem', N'New', 40, 30, 25, N'AC00000004', CAST(N'2024-04-01' AS Date), N'2 weeks', NULL, NULL, 0, 0, N'Empty', N'FT00000003')
INSERT [dbo].[Flowers] ([FlowerID], [FlowerName], [CateID], [Description], [Size], [Condition], [Quantity], [Price], [OldPrice], [AccountID], [CreatedAt], [DateExpiration], [UpdateAt], [UpdateBy], [IsDeleted], [Status], [Attachment], [TagIds]) VALUES (N'F000000007', N'Chrysanthemum Bouquet', N'FC00000007', N'A vibrant bouquet of Chrysanthemums symbolizing happiness and longevity.', N'Bouquet', N'Fresh', 90, 20, 18, N'AC00000004', CAST(N'2024-04-05' AS Date), N'1 month', NULL, NULL, 0, 0, N'Empty', N'FT00000003')
INSERT [dbo].[Flowers] ([FlowerID], [FlowerName], [CateID], [Description], [Size], [Condition], [Quantity], [Price], [OldPrice], [AccountID], [CreatedAt], [DateExpiration], [UpdateAt], [UpdateBy], [IsDeleted], [Status], [Attachment], [TagIds]) VALUES (N'F000000008', N'Daffodil Sunshine', N'FC00000008', N'Bright yellow Daffodils symbolize renewal and hope.', N'Bouquet', N'New', 70, 15, 12, N'AC00000004', CAST(N'2024-04-10' AS Date), N'1 month', NULL, NULL, 0, 0, N'Empty', N'FT00000003')
INSERT [dbo].[Flowers] ([FlowerID], [FlowerName], [CateID], [Description], [Size], [Condition], [Quantity], [Price], [OldPrice], [AccountID], [CreatedAt], [DateExpiration], [UpdateAt], [UpdateBy], [IsDeleted], [Status], [Attachment], [TagIds]) VALUES (N'F000000009', N'Peony Romance', N'FC00000009', N'Peonies symbolize romance and prosperity with their lush full blooms.', N'Bouquet', N'New', 50, 28, 24, N'AC00000004', CAST(N'2024-04-12' AS Date), N'1 month', NULL, NULL, 0, 0, N'Empty', N'FT00000002')
INSERT [dbo].[Flowers] ([FlowerID], [FlowerName], [CateID], [Description], [Size], [Condition], [Quantity], [Price], [OldPrice], [AccountID], [CreatedAt], [DateExpiration], [UpdateAt], [UpdateBy], [IsDeleted], [Status], [Attachment], [TagIds]) VALUES (N'F000000010', N'Lavender Calm', N'FC00000010', N'Lavender flowers are known for their calming fragrance and symbolize tranquility.', N'Bundle', N'Fresh', 100, 20, 18, N'AC00000005', CAST(N'2024-05-01' AS Date), N'2 weeks', NULL, NULL, 0, 0, N'Empty', N'FT00000003')
INSERT [dbo].[Flowers] ([FlowerID], [FlowerName], [CateID], [Description], [Size], [Condition], [Quantity], [Price], [OldPrice], [AccountID], [CreatedAt], [DateExpiration], [UpdateAt], [UpdateBy], [IsDeleted], [Status], [Attachment], [TagIds]) VALUES (N'F000000011', N'Jasmine Delight', N'FC00000011', N'Jasmine flowers are sweetly fragrant and symbolize love and beauty.', N'Bouquet', N'New', 90, 22, 20, N'AC00000005', CAST(N'2024-05-05' AS Date), N'1 month', NULL, NULL, 0, 0, N'Empty', N'FT00000001, FT00000002, FT00000003')
INSERT [dbo].[Flowers] ([FlowerID], [FlowerName], [CateID], [Description], [Size], [Condition], [Quantity], [Price], [OldPrice], [AccountID], [CreatedAt], [DateExpiration], [UpdateAt], [UpdateBy], [IsDeleted], [Status], [Attachment], [TagIds]) VALUES (N'F000000012', N'Mixed Flower Surprise', N'FC00000002', N'A delightful mix of roses and other fresh flowers.', N'Bouquet', N'Fresh', 80, 25, 22, N'AC00000005', CAST(N'2024-05-10' AS Date), N'1 month', NULL, NULL, 0, 0, N'Empty', N'FT00000001')
INSERT [dbo].[Flowers] ([FlowerID], [FlowerName], [CateID], [Description], [Size], [Condition], [Quantity], [Price], [OldPrice], [AccountID], [CreatedAt], [DateExpiration], [UpdateAt], [UpdateBy], [IsDeleted], [Status], [Attachment], [TagIds]) VALUES (N'F000000013', N'Sunflower Joy', N'FC00000001', N'Bright sunflowers that radiate joy and energy.', N'Bouquet', N'New', 120, 18, 16, N'AC00000005', CAST(N'2024-05-15' AS Date), N'1 month', NULL, NULL, 0, 0, N'Empty', N'FT00000001')
INSERT [dbo].[Flowers] ([FlowerID], [FlowerName], [CateID], [Description], [Size], [Condition], [Quantity], [Price], [OldPrice], [AccountID], [CreatedAt], [DateExpiration], [UpdateAt], [UpdateBy], [IsDeleted], [Status], [Attachment], [TagIds]) VALUES (N'F000000014', N'Red Rose Passion', N'FC00000002', N'Red Roses symbolize deep love and passion.', N'Bouquet', N'New', 50, 20, 18, N'AC00000006', CAST(N'2024-06-01' AS Date), N'1 month', NULL, NULL, 0, 0, N'Empty', N'FT00000003')
INSERT [dbo].[Flowers] ([FlowerID], [FlowerName], [CateID], [Description], [Size], [Condition], [Quantity], [Price], [OldPrice], [AccountID], [CreatedAt], [DateExpiration], [UpdateAt], [UpdateBy], [IsDeleted], [Status], [Attachment], [TagIds]) VALUES (N'F000000015', N'Pink Lily Grace', N'FC00000004', N'Graceful Pink Lilies, perfect for any occasion.', N'Bouquet', N'Fresh', 60, 25, 22, N'AC00000006', CAST(N'2024-06-05' AS Date), N'1 month', NULL, NULL, 0, 0, N'Empty', N'FT00000002')
INSERT [dbo].[Flowers] ([FlowerID], [FlowerName], [CateID], [Description], [Size], [Condition], [Quantity], [Price], [OldPrice], [AccountID], [CreatedAt], [DateExpiration], [UpdateAt], [UpdateBy], [IsDeleted], [Status], [Attachment], [TagIds]) VALUES (N'F000000016', N'Tulip Wonder', N'FC00000003', N'A vibrant mix of tulips symbolizing love and appreciation.', N'Bouquet', N'New', 70, 28, 25, N'AC00000006', CAST(N'2024-06-10' AS Date), N'1 month', NULL, NULL, 0, 0, N'Empty', N'FT00000001')
INSERT [dbo].[Flowers] ([FlowerID], [FlowerName], [CateID], [Description], [Size], [Condition], [Quantity], [Price], [OldPrice], [AccountID], [CreatedAt], [DateExpiration], [UpdateAt], [UpdateBy], [IsDeleted], [Status], [Attachment], [TagIds]) VALUES (N'F000000017', N'Lavender Fields', N'FC00000010', N'A calming bouquet of Lavender symbolizing peace.', N'Bundle', N'Fresh', 100, 22, 20, N'AC00000006', CAST(N'2024-06-15' AS Date), N'2 weeks', NULL, NULL, 0, 0, N'Empty', N'FT00000001')
INSERT [dbo].[Flowers] ([FlowerID], [FlowerName], [CateID], [Description], [Size], [Condition], [Quantity], [Price], [OldPrice], [AccountID], [CreatedAt], [DateExpiration], [UpdateAt], [UpdateBy], [IsDeleted], [Status], [Attachment], [TagIds]) VALUES (N'F000000018', N'White Orchid', N'FC00000006', N'Elegant white Orchids symbolizing purity and luxury.', N'Single Stem', N'New', 30, 35, 30, N'AC00000007', CAST(N'2024-07-01' AS Date), N'2 weeks', NULL, NULL, 0, 0, N'Empty', N'FT00000003')
INSERT [dbo].[Flowers] ([FlowerID], [FlowerName], [CateID], [Description], [Size], [Condition], [Quantity], [Price], [OldPrice], [AccountID], [CreatedAt], [DateExpiration], [UpdateAt], [UpdateBy], [IsDeleted], [Status], [Attachment], [TagIds]) VALUES (N'F000000019', N'Yellow Rose Sunshine', N'FC00000002', N'A bouquet of bright Yellow Roses symbolizing friendship and happiness.', N'Bouquet', N'New', 80, 18, 15, N'AC00000007', CAST(N'2024-07-05' AS Date), N'1 month', NULL, NULL, 0, 0, N'Empty', N'FT00000002')
INSERT [dbo].[Flowers] ([FlowerID], [FlowerName], [CateID], [Description], [Size], [Condition], [Quantity], [Price], [OldPrice], [AccountID], [CreatedAt], [DateExpiration], [UpdateAt], [UpdateBy], [IsDeleted], [Status], [Attachment], [TagIds]) VALUES (N'F000000020', N'Purple Chrysanthemum', N'FC00000007', N'Purple Chrysanthemums symbolizing nobility and respect.', N'Bouquet', N'New', 70, 20, 18, N'AC00000007', CAST(N'2024-07-10' AS Date), N'1 month', NULL, NULL, 0, 0, N'Empty', N'FT00000003')
INSERT [dbo].[Flowers] ([FlowerID], [FlowerName], [CateID], [Description], [Size], [Condition], [Quantity], [Price], [OldPrice], [AccountID], [CreatedAt], [DateExpiration], [UpdateAt], [UpdateBy], [IsDeleted], [Status], [Attachment], [TagIds]) VALUES (N'F000000021', N'Peony Dream', N'FC00000009', N'Lush Peonies symbolizing romance and prosperity.', N'Bouquet', N'New', 60, 28, 25, N'AC00000007', CAST(N'2024-07-15' AS Date), N'1 month', NULL, NULL, 0, 0, N'Empty', N'FT00000002')
INSERT [dbo].[FlowerTag] ([TagID], [TagName]) VALUES (N'FT00000001', N'Bright Colors')
INSERT [dbo].[FlowerTag] ([TagID], [TagName]) VALUES (N'FT00000002', N'Fragrant')
INSERT [dbo].[FlowerTag] ([TagID], [TagName]) VALUES (N'FT00000003', N'Low Maintenance')
INSERT [dbo].[OrderDetails] ([OrderDetailID], [OrderID], [FlowerID], [Quantity], [PaidPrice], [OrderNumber], [AccountID]) VALUES (N'OD00000001', NULL, N'F000000001', 36, 103680, NULL, N'AC00000003')
INSERT [dbo].[OrderDetails] ([OrderDetailID], [OrderID], [FlowerID], [Quantity], [PaidPrice], [OrderNumber], [AccountID]) VALUES (N'OD00000002', NULL, N'F000000002', 30, 450, NULL, N'AC00000003')
INSERT [dbo].[OrderDetails] ([OrderDetailID], [OrderID], [FlowerID], [Quantity], [PaidPrice], [OrderNumber], [AccountID]) VALUES (N'OD00000003', NULL, N'F000000003', 3, 54, NULL, N'AC00000003')
INSERT [dbo].[Users] ([UserID], [AccountID], [CardName], [CardNumber], [CardProviderName], [TaxNumber], [SellerAvatar], [SellerAddress], [ShopName]) VALUES (N'US00000001', N'AC00000003', N'NGUYEN MINH PHUONG', N'90273928384471924', N'ACB', N'7286378282', NULL, N'HCM', N'Meraki')
INSERT [dbo].[Users] ([UserID], [AccountID], [CardName], [CardNumber], [CardProviderName], [TaxNumber], [SellerAvatar], [SellerAddress], [ShopName]) VALUES (N'US00000002', N'AC00000005', N'DINH LY HONG NGOC', N'90273928384471920', N'BIDV', N'7286378282', NULL, N'BD', N'Espoir')
INSERT [dbo].[Users] ([UserID], [AccountID], [CardName], [CardNumber], [CardProviderName], [TaxNumber], [SellerAvatar], [SellerAddress], [ShopName]) VALUES (N'US00000003', N'AC00000004', N'EMK', N'4222222222222222', N'ACB', N'TAX9876543210', N'EMPTY', N'456 Rose Lane, Flower Town', N'Rose Blossom')
INSERT [dbo].[Users] ([UserID], [AccountID], [CardName], [CardNumber], [CardProviderName], [TaxNumber], [SellerAvatar], [SellerAddress], [ShopName]) VALUES (N'US00000004', N'AC00000006', N'Williams', N'4444444444444444', N'Techcombank', N'TAX2468013579', N'EMPTY', N'321 Orchid Blvd, Bloomtown', N'Orchid Wonders')
INSERT [dbo].[Users] ([UserID], [AccountID], [CardName], [CardNumber], [CardProviderName], [TaxNumber], [SellerAvatar], [SellerAddress], [ShopName]) VALUES (N'US00000005', N'AC00000007', N'Emily', N'4555555555555555', N'BIDV', N'TAX1928374650', N'EMPTY', N'654 Peony Path, Garden City', N'Peony Paradise')
SET ANSI_PADDING ON

GO
/****** Object:  Index [FK_User_Account]    Script Date: 23/10/2024 2:29:01 CH ******/
ALTER TABLE [dbo].[Users] ADD  CONSTRAINT [FK_User_Account] UNIQUE NONCLUSTERED 
(
	[AccountID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
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
