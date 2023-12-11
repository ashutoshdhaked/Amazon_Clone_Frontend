import { createSlice } from "@reduxjs/toolkit";

const initialState = {}

export const ChatSlice = createSlice({
    name: 'chatfeature',
    initialState, 
    reducers: {
      add :(state,action) =>{
          state.sender = action.payload.sender;
          state.data = action.payload.data
      }
    }
})

export const {add} = ChatSlice.actions;
export default ChatSlice.reducer;