import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import StarRating from './StarRating'; 
import { addHotel} from '../features/hotel/hotelSlice';



const AddHotels = () => {
    const [inputName, setInputName] = useState('');
    const [inputCountry, setInputCountry] = useState('');
    const [inputAddress, setInputAddress] = useState('');
    const [inputCategory, setInputCategory] = useState('');

    const [countries, setCountries] = useState([]);
    const dispatch = useDispatch();

    const Base_Url =
        'https://pkgstore.datahub.io/core/world-cities/world-cities_json/data/5b3dd46ad10990bca47b04b4739a02ba/world-cities_json.json';

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Input values:', inputName, inputAddress, inputCountry, inputCategory);

    dispatch(
        addHotel({
            id: '',
            name: inputName,
            address: inputAddress,
            country: inputCountry,
            category: inputCategory,
        })
    );

    setInputName('');
    setInputCountry('');
    setInputAddress('');
    setInputCategory('');
    };

    useEffect(() => {
    const CountriesData = async () => {
        const res = await fetch(`${Base_Url}`);
        const data = await res.json();

        //To Extract unique country names using set
        const uniqueCountries = [...new Set(data.map((country) => country.country))];
        setCountries(uniqueCountries.map((country) => ({ country })));
    };
    CountriesData();
    }, []);

return (
    <>
        <div className=" px-10 sm:px-20 md:px-40 py-20 ">
            <form
            action=""
            onSubmit={handleSubmit}
            className="px-0 sm:p-10 shadow-none sm:shadow-lg gap-5 flex flex-col items-center justify-center"
            >
            <p className="text-2xl text-[#370757] font-bold text-center">Add Hotel</p>

            <div className="flex flex-col gap-5">
                <div className="flex flex-col sm:flex-row gap-5">
                    <input
                    type="text"
                    placeholder="Name of Hotel"
                    value={inputName}
                    onChange={(e) => setInputName(e.target.value)}
                    className="bg-slate-100 w-full px-3 py-6 active: outline-[#370757]"
                    required
                    />
                    <input
                    type="text"
                    placeholder="Address of Hotel"
                    value={inputAddress}
                    onChange={(e) => setInputAddress(e.target.value)}
                    className="bg-slate-100 w-full px-3 py-6 active: outline-[#370757]"
                    required
                    />
                </div>
                
                <div className="flex flex-col sm:flex-row gap-5">
                    <select
                    name="country"
                    value={inputCountry}
                    id=""
                    onChange={(e) => setInputCountry(e.target.value)}
                    className="bg-slate-100 w-full px-3 py-6 active: outline-[#370757]"
                    required
                    >
                    <option value="">Select Country</option>
                    {countries.map((country, index) => (
                        <option value={country.country} key={index}>
                        {country.country}
                        </option>
                    ))}
                    </select>
                    <div className='bg-slate-100 w-full px-3 py-4 flex flex-col justify-center'>
                        <label htmlFor="star-rating" className="text-[#370757]">
                            Hotel Rating:
                        </label>
                    
                        <StarRating value={inputCategory} onChange={(value) => setInputCategory(value)} />

                    </div>
                </div>
                
            </div>
            <button type="submit" className="bg-[#370757] text-white font-bold hover:bg-purple-800 py-6 px-20 mt-5">
                <span>Add Hotel</span>
            </button>
            </form>
        </div>
    </>
  );
};

export default AddHotels;
