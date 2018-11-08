import axios from 'axios'
import {Toast} from 'antd-mobile'

// 拦截请求
axios.interceptors.request.use(req => {
  Toast.loading('加载中', 0)
  return req
})

// 拦截相应
axios.interceptors.response.use(res => {
  Toast.hide()
  return res
})