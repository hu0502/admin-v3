import axios from 'axios'
const request = axios.create({
    baseURL:'http://xitien.wujitimes.com.cn/'
})

export default (config) => {
  return request(config).then(res => {
    return res.data
  })
}