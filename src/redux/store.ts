import { configureStore } from '@reduxjs/toolkit';
import newEventFormReducer from './newEventFormSlice';
import userReducer from './userSlice';
import deleteEventModalReducer from './deleteEventModalSlice';
import eventsReducer from './eventsSlice';

export const store = configureStore({
  reducer: {
    newEventForm: newEventFormReducer,
    user: userReducer,
    deleteEventModal: deleteEventModalReducer,
    eventsStore: eventsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
