using System;
using System.Collections.Generic;

namespace EventFlowerExchange_Espoir.Models;

public partial class Account
{
    public string AccountId { get; set; } = null!;

    public string Username { get; set; } = null!;

    public string Password { get; set; } = null!;

    public string FullName { get; set; } = null!;

    public string Email { get; set; } = null!;

    public string Address { get; set; } = null!;

    public string PhoneNumber { get; set; } = null!;

    public DateOnly Birthday { get; set; }

    public int Gender { get; set; }

    public int Role { get; set; }

    public int Status { get; set; }

    public int IsEmailConfirm { get; set; }

    public int IsSeller { get; set; }

    public virtual ICollection<Flower> Flowers { get; set; } = new List<Flower>();

    public virtual ICollection<Order> Orders { get; set; } = new List<Order>();

    public virtual ICollection<SellerWallet> SellerWallets { get; set; } = new List<SellerWallet>();

    public virtual ICollection<Transaction> Transactions { get; set; } = new List<Transaction>();

    public virtual ICollection<User> Users { get; set; } = new List<User>();
}
