import axios from 'axios'
import {API_KEY, API_URL} from '@/config'

const $api = axios.create({
    baseURL: API_URL,
    params: {
        key: API_KEY
    }
})

export default $api