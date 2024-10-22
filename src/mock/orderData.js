import flowerImage1 from '../assets/images/1.jpg'
import flowerImage2 from '../assets/images/10.jpg'
import flowerImage3 from '../assets/images/3.jpg'
import flowerImage4 from '../assets/images/4.jpg'
import flowerImage5 from '../assets/images/5.jpg'
import flowerImage6 from '../assets/images/6.jpg'
import flowerImage7 from '../assets/images/7.jpg'
import flowerImage8 from '../assets/images/8.jpg'
export const orderData = [
  {
    key: '1',
    orderID: '10001',
    createdDate: '2023-09-01',
    customerName: 'Ethan Jones',
    total: 150,
    profit: 15,
    status: 'Completed',
    products: [
      {
        productImage: flowerImage1,
        productID: 'P001',
        productName: 'Rose Bouquet',
        price: 50,
        quantity: 2,
        total: 100
      },
      {
        productImage: flowerImage2,
        productID: 'P002',
        productName: 'Tulip Arrangement',
        price: 25,
        quantity: 2,
        total: 50
      }
    ]
  },
  {
    key: '2',
    orderID: '10002',
    createdDate: '2023-09-02',
    customerName: 'Liam Smith',
    total: 200,
    profit: 20,
    status: 'Pending',
    products: [
      {
        productImage: flowerImage2,
        productID: 'P003',
        productName: 'Sunflower Basket',
        price: 100,
        quantity: 2,
        total: 200
      }
    ]
  },
  {
    key: '3',
    orderID: '10003',
    createdDate: '2023-09-03',
    customerName: 'Olivia Williams',
    total: 75,
    profit: 7.5,
    status: 'Cancelled',
    products: [
      {
        productImage: flowerImage1,
        productID: 'P004',
        productName: 'Orchid Pot',
        price: 75,
        quantity: 1,
        total: 75
      }
    ]
  },
  {
    key: '4',
    orderID: '10004',
    createdDate: '2023-09-04',
    customerName: 'Noah Johnson',
    total: 300,
    profit: 30,
    status: 'Completed',
    products: [
      {
        productImage: flowerImage3,
        productID: 'P005',
        productName: 'Lily Bouquet',
        price: 150,
        quantity: 2,
        total: 300
      }
    ]
  },
  {
    key: '5',
    orderID: '10005',
    createdDate: '2023-09-05',
    customerName: 'Emma Brown',
    total: 120,
    profit: 12,
    status: 'Pending',
    products: [
      {
        productImage: flowerImage5,
        productID: 'P006',
        productName: 'Daisy Wreath',
        price: 60,
        quantity: 2,
        total: 120
      }
    ]
  },
  {
    key: '6',
    orderID: '10006',
    createdDate: '2023-09-06',
    customerName: 'William Davis',
    total: 250,
    profit: 25,
    status: 'Completed',
    products: [
      {
        productImage: flowerImage6,
        productID: 'P007',
        productName: 'Carnation Bouquet',
        price: 125,
        quantity: 2,
        total: 250
      }
    ]
  },
  {
    key: '7',
    orderID: '10007',
    createdDate: '2023-09-07',
    customerName: 'Ava Wilson',
    total: 90,
    profit: 9,
    status: 'Cancelled',
    products: [
      {
        productImage: flowerImage8,
        productID: 'P008',
        productName: 'Peony Vase',
        price: 90,
        quantity: 1,
        total: 90
      }
    ]
  },
  {
    key: '8',
    orderID: '10008',
    createdDate: '2023-09-08',
    customerName: 'James Martinez',
    total: 180,
    profit: 18,
    status: 'Completed',
    products: [
      {
        productImage: flowerImage2,
        productID: 'P009',
        productName: 'Hydrangea Bouquet',
        price: 60,
        quantity: 3,
        total: 180
      }
    ]
  },
  {
    key: '9',
    orderID: '10009',
    createdDate: '2023-09-09',
    customerName: 'Sophia Anderson',
    total: 110,
    profit: 11,
    status: 'Pending',
    products: [
      {
        productImage: flowerImage1,
        productID: 'P010',
        productName: 'Lavender Bunch',
        price: 55,
        quantity: 2,
        total: 110
      }
    ]
  },
  {
    key: '10',
    orderID: '10010',
    createdDate: '2023-09-10',
    customerName: 'Benjamin Thomas',
    total: 300,
    profit: 30,
    status: 'Completed',
    products: [
      {
        productImage: flowerImage5,
        productID: 'P011',
        productName: 'Mixed Flower Basket',
        price: 100,
        quantity: 3,
        total: 300
      }
    ]
  },
  {
    key: '11',
    orderID: '10011',
    createdDate: '2023-09-11',
    customerName: 'Isabella Jackson',
    total: 220,
    profit: 22,
    status: 'Cancelled',
    products: [
      {
        productImage: flowerImage4,
        productID: 'P012',
        productName: 'Gardenia Bouquet',
        price: 110,
        quantity: 2,
        total: 220
      }
    ]
  },
  {
    key: '12',
    orderID: '10012',
    createdDate: '2023-09-12',
    customerName: 'Lucas White',
    total: 160,
    profit: 16,
    status: 'Completed',
    products: [
      {
        productImage: flowerImage3,
        productID: 'P013',
        productName: 'Lilac Arrangement',
        price: 80,
        quantity: 2,
        total: 160
      }
    ]
  },
  {
    key: '13',
    orderID: '10013',
    createdDate: '2023-09-13',
    customerName: 'Mia Harris',
    total: 90,
    profit: 9,
    status: 'Pending',
    products: [
      {
        productImage: flowerImage4,
        productID: 'P014',
        productName: 'Daffodil Bunch',
        price: 45,
        quantity: 2,
        total: 90
      }
    ]
  },
  {
    key: '14',
    orderID: '10014',
    createdDate: '2023-09-14',
    customerName: 'Henry Clark',
    total: 270,
    profit: 27,
    status: 'Completed',
    products: [
      {
        productImage: flowerImage2,
        productID: 'P015',
        productName: 'Iris Bouquet',
        price: 90,
        quantity: 3,
        total: 270
      }
    ]
  },
  {
    key: '15',
    orderID: '10015',
    createdDate: '2023-09-15',
    customerName: 'Charlotte Rodriguez',
    total: 120,
    profit: 12,
    status: 'Cancelled',
    products: [
      {
        productImage: flowerImage3,
        productID: 'P016',
        productName: 'Magnolia Arrangement',
        price: 60,
        quantity: 2,
        total: 120
      }
    ]
  },
  {
    key: '16',
    orderID: '10016',
    createdDate: '2023-09-16',
    customerName: 'Daniel Lewis',
    total: 210,
    profit: 21,
    status: 'Completed',
    products: [
      {
        productImage: flowerImage2,
        productID: 'P017',
        productName: 'Anemone Bouquet',
        price: 70,
        quantity: 3,
        total: 210
      }
    ]
  },
  {
    key: '17',
    orderID: '10017',
    createdDate: '2023-09-17',
    customerName: 'Amelia Lee',
    total: 80,
    profit: 8,
    status: 'Pending',
    products: [
      {
        productImage: flowerImage8,
        productID: 'P018',
        productName: 'Freesia Bunch',
        price: 40,
        quantity: 2,
        total: 80
      }
    ]
  },
  {
    key: '18',
    orderID: '10018',
    createdDate: '2023-09-18',
    customerName: 'Matthew Walker',
    total: 190,
    profit: 19,
    status: 'Completed',
    products: [
      {
        productImage: flowerImage7,
        productID: 'P019',
        productName: 'Chrysanthemum Bouquet',
        price: 95,
        quantity: 2,
        total: 190
      }
    ]
  },
  {
    key: '19',
    orderID: '10019',
    createdDate: '2023-09-19',
    customerName: 'Harper Hall',
    total: 210,
    profit: 21,
    status: 'Cancelled',
    products: [
      {
        productImage: flowerImage6,
        productID: 'P020',
        productName: 'Gerbera Daisies',
        price: 70,
        quantity: 3,
        total: 210
      }
    ]
  },
  {
    key: '20',
    orderID: '10020',
    createdDate: '2023-09-20',
    customerName: 'Alexander Allen',
    total: 300,
    profit: 30,
    status: 'Completed',
    products: [
      {
        productImage: flowerImage6,
        productID: 'P001',
        productName: 'Rose Bouquet',
        price: 50,
        quantity: 6,
        total: 300
      }
    ]
  }
]

export const statusOptions = [
  { value: 'Pending', label: 'Pending' },
  { value: 'Confirmed', label: 'Confirmed' },
  { value: 'Completed', label: 'Completed' },
  { value: 'Cancelled', label: 'Cancelled' }
]

export const statusColors = {
  Pending: 'blue',
  Confirmed: 'gold',
  Completed: 'green',
  Cancelled: 'red'
}
