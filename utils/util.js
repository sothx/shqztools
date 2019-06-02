import http from '@chunpu/http'
import config from './config.js'


http.init({
  baseURL: config.BaseUrl,
  wx: wx
})

http.interceptors.request.use(config => {
  // Do something before request is sent
  // console.log(config)
  try {
    let token = wx.getStorageSync('token')
    if (token) {
      // Do something with return value
      config.headers.Authorization = 'Bearer ' + token
    }
  } catch (e) {
    // Do something when catch error
  }
  return config
})  


const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

const promisify = original => {
  return function (opt) {
    return new Promise((resolve, reject) => {
      opt = Object.assign({
        success: resolve,
        fail: reject
      }, opt)
      original(opt)
    })
  }
}

module.exports = {
  formatTime,
  promisify
}


