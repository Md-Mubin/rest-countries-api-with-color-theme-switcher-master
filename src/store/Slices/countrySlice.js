"use client"
import { createSlice } from '@reduxjs/toolkit';

export const countrySlice = createSlice({
    name: 'data',
    initialState: {
        countryData: []
    },
    reducers: {
        selectedCountryData: (state, action) => {
            state.countryData = action.payload
        }
    }
});

export const { selectedCountryData } = countrySlice.actions;
export default countrySlice.reducer;
