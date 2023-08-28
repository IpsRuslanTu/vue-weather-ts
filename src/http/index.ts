import axios from 'axios'

export const API_URL = 'http://api.weatherapi.com/v1'
export const API_KEY='410bcf2e38ad408f85d175853231908'

const $api = axios.create({
    baseURL: API_URL,
    params: {
        key: API_KEY
    }
})

export default $api