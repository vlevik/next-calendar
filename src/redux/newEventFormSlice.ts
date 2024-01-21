import { createSlice } from '@reduxjs/toolkit';

type newEventFormState = {
  shown: boolean;
};

const initialState: newEventFormState = {
  shown: false,
};

export const newEventFormSlice = createSlice({
  name: 'newEventForm',
  initialState,
  reducers: {
    open: (state) => {
      state.shown = true;
    },
    close: (state) => {
      state.shown = false;
    },
  },
});

export const { open, close } = newEventFormSlice.actions;
export default newEventFormSlice.reducer;
