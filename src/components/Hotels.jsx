import React, { useState } from 'react';
import EditHotels from './EditHotel';
import Modal from './Modal';
import { useSelector, useDispatch } from 'react-redux';
import { removeHotel } from '../features/hotel/hotelSlice';
import StarRating from './StarRating';
import { FaEdit, FaTrash } from 'react-icons/fa';

const Hotels = () => {
  const dispatch = useDispatch();
  const unsortedHotels = useSelector((state) => state.hotels);
  const hotels = [...unsortedHotels].reverse(); 
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedHotelId, setSelectedHotelId] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('');

  const handleEditClick = (id) => {
    setSelectedHotelId(id);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedHotelId(null);
    setModalOpen(false);
  };

  const handleFilterChange = (e) => {
    const category = e.target.value;
    setSelectedCategory(category);
  };

  const filteredHotels = selectedCategory
    ? hotels.filter((hotel) => hotel.category.toString() === selectedCategory)
    : hotels;

  return (
    <div className=''>
      <div className='p-20 '>
        {/* Filter by category dropdown */}
        <select
          onChange={handleFilterChange}
          className='p-3 w-[200px] rounded-lg border-2 border-[#370757]'
        >
          <option value="">All Categories</option>
          <option value="1">1 Star</option>
          <option value="2">2 Stars</option>
          <option value="3">3 Stars</option>
          <option value="4">4 Stars</option>
          <option value="5">5 Stars</option>
        </select>
        <div className="w-full overflow-x-auto" >
          <table className='w-full mt-4 border text-left  '>
            <thead className='bg-[#370757] text-white '>
              <tr className='h-16'>
                <th className='px-5 '>Name</th>
                <th className='px-5'>Address</th>
                <th className='px-5'>Country</th>
                <th className='px-5'>Category</th>
                <th className='px-5'>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredHotels.map((hotel) => (
                <tr className='h-16' key={hotel.id}>
                  <td className='px-5 whitespace-nowrap'>{hotel.name}</td>
                  <td className='px-5 whitespace-nowrap'>{hotel.address}</td>
                  <td className='px-5 whitespace-nowrap'>{hotel.country}</td>
                  <td className='px-5 whitespace-nowrap'>
                    <StarRating value={hotel.category} disableHover />
                  </td>
                  <td className='px-5 whitespace-nowrap space-x-5 text-2xl'>
                    <button
                      type='submit'
                      onClick={() => handleEditClick(hotel.id)}
                      className='text-green-500'
                    >
                      <FaEdit />
                    </button>
                    <button
                      type='submit'
                      onClick={() => {
                        dispatch(removeHotel(hotel.id));
                      }}
                      className='text-red-500'
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
          <EditHotels hotelId={selectedHotelId} />
        </Modal>
      </div>
    </div>
  );
};

export default Hotels;
