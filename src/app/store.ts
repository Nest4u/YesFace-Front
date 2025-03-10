import { configureStore } from '@reduxjs/toolkit'
import cartReducer from '../features/cartSlice'
import { cartSaga } from '../features/cartSaga'
import createSagaMiddleware from 'redux-saga'

const sagaMiddleware = createSagaMiddleware()

const store = configureStore({
	reducer: {
		cart: cartReducer
	},
	middleware: getDefaultMiddleware =>
		getDefaultMiddleware({
			serializableCheck: false,
			thunk: true
		}).concat(sagaMiddleware)
})

sagaMiddleware.run(cartSaga)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store
