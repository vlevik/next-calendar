import { Event } from '@/types/events';
import { createSlice } from '@reduxjs/toolkit';

type newEventFormState = {
  events: Event[];
};

const initialState: newEventFormState = {
  events: [],
};

export const eventsSlice = createSlice({
  name: 'events',
  initialState,
  reducers: {
    setEvents: (state, action) => {
      state.events = action.payload;
    },
    addEvent: (state, action) => {
      state.events.push(action.payload);
    },
    removeEvent: (state, action) => {
      state.events = state.events.filter((event) => event._id !== action.payload);
    },
  },
});

export const { setEvents, addEvent, removeEvent } = eventsSlice.actions;
export default eventsSlice.reducer;
