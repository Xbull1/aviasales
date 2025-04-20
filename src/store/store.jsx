import { configureStore } from '@reduxjs/toolkit'
import flightFilterReducer from '../features/FlightFilter/FlightFilterSlice'
import ticketsReducer from '../features/Ticket/TicketsSlice'

const store = configureStore({
  reducer: {
    filters: flightFilterReducer,
    tickets: ticketsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})

export default store
