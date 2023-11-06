import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    condition :[]
}

export const OrderSlice = createSlice({
    name: 'orderfeature',
    initialState, 
    reducers: {
      cancelOrder: (state, action) => {
        const order = {
          status: action.payload.text,
          id: action.payload.id,
          disabled: 'true'
        };
        const ind = action.payload.index;
        state.condition[ind] = order;
      },
      confirmOrder: (state, action) => {
        const order = {
          status: action.payload.text,
          id: action.payload.id,
          disabled: 'true'
        };
        const ind = action.payload.index;
        state.condition[ind] = order;
      },
    }
})

export const {cancelOrder,confirmOrder} = OrderSlice.actions;
export default OrderSlice.reducer;