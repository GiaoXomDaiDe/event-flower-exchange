import React from "react";
import "./index.scss";
import { useNavigate } from "react-router-dom";

function EventCate() {
  const navigate = useNavigate();
  const eventList = [
    {
      id: 1,
      name: 'Wedding',
      img: 'https://png.pngtree.com/png-clipart/20230502/original/pngtree-wedding-line-icon-png-image_9133732.png',
      value: 'Wedding'
    },
    {
      id: 2,
      name: 'Funeral',
      img: 'https://cdn4.iconfinder.com/data/icons/funeral-1/406/wreath_funeral_flower_ceremony_bouquet_-512.png',
      value: 'Funeral'
    },
    {
      id: 3,
      name: 'Opening',
      img: 'https://cdn1.iconfinder.com/data/icons/event-management-5/73/9-512.png',
      value: 'Opening'
    },
    // {
    //   id: 4,
    //   name: "All Flower",
    //   img: "https://png.pngtree.com/png-clipart/20230502/original/pngtree-wedding-line-icon-png-image_9133732.png",
    //   value: "Others",
    // },
    {
      id: 5,
      name: 'Fresh',
      img: 'https://static.thenounproject.com/png/3651859-200.png',
      value: 'Fresh'
    },
    {
      id: 6,
      name: 'Used',
      img: 'https://cdn-icons-png.flaticon.com/512/10203/10203841.png',
      value: 'Used'
    },
    {
      id: 7,
      name: 'Artificial',
      img: 'https://cdn3.iconfinder.com/data/icons/home-decor-3/512/artificial-flower-furniture-decor-interior-512.png',
      value: 'Artificial'
    }
  ]
  return (
    <div className="event-cate">
      <div className="heading">
        <h2>Events</h2>
      </div>

      <div className="event-list">
        {eventList.map((event) => {
          return (
            <button
              onClick={() => {
                navigate(`/search`, { state: { eventValue: event.value } });
              }}
              key={event.id}
              className="event-card"
            >
              <img src={event.img} alt="" />
              <p>{event.name}</p>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default EventCate;
