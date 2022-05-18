import config from '@/http/config/config'
import Http from '@/http/config/config'

const BASE_URL = 'http://xitien.wujitimes.com.cn/'
const TIME_OUT = 20000
const HEADERS = {
    "Content-Type": "application/json;charset=utf-8"
}
const api = new Http({
  ...config,
  baseURL: BASE_URL,
  timeout: TIME_OUT,
  headers:HEADERS
})

export default api