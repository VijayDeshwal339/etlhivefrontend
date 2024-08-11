import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    token: localStorage.getItem('token') || null, // Load token from localStorage
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setToken: (state, action) => {
            state.token = action.payload;
            localStorage.setItem('token', action.payload); // Save token to localStorage
        },
        clearToken: (state) => {
            state.token = null;
            localStorage.removeItem('token'); // Remove token from localStorage
        },
    },
});

export const { setToken, clearToken } = authSlice.actions;
export default authSlice.reducer;
