import React from 'react'
import './index.scss'
import { useNavigate } from 'react-router-dom'

function EventCate() {
  const navigate = useNavigate()
  const eventList = [
    {
      id: 1,
      name: 'Wedding',
      img: 'https://png.pngtree.com/png-clipart/20230502/original/pngtree-wedding-line-icon-png-image_9133732.png',
      value: 'Bright colors'
    },
    {
      id: 2,
      name: 'Funeral',
      img: 'https://png.pngtree.com/png-clipart/20230502/original/pngtree-wedding-line-icon-png-image_9133732.png',
      value: 'Fragrant'
    },
    {
      id: 3,
      name: 'Opening',
      img: 'https://png.pngtree.com/png-clipart/20230502/original/pngtree-wedding-line-icon-png-image_9133732.png',
      value: 'Low Maintenance'
    },
    {
      id: 4,
      name: 'Gift',
      img: 'https://png.pngtree.com/png-clipart/20230502/original/pngtree-wedding-line-icon-png-image_9133732.png',
      value: ''
    },
    {
      id: 5,
      name: 'Seasonal',
      img: 'https://png.pngtree.com/png-clipart/20230502/original/pngtree-wedding-line-icon-png-image_9133732.png',
      value: ''
    }
  ]
  return (
    <div className='event-cate'>
      <div className='heading'>
        <h2>Events</h2>
      </div>

      <div className='event-list'>
        {eventList.map((event) => {
          return (
            <button
              onClick={() => {
                navigate(`/search`, { state: { eventValue: event.value } })
              }}
              key={event.id}
              className='event-card'
            >
              <img src={event.img} alt='' />
              <p>{event.name}</p>
            </button>
          )
        })}
      </div>
    </div>
  )
}

export default EventCate
