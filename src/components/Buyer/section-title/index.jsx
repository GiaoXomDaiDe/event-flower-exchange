import React from 'react'
import "./index.scss";

function SectionTitle({ title, children }) {
    //Props: giống 1 tham số
  return (
    <div className="section-title">
        <div className="heading">
            <h2>{title}</h2>
            <a href="#">Xem tất cả</a>
        </div>

        <div className='content'>{children}</div>
    </div>
  )
}

export default SectionTitle