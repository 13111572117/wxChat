Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 评分星星
    starIndex1: 3,
    starIndex2: 4,
    starIndex3: 5,
    starIndex4: 3,
  },
  // 查看电影详情
  details: function(e) {
    let t = e.currentTarget.dataset.newsid
    console.log(e)
    wx.navigateTo({
      url: `/pages/details/details?newsid=${t}`
    })
  },
  well_received: function (e) {
    let t = e.currentTarget.dataset.newsid
    console.log(e)
    wx.navigateTo({
      url: `/pages/well_received/well_received?newsid=${t}`
    })
  },
  wel_musics: function (e) {
    let t = e.currentTarget.dataset.newsid
    console.log(e)
    wx.navigateTo({
      url: `/pages/wel_musics/wel_musics?newsid=${t}`
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // 影院热映
    const _this = this;
    wx.request({
      url: "https://douban.uieee.com/v2/movie/in_theaters",
      data: {},
      header: {
        'content-type': 'json'
      },
      success: function(res) {
        console.log(res.data)
        _this.setData({
          subjects: res.data.subjects
        })
      }
    });
    // 豆瓣热门
    wx.request({
      url: "https://douban.uieee.com/v2/movie/top250",
      data: {},
      header: {
        'content-type': 'json'
      },
      success: function(res) {
        console.log(res.data)
        _this.setData({
          subjects_top250: res.data.subjects
        })
      }
    });
    // 近期热门影视
    wx.request({
      url: "https://douban.uieee.com/v2/movie/coming_soon",
      data: {},
      header: {
        'content-type': 'json'
      },
      success: function(res) {
        console.log(res.data)
        _this.setData({
          subjects_soon: res.data.subjects
        })
      }
    });
    // 畅销图书
    wx.request({
      url: "https://douban.uieee.com/v2/book/search?q=我是传奇",
      data: {},
      header: {
        'content-type': 'json'
      },
      success: function(res) {
        console.log(res.data)
        _this.setData({
          subjects_zongyi: res.data.books
        })
      }
    });
    // 热门单曲榜
    wx.request({
      url: "https://douban.uieee.com/v2/music/search?q=当年情&start=0",
      data: {},
      header: {
        'content-type': 'json'
      },
      success: function(res) {
        console.log(res.data)
        _this.setData({
          subjects_music: res.data.musics
        })
      }
    })
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

  },
  // 评分
  onChange1(e) {
    const index = e.detail.index;
    this.setData({
      'starIndex1': index
    })
  },
  onChange2(e) {
    const index = e.detail.index;
    this.setData({
      'starIndex2': index
    })
  },
  onChange3(e) {
    const index = e.detail.index;
    this.setData({
      'starIndex3': index
    })
  },
  onChange4(e) {
    const index = e.detail.index;
    this.setData({
      'starIndex4': index
    })
  },
});