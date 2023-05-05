import axios from 'axios'
import getToken from 'axios'
const http = axios.create({
 baseURL: 'http://51.142.109.141',
 timeout: 5000
})
export { http }