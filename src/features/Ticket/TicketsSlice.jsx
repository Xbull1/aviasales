import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { getSearchId, getSearch } from '../../Api/Api'

const sortFunctions = {
  cheapest: (a, b) => a.price - b.price,
  fastest: (a, b) => {
    const aDuration = a.segments.reduce((sum, seg) => sum + seg.duration, 0)
    const bDuration = b.segments.reduce((sum, seg) => sum + seg.duration, 0)
    return aDuration - bDuration
  },
  optimal: (a, b) => {
    const aValue = a.price + a.segments.reduce((sum, seg) => sum + seg.duration, 0)
    const bValue = b.price + b.segments.reduce((sum, seg) => sum + seg.duration, 0)
    return aValue - bValue
  },
}

const filterAndSortTickets = (state) => {
  const { tickets, sortType, countTicket } = state
  const filters = state.filters || {
    all: true,
    noTransfers: true,
    oneTransfer: true,
    twoTransfers: true,
    threeTransfers: true,
  }

  let filteredTickets = tickets

  if (!filters.all) {
    filteredTickets = tickets.filter((ticket) => {
      return ticket.segments.every((segment) => {
        const stopsCount = segment.stops.length
        return (
          (stopsCount === 0 && filters.noTransfers) ||
          (stopsCount === 1 && filters.oneTransfer) ||
          (stopsCount === 2 && filters.twoTransfers) ||
          (stopsCount === 3 && filters.threeTransfers)
        )
      })
    })
  }

  return filteredTickets.sort(sortFunctions[sortType]).slice(0, countTicket)
}

const initialState = {
  tickets: [],
  displayedTickets: [],
  loading: 'idle',
  error: null,
  countTicket: 5,
  sortType: 'cheapest',
  isFinished: false,
  isGlobalLoading: false,
}

const ticketsSlice = createSlice({
  name: 'tickets',
  initialState,
  reducers: {
    loadMoreTicket: (state) => {
      state.countTicket += 5
      state.displayedTickets = filterAndSortTickets({
        tickets: state.tickets,
        sortType: state.sortType,
        countTicket: state.countTicket,
        filters: state.filters,
      })
    },
    sortByFeature: (state, action) => {
      state.sortType = action.payload
      state.displayedTickets = filterAndSortTickets({
        tickets: state.tickets,
        sortType: action.payload,
        countTicket: state.countTicket,
        filters: state.filters,
      })
    },
    ticketsUpdated: (state, action) => {
      state.tickets = [...state.tickets, ...action.payload]
      state.displayedTickets = filterAndSortTickets({
        tickets: [...state.tickets, ...action.payload],
        sortType: state.sortType,
        countTicket: state.countTicket,
        filters: state.filters,
      })
    },
    loadingFinished: (state) => {
      state.isFinished = true
      state.loading = 'succeeded'
    },
    setGlobalLoading: (state, action) => {
      state.isGlobalLoading = action.payload
    },
    applyFilters: (state, action) => {
      const filters = action.payload || state.filters
      state.displayedTickets = filterAndSortTickets({
        tickets: state.tickets,
        sortType: state.sortType,
        countTicket: 5,
        filters,
      })
      state.countTicket = 5
    },
  },
  extraReducers: () => {},
})

export const { loadMoreTicket, sortByFeature, ticketsUpdated, loadingFinished, setGlobalLoading, applyFilters } =
  ticketsSlice.actions

export const fetchTickets = createAsyncThunk('tickets/fetchTickets', async (_, { rejectWithValue, dispatch }) => {
  try {
    dispatch(setGlobalLoading(true))
    const searchId = await getSearchId()
    let stop = false
    let attempts = 0
    const MAX_ATTEMPTS = 10

    const fetchTicketsBatch = async () => {
      try {
        const { tickets: batchTickets, stop: fetchStop } = await getSearch(searchId)
        dispatch(ticketsUpdated(batchTickets))
        stop = fetchStop
        attempts = 0
      } catch (error) {
        if (error.response?.status !== 500) {
          throw error
        }
        attempts += 1
        await new Promise((resolve) => {
          setTimeout(resolve, 500)
        })
      }
    }

    while (!stop && attempts < MAX_ATTEMPTS) {
      // eslint-disable-next-line no-await-in-loop
      await fetchTicketsBatch()
    }

    dispatch(loadingFinished())
    return null
  } catch (error) {
    return rejectWithValue(error.message)
  } finally {
    dispatch(setGlobalLoading(false))
  }
})

ticketsSlice.extraReducers = (builder) => {
  builder
    .addCase(fetchTickets.pending, (state) => {
      state.loading = 'pending'
      state.error = null
    })
    .addCase(fetchTickets.rejected, (state, action) => {
      state.loading = 'failed'
      state.error = action.payload
    })
}

export const selectDisplayedTickets = (state) => state.tickets.displayedTickets
export const selectLoadingState = (state) => state.tickets.loading
export const selectError = (state) => state.tickets.error
export const SelectGlobalLoading = (state) => state.tickets.isGlobalLoading

export default ticketsSlice.reducer
