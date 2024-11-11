import eventImage1 from '../assets/images/e1.jpg'
import eventImage10 from '../assets/images/e10.jpg'
import eventImage2 from '../assets/images/e2.jpg'
import eventImage3 from '../assets/images/e3.jpg'
import eventImage4 from '../assets/images/e4.jpg'
import eventImage5 from '../assets/images/e5.jpg'
import eventImage6 from '../assets/images/e6.jpg'
import eventImage7 from '../assets/images/e7.jpg'
import eventImage8 from '../assets/images/e8.jpg'
import eventImage9 from '../assets/images/e9.jpg'

const images = [
  eventImage1,
  eventImage2,
  eventImage3,
  eventImage4,
  eventImage5,
  eventImage6,
  eventImage7,
  eventImage8,
  eventImage9,
  eventImage10
]

export const eventData = [
  {
    eventID: 'EV001',
    title: 'Wedding Flowers Sale',
    category: 'Wedding',
    description: 'Selling leftover flowers from the Johnson wedding.',
    address: '123 Event Venue, City A',
    startTime: '2024-10-20T09:00:00',
    endTime: '2024-10-20T18:00:00',
    imageUrl: images[Math.floor(Math.random() * images.length)]
  },
  {
    eventID: 'EV002',
    title: 'Corporate Conference Floral Sale',
    category: 'Corporate Event',
    description: "Reusing floral arrangements from XYZ Corp's annual conference.",
    address: '456 Conference Hall, City B',
    startTime: '2024-10-22T08:00:00',
    endTime: '2024-10-22T17:00:00',
    imageUrl: images[Math.floor(Math.random() * images.length)]
  },
  {
    eventID: 'EV003',
    title: 'Birthday Party Floral Auction',
    category: 'Private Party',
    description: "Selling flowers from Sarah's 30th birthday celebration.",
    address: '789 Party House, City C',
    startTime: '2024-10-25T14:00:00',
    endTime: '2024-10-25T20:00:00',
    imageUrl: images[Math.floor(Math.random() * images.length)]
  },
  {
    eventID: 'EV004',
    title: 'Charity Gala Floral Sale',
    category: 'Charity',
    description: 'Selling leftover flowers from the annual charity gala event.',
    address: '101 Charity Lane, City D',
    startTime: '2024-10-28T19:00:00',
    endTime: '2024-10-28T23:00:00',
    imageUrl: images[Math.floor(Math.random() * images.length)]
  },
  {
    eventID: 'EV005',
    title: 'New Year Celebration Floral Decorations',
    category: 'Holiday',
    description: 'Auctioning flowers from the New Year celebration event.',
    address: '202 Celebration Blvd, City E',
    startTime: '2024-12-31T20:00:00',
    endTime: '2025-01-01T02:00:00',
    imageUrl: images[Math.floor(Math.random() * images.length)]
  }
]
