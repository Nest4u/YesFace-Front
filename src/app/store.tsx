// src/app/store.ts
import { configureStore } from '@reduxjs/toolkit'
import createSagaMiddleware from 'redux-saga'
import cartReducer from '../features/cartSlice'
import { cartSaga } from '../features/cartSaga'
import { authReducer } from '../features/authSlice'
const sagaMiddleware = createSagaMiddleware()

const store = configureStore({
	reducer: {
		cart: cartReducer,
		auth: authReducer
	},
	middleware: getDefaultMiddleware => getDefaultMiddleware({ thunk: true }).concat(sagaMiddleware)
})

sagaMiddleware.run(cartSaga)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store
