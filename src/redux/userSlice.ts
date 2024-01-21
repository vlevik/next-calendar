import { User } from '@/types/user';
import { createSlice } from '@reduxjs/toolkit';

type UserState = {
  user: User | null;
  loading: boolean;
  error: boolean;
};

const initialState: UserState = {
  user: null,
  loading: false,
  error: false,
};

export const userWithEventsSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: { payload: User }) => {
      state.user = action.payload;
    },
    // addEvent: (state, action: { payload: Event }) => {
    // 	if (state.user) {
    // 		state.user.events.push(action.payload)
    // 	}
    // },
    // removeEvent: (state, action: { payload: Event }) => {
    // 	if (state.user) {
    // 		state.user.events = state.user.events.filter((event) => event._id !== action.payload._id)
    // 	}
    // }
  },
});

export const { setUser } = userWithEventsSlice.actions;
export default userWithEventsSlice.reducer;
