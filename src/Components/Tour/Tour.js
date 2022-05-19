import React, { useState } from 'react'
import './Tour.css'

const Tour = ({ tour, removeTour }) => {
  const [showAll, setShowAll] = useState(false)
  return (
    <article className='tour'>
      <div>
        <img className='image--style' src={tour.image} alt={tour.name} />
      </div>
      <div className='tour__details'>
        <header className='heading'>
          <h4>{tour.name}</h4>
          <span className='price'>${tour.price}</span>
        </header>

        <p className='tour__info'>
          {showAll ? tour.info : tour.info.substring(0, 200) + '...'}
          <button className='btn' onClick={() => setShowAll(!showAll)}>
            {showAll ? 'Show Less' : 'Read More'}
          </button>
        </p>
        <button className='notInterested' onClick={removeTour}>
          Not Interested
        </button>
      </div>
    </article>
  )
}
export default Tour
