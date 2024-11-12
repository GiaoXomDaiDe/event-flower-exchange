export const categories = [
  {
    FcateName: 'Wedding Flowers',
    FcateDesc: 'Flowers primarily used in wedding events.',
    FparentCateId: null // Đây là category gốc
  },
  {
    FcateName: 'Birthday Flowers',
    FcateDesc: 'Flowers for birthday celebrations.',
    FparentCateId: null // Đây là category gốc
  },
  {
    FcateName: 'Bridal Bouquets',
    FcateDesc: 'Bouquets specifically designed for brides.',
    FparentCateId: 'Wedding Flowers' // Category con của Wedding Flowers
  },
  {
    FcateName: 'Corsages',
    FcateDesc: 'Small flowers worn on the wrist or pinned to clothing.',
    FparentCateId: 'Wedding Flowers' // Category con của Wedding Flowers
  },
  {
    FcateName: 'Roses',
    FcateDesc: 'Various types of roses for decoration.',
    FparentCateId: 'Birthday Flowers' // Category con của Birthday Flowers
  },
  {
    FcateName: 'Tulips',
    FcateDesc: 'Colorful tulips often used in spring birthday events.',
    FparentCateId: 'Birthday Flowers' // Category con của Birthday Flowers
  }
]
