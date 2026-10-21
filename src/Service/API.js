import axios from 'axios'
let API = axios.create({
    baseURL:"https://itp-react-student-json-server-backend.onrender.com"
})
export default API;