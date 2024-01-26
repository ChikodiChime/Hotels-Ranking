import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateHotel } from '../features/hotel/hotelSlice';
import StarRating from './StarRating';

const EditHotels = ({ hotelId }) => {
  const dispatch = useDispatch();
  const hotels = useSelector((state) => state.hotels);
  const hotelToEdit = hotels.find((hotel) => hotel.id === hotelId);

  const [newName, setNewName] = useState('');
  const [newCountry, setNewCountry] = useState('');
  const [newAddress, setNewAddress] = useState('');
  const [newCategory, setNewCategory] = useState('');

  const [countries, setCountries] = useState([]);

  const Base_Url =
    'https://pkgstore.datahub.io/core/world-cities/world-cities_json/data/5b3dd46ad10990bca47b04b4739a02ba/world-cities_json.json';

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Submitting Edit - Values:', newName, newAddress, newCountry, newCategory);

    if (hotelToEdit && hotelToEdit.id) {
      dispatch(
        updateHotel({
          id: hotelToEdit.id,
          name: newName,
          address: newAddress,
          country: newCountry,
          category: newCategory,
        })
      );
    }
  };

  useEffect(() => {
    if (hotelToEdit) {
      setNewName(hotelToEdit.name || '');
      setNewAddress(hotelToEdit.address || '');
      setNewCountry(hotelToEdit.country || '');
      setNewCategory(hotelToEdit.category || '');
    }
  }, [hotelToEdit]);


  console.log('EditHotels - New Category:', newCategory); 

  useEffect(() => {
    const CountriesData = async () => {
      const res = await fetch(`${Base_Url}`);
      const data = await res.json();

      // To Extract unique country names using set
      const uniqueCountries = [...new Set(data.map((country) => country.country))];
      setCountries(uniqueCountries.map((country) => ({ country })));
    };
    CountriesData();
  }, []);

  return (
    <>
      <div className='className=" py-20"'>
        <form 
          action="" 
          onSubmit={handleSubmit}
          className="p-10  gap-5 flex flex-col items-center justify-center"
          >
            <p className="text-2xl text-[#370757] font-bold text-center">Edit Hotel</p>
            <div className="grid sm:grid-cols-2 gap-5">
              <input type="text"
              placeholder='Name of Hotel'
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              className="bg-slate-100 px-3 w-full py-6 active: outline-[#370757]"

              />
              <input type="text"
              placeholder='Address of Hotel'
              value={newAddress}
              onChange={(e) => setNewAddress(e.target.value)}
              className="bg-slate-100 px-3 w-full py-6 active: outline-[#370757]"

              />
              <select 
                name="country" 
                value={newCountry} id="" 
                onChange={(e) => setNewCountry(e.target.value)}
                className="bg-slate-100 px-3 w-full py-6 active: outline-[#370757]"
                
                >
                <option value=''>Select Country</option>
                {countries.map((country, index) => (
                    <option value={country.country} key={index}>{country.country}</option>
                ))}
            </select>
            <div className='bg-slate-100 px-3 w-full flex flex-col justify-center'>
                <label htmlFor="star-rating" className="text-[#370757]">
                    Hotel Rating:
                </label>
              
                <StarRating value={newCategory} onChange={(value) => setNewCategory(value)} />

            </div>
          </div>
          <button type="submit" className="bg-[#370757] text-white font-bold hover:bg-purple-800 py-6 px-20 mt-5">Edit Hotel</button>
          
        </form>

    </div>
      
    </>
  );
};




export default EditHotels