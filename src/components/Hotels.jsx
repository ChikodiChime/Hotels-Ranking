import React, { useState } from 'react'
import EditHotels from './EditHotel'
import Modal from './Modal'
import {useSelector, useDispatch} from 'react-redux'
import { removeHotel } from '../features/hotel/hotelSlice'


const Hotels = () => {
  const dispatch = useDispatch();
  const hotels = useSelector((state) => state.hotels)

  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedHotelId, setSelectedHotelId] = useState(null)
  const [selectedCategory, setSelectedCategory] = useState('');
  

    const handleEditClick = (id) => {
      setSelectedHotelId(id);
      setModalOpen(true)
    }
    const handleCloseModal = () => {
      setSelectedHotelId(null);
      setModalOpen(false)
    }

    const filteredHotels = selectedCategory
    
    ? hotels.filter((hotel) => {
      console.log('Hotel Category:', hotel.category.toLowerCase());
      console.log('Selected Category:', selectedCategory.toLowerCase());
      return hotel.category.toLowerCase() === selectedCategory.toLowerCase();
    })
  : hotels;
  return (
    <>
      <div>
        {/* Filter by category dropdown */}
        <select onChange={(e) => setSelectedCategory(e.target.value)}>
          <option value="">All Categories</option>
          <option value="1 Star">1 Star</option>
          <option value="2 Stars">2 Stars</option>
          <option value="3 Stars">3 Stars</option>
        </select>

        <ul>
        {filteredHotels.map((hotel) => (
           
              <li key={hotel.id} >
                <span>{hotel.name}  </span> <br />
                <span>{hotel.address}  </span><br />
                <span>{hotel.country}  </span>
                <span>{hotel.category}  </span>

                <button type='submit'
                onClick={() => handleEditClick(hotel.id)}
                >Edit</button>
                <button type='submit' onClick={() => {
                  dispatch(removeHotel(hotel.id))
                }}>Delete</button>
              </li>
            
            
          ))}
        </ul>

        <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
          <EditHotels hotelId = {selectedHotelId}/>
        </Modal>
      </div>
    </>
  )
}

export default Hotels