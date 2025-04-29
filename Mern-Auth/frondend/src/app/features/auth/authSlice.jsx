import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { loginAPI, registerAPI, logoutAPI } from './authAPI'


const initialState = {
  user: null,
  token: localStorage.getItem('token') || null,
  loading: false,
  error: null,
}

export const login = createAsyncThunk('auth/login', async (data, thunkAPI) => {
  try {
    const res = await loginAPI(data)
    return res;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response.data.message)
  }
})

export const register = createAsyncThunk('auth/register', async (data, thunkAPI) => {
  try {
    const res = await registerAPI(data)
    return res
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response.data.message)
  }
})


// export const logoutuser = createAsyncThunk('auth/logout', async (data, thunkAPI) => {
//   try {
//     const res = await logoutAPI(data)
//     return res
//   } catch (err) {
//     return thunkAPI.rejectWithValue(err.response.data.message)
//   }
// })

export const logoutuser = createAsyncThunk('auth/logout', async (_, thunkAPI) => {
  try {
    const res = await logoutAPI();
    return res;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data?.message || 'Logout failed');
  }
});



const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null
      state.token = null
      localStorage.removeItem('token')
    },
    clearAuthError: (state) => {
      state.error = null
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state, action) => {
        state.token = action.payload.accessToken
        localStorage.setItem('token', action.payload.accessToken)
        state.user = action.payload
        state.loading = false
      })
      .addCase(register.fulfilled, (state, action) => {
        state.token = action.payload.accessToken
        localStorage.setItem('token', action.payload.accessToken)
        state.user = action.payload
        state.loading = false
      })
      .addCase(logoutuser.fulfilled, (state) => {
        state.user = null;
        state.token = null;
        localStorage.removeItem('token');
        state.loading = false;
      })      
      .addMatcher((action) => action.type.endsWith('/pending'), (state) => {
        state.loading = true
        state.error = null
      })
      .addMatcher((action) => action.type.endsWith('/rejected'), (state, action) => {
        state.loading = false
        state.error = action.payload
      })
  },
})

export const { clearAuthError } = authSlice.actions;
export const { logout } = authSlice.actions
export default authSlice.reducer
