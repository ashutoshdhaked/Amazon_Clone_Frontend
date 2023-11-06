import {configureStore} from '@reduxjs/toolkit';
import OrderReducer from '../features/OrderFeature/Cancel_ConfirmOreder';
export const store = configureStore({
    reducer: {
        orderfeature: OrderReducer
    },
})