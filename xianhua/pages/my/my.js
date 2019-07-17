Page({

  /**
   * 页面的初始数据
   */
  data: {
    isShow: true,
    rotateStyle: true,
    isuser: '',
    isusers:''
  },
  user() {
    const _this = this
    // 获取用户信息
    wx.getSetting({
      success: (res) => {
        // console.log(res.authSetting)
        this.setData({
          isuser: !res.authSetting['scope.userInfo'],
          isusers: res.authSetting['scope.userInfo']
        })
        if (!res.authSetting['scope.userInfo']) {
          wx.authorize({
            scope: 'scope.userInfo',
            success() {
              // 用户已经同意小程序获取用户信息，后续调用 wx.getUserInfo 接口不会弹窗询问
              wx.getUserInfo()
            }
          })
        }
      }
    });
    // 获取信息
    wx.getUserInfo({
      success: function(res) {
        // console.log(res)
        let userInfo = res.userInfo
        let nickName = userInfo.nickName
        let avatarUrl = userInfo.avatarUrl
        // console.log(avatarUrl)
        let gender = userInfo.gender //性别 0：未知、1：男、2：女
        let province = userInfo.province
        let city = userInfo.city
        let country = userInfo.country
      }
    })
  },
  // 花店商城
  column() {
    console.log(666)
    const _this = this
    let isShow = !_this.data.isShow
    let rotateStyle = !_this.data.rotateStyle
    _this.setData({
      isShow: isShow,
      rotateStyle: rotateStyle
    })
  },
  // 钱包
  wallet(){
    wx.navigateTo({
      url: '/pages/wallet/wallet',
    })
  },
  // 积分商城
  IntegralMall() {
    wx.navigateTo({
      url: '/pages/IntegralMall/IntegralMall',
    })
  },
  // 卡包
  cardbag() {
    wx.navigateTo({
      url: '/pages/cardbag/cardbag',
    })
  },
  // 我的订单
  Order() {
    wx.navigateTo({
      url: '/pages/Order/Order',
    })
  },
  // 收藏
  Collection() {
    wx.navigateTo({
      url: '/pages/collection/collection',
    })
  },
  // 设置
  setting(){
    wx.navigateTo({
      url: '/pages/setting/setting',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // console.log(111)
    this.user()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})