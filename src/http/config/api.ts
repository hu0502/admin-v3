import config from '@/http/config/config'
import Http from '@/http/config/config'

// const BASE_URL = 'https://www.fastmock.site/mock/323354e56ef21147c3f550e18435baa1/api'
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