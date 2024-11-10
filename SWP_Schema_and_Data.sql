USE EspoirDB
GO
INSERT INTO CardProviders (CardProviderName, CPFullName)
VALUES
    ('VietinBank', N'Ngân hàng TMCP Công thương Việt Nam'),
    ('Vietcombank', N'Ngân hàng TMCP Ngoại Thương Việt Nam'),
    ('BIDV', N'Ngân hàng TMCP Đầu tư và Phát triển Việt Nam'),
    ('Agribank', N'Ngân hàng Nông nghiệp và Phát triển Nông thôn Việt Nam'),
    ('OCB', N'Ngân hàng TMCP Phương Đông'),
    ('MBBank', N'Ngân hàng TMCP Quân đội'),
    ('Techcombank', N'Ngân hàng TMCP Kỹ thương Việt Nam'),
    ('ACB', N'Ngân hàng TMCP Á Châu'),
    ('VPBank', N'Ngân hàng TMCP Việt Nam Thịnh Vượng'),
    ('TPBank', N'Ngân hàng TMCP Tiên Phong'),
    ('Sacombank', N'Ngân hàng TMCP Sài Gòn Thương Tín'),
    ('HDBank', N'Ngân hàng TMCP Phát triển Thành phố Hồ Chí Minh'),
    ('VietCapitalBank', N'Ngân hàng TMCP Bản Việt'),
    ('SCB', N'Ngân hàng TMCP Sài Gòn'),
    ('VIB', N'Ngân hàng TMCP Quốc tế Việt Nam'),
    ('SHB', N'Ngân hàng TMCP Sài Gòn - Hà Nội'),
    ('Eximbank', N'Ngân hàng TMCP Xuất Nhập khẩu Việt Nam'),
    ('MSB', N'Ngân hàng TMCP Hàng Hải'),
    ('CAKE', N'TMCP Việt Nam Thịnh Vượng - Ngân hàng số CAKE by VPBank'),
    ('Ubank', N'NgânTMCP Việt Nam Thịnh Vượng - Ngân hàng số Ubank by VPBank'),
    ('Timo', N'Ngân hàng số Timo by Ban Viet Bank (Timo by Ban Viet Bank)'),
    ('ViettelMoney', N'Tổng Công ty Dịch vụ số Viettel - Chi nhánh tập đoàn công nghiệp viễn thông Quân Đội'),
    ('VNPTMoney', N'VNPT Money'),
    ('SaigonBank', N'NgânNgân hàng TMCP Sài Gòn Công Thương'),
    ('BacABank', N'Ngân hàng TMCP Bắc Á'),
    ('PVcomBank', N'Ngân hàng TMCP Đại Chúng Việt Nam'),
    ('Oceanbank', N'Ngân hàng Thương mại TNHH MTV Đại Dương'),
    ('NCB', N'Ngân hàng TMCP Quốc Dân'),
    ('ShinhanBank', N'Ngân hàng TNHH MTV Shinhan Việt Nam'),
    ('ABBANK', N'Ngân hàng TMCP An Bình'),
    ('VietABank', N'Ngân hàng TMCP Việt Á'),
    ('NamABank', N'Ngân hàng TMCP Nam Á'),
    ('PGBank', N'Ngân hàng TMCP Xăng dầu Petrolimex'),
    ('VietBank', N'Ngân hàng TMCP Việt Nam Thương Tín'),
    ('BaoVietBank', N'Ngân hàng TMCP Bảo Việt'),
    ('SeABank', N'Ngân hàng TMCP Đông Nam Á'),
    ('COOPBANK', N'Ngân hàng Hợp tác xã Việt Nam'),
    ('LienVietPostBank', N'Ngân hàng TMCP Bưu Điện Liên Việt'),
    ('KienLongBank', N'Ngân hàng TMCP Kiên Long'),
    ('KBank', N'Ngân hàng Đại chúng TNHH Kasikornbank'),
    ('KookminHN', N'Ngân hàng Kookmin - Chi nhánh Hà Nội'),
    ('KEBHanaHCM', N'Ngân hàng KEB Hana – Chi nhánh Thành phố Hồ Chí Minh'),
    ('KEBHANAHN', N'Công ty Tài chính TNHH MTV Mirae Asset (Việt Nam)'),
    ('Citibank', N'Ngân hàng Citibank, N.A. - Chi nhánh Hà Nội'),
    ('KookminHCM', N'Ngân hàng Kookmin - Chi nhánh Thành phố Hồ Chí Minh'),
    ('VBSP', N'Ngân hàng Chính sách Xã hội'),
    ('Woori', N'Ngân hàng TNHH MTV Woori Việt Nam'),
    ('VRB', N'Ngân hàng Liên doanh Việt - Nga'),
    ('UnitedOverseas', N'Ngân hàng United Overseas - Chi nhánh TP. Hồ Chí Minh'),
    ('StandardChartered', N'Ngân hàng TNHH MTV Standard Chartered Bank Việt Nam'),
    ('PublicBank', N'Ngân hàng TNHH MTV Public Việt Nam'),
    ('Nonghyup', N'Ngân hàng Nonghyup - Chi nhánh Hà Nội'),
    ('IndovinaBank', N'Ngân hàng TNHH Indovina'),
    ('IBKHCM', N'Ngân hàng Công nghiệp Hàn Quốc - Chi nhánh TP. Hồ Chí Minh'),
    ('IBKHN', N'Ngân hàng Công nghiệp Hàn Quốc - Chi nhánh Hà Nội'),
    ('HSBC', N'Ngân hàng TNHH MTV HSBC (Việt Nam)'),
    ('HongLeong', N'Ngân hàng TNHH MTV Hong Leong Việt Nam'),
    ('GPBank', N'Ngân hàng Thương mại TNHH MTV Dầu Khí Toàn Cầu'),
    ('DongABank', N'Ngân hàng TMCP Đông Á'),
    ('DBSBank', N'DBS Bank Ltd - Chi nhánh Thành phố Hồ Chí Minh'),
    ('CIMB', N'Ngân hàng TNHH MTV CIMB Việt Nam'),
    ('CBBank', N'Ngân hàng Thương mại TNHH MTV Xây dựng Việt Nam');

INSERT [dbo].[Account] ([AccountID], [Username], [Password], [FullName], [Email], [Address], [PhoneNumber], [Birthday], [Gender], [Role], [Status], [IsEmailConfirm], [IsSeller]) VALUES (N'AC00000001', N'user@1', N'TmI+KMwiswm6Mewpl97NSF86arbhUVyZnXmBI+4gdRA=', N'Admin Van 1', N'nghalam1210@gmail.com', N'HCM', N'0123456789', CAST(N'1999-10-10' AS Date), 3, 1, 0, 1, 0)
INSERT [dbo].[Account] ([AccountID], [Username], [Password], [FullName], [Email], [Address], [PhoneNumber], [Birthday], [Gender], [Role], [Status], [IsEmailConfirm], [IsSeller]) VALUES (N'AC00000002', N'user@2', N'TmI+KMwiswm6Mewpl97NSF86arbhUVyZnXmBI+4gdRA=', N'Admin Van 2', N'duchao696@gmail.com', N'HN', N'0123456788', CAST(N'1998-11-11' AS Date), 3, 1, 0, 1, 0)
INSERT [dbo].[Account] ([AccountID], [Username], [Password], [FullName], [Email], [Address], [PhoneNumber], [Birthday], [Gender], [Role], [Status], [IsEmailConfirm], [IsSeller]) VALUES (N'AC00000003', N'user@3', N'TmI+KMwiswm6Mewpl97NSF86arbhUVyZnXmBI+4gdRA=', N'Nguyen Minh Phuong', N'nhattulam12102003@gmail.com', N'HN', N'0987654322', CAST(N'1989-11-20' AS Date), 3, 2, 0, 1, 1)
INSERT [dbo].[Account] ([AccountID], [Username], [Password], [FullName], [Email], [Address], [PhoneNumber], [Birthday], [Gender], [Role], [Status], [IsEmailConfirm], [IsSeller]) VALUES (N'AC00000004', N'user@4', N'TmI+KMwiswm6Mewpl97NSF86arbhUVyZnXmBI+4gdRA=', N'Dang Phuong Thao', N'customer2@gmail.com', N'ND', N'0987654333', CAST(N'1983-02-14' AS Date), 3, 2, 0, 1, 1)
INSERT [dbo].[Account] ([AccountID], [Username], [Password], [FullName], [Email], [Address], [PhoneNumber], [Birthday], [Gender], [Role], [Status], [IsEmailConfirm], [IsSeller]) VALUES (N'AC00000005', N'user@5', N'TmI+KMwiswm6Mewpl97NSF86arbhUVyZnXmBI+4gdRA=', N'Tran Hoang Phu', N'nguyenly@gmail.com', N'BD', N'0987654444', CAST(N'1990-01-02' AS Date), 0, 2, 0, 1, 1)
INSERT [dbo].[Account] ([AccountID], [Username], [Password], [FullName], [Email], [Address], [PhoneNumber], [Birthday], [Gender], [Role], [Status], [IsEmailConfirm], [IsSeller]) VALUES (N'AC00000006', N'user@6', N'TmI+KMwiswm6Mewpl97NSF86arbhUVyZnXmBI+4gdRA=', N'Tran Quoc Tuan', N'customer4@gmail.com', N'HCM', N'0987655555', CAST(N'1979-07-28' AS Date), 3, 2, 0, 1, 1)
INSERT [dbo].[Account] ([AccountID], [Username], [Password], [FullName], [Email], [Address], [PhoneNumber], [Birthday], [Gender], [Role], [Status], [IsEmailConfirm], [IsSeller]) VALUES (N'AC00000007', N'user@7', N'TmI+KMwiswm6Mewpl97NSF86arbhUVyZnXmBI+4gdRA=', N'Truong Yen Nhi', N'test@gmail.com', N'PY', N'0987666666', CAST(N'2003-05-20' AS Date), 3, 2, 0, 1, 1)
INSERT [dbo].[Account] ([AccountID], [Username], [Password], [FullName], [Email], [Address], [PhoneNumber], [Birthday], [Gender], [Role], [Status], [IsEmailConfirm], [IsSeller]) VALUES (N'AC00000011', N'user@8', N'TmI+KMwiswm6Mewpl97NSF86arbhUVyZnXmBI+4gdRA=', N'Tran Quoc', N'customer11@gmail.com', N'PT', N'0987666666', CAST(N'2001-12-20' AS Date), 3, 2, 0, 1, 0)
INSERT [dbo].[Account] ([AccountID], [Username], [Password], [FullName], [Email], [Address], [PhoneNumber], [Birthday], [Gender], [Role], [Status], [IsEmailConfirm], [IsSeller]) VALUES (N'AC00000012', N'user@9', N'TmI+KMwiswm6Mewpl97NSF86arbhUVyZnXmBI+4gdRA=', N'Quoc Tuan', N'customer12@gmail.com', N'NH', N'0987666666', CAST(N'2002-08-20' AS Date), 3, 2, 0, 1, 0)
INSERT [dbo].[Account] ([AccountID], [Username], [Password], [FullName], [Email], [Address], [PhoneNumber], [Birthday], [Gender], [Role], [Status], [IsEmailConfirm], [IsSeller]) VALUES (N'AC00000013', N'user@10', N'TmI+KMwiswm6Mewpl97NSF86arbhUVyZnXmBI+4gdRA=', N'Truong T?n Sang', N'vietnam@gmail.com', N'TPHCM', N'0987666666', CAST(N'2002-08-20' AS Date), 3, 2, 0, 1, 0)
INSERT [dbo].[Account] ([AccountID], [Username], [Password], [FullName], [Email], [Address], [PhoneNumber], [Birthday], [Gender], [Role], [Status], [IsEmailConfirm], [IsSeller]) VALUES (N'AC00000020', N'user@11', N'TmI+KMwiswm6Mewpl97NSF86arbhUVyZnXmBI+4gdRA=', N'Nyn Anh', N'thanhdanhnguyenvinh@gmail.com', N'Q9', N'0987668876', CAST(N'2002-01-20' AS Date), 3, 2, 0, 1, 1)
INSERT [dbo].[Account] ([AccountID], [Username], [Password], [FullName], [Email], [Address], [PhoneNumber], [Birthday], [Gender], [Role], [Status], [IsEmailConfirm], [IsSeller]) VALUES (N'AC00000021', N'user@12', N'TmI+KMwiswm6Mewpl97NSF86arbhUVyZnXmBI+4gdRA=', N'Tran Bao', N'customer21@gmail.com', N'Q9', N'0987662566', CAST(N'2002-01-20' AS Date), 3, 2, 0, 1, 0)
INSERT [dbo].[Account] ([AccountID], [Username], [Password], [FullName], [Email], [Address], [PhoneNumber], [Birthday], [Gender], [Role], [Status], [IsEmailConfirm], [IsSeller]) VALUES (N'AC00000022', N'user@13', N'TmI+KMwiswm6Mewpl97NSF86arbhUVyZnXmBI+4gdRA=', N'Quoc Toan', N'buyer2@gmail.com', N'Q9', N'0987123666', CAST(N'2002-01-20' AS Date), 3, 2, 0, 1, 0)
INSERT [dbo].[Account] ([AccountID], [Username], [Password], [FullName], [Email], [Address], [PhoneNumber], [Birthday], [Gender], [Role], [Status], [IsEmailConfirm], [IsSeller]) VALUES (N'AC00000023', N'user@14', N'TmI+KMwiswm6Mewpl97NSF86arbhUVyZnXmBI+4gdRA=', N'Van Anh', N'buyer3@gmail.com', N'Q9', N'0987346666', CAST(N'2002-01-20' AS Date), 3, 2, 0, 1, 0)
INSERT [dbo].[Account] ([AccountID], [Username], [Password], [FullName], [Email], [Address], [PhoneNumber], [Birthday], [Gender], [Role], [Status], [IsEmailConfirm], [IsSeller]) VALUES (N'AC00000024', N'user@15', N'TmI+KMwiswm6Mewpl97NSF86arbhUVyZnXmBI+4gdRA=', N'Yn Anh', N'buyer4@gmail.com', N'Q9', N'0987666456', CAST(N'1999-01-20' AS Date), 3, 2, 0, 1, 0)
INSERT [dbo].[Account] ([AccountID], [Username], [Password], [FullName], [Email], [Address], [PhoneNumber], [Birthday], [Gender], [Role], [Status], [IsEmailConfirm], [IsSeller]) VALUES (N'AC00000025', N'user@16', N'TmI+KMwiswm6Mewpl97NSF86arbhUVyZnXmBI+4gdRA=', N'Ly Thien Huong', N'buyer5@gmail.com', N'HN', N'0987666400', CAST(N'1989-11-20' AS Date), 3, 2, 0, 1, 0)
INSERT [dbo].[Account] ([AccountID], [Username], [Password], [FullName], [Email], [Address], [PhoneNumber], [Birthday], [Gender], [Role], [Status], [IsEmailConfirm], [IsSeller]) VALUES (N'AC00000026', N'string', N'TmI+KMwiswm6Mewpl97NSF86arbhUVyZnXmBI+4gdRA=', N'string', N'user@example.com', N'string', N'324509463', CAST(N'2024-10-13' AS Date), 1, 2, 0, 1, 0)

INSERT [dbo].[Users] ([UserID], [AccountID], [CardName], [CardNumber], [CardProviderName], [TaxNumber], [SellerAvatar], [SellerAddress], [ShopName]) VALUES (N'US00000001', N'AC00000003', N'NGUYEN MINH PHUONG', N'90273928384471924', N'ACB', N'7286378282', NULL, N'HCM', N'Meraki')
INSERT [dbo].[Users] ([UserID], [AccountID], [CardName], [CardNumber], [CardProviderName], [TaxNumber], [SellerAvatar], [SellerAddress], [ShopName]) VALUES (N'US00000002', N'AC00000005', N'DINH LY HONG NGOC', N'90273928384471920', N'BIDV', N'7286378282', NULL, N'BD', N'Espoir')
INSERT [dbo].[Users] ([UserID], [AccountID], [CardName], [CardNumber], [CardProviderName], [TaxNumber], [SellerAvatar], [SellerAddress], [ShopName]) VALUES (N'US00000003', N'AC00000004', N'EMK', N'4222222222222222', N'ACB', N'TAX9876543210', N'EMPTY', N'456 Rose Lane, Flower Town', N'Rose Blossom')
INSERT [dbo].[Users] ([UserID], [AccountID], [CardName], [CardNumber], [CardProviderName], [TaxNumber], [SellerAvatar], [SellerAddress], [ShopName]) VALUES (N'US00000004', N'AC00000006', N'Williams', N'4444444444444444', N'Techcombank', N'TAX2468013579', N'EMPTY', N'321 Orchid Blvd, Bloomtown', N'Orchid Wonders')
INSERT [dbo].[Users] ([UserID], [AccountID], [CardName], [CardNumber], [CardProviderName], [TaxNumber], [SellerAvatar], [SellerAddress], [ShopName]) VALUES (N'US00000005', N'AC00000007', N'Emily', N'4555555555555555', N'BIDV', N'TAX1928374650', N'EMPTY', N'654 Peony Path, Garden City', N'Peony Paradise')

INSERT [dbo].[FlowerCate] ([FCateID], [FCateName], [FCateDesc], [FParentCateID], [Status], [IsDeleted]) VALUES (N'FC00000001', N'Sun Flower', N'Not only do sunflowers resemble miniature suns, their blooms also follow the sun across the sky.', NULL, 1, 0)
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

INSERT INTO FlowerTag (TagId, TagName)
VALUES
('FT00000001', 'Fresh'),
('FT00000002', 'Used'),
('FT00000003', 'Artificial'),
('FT00000004', 'Wedding'),
('FT00000005', 'Funeral'),
('FT00000006', 'Opening'),
('FT00000007', 'Other');


INSERT [dbo].[Flowers] ([FlowerID], [FlowerName], [CateID], [Description], [Size], [Condition], [Quantity], [Price], [OldPrice], [AccountID], [CreatedAt], [DateExpiration], [UpdateAt], [UpdateBy], [IsDeleted], [Status], [Attachment], [TagIds]) VALUES (N'F000000001', N'Mini Sun Flower', N'FC00000001', N'Mini Sunflowers are a good option if you are looking for a different focal. They are ideal for bright floral arrangements. Mini Sunflowers are a good option if you are looking for a different focal. They are ideal for bright floral arrangements.', N'Bouquet', N'New', 100, 10, 10, N'AC00000003', CAST(N'2024-02-14' AS Date), N'1 month', CAST(N'2024-10-12 00:00:00.000' AS DateTime), N'empty', 0, 1, N'empty', N'FT00000003, FT00000002')
INSERT [dbo].[Flowers] ([FlowerID], [FlowerName], [CateID], [Description], [Size], [Condition], [Quantity], [Price], [OldPrice], [AccountID], [CreatedAt], [DateExpiration], [UpdateAt], [UpdateBy], [IsDeleted], [Status], [Attachment], [TagIds]) VALUES (N'F000000002', N'Pink Rose', N'FC00000002', N'The Pink Rose represents elegance and grace. It is a symbol of admiration and joy.', N'Bouquet', N'Fresh', 50, 15, 12, N'AC00000003', CAST(N'2024-03-01' AS Date), N'1 month', NULL, NULL, 0, 1, N'Empty', N'FT00000002')
INSERT [dbo].[Flowers] ([FlowerID], [FlowerName], [CateID], [Description], [Size], [Condition], [Quantity], [Price], [OldPrice], [AccountID], [CreatedAt], [DateExpiration], [UpdateAt], [UpdateBy], [IsDeleted], [Status], [Attachment], [TagIds]) VALUES (N'F000000003', N'White Tulip', N'FC00000003', N'White Tulips symbolize new beginnings, purity, and innocence.', N'Bouquet', N'New', 70, 18, 16, N'AC00000003', CAST(N'2024-03-05' AS Date), N'1 month', NULL, NULL, 0, 1, N'Empty', N'FT00000001')
INSERT [dbo].[Flowers] ([FlowerID], [FlowerName], [CateID], [Description], [Size], [Condition], [Quantity], [Price], [OldPrice], [AccountID], [CreatedAt], [DateExpiration], [UpdateAt], [UpdateBy], [IsDeleted], [Status], [Attachment], [TagIds]) VALUES (N'F000000004', N'Lily of the Valley', N'FC00000004', N'Lily of the Valley is known for its sweet fragrance and delicate white bell-shaped flowers.', N'Bouquet', N'Fresh', 60, 25, 20, N'AC00000003', CAST(N'2024-03-10' AS Date), N'1 month', NULL, NULL, 0, 1, N'Empty', N'FT00000001, FT00000003')
INSERT [dbo].[Flowers] ([FlowerID], [FlowerName], [CateID], [Description], [Size], [Condition], [Quantity], [Price], [OldPrice], [AccountID], [CreatedAt], [DateExpiration], [UpdateAt], [UpdateBy], [IsDeleted], [Status], [Attachment], [TagIds]) VALUES (N'F000000005', N'Daisy Dream', N'FC00000005', N'A bouquet of fresh daisies symbolizing purity and innocence.', N'Bouquet', N'New', 80, 12, 10, N'AC00000003', CAST(N'2024-03-15' AS Date), N'1 month', NULL, NULL, 0, 1, N'Empty', N'FT00000003')
INSERT [dbo].[Flowers] ([FlowerID], [FlowerName], [CateID], [Description], [Size], [Condition], [Quantity], [Price], [OldPrice], [AccountID], [CreatedAt], [DateExpiration], [UpdateAt], [UpdateBy], [IsDeleted], [Status], [Attachment], [TagIds]) VALUES (N'F000000006', N'Orchid Elegance', N'FC00000006', N'Elegant Orchids represent strength, luxury, and beauty.', N'Single Stem', N'New', 40, 30, 25, N'AC00000004', CAST(N'2024-04-01' AS Date), N'2 weeks', NULL, NULL, 0, 1, N'Empty', N'FT00000003')
INSERT [dbo].[Flowers] ([FlowerID], [FlowerName], [CateID], [Description], [Size], [Condition], [Quantity], [Price], [OldPrice], [AccountID], [CreatedAt], [DateExpiration], [UpdateAt], [UpdateBy], [IsDeleted], [Status], [Attachment], [TagIds]) VALUES (N'F000000007', N'Chrysanthemum Bouquet', N'FC00000007', N'A vibrant bouquet of Chrysanthemums symbolizing happiness and longevity.', N'Bouquet', N'Fresh', 90, 20, 18, N'AC00000004', CAST(N'2024-04-05' AS Date), N'1 month', NULL, NULL, 0, 1, N'Empty', N'FT00000003')
INSERT [dbo].[Flowers] ([FlowerID], [FlowerName], [CateID], [Description], [Size], [Condition], [Quantity], [Price], [OldPrice], [AccountID], [CreatedAt], [DateExpiration], [UpdateAt], [UpdateBy], [IsDeleted], [Status], [Attachment], [TagIds]) VALUES (N'F000000008', N'Daffodil Sunshine', N'FC00000008', N'Bright yellow Daffodils symbolize renewal and hope.', N'Bouquet', N'New', 70, 15, 12, N'AC00000004', CAST(N'2024-04-10' AS Date), N'1 month', NULL, NULL, 0, 0, N'Empty', N'FT00000003')
INSERT [dbo].[Flowers] ([FlowerID], [FlowerName], [CateID], [Description], [Size], [Condition], [Quantity], [Price], [OldPrice], [AccountID], [CreatedAt], [DateExpiration], [UpdateAt], [UpdateBy], [IsDeleted], [Status], [Attachment], [TagIds]) VALUES (N'F000000009', N'Peony Romance', N'FC00000009', N'Peonies symbolize romance and prosperity with their lush full blooms.', N'Bouquet', N'New', 50, 28, 24, N'AC00000004', CAST(N'2024-04-12' AS Date), N'1 month', NULL, NULL, 0, 0, N'Empty', N'FT00000002')
INSERT [dbo].[Flowers] ([FlowerID], [FlowerName], [CateID], [Description], [Size], [Condition], [Quantity], [Price], [OldPrice], [AccountID], [CreatedAt], [DateExpiration], [UpdateAt], [UpdateBy], [IsDeleted], [Status], [Attachment], [TagIds]) VALUES (N'F000000010', N'Lavender Calm', N'FC00000010', N'Lavender flowers are known for their calming fragrance and symbolize tranquility.', N'Bundle', N'Fresh', 100, 20, 18, N'AC00000005', CAST(N'2024-05-01' AS Date), N'2 weeks', NULL, NULL, 0, 1, N'Empty', N'FT00000003')
INSERT [dbo].[Flowers] ([FlowerID], [FlowerName], [CateID], [Description], [Size], [Condition], [Quantity], [Price], [OldPrice], [AccountID], [CreatedAt], [DateExpiration], [UpdateAt], [UpdateBy], [IsDeleted], [Status], [Attachment], [TagIds]) VALUES (N'F000000011', N'Jasmine Delight', N'FC00000011', N'Jasmine flowers are sweetly fragrant and symbolize love and beauty.', N'Bouquet', N'New', 90, 22, 20, N'AC00000005', CAST(N'2024-05-05' AS Date), N'1 month', NULL, NULL, 0, 1, N'Empty', N'FT00000001, FT00000002, FT00000003')
INSERT [dbo].[Flowers] ([FlowerID], [FlowerName], [CateID], [Description], [Size], [Condition], [Quantity], [Price], [OldPrice], [AccountID], [CreatedAt], [DateExpiration], [UpdateAt], [UpdateBy], [IsDeleted], [Status], [Attachment], [TagIds]) VALUES (N'F000000012', N'Mixed Flower Surprise', N'FC00000002', N'A delightful mix of roses and other fresh flowers.', N'Bouquet', N'Fresh', 80, 25, 22, N'AC00000005', CAST(N'2024-05-10' AS Date), N'1 month', NULL, NULL, 0, 1, N'Empty', N'FT00000001')
INSERT [dbo].[Flowers] ([FlowerID], [FlowerName], [CateID], [Description], [Size], [Condition], [Quantity], [Price], [OldPrice], [AccountID], [CreatedAt], [DateExpiration], [UpdateAt], [UpdateBy], [IsDeleted], [Status], [Attachment], [TagIds]) VALUES (N'F000000013', N'Sunflower Joy', N'FC00000001', N'Bright sunflowers that radiate joy and energy.', N'Bouquet', N'New', 120, 18, 16, N'AC00000005', CAST(N'2024-05-15' AS Date), N'1 month', NULL, NULL, 0, 1, N'Empty', N'FT00000001')
INSERT [dbo].[Flowers] ([FlowerID], [FlowerName], [CateID], [Description], [Size], [Condition], [Quantity], [Price], [OldPrice], [AccountID], [CreatedAt], [DateExpiration], [UpdateAt], [UpdateBy], [IsDeleted], [Status], [Attachment], [TagIds]) VALUES (N'F000000014', N'Red Rose Passion', N'FC00000002', N'Red Roses symbolize deep love and passion.', N'Bouquet', N'New', 50, 20, 18, N'AC00000006', CAST(N'2024-06-01' AS Date), N'1 month', NULL, NULL, 0, 1, N'Empty', N'FT00000003')
INSERT [dbo].[Flowers] ([FlowerID], [FlowerName], [CateID], [Description], [Size], [Condition], [Quantity], [Price], [OldPrice], [AccountID], [CreatedAt], [DateExpiration], [UpdateAt], [UpdateBy], [IsDeleted], [Status], [Attachment], [TagIds]) VALUES (N'F000000015', N'Pink Lily Grace', N'FC00000004', N'Graceful Pink Lilies, perfect for any occasion.', N'Bouquet', N'Fresh', 60, 25, 22, N'AC00000006', CAST(N'2024-06-05' AS Date), N'1 month', NULL, NULL, 0, 1, N'Empty', N'FT00000002')
INSERT [dbo].[Flowers] ([FlowerID], [FlowerName], [CateID], [Description], [Size], [Condition], [Quantity], [Price], [OldPrice], [AccountID], [CreatedAt], [DateExpiration], [UpdateAt], [UpdateBy], [IsDeleted], [Status], [Attachment], [TagIds]) VALUES (N'F000000016', N'Tulip Wonder', N'FC00000003', N'A vibrant mix of tulips symbolizing love and appreciation.', N'Bouquet', N'New', 70, 28, 25, N'AC00000006', CAST(N'2024-06-10' AS Date), N'1 month', NULL, NULL, 0, 1, N'Empty', N'FT00000001')
INSERT [dbo].[Flowers] ([FlowerID], [FlowerName], [CateID], [Description], [Size], [Condition], [Quantity], [Price], [OldPrice], [AccountID], [CreatedAt], [DateExpiration], [UpdateAt], [UpdateBy], [IsDeleted], [Status], [Attachment], [TagIds]) VALUES (N'F000000017', N'Lavender Fields', N'FC00000010', N'A calming bouquet of Lavender symbolizing peace.', N'Bundle', N'Fresh', 100, 22, 20, N'AC00000006', CAST(N'2024-06-15' AS Date), N'2 weeks', NULL, NULL, 0, 1, N'Empty', N'FT00000001')
INSERT [dbo].[Flowers] ([FlowerID], [FlowerName], [CateID], [Description], [Size], [Condition], [Quantity], [Price], [OldPrice], [AccountID], [CreatedAt], [DateExpiration], [UpdateAt], [UpdateBy], [IsDeleted], [Status], [Attachment], [TagIds]) VALUES (N'F000000018', N'White Orchid', N'FC00000006', N'Elegant white Orchids symbolizing purity and luxury.', N'Single Stem', N'New', 30, 35, 30, N'AC00000007', CAST(N'2024-07-01' AS Date), N'2 weeks', NULL, NULL, 0, 1, N'Empty', N'FT00000003')

INSERT [dbo].[Flowers] ([FlowerID], [FlowerName], [CateID], [Description], [Size], [Condition], [Quantity], [Price], [OldPrice], [AccountID], [CreatedAt], [DateExpiration], [UpdateAt], [UpdateBy], [IsDeleted], [Status], [Attachment], [TagIds]) 
VALUES 
(N'F000000019', N'Floraly', N'FC00000001', N'Floraly is a charming bouquet that brings warmth and joy. Ideal for bright and cheerful arrangements.', N'Bouquet', N'New', 50, 20, 25, N'AC00000003', CAST(N'2024-02-14' AS Date), N'1 month', CAST(N'2024-10-12 00:00:00.000' AS DateTime), N'empty', 0, 1, N'https://res.cloudinary.com/ds8cv8hcq/image/upload/v1731265957/espoir/bkxtbnl6adojxsnqnxwt.jpg', N'FT00000003, FT00000002'),

(N'F000000020', N'Luxe Hand Tied Bouquet', N'FC00000002', N'A luxurious hand-tied bouquet perfect for weddings and special occasions.', N'Bouquet', N'New', 30, 50, 60, N'AC00000005', CAST(N'2024-03-01' AS Date), N'2 months', CAST(N'2024-10-13 00:00:00.000' AS DateTime), N'empty', 0, 1, N'https://res.cloudinary.com/ds8cv8hcq/image/upload/v1731265994/espoir/fneanqjhhaaurrvhnfrg.jpg', N'FT00000004, FT00000003'),

(N'F000000021', N'MiLan', N'FC00000003', N'MiLan is a beautiful blend of elegance and simplicity, perfect for everyday appreciation.', N'Bouquet', N'New', 75, 35, 40, N'AC00000004', CAST(N'2024-04-05' AS Date), N'3 months', CAST(N'2024-10-14 00:00:00.000' AS DateTime), N'empty', 0, 1, N'https://res.cloudinary.com/ds8cv8hcq/image/upload/v1731266031/espoir/a7nz4simipmdnejvepdz.jpg', N'FT00000002, FT00000001'),

(N'F000000022', N'Noche_Estrellada', N'FC00000004', N'Noche Estrellada bouquet brings a touch of mystery and elegance, ideal for evening events.', N'Bouquet', N'New', 40, 45, 50, N'AC00000006', CAST(N'2024-05-12' AS Date), N'1 month', CAST(N'2024-10-15 00:00:00.000' AS DateTime), N'empty', 0, 1, N'https://res.cloudinary.com/ds8cv8hcq/image/upload/v1731266064/espoir/x1cbd2slerd2eqqh8e8y.jpg', N'FT00000005, FT00000004'),

(N'F000000023', N'Tiny', N'FC00000005', N'A small yet delightful bouquet that fits any space, spreading joy with simplicity.', N'Bouquet', N'New', 100, 10, 12, N'AC00000007', CAST(N'2024-06-18' AS Date), N'1 month', CAST(N'2024-10-16 00:00:00.000' AS DateTime), N'empty', 0, 1, N'https://res.cloudinary.com/ds8cv8hcq/image/upload/v1731266093/espoir/l8bzcor5puxrgyszgloi.jpg', N'FT00000001, FT00000006'),

(N'F000000024', N'Tulip Terasa', N'FC00000006', N'Tulip Terasa bouquet adds a vibrant touch with beautiful tulips, perfect for any celebration.', N'Bouquet', N'New', 60, 30, 35, N'AC00000020', CAST(N'2024-07-01' AS Date), N'2 months', CAST(N'2024-10-17 00:00:00.000' AS DateTime), N'empty', 0, 1, N'https://res.cloudinary.com/ds8cv8hcq/image/upload/v1731266114/espoir/kisx27z2bhsudzxualue.jpg', N'FT00000007, FT00000003'),

(N'F000000025', N'ромашек с эвкалиптом', N'FC00000007', N'A unique bouquet combining daisies and eucalyptus for a fresh and natural look.', N'Bouquet', N'New', 80, 20, 22, N'AC00000021', CAST(N'2024-08-01' AS Date), N'1 month', CAST(N'2024-10-18 00:00:00.000' AS DateTime), N'empty', 0, 1, N'https://res.cloudinary.com/ds8cv8hcq/image/upload/v1731266151/espoir/dwmuey7jc63cebio297f.jpg', N'FT00000005, FT00000007');

UPDATE Flowers
SET FlowerName =
CASE FlowerID
WHEN 'F000000001' THEN 'Coral Tulip'
WHEN 'F000000002' THEN 'Dendrobium Orchid'
WHEN 'F000000003' THEN 'Gerbera'
WHEN 'F000000004' THEN 'Gladiolus'
WHEN 'F000000005' THEN 'LiLy Wedding Bouquet'
WHEN 'F000000006' THEN 'Lotus'
WHEN 'F000000007' THEN 'Pink Chrysanthemums'
WHEN 'F000000008' THEN 'Pink Peony'
WHEN 'F000000009' THEN 'Pink Rose'
WHEN 'F000000010' THEN 'Purple Carnation'
WHEN 'F000000011' THEN 'Rose Basket - Grand Opening'
WHEN 'F000000012' THEN 'Rose Basket - Wedding Event'
WHEN 'F000000013' THEN 'Spring Flower Bouquet'
WHEN 'F000000014' THEN 'Sunflower Bouquet'
WHEN 'F000000015' THEN 'Tuberose Bouquet - Wedding'
WHEN 'F000000016' THEN 'Tulip'
WHEN 'F000000017' THEN 'White Gladiolus'
WHEN 'F000000018' THEN 'Hydrangea Bouquet'
ELSE FlowerName  -- Keep the original name if not in the list
END,
Description =
CASE FlowerID
WHEN 'F000000001' THEN 'A vibrant and colorful tulip, perfect for adding a touch of joy to any occasion.'
WHEN 'F000000002' THEN 'An exotic and elegant orchid, known for its beauty and long-lasting blooms.'
WHEN 'F000000003' THEN 'A cheerful and vibrant flower, symbolizing happiness and innocence.'
WHEN 'F000000004' THEN 'A tall and graceful flower, representing strength and integrity.'
WHEN 'F000000005' THEN 'A classic and elegant bouquet of lilies, perfect for a wedding celebration.'
WHEN 'F000000006' THEN 'A serene and beautiful flower, symbolizing purity and enlightenment.'
WHEN 'F000000007' THEN 'Delicate and charming chrysanthemums, perfect for expressing love and admiration.'
WHEN 'F000000008' THEN 'A romantic and lush peony, symbolizing prosperity and good fortune.'
WHEN 'F000000009' THEN 'A classic and elegant rose, symbolizing grace and admiration.'
WHEN 'F000000010' THEN 'A unique and vibrant carnation, symbolizing distinction and admiration.'
WHEN 'F000000011' THEN 'A beautiful basket of roses, perfect for celebrating a grand opening.'
WHEN 'F000000012' THEN 'A stunning basket of roses, ideal for a wedding celebration.'
WHEN 'F000000013' THEN 'A cheerful bouquet of spring flowers, perfect for brightening someone''s day.'
WHEN 'F000000014' THEN 'A vibrant bouquet of sunflowers, symbolizing joy and happiness.'
WHEN 'F000000015' THEN 'An elegant bouquet of tuberoses, perfect for a wedding celebration.'
WHEN 'F000000016' THEN 'A classic and elegant flower, symbolizing perfect love.'
WHEN 'F000000017' THEN 'A pure and graceful gladiolus, symbolizing innocence and purity.'
WHEN 'F000000018' THEN 'A beautiful bouquet of hydrangeas, symbolizing gratitude and heartfelt emotions.'

ELSE Description  -- Keep the original description if not in the list
END
WHERE FlowerID IN ('F000000001', 'F000000002', 'F000000003', 'F000000004', 'F000000005', 'F000000006', 'F000000007', 'F000000008', 'F000000009', 'F000000010', 'F000000011', 'F000000012', 'F000000013', 'F000000014', 'F000000015', 'F000000016', 'F000000017', 'F000000018');

UPDATE Flowers 
SET Attachment = 
  CASE FlowerID 
    WHEN 'F000000001' THEN 'https://res.cloudinary.com/ds8cv8hcq/image/upload/v1730485790/espoir/dqlrxdca24mnrq5h87k9.jpg'
    WHEN 'F000000002' THEN 'https://res.cloudinary.com/ds8cv8hcq/image/upload/v1730485833/espoir/sidlqcqhcztxf8hzleve.jpg'
    WHEN 'F000000003' THEN 'https://res.cloudinary.com/ds8cv8hcq/image/upload/v1730485863/espoir/a1y4eztl05aw7s0jdcn3.jpg'
    WHEN 'F000000004' THEN 'https://res.cloudinary.com/ds8cv8hcq/image/upload/v1730485893/espoir/lsf7hjqsyhrxl35kqoed.jpg'
    WHEN 'F000000005' THEN 'https://res.cloudinary.com/ds8cv8hcq/image/upload/v1730485914/espoir/ty8qrtfyapefnwiraklc.jpg'
    WHEN 'F000000006' THEN 'https://res.cloudinary.com/ds8cv8hcq/image/upload/v1730485937/espoir/a6csnafkesn9whnoxun1.jpg'
    WHEN 'F000000007' THEN 'https://res.cloudinary.com/ds8cv8hcq/image/upload/v1730485975/espoir/j6bawjv2g1ypx6uoywud.jpg'
    WHEN 'F000000008' THEN 'https://res.cloudinary.com/ds8cv8hcq/image/upload/v1730486004/espoir/lioatdukutdacit5kpyd.jpg'
    WHEN 'F000000009' THEN 'https://res.cloudinary.com/ds8cv8hcq/image/upload/v1730486042/espoir/ws8xin20jpb8wfnew1zd.jpg'
    WHEN 'F000000010' THEN 'https://res.cloudinary.com/ds8cv8hcq/image/upload/v1730486114/espoir/ojhdq9miywdszphlwhxh.jpg'
    WHEN 'F000000011' THEN 'https://res.cloudinary.com/ds8cv8hcq/image/upload/v1730486158/espoir/rrdflnghtaneqvinlqtr.jpg'
    WHEN 'F000000012' THEN 'https://res.cloudinary.com/ds8cv8hcq/image/upload/v1730486192/espoir/cur2fkcygaoksefels4i.jpg'
    WHEN 'F000000013' THEN 'https://res.cloudinary.com/ds8cv8hcq/image/upload/v1730486216/espoir/v989wjvxhrzqiplmplg3.jpg'
    WHEN 'F000000014' THEN 'https://res.cloudinary.com/ds8cv8hcq/image/upload/v1730486243/espoir/dc64vekswyd9pt3y4fhy.jpg'
    WHEN 'F000000015' THEN 'https://res.cloudinary.com/ds8cv8hcq/image/upload/v1730486294/espoir/emjyssmgp3vmiekwr6ap.jpg'
    WHEN 'F000000016' THEN 'https://res.cloudinary.com/ds8cv8hcq/image/upload/v1730486330/espoir/ubxkwuwbosgkhzze8cxp.jpg'
    WHEN 'F000000017' THEN 'https://res.cloudinary.com/ds8cv8hcq/image/upload/v1730486352/espoir/g74mfzxvltbbz1gzqi8q.jpg'
    WHEN 'F000000018' THEN 'https://res.cloudinary.com/ds8cv8hcq/image/upload/v1730486371/espoir/tbqfmucicu1xpj0orcar.jpg'
    ELSE Attachment  -- Keep the original attachment if not in the list
  END
WHERE FlowerID IN ('F000000001', 'F000000002', 'F000000003', 'F000000004', 'F000000005', 'F000000006', 'F000000007', 'F000000008', 'F000000009', 'F000000010', 'F000000011', 'F000000012', 'F000000013', 'F000000014', 'F000000015', 'F000000016', 'F000000017', 'F000000018');

UPDATE Flowers
SET Price = OldPrice, 
    OldPrice = Price
WHERE Price > OldPrice;


INSERT [dbo].[Users] ([UserID], [AccountID], [CardName], [CardNumber], [CardProviderName], [TaxNumber], [SellerAvatar], [SellerAddress], [ShopName]) 
VALUES (N'US00000002', N'AC00000004', N'DANG PHUONG THAO', N'84019283746719283', N'Vietcombank', N'9382938472', N'https://res.cloudinary.com/ds8cv8hcq/image/upload/v1731263555/espoir/o09stfhy3rf8k2easg2r.jpg', N'ND', N'Bloom');

INSERT [dbo].[Users] ([UserID], [AccountID], [CardName], [CardNumber], [CardProviderName], [TaxNumber], [SellerAvatar], [SellerAddress], [ShopName]) 
VALUES (N'US00000003', N'AC00000005', N'TRAN HOANG PHU', N'72938475628384761', N'VietinBank', N'8263948573', N'https://res.cloudinary.com/ds8cv8hcq/image/upload/v1731263597/espoir/ushloffwymgdn7tjp03k.jpg', N'BD', N'Blooma');

INSERT [dbo].[Users] ([UserID], [AccountID], [CardName], [CardNumber], [CardProviderName], [TaxNumber], [SellerAvatar], [SellerAddress], [ShopName]) 
VALUES (N'US00000004', N'AC00000006', N'TRAN QUOC TUAN', N'61728374659184736', N'BIDV', N'3847562918', N'https://res.cloudinary.com/ds8cv8hcq/image/upload/v1731263652/espoir/apuo6too3psh1whl6mep.jpg', N'HCM', N'Blowsy');

INSERT [dbo].[Users] ([UserID], [AccountID], [CardName], [CardNumber], [CardProviderName], [TaxNumber], [SellerAvatar], [SellerAddress], [ShopName]) 
VALUES (N'US00000005', N'AC00000007', N'TRUONG YEN NHI', N'93746281736482917', N'Sacombank', N'4928374651', N'https://res.cloudinary.com/ds8cv8hcq/image/upload/v1731263704/espoir/xw8wnioxhyw2m6sks8pw.jpg', N'PY', N'Fleurs');

INSERT [dbo].[Users] ([UserID], [AccountID], [CardName], [CardNumber], [CardProviderName], [TaxNumber], [SellerAvatar], [SellerAddress], [ShopName]) 
VALUES (N'US00000006', N'AC00000011', N'TRAN QUOC', N'29384756192384765', N'VIB', N'5647382910', N'https://res.cloudinary.com/ds8cv8hcq/image/upload/v1731263748/espoir/pso3homddlju9iywwa3w.jpg', N'PT', N'Flora');

INSERT [dbo].[Users] ([UserID], [AccountID], [CardName], [CardNumber], [CardProviderName], [TaxNumber], [SellerAvatar], [SellerAddress], [ShopName]) 
VALUES (N'US00000007', N'AC00000012', N'QUOC TUAN', N'84756109283746529', N'ACB', N'7382914563', N'https://res.cloudinary.com/ds8cv8hcq/image/upload/v1731263835/espoir/lx5xazijoytceuzlmo6r.jpg', N'NH', N'Orlova Florist');

INSERT [dbo].[Users] ([UserID], [AccountID], [CardName], [CardNumber], [CardProviderName], [TaxNumber], [SellerAvatar], [SellerAddress], [ShopName]) 
VALUES (N'US00000008', N'AC00000013', N'TRUONG TAN SANG', N'56473819284756291', N'Techcombank', N'1029384756', N'https://res.cloudinary.com/ds8cv8hcq/image/upload/v1731263868/espoir/rfskte5mcl7laccs05tr.jpg', N'TPHCM', N'Peony');

INSERT [dbo].[Users] ([UserID], [AccountID], [CardName], [CardNumber], [CardProviderName], [TaxNumber], [SellerAvatar], [SellerAddress], [ShopName]) 
VALUES (N'US00000009', N'AC00000020', N'NYN ANH', N'91827364501928374', N'BIDV', N'5647382910', N'https://res.cloudinary.com/ds8cv8hcq/image/upload/v1731263935/espoir/tbiuz6snwdblil9dzhgg.jpg', N'Q9', N'Rose Luxury');

INSERT [dbo].[Users] ([UserID], [AccountID], [CardName], [CardNumber], [CardProviderName], [TaxNumber], [SellerAvatar], [SellerAddress], [ShopName]) 
VALUES (N'US00000010', N'AC00000021', N'TRAN BAO', N'19283746501928374', N'VietinBank', N'8473629102', N'https://res.cloudinary.com/ds8cv8hcq/image/upload/v1731263966/espoir/r7uqdgvy1vhzyvlzyxzg.jpg', N'Q9', N'Senka');

INSERT [dbo].[Users] ([UserID], [AccountID], [CardName], [CardNumber], [CardProviderName], [TaxNumber], [SellerAvatar], [SellerAddress], [ShopName]) 
VALUES (N'US00000011', N'AC00000022', N'QUOC TOAN', N'28374659018273645', N'ACB', N'9302847561', N'https://res.cloudinary.com/ds8cv8hcq/image/upload/v1731264534/espoir/qcjlevbv3ublnelvquhd.jpg', N'Q9', N'Rose Bud');


