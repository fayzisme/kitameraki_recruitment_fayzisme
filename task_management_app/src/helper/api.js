import axios from 'axios'

const timeout = 60000 // in milisecond
const backendUrl = import.meta.env.VITE_REACT_APP_BACKEND_URL;

export default function(payload) {
  axios.defaults.baseURL = backendUrl
  axios.defaults.timeout = timeout

  return new Promise ((resolve, reject) => {
    axios(payload)
    .then(result => {
        resolve(result)
    })
    .catch(error => { reject(error) })
  })
}