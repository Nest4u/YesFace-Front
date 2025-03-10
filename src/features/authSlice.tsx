import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'

interface AuthState {
	user: any
	token: string | null
	loading: boolean
	error: string | null
}

const initialState: AuthState = {
	user: null,
	token: null,
	loading: false,
	error: null
}

export const login = createAsyncThunk(
	'auth/login',
	async ({ identifier, password }: { identifier: string; password: string }, thunkAPI) => {
		try {
			const response = await axios.post('http://localhost:1337/api/auth/local', {
				identifier,
				password
			})
			return response.data
		} catch (error: any) {
			return thunkAPI.rejectWithValue(error.response.data.message[0].messages[0].message)
		}
	}
)

export const logout = createAsyncThunk('auth/logout', async (_, thunkAPI) => {
	return null
})

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		clearError(state) {
			state.error = null
		}
	},
	extraReducers: builder => {
		builder
			.addCase(login.pending, state => {
				state.loading = true
				state.error = null
			})
			.addCase(login.fulfilled, (state, action: PayloadAction<any>) => {
				state.loading = false
				state.user = action.payload.user
				state.token = action.payload.jwt
			})
			.addCase(login.rejected, (state, action: PayloadAction<any>) => {
				state.loading = false
				state.error = action.payload
			})
			.addCase(logout.fulfilled, state => {
				state.user = null
				state.token = null
			})
	}
})

export const { clearError } = authSlice.actions
export const authReducer = authSlice.reducer
