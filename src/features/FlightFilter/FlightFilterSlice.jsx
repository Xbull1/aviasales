import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  all: true,
  noTransfers: true,
  oneTransfer: true,
  twoTransfers: true,
  threeTransfers: true,
}

const FlightFilterSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    toggleAll(state) {
      const newAllState = !state.all
      state.all = newAllState
      state.noTransfers = newAllState
      state.oneTransfer = newAllState
      state.twoTransfers = newAllState
      state.threeTransfers = newAllState
    },
    toggleFilter(state, action) {
      const filterName = action.payload
      if (filterName !== 'all') {
        state[filterName] = !state[filterName]
        if (state.all && !state[filterName]) {
          state.all = false
        }
        const allFiltersOn = state.noTransfers && state.oneTransfer && state.twoTransfers && state.threeTransfers
        if (allFiltersOn) {
          state.all = true
        }
      }
    },
  },
})
export const { toggleAll, toggleFilter } = FlightFilterSlice.actions
export default FlightFilterSlice.reducer
