import React from 'react'
import AddHotels from './AddHotels'
import Hotels from './Hotels'
const HomeComponent = () => {
  return (
    <>
        <div className='px-20 py-6 shadow-lg'>
            <h1 className=' text-[#370757] text-3xl font-bold'>Hotels Ranking</h1>
        </div>
        <AddHotels/>
        <Hotels/>
      
    </>
   
  )
}

export default HomeComponent