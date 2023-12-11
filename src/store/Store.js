import {configureStore} from '@reduxjs/toolkit';
import OrderReducer from '../features/OrderFeature/Cancel_ConfirmOreder';
import  ChatSlice from '../features/chatfeature/chatdata';
export const store = configureStore({
    reducer: {
        orderfeature: OrderReducer,
        chatfeature : ChatSlice
    },
}) 