import {createSlice} from "@reduxjs/toolkit"
import { nanoid } from "nanoid";
const initialState = {
    hotels: [],
    categories: []
}
export const hotelSlice = createSlice({
    name: 'hotel',
    initialState,
    reducers: {
        addHotel: (state, action) => {
            const { name, address, country, category } = action.payload;
            const hotel = {
              id: nanoid(),
              name,
              address,
              country,
              category,
            };
            state.hotels.push(hotel);
          },
         
            
         
        
       
       
        updateHotel: (state, action) => {
            const { id, name, address, country, categoryId } = action.payload;
          
           
            const index = state.hotels.findIndex((hotel) => hotel.id === id);
          
            if (index !== -1) {
              // Create a new array with the modified hotel at the found index
              state.hotels[index] = {
                ...state.hotels[index],
                name,
                address,
                country,
                categoryId,
              };
            }
          },
          
        removeHotel: (state, action) => {
            state.hotels = state.hotels.filter((hotel) => 
            hotel.id !== action.payload
            )
        }
        

    }
})

export const {addHotel,  updateHotel, removeHotel} = hotelSlice.actions
export default hotelSlice.reducer