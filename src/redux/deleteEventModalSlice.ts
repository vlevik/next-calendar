import { Event } from '@/types/events';
import { createSlice } from '@reduxjs/toolkit';

type newEventFormState = {
  shown: boolean;
  eventToDelete: Event | null;
};

const initialState: newEventFormState = {
  shown: false,
  eventToDelete: null,
};

export const deleteEventModalSlice = createSlice({
  name: 'deleteEventModal',
  initialState,
  reducers: {
    open: (state, action: { payload: Event }) => {
      state.shown = true;
      state.eventToDelete = action.payload;
    },
    close: (state) => {
      state.shown = false;
      state.eventToDelete = null;
    },
  },
});

export const { open, close } = deleteEventModalSlice.actions;
export default deleteEventModalSlice.reducer;
