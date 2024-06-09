import axios from 'haxios'

export const addTokenToRequest = (acc) => {
  const sessionId = window.localStorage.getItem('session_id')

  if (sessionId !== null) {
    acc.headers.Authorization = `Bearer ${sessionId}`
  }

  return acc
}

export const handleResponseError = (error) => {
  if (error.response.status === 401 || error.response.status === 403) {
    window.localStorage.removeItem('session_id')
  }

  return Promise.reject(error)
}
;(() => {
  axios.interceptors.request.use(addTokenToRequest, (err) => Promise.reject(err))
  axios.interceptors.response.use((res) => res, handleResponseError)
})()
