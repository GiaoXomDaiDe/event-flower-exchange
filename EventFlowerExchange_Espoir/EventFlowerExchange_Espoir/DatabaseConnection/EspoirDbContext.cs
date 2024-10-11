using System;
using System.Collections.Generic;
using EventFlowerExchange_Espoir.Models;
using EventFlowerExchange_Espoir.Repositories.Configuration;
using Microsoft.EntityFrameworkCore;

namespace EventFlowerExchange_Espoir.DatabaseConnection;

public partial class EspoirDbContext : DbContext
{
    public EspoirDbContext()
    {
    }

    public EspoirDbContext(DbContextOptions<EspoirDbContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Account> Accounts { get; set; }

    public virtual DbSet<CardProvider> CardProviders { get; set; }

    public virtual DbSet<Event> Events { get; set; }

    public virtual DbSet<EventCate> EventCates { get; set; }

    public virtual DbSet<Feedback> Feedbacks { get; set; }

    public virtual DbSet<Flower> Flowers { get; set; }

    public virtual DbSet<FlowerCate> FlowerCates { get; set; }

    public virtual DbSet<FlowerTag> FlowerTags { get; set; }

    public virtual DbSet<Notification> Notifications { get; set; }

    public virtual DbSet<NotificationType> NotificationTypes { get; set; }

    public virtual DbSet<Order> Orders { get; set; }

    public virtual DbSet<OrderDetail> OrderDetails { get; set; }

    public virtual DbSet<PayoutHistory> PayoutHistories { get; set; }

    public virtual DbSet<PostDetail> PostDetails { get; set; }

    public virtual DbSet<Report> Reports { get; set; }

    public virtual DbSet<SellerPost> SellerPosts { get; set; }

    public virtual DbSet<SellerWallet> SellerWallets { get; set; }

    public virtual DbSet<Transaction> Transactions { get; set; }

    public virtual DbSet<User> Users { get; set; }

    public virtual DbSet<Wishlist> Wishlists { get; set; }
    private string GetConnectionString()
    {
        IConfiguration configuration = new ConfigurationBuilder()
               .SetBasePath(Directory.GetCurrentDirectory())
              .AddJsonFile("appsettings.json", true, true).Build();

        return configuration["ConnectionStrings:DefaultConnection"];
    }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        optionsBuilder.UseSqlServer(GetConnectionString());
    }


    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.ApplyConfiguration(new AccountConfiguration());
        modelBuilder.ApplyConfiguration(new CardProviderConfiguration());
        modelBuilder.ApplyConfiguration(new FlowerConfiguration());
        modelBuilder.ApplyConfiguration(new FlowerCategoriesConfiguration());
        modelBuilder.ApplyConfiguration(new UsersConfiguration());

        modelBuilder.Entity<Account>(entity =>
        {
            entity.HasKey(e => e.AccountId).HasName("PK__Account__349DA586A4DAAC89");

            entity.ToTable("Account");

            entity.Property(e => e.AccountId)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("AccountID");
            entity.Property(e => e.Address).HasMaxLength(255);
            entity.Property(e => e.Email)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.FullName).HasMaxLength(255);
            entity.Property(e => e.Password)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.PhoneNumber)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.Username)
                .HasMaxLength(255)
                .IsUnicode(false);
        });

        modelBuilder.Entity<CardProvider>(entity =>
        {
            entity.HasKey(e => e.CardProviderName).HasName("PK__CardProv__3B8DEBCC39ECA32E");

            entity.Property(e => e.CardProviderName)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.CpfullName)
                .HasMaxLength(255)
                .HasColumnName("CPFullName");
        });

        modelBuilder.Entity<Event>(entity =>
        {
            entity.HasKey(e => e.EventId).HasName("PK__Event__7944C8704F2A4B87");

            entity.ToTable("Event");

            entity.Property(e => e.EventId)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("EventID");
            entity.Property(e => e.CreateBy)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.EcateId)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("ECateID");
            entity.Property(e => e.EndTime).HasColumnType("datetime");
            entity.Property(e => e.EventDesc)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.EventName)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.StartTime).HasColumnType("datetime");
            entity.Property(e => e.UpdateBy)
                .HasMaxLength(255)
                .IsUnicode(false);

            entity.HasOne(d => d.Ecate).WithMany(p => p.Events)
                .HasForeignKey(d => d.EcateId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_Event_ECate");
        });

        modelBuilder.Entity<EventCate>(entity =>
        {
            entity.HasKey(e => e.EcateId).HasName("PK__EventCat__64EE8301B1E91710");

            entity.ToTable("EventCate");

            entity.Property(e => e.EcateId)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("ECateID");
            entity.Property(e => e.Edesc)
                .HasMaxLength(255)
                .HasColumnName("EDesc");
            entity.Property(e => e.Ename)
                .HasMaxLength(255)
                .HasColumnName("EName");
        });

        modelBuilder.Entity<Feedback>(entity =>
        {
            entity.HasKey(e => e.FeedbackId).HasName("PK__Feedback__6A4BEDF6C7713F3E");

            entity.ToTable("Feedback");

            entity.Property(e => e.FeedbackId)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("FeedbackID");
            entity.Property(e => e.AccountId)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("AccountID");
            entity.Property(e => e.Attachment).HasMaxLength(255);
            entity.Property(e => e.Detail).HasMaxLength(255);
            entity.Property(e => e.FlowerId)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("FlowerID");

            entity.HasOne(d => d.Flower).WithMany(p => p.Feedbacks)
                .HasForeignKey(d => d.FlowerId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_Feedback_Flower");
        });

        modelBuilder.Entity<Flower>(entity =>
        {
            entity.HasKey(e => e.FlowerId).HasName("PK__Flowers__97C47C3901C1A129");

            entity.Property(e => e.FlowerId)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("FlowerID");
            entity.Property(e => e.AccountId)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("AccountID");
            entity.Property(e => e.Attachment).IsUnicode(false);
            entity.Property(e => e.CateId)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("CateID");
            entity.Property(e => e.Condition).HasMaxLength(255);
            entity.Property(e => e.DateExpiration).HasMaxLength(255);
            entity.Property(e => e.Description).HasMaxLength(255);
            entity.Property(e => e.FlowerName).HasMaxLength(255);
            entity.Property(e => e.Size).HasMaxLength(255);
            entity.Property(e => e.TagId)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("TagID");
            entity.Property(e => e.UpdateBy)
                .HasMaxLength(255)
                .IsUnicode(false);

            entity.HasOne(d => d.Account).WithMany(p => p.Flowers)
                .HasForeignKey(d => d.AccountId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_Flowers_Account");

            entity.HasOne(d => d.Cate).WithMany(p => p.Flowers)
                .HasForeignKey(d => d.CateId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_Flowers_Cate");

            entity.HasOne(d => d.Tag).WithMany(p => p.Flowers)
                .HasForeignKey(d => d.TagId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_Flowers_Tag");
        });

        modelBuilder.Entity<FlowerCate>(entity =>
        {
            entity.HasKey(e => e.FcateId).HasName("PK__FlowerCa__9CB52A23207E59B9");

            entity.ToTable("FlowerCate");

            entity.Property(e => e.FcateId)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("FCateID");
            entity.Property(e => e.FcateDesc)
                .HasMaxLength(255)
                .HasColumnName("FCateDesc");
            entity.Property(e => e.FcateName)
                .HasMaxLength(255)
                .HasColumnName("FCateName");
            entity.Property(e => e.FparentCateId)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("FParentCateID");
        });

        modelBuilder.Entity<FlowerTag>(entity =>
        {
            entity.HasKey(e => e.TagId).HasName("PK__FlowerTa__657CFA4C25F774B1");

            entity.ToTable("FlowerTag");

            entity.Property(e => e.TagId)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("TagID");
            entity.Property(e => e.TagName).HasMaxLength(255);
        });

        modelBuilder.Entity<Notification>(entity =>
        {
            entity.HasKey(e => e.NotifyId).HasName("PK__Notifica__AD54A2DC9648A748");

            entity.Property(e => e.NotifyId)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("NotifyID");
            entity.Property(e => e.AccountId)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("AccountID");
            entity.Property(e => e.NotiBy)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.NotiContent).HasMaxLength(255);
            entity.Property(e => e.NotiTitle).HasMaxLength(255);
            entity.Property(e => e.NotifyType).HasMaxLength(255);

            entity.HasOne(d => d.NotifyTypeNavigation).WithMany(p => p.Notifications)
                .HasForeignKey(d => d.NotifyType)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_Notifications_Type");
        });

        modelBuilder.Entity<NotificationType>(entity =>
        {
            entity.HasKey(e => e.NotifyType).HasName("PK__Notifica__15D2A72BB930D686");

            entity.ToTable("NotificationType");

            entity.Property(e => e.NotifyType).HasMaxLength(255);
            entity.Property(e => e.NtypeDesc).HasColumnName("NTypeDesc");
        });

        modelBuilder.Entity<Order>(entity =>
        {
            entity.HasKey(e => e.OrderId).HasName("PK__Orders__C3905BAFDCD4601F");

            entity.Property(e => e.OrderId)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("OrderID");
            entity.Property(e => e.AccountId)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("AccountID");
            entity.Property(e => e.DeliveryUnit)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.Detail).HasMaxLength(255);

            entity.HasOne(d => d.Account).WithMany(p => p.Orders)
                .HasForeignKey(d => d.AccountId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_Orders_Account");
        });

        modelBuilder.Entity<OrderDetail>(entity =>
        {
            entity.HasKey(e => e.OrderDetailId).HasName("PK__OrderDet__D3B9D30C486AEBD5");

            entity.Property(e => e.OrderDetailId)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("OrderDetailID");
            entity.Property(e => e.AdminId)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("AdminID");
            entity.Property(e => e.FlowerId)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("FlowerID");
            entity.Property(e => e.OrderId)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("OrderID");
            entity.Property(e => e.OrderNumber)
                .HasMaxLength(255)
                .IsUnicode(false);

            entity.HasOne(d => d.Order).WithMany(p => p.OrderDetails)
                .HasForeignKey(d => d.OrderId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_OrderDetails_Order");
        });

        modelBuilder.Entity<PayoutHistory>(entity =>
        {
            entity.HasKey(e => e.PayoutId).HasName("PK__PayoutHi__35C3DFAE155177B1");

            entity.ToTable("PayoutHistory");

            entity.Property(e => e.PayoutId)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("PayoutID");
            entity.Property(e => e.UserId)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("UserID");

            entity.HasOne(d => d.User).WithMany(p => p.PayoutHistories)
                .HasForeignKey(d => d.UserId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_PayoutHistory_User");
        });

        modelBuilder.Entity<PostDetail>(entity =>
        {
            entity.HasKey(e => e.PdetailId).HasName("PK__PostDeta__61D4FFEBFE50ED0F");

            entity.ToTable("PostDetail");

            entity.Property(e => e.PdetailId)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("PDetailID");
            entity.Property(e => e.FlowerId)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("FlowerID");

            entity.HasOne(d => d.Flower).WithMany(p => p.PostDetails)
                .HasForeignKey(d => d.FlowerId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_PostDetail_Flower");
        });

        modelBuilder.Entity<Report>(entity =>
        {
            entity.HasKey(e => e.ReportId).HasName("PK__Report__D5BD48E5D0D0F92F");

            entity.ToTable("Report");

            entity.Property(e => e.ReportId)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("ReportID");
            entity.Property(e => e.Attachment)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.Content).HasMaxLength(255);
            entity.Property(e => e.CreateBy)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.FlowerId)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("FlowerID");
            entity.Property(e => e.Issue).HasMaxLength(255);

            entity.HasOne(d => d.Flower).WithMany(p => p.Reports)
                .HasForeignKey(d => d.FlowerId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_Report_Flower");
        });

        modelBuilder.Entity<SellerPost>(entity =>
        {
            entity.HasKey(e => e.PostId).HasName("PK__SellerPo__AA1260382B5E0A50");

            entity.ToTable("SellerPost");

            entity.Property(e => e.PostId)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("PostID");
            entity.Property(e => e.AccountId)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("AccountID");
            entity.Property(e => e.Attachment)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.Content).HasMaxLength(255);
            entity.Property(e => e.HadEvent).HasColumnName("hadEvent");
            entity.Property(e => e.PdetailId)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("PDetailID");
            entity.Property(e => e.Title).HasMaxLength(255);

            entity.HasOne(d => d.Pdetail).WithMany(p => p.SellerPosts)
                .HasForeignKey(d => d.PdetailId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_SellerPost_PostDetail");
        });

        modelBuilder.Entity<SellerWallet>(entity =>
        {
            entity.HasKey(e => e.WalletId).HasName("PK__SellerWa__84D4F92E09A9F44F");

            entity.ToTable("SellerWallet");

            entity.Property(e => e.WalletId)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("WalletID");
            entity.Property(e => e.AccountId)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("AccountID");

            entity.HasOne(d => d.Account).WithMany(p => p.SellerWallets)
                .HasForeignKey(d => d.AccountId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_SellerWallet_Account");
        });

        modelBuilder.Entity<Transaction>(entity =>
        {
            entity.HasKey(e => e.TransactionId).HasName("PK__Transact__55433A4B73CCE48A");

            entity.Property(e => e.TransactionId)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("TransactionID");
            entity.Property(e => e.AccountId)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("AccountID");
            entity.Property(e => e.Detail)
                .HasMaxLength(255)
                .IsUnicode(false);

            entity.HasOne(d => d.Account).WithMany(p => p.Transactions)
                .HasForeignKey(d => d.AccountId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_Transaction_Account");
        });

        modelBuilder.Entity<User>(entity =>
        {
            entity.HasKey(e => e.UserId).HasName("PK__Users__1788CCACC4A58B01");

            entity.Property(e => e.UserId)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("UserID");
            entity.Property(e => e.AccountId)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("AccountID");
            entity.Property(e => e.CardName)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.CardNumber).HasMaxLength(255);
            entity.Property(e => e.CardProviderName)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.SellerAddress)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.SellerAvatar)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.ShopName).HasMaxLength(250);
            entity.Property(e => e.TaxNumber)
                .HasMaxLength(255)
                .IsUnicode(false);

            entity.HasOne(d => d.Account).WithMany(p => p.Users)
                .HasForeignKey(d => d.AccountId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_Users_Account");

            entity.HasOne(d => d.CardProviderNameNavigation).WithMany(p => p.Users)
                .HasForeignKey(d => d.CardProviderName)
                .HasConstraintName("FK_Users_CardProviders");
        });

        modelBuilder.Entity<Wishlist>(entity =>
        {
            entity.HasKey(e => e.WishlistId).HasName("PK__Wishlist__233189CB00BCD3B5");

            entity.ToTable("Wishlist");

            entity.Property(e => e.WishlistId)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("WishlistID");
            entity.Property(e => e.AddBy)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.FlowerId)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("FlowerID");

            entity.HasOne(d => d.Flower).WithMany(p => p.Wishlists)
                .HasForeignKey(d => d.FlowerId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_Wishlist_Flower");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
