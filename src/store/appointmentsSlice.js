import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  appointments: [],
};

const appointmentsSlice = createSlice({
  name: 'appointments',
  initialState,
  reducers: {
    bookAppointment(state, action) {
      state.appointments.push(action.payload);
    },
    cancelAppointment(state, action) {
      state.appointments = state.appointments.filter(
        (appointment) => appointment.id !== action.payload
      );
    },
  },
});

export const { bookAppointment, cancelAppointment } = appointmentsSlice.actions;
export default appointmentsSlice.reducer;
