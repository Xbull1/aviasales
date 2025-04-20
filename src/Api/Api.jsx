import axios from 'axios'

const ticketBase = axios.create({
  baseURL: 'https://aviasales-test-api.kata.academy',
})

export const getSearchId = async () => {
  const { data } = await ticketBase.get('/search')
  return data.searchId
}
export const getSearch = async (searchId) => {
  const { data } = await ticketBase.get(`/tickets?searchId=${searchId}`)

  return data
}
