import axios from 'haxios';

export const addTokenToRequest = (acc) => {
  const sessionId = window.localStorage.getItem('session_id')

  if (sessionId !== null) {
    acc.headers.Authorization = `Bearer ${sessionId}`
  }

  return acc
}

;(() => {
  axios.interceptors.request.use(addTokenToRequest, (err) => Promise.reject(err))
})()
