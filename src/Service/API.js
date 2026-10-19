import axios from 'axios'
let API = axios.create({
    baseURL:"http://localhost:3000"
})
export default API;