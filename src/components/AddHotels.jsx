import React, {useEffect, useState} from 'react'
import {useDispatch} from 'react-redux'
import { addHotel, addCategory } from '../features/hotel/hotelSlice'
const AddHotels = () => {

    const [inputName, setInputName] = useState('')
    const [inputCountry, setInputCountry] = useState('')
    const [inputAddress, setInputAddress] = useState('')
    const [inputCategory, setInputCategory] = useState([])

    const [countries, setCountries] = useState([])


    const dispatch = useDispatch()
    const Base_Url = 'https://pkgstore.datahub.io/core/world-cities/world-cities_json/data/5b3dd46ad10990bca47b04b4739a02ba/world-cities_json.json'

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Input values:', inputName, inputAddress, inputCountry, inputCategory);

        dispatch(addHotel({id:'', name: inputName, address: inputAddress, country: inputCountry, category: inputCategory}))
        dispatch(addCategory({category: inputCategory}))
        setInputName('')
        setInputCountry('')
        setInputAddress('')
        setInputCategory('')
    }

    useEffect(() => {
        const CountriesData = async() => {
            const res = await fetch(`${Base_Url}`)
            const data = await res.json();

            //To Extract unique country names using set
            const uniqueCountries = [...new Set(data.map(country => country.country))]
            setCountries(uniqueCountries.map(country => ({country})))
        // console.log(uniqueCountries.map(country => ({country})))
            
        }
        CountriesData()
        
    }, [])

  return (
    <>
        <form action="" onSubmit={handleSubmit}>
            <input type="text"
            placeholder='Name of Hotel'
            value={inputName}
            onChange={(e) => setInputName(e.target.value)}
            />
            <input type="text"
            placeholder='Address of Hotel'
            value={inputAddress}
            onChange={(e) => setInputAddress(e.target.value)}
            />
            <select name="country" value={inputCountry} id="" onChange={(e) => setInputCountry(e.target.value)}>
                <option value=''>Select Country</option>
                {countries.map((country, index) => (
                    <option value={country.country} key={index}>{country.country}</option>
                ))}
            </select>
            <select name="" value={inputCategory} id=""  onChange={(e) => setInputCategory(e.target.value)}>
                <option value="">Select Category</option>
                <option value="1 Star">1 Star</option>
                <option value="2 Stars">2 Stars</option>
                <option value="3 Stars">3 Stars</option>
            </select>

            <button type="submit">Add Hotel</button>
        </form>
    </>
  )
}

export default AddHotels