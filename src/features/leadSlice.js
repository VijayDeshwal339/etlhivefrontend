import { createSlice } from '@reduxjs/toolkit';

const leadSlice = createSlice({
    name: 'lead',
    initialState: { leads: [] },
    reducers: {
        setLeads: (state, action) => {
            state.leads = action.payload;
        },
        addLead: (state, action) => {
            state.leads.push(action.payload);
        },
        updateLead: (state, action) => {
            const index = state.leads.findIndex(lead => lead._id === action.payload._id);
            if (index !== -1) {
                state.leads[index] = action.payload;
            }
        },
        deleteLead: (state, action) => {
            state.leads = state.leads.filter(lead => lead._id !== action.payload);
        },
    },
});

export const { setLeads, addLead, updateLead, deleteLead } = leadSlice.actions;
export default leadSlice.reducer;
