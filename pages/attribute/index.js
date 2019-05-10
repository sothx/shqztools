// pages/attribute/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    numList: [{
      name: '填写信息'
    }, {
      name: '开始计算'
    }],
    pingji: '',
    XingLingData: {},
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
    wx.showToast({
      title: '功能暂未开放',
      icon: 'none',
      duration: 2000
    })
  },
  setPingJi () {
    let _pingji = ''
    switch (this.data.XingLingData.pinzhi) {
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
    return _pingji
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
    let _XingLingData = wx.getStorageSync('xinglingData')
    this.setData({
      XingLingData: JSON.parse(_XingLingData),
      pingji: this.setPingJi()
    })
    this.countFunc()
    this.setPingJi()
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

  }
})