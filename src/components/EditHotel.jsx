import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateHotel } from '../features/hotel/hotelSlice';

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

    // Ensure hotelToEdit and hotelToEdit.id are defined before dispatching
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
      <form action="" onSubmit={handleSubmit}>
            <input type="text"
            placeholder='Name of Hotel'
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            />
            <input type="text"
            placeholder='Address of Hotel'
            value={newAddress}
            onChange={(e) => setNewAddress(e.target.value)}
            />
            <select name="country" value={newCountry} id="" onChange={(e) => setNewCountry(e.target.value)}>
                <option value=''>Select Country</option>
                {countries.map((country, index) => (
                    <option value={country.country} key={index}>{country.country}</option>
                ))}
            </select>
            <select name="" value={newCategory} id=""  onChange={(e) => setNewCategory(e.target.value)}>
                <option value="">Select Category</option>
                <option value="1Star">1 Star</option>
                <option value="2Stars">2 Stars</option>
                <option value="3Stars">3 Stars</option>
            </select>

            <button type="submit">Edit Hotel</button>
        </form>

    </>
  );
};




export default EditHotels