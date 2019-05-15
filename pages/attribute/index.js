// pages/attribute/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    saveDialog: false,
    nameDialog: false,
    numList: [{
      name: '填写信息'
    }, {
      name: '开始计算'
    }],
    avatarList: [
      {
        name: '1',
        value: 'https://7368-shqztools-1259234103.tcb.qcloud.la/avatar/1.png?sign=586d696c5f0b365ab683877c14a20ce8&t=1557909927',
        checked: false
      },
      {
        name: '2',
        value: 'https://7368-shqztools-1259234103.tcb.qcloud.la/avatar/2.png?sign=dda9fa57289af1c25bd5008ba1684000&t=1557909963',
        checked: false
      },
      {
        name: '3',
        value: 'https://7368-shqztools-1259234103.tcb.qcloud.la/avatar/3.png?sign=ff7aea7745df3fd057585d24933f1e32&t=1557909972',
        checked: false
      },
      {
        name: '4',
        value: 'https://7368-shqztools-1259234103.tcb.qcloud.la/avatar/4.png?sign=8fd31724db7f2306ab7378389e1d4efe&t=1557909979',
        checked: false
      },
      {
        name: '5',
        value: 'https://7368-shqztools-1259234103.tcb.qcloud.la/avatar/5.png?sign=d4b4a34af983a9bcb4109a85f7203c4c&t=1557909988',
        checked: false
      },
      {
        name: '6',
        value: 'https://7368-shqztools-1259234103.tcb.qcloud.la/avatar/6.png?sign=b00dfadfa4afa71046d4ded478372197&t=1557909997',
        checked: false
      },
      {
        name: '7',
        value: 'https://7368-shqztools-1259234103.tcb.qcloud.la/avatar/7.png?sign=afb7e0961d3e0a9d0eb6e16fe34a93e7&t=1557910005',
        checked: false
      },
      {
        name: '8',
        value: 'https://7368-shqztools-1259234103.tcb.qcloud.la/avatar/8.png?sign=7c2a16f8f68ce3c994b04108a5ad7614&t=1557910013',
        checked: false
      }
    ],
    saveXingLingData: {
      avatar: '',
      name: ''
    },
    resetXingLingData: {
      avatar: '',
      name: ''
    },
    pinzhi: '',
    XingLingData: {},
    shareStatus: false,
    resultData:{
      shengmingzhi:'',
      jinengzhi: '',
      gongjili: '',
      fangyuli: '',
      lingqiaodu: '',
      mingzhonglv: '',
      jingshenli: '',
      shanbilv: ''
    }
  },
  radioChange (e) {
    console.log('radio发生change事件，携带value值为：', e.detail.value)
    this.setData({
      'saveXingLingData.avatar': e.detail.value
    })
  },
  hideSave () {
    let _avatarList = this.data.avatarList
    for (let i in _avatarList) {
      _avatarList.checked = false
    }
    this.setData({
      saveDialog: false,
      avatarList: _avatarList,
      'resetXingLingData.name': ''
    })
  },
  goSave (e) {
    let _fromData = e.detail.value
    let _avatarList = this.data.avatarList
    console.log('form发生了submit事件，携带数据为：', e.detail.value)
    if (_fromData.xinglingName === '') {
      wx.showToast({
        title: '星灵名字为空',
        icon: 'none',
        duration: 2000
      })
      return false
    } else if (_fromData.avatar === '') {
      wx.showToast({
        title: '请选择一个星灵头像',
        icon: 'none',
        duration: 2000
      })
      return false
    } else {
      for (let i in _avatarList) {
        _avatarList.checked = false
      }
      this.setData({
        'saveXingLingData.name': _fromData.xinglingName,
        'saveXingLingData.avatar': _fromData.avatar,
        'resetXingLingData.name': '',
         avatarList: _avatarList,
        saveDialog: false
      })
      if (wx.getStorageSync('UserXingLingData') === '') {
        console.log('该用户本地星灵数据为空')
        let _arr = []
        let _xinglingData = JSON.parse(wx.getStorageSync('xinglingData'))
        _xinglingData.name = this.data.saveXingLingData.name
        _xinglingData.avatar = this.data.saveXingLingData.avatar
        _xinglingData.time = new Date()
        _arr.push(_xinglingData)
        wx.setStorageSync('UserXingLingData', JSON.stringify(_arr))
      } else {
        console.log('该用户本地星灵数据不为空')
        let _UserXingLingData = JSON.parse(wx.getStorageSync('UserXingLingData'))
        let _xinglingData = JSON.parse(wx.getStorageSync('xinglingData'))
        _xinglingData.name = this.data.saveXingLingData.name
        _xinglingData.avatar = this.data.saveXingLingData.avatar
        _xinglingData.time = new Date()
        _UserXingLingData.push(_xinglingData)
        wx.setStorageSync('UserXingLingData', JSON.stringify(_UserXingLingData))
      }
      wx.showToast({
        title: '保存成功',
        icon: 'success',
        duration: 2000
      })
      this.goMy()
    }
  },
  goMy () {
    wx.switchTab({
      url: '/pages/my/index'
    })
  },
  countFunc: function () {
    //是否星将加成
    let _xingjiang = this.data.XingLingData.xingjiang ? 1.1 : 1
    // 计算总加成百分比
    let _per = this.perCountFunc()
    console.log(_per)
    //HP＝当前体力点数×体力资质×6
    let _shengmingzhi = Math.round((Number(this.data.XingLingData.tizhizizhi) * Number(this.data.XingLingData.tizhiqianlidianshu) * 6) * _per * _xingjiang);
    //SP=当前心力点数 * 心力资质 * 3
    let _jinengzhi = Math.round((Number(this.data.XingLingData.xinlizizhi) * Number(this.data.XingLingData.xinliqianlidianshu) * 3) * _per * _xingjiang);
    //攻击力＝当前力量点数×力量资质
    let _gongjili = Math.round(Number(this.data.XingLingData.liliangzizhi) * Number(this.data.XingLingData.liliangqianlidianshu) * _per * _xingjiang);
    //防御力=当前耐力点数×耐力资质
    let _fangyuli = Math.round(Number(this.data.XingLingData.nailizizhi) * Number(this.data.XingLingData.nailiqianlidianshu) * _per * _xingjiang);
    //灵巧力＝当前敏捷点数×敏捷资质×0.7
    let _lingqiaodu = Math.round((Number(this.data.XingLingData.minjiezizhi) * Number(this.data.XingLingData.minjieqianlidianshu) * 0.7) * _per * _xingjiang);
    //命中率 = 当前力量点数×力量资质
    let _mingzhonglv = Math.round(Number(this.data.XingLingData.liliangzizhi) * Number(this.data.XingLingData.liliangqianlidianshu) * _per * _xingjiang);
    //精神力=[心力点数+0.2（力量点数+体力点数+耐力点数）]×心力资质 (*)
    let _jingshenli = Math.round(((Number(this.data.XingLingData.xinliqianlidianshu) + (0.2 * (Number(this.data.XingLingData.liliangqianlidianshu) + Number(this.data.XingLingData.tizhiqianlidianshu) + Number(this.data.XingLingData.nailiqianlidianshu)))) * Number(this.data.XingLingData.xinlizizhi)) * _per * _xingjiang);
    //闪避率=当前敏捷点数×敏捷资质
    let _shanbilv = Math.round(Number(this.data.XingLingData.minjiezizhi) * Number(this.data.XingLingData.minjieqianlidianshu) * _per * _xingjiang);
    // 设置显示数据
    this.setData({
      'resultData.shengmingzhi': _shengmingzhi,
      'resultData.jinengzhi': _jinengzhi,
      'resultData.gongjili': _gongjili,
      'resultData.fangyuli': _fangyuli,
      'resultData.lingqiaodu': _lingqiaodu,
      'resultData.mingzhonglv': _mingzhonglv,
      'resultData.jingshenli': _jingshenli,
      'resultData.shanbilv': _shanbilv
    })
  },
  saveXingLing () {
    // wx.showToast({
    //   title: '功能暂未开放',
    //   icon: 'none',
    //   duration: 2000
    // })
    this.setData({
      saveDialog: true
    })
  },
  setPinZhi () {
    let _pingji = ''
    switch (Number(this.data.XingLingData.pinzhi)) {
      case 0:
        _pingji = '普通'
        break
      case 1:
        _pingji = '优良'
        break
      case 2:
        _pingji = '精致'
        break
      case 3:
        _pingji = '传说'
        break
      case 4:
        _pingji = '神工'
        break
      case 5:
        _pingji = '逆天'
        break
    }
    this.setData({
      pinzhi: _pingji
    })
  },
  goIndex () {
    wx.switchTab({
      url: '/pages/index/index'
    })
  },
  perCountFunc: function () {
    let _ziZhiPer = ''
    let _chengzhangPer = ''
    let _qianghuaPer = this.data.XingLingData.qianghua * 0.5
    if (Number(this.data.XingLingData.zizhi) === 0) {
      _ziZhiPer = 0.5
    } else if (Number(this.data.XingLingData.zizhi) === 1) {
      _ziZhiPer = 1
    } else if (Number(this.data.XingLingData.zizhi) === 2) {
      _ziZhiPer = 1.5
    } else if (Number(this.data.XingLingData.zizhi) === 3) {
      _ziZhiPer = 2
    } else if (Number(this.data.XingLingData.zizhi) === 4) {
      _ziZhiPer = 3
    } else {
      _ziZhiPer = 5
    }
    if (Number(this.data.XingLingData.chengzhang) === 0) {
      _chengzhangPer = 0.5
    } else if (Number(this.data.XingLingData.chengzhang) === 1) {
      _chengzhangPer = 1
    } else if (Number(this.data.XingLingData.chengzhang) === 2) {
      _chengzhangPer = 1.5
    } else if (Number(this.data.XingLingData.chengzhang) === 3) {
      _chengzhangPer = 2
    } else if (Number(this.data.XingLingData.chengzhang) === 4) {
      _chengzhangPer = 3
    } else {
      _chengzhangPer = 5
    }
    return (_ziZhiPer + _chengzhangPer + _qianghuaPer) / 100
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    let _XingLingData = ''
    if (Object.keys(options).length !== 0 && options.type === 'share') {
      _XingLingData = options.data
      this.setData({
        shareStatus: true
      })
    } else if (Object.keys(options).length !== 0 && options.type === 'view') {
      _XingLingData = options.data
      this.setData({
        shareStatus: true
      })
    } else {
      _XingLingData = wx.getStorageSync('xinglingData')
    }
    this.setData({
      XingLingData: JSON.parse(_XingLingData)
    })
    this.countFunc()
    this.setPinZhi()
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    return {
      title: '这是什么神仙星灵？',
      path: '/pages/attribute/index?type=share&data=' + JSON.stringify(this.data.XingLingData)
    }
  }
})