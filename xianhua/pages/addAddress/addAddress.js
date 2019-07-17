// pages/addAddress/addAddress.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    lists:[],
    goodlist:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 轮播
    const _this = this;
    let lists = _this.data.lists
    wx.request({
      url: "https://604660.ixiaochengxu.cc/index.php?s=/addon/DuoguanShop/Api/getIndexDataList&other_openid=&user_openid=undefined&version=108&utoken=&token=gh_d83bbebf45cc",
      data: {},
      header: {
        'content-type': 'json'
      },
      success: function (res) {
        // console.log(res.data.info)
        _this.setData({
          goods: res.data.info,
          lists: res.data.info.index_cate_list,
          res: res.data.info.index_new_list
        })
      }
    });
    let temp={
      id: _this.data.lists.id,
    }
    console.log(temp)
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