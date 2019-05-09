//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    num: 0,
    XingLingData: {
      zizhi: '',
      chengzhang: ''
    },
    numList: [{
      name: '填写'
    }, {
      name: '计算'
      }],
    zizhi: [
      {
        type: '普通',
        PCT: 0.5
      },
      {
        type: '优良',
        PCT: 1
      },
      {
        type: '精致',
        PCT: 1.5
      },
      {
        type: '传说',
        PCT: 2
      },
      {
        type: '神工',
        PCT: 3
      },
      {
        type: '逆天',
        PCT: 5
      }
    ],
    chengzhang: [
      {
        type: '普通',
        PCT: 0.5
      },
      {
        type: '优良',
        PCT: 1
      },
      {
        type: '精致',
        PCT: 1.5
      },
      {
        type: '传说',
        PCT: 2
      },
      {
        type: '神工',
        PCT: 3
      },
      {
        type: '逆天',
        PCT: 5
      }
    ],
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    motto: 'Hi 开发者！',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  ZiZhiChange(e) {
    console.log(e);
    this.setData({
      'XingLingData.zizhi': e.detail.value
    })
  },
  ChengZhangChange(e) {
    console.log(e);
    this.setData({
      'XingLingData.chengzhang': e.detail.value
    })
  },
  numSteps() {
    this.setData({
      num: this.data.num == this.data.numList.length - 1 ? 0 : this.data.num + 1
    })
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
