//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    num: 0,
    XingLingData: {
      zizhi: '',
      chengzhang: '',
      qianghua: '',
      pinzhi: '',
      xingjiang: false
    },
    qianghuaStatus: true,
    qianghuaMessage: '未选择资质/成长',
    qianghua: [],
    qianghuaList: [
      {
        type: '无强化',
        PCT: 0
      },
      {
        type: '一级',
        PCT: 0.5
      },
      {
        type: '二级',
        PCT: 1
      },
      {
        type: '三级',
        PCT: 1.5
      }, 
      {
        type: '四级',
        PCT: 2
      },
      {
        type: '五级',
        PCT: 2.5
      },
      {
        type: '六级',
        PCT: 3
      },
      {
        type: '七级',
        PCT: 3.5
      },
      {
        type: '八级',
        PCT: 4
      },
      {
        type: '九级',
        PCT: 4.5
      },
      {
        type: '满级',
        PCT: 5
      }
    ],
    errData: {
      zizhi: '资质为空',
      chengzhang: '成长为空',
      qianghua: '强化等级为空',
      liliangzizhi: '力量资质为空',
      liliangqianlidianshu: '力量潜力点数为空',
      tizhizizhi: '体质资质为空',
      tizhiqianlidianshu: '体质潜力点数为空',
      xinlizizhi: '心力资质为空',
      xinliqianlidianshu: '心力潜力点数为空',
      nailizizhi: '耐力资质为空',
      nailiqianlidianshu: '耐力潜力点数为空',
      minjiezizhi: '敏捷资质为空',
      minjieqianlidianshu: '敏捷潜力点数为空'
    },
    errStore:[],
    numList: [{
      name: '填写信息'
    }, {
      name: '开始计算'
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
    modal: false,
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    motto: 'Hi 开发者！',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  formSubmit(e) {
    console.log('form发生了submit事件，携带数据为：', e.detail.value)
    let _data = e.detail.value
    // 补充星灵品质
    _data.pinzhi = this.data.XingLingData.pinzhi
    // e.detail.value.forEach(func)
    let _errStore = []
    for (let i in _data) {
      if (i !== 'xingjiang' && i !== 'pinzhi' && _data[i] === '') {
        _errStore.push(this.data.errData[i])
      }
    }
    if(_errStore.length !== 0) {
      this.setData({
        errStore: _errStore
      })
      this.showModal()
    } else {
      wx.setStorage({
        key: 'xinglingData',
        data: JSON.stringify(_data)
      })
      wx.navigateTo({
        url: '/pages/attribute/index'
      })
    }
  },
  formReset() {
    console.log('form发生了reset事件')
    this.setData({
      'XingLingData.xingjiang': false,
      'XingLingData.zizhi': '',
      'XingLingData.chengzhang': '',
      'XingLingData.qianghua': '',
      'XingLingData.pinzhi': '',
      qianghuaStatus: true,
      'qianghuaMessage': '未选择资质/成长'
    })
  },
  showModal () {
    this.setData({
      modal: true
    })
  },
  hideModal () {
    this.setData({
      modal: false
    })
  },
  ZiZhiChange(e) {
    console.log(e);
    this.setData({
      'XingLingData.zizhi': e.detail.value,
      'XingLingData.qianghua': 0
    })
    this.setQianghuaPicker()
  },
  ChengZhangChange(e) {
    console.log(e);
    this.setData({
      'XingLingData.chengzhang': e.detail.value,
      'XingLingData.qianghua': 0
    })
    this.setQianghuaPicker()
  },
  QiangHuaChange(e) {
    console.log(e);
    this.setData({
      'XingLingData.qianghua': e.detail.value
    })
  },
  setQianghuaPicker() {
    if (this.data.XingLingData.zizhi !== '' && this.data.XingLingData.chengzhang !== '') {
      console.log(this.data.XingLingData.zizhi, this.data.XingLingData.chengzhang)
      // 设置品质
      this.setPinZhi()
      // 设置强化数据
      let _qianghuaList = this.data.qianghuaList.filter((v,i,a) => {
        // 普通星灵强化等级上限为2级
        // 优良星灵强化等级上限为4级
        // 精致星灵强化等级上限为6级
        // 传说星灵强化等级上限为8级
        // 神工/逆天星灵强化等级上限为10级
        console.log(this.data.XingLingData.pinzhi)
        let _pinzhi = Number(this.data.XingLingData.pinzhi)
        if (_pinzhi === 0) {
          return i <= 2
        } else if (_pinzhi === 1) {
          return i <= 4
        } else if (_pinzhi === 2) {
          return i <= 6
        } else if (_pinzhi === 3) {
          return i <= 8
        } else {
          return true
        }
      })
      this.setData({
        'qianghua': _qianghuaList,
        'qianghuaMessage': '请选择强化等级'
      })
    } else {
      this.setData({
        qianghuaStatus: true,
        'XingLingData.pinzhi': '',
        'qianghuaMessage': '未选择资质/成长'
      })
    }
  },
  setPinZhi() {
    let arr = [
      this.data.XingLingData.zizhi,
      this.data.XingLingData.chengzhang
    ]
    this.setData({
      qianghuaStatus: false,
      'XingLingData.pinzhi': arr.sort()[0]
    })
  },
  XingjiangChange(e) {
    this.setData({
      'XingLingData.xingjiang': e.detail.value
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
