//app.js
import util from './utils/util'
import http from '@chunpu/http'
App({
  onLaunch: function() {
    // 检查版本更新
    let updateManager = wx.getUpdateManager()
    updateManager.onCheckForUpdate(function (res) {
      // 请求完新版本信息的回调
      console.log('请求完新版本', res.hasUpdate)
    })
    updateManager.onUpdateReady(function () {
      wx.showModal({
        title: '更新提示',
        content: '新版本的星灵计算器已准备好，是否立即更新？',
        success(res) {
          if (res.confirm) {
            // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
            updateManager.applyUpdate()
          }
        }
      })
    })
    updateManager.onUpdateFailed(function () {
      // 新版本下载失败
      console.log('新版本下载失败')
      wx.showToast({
        title: '小程序更新失败',
        icon: 'none',
        duration: 2000
      })
    })
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    // wx.login({
    //   success: res => {
    //     // 发送 res.code 到后台换取 openId, sessionKey, unionId
    //     console.log(res)
    //   }
    // })
    try {
      let token = wx.getStorageSync('token')
      if (token) {
        // Do something with return value
      } else {
        this.login()
      }
    } catch (e) {
      // Do something when catch error
      this.login()
    }
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
    // 获取系统状态栏信息
    wx.getSystemInfo({
      success: e => {
        this.globalData.StatusBar = e.statusBarHeight;
        let custom = wx.getMenuButtonBoundingClientRect();
        this.globalData.Custom = custom;
        this.globalData.CustomBar = custom.bottom + custom.top - e.statusBarHeight;
      }
    })
  },
  globalData: {
    userInfo: null
  },
  login () {
    console.log('登录')
    return util.promisify(wx.login)().then(({code}) => {
      return http.post('/login',{
        code
      }).then(res => {
        console.log(res)
        let _data = res.data
        try {
          wx.setStorageSync('token', _data.data.token)
        } catch (e) { 
          console.log('保存token出错')
        }
      })
    })
  }
})