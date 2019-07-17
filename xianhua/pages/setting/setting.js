Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  // 授权设置
  AuthorizationSettings() {
    console.log("授权")
    wx.openSetting({
      success(res) {
        console.log(res.authSetting)
        res.authSetting = {
          "scope.userInfo": true,
          "scope.userLocation": true
        }
      }
    })
  },
  // 收货地址
  ReceivingAddress() {
    // 可以通过 wx.getSetting 先查询一下用户是否授权了 "scope.userLocation" 这个 scope
    wx.getSetting({
      success(res) {
        if (!res.authSetting['scope.userLocation']) {
          wx.authorize({
            scope: 'scope.userLocation',
            success() {
              // 用户已经同意小程序使用录音功能，后续调用 wx.getLocation 接口不会弹窗询问
              wx.getLocation()
            }
          })
        }
      }
    })
    // 跳转至添加收货地址
    wx.navigateTo({
      url: '/pages/addAddress/addAddress',
    })
  },
  // 清除缓存
  clearStorage() {
    wx.showToast({
      title: '清除完成',
      icon: 'success',
      duration: 1000
    })
    wx.removeStorage({
      key: 'key',
      success(res) {
        console.log(res)
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

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