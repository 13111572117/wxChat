Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: "",
    ellipsis: true,
    director: '',
    performer: '',
    stills: '',
    shortCommentary: '',
    longCommentary: '',
    isBooks: ''
    
  },
  // 查看图书详情
  details: function (e) {
    let t = e.currentTarget.dataset.newsid
    console.log(e)
    wx.navigateTo({
      url: `/pages/well_received/well_received?newsid=${t}`
    })
  },
  all_comments() {
    let t = e.currentTarget.dataset.newsid
    console.log(e)
    wx.navigateTo({
      url: `/pages/all_comments/all_comments?newsid=${t}`
    })
  },
  // 想看
  want_to_see: function (option) {
    wx.navigateTo({
      url: "/pages/Want_to_see/Want_to_see",
    })
  },
  // 看过
  seen: function (option) {
    wx.navigateTo({
      url: "/pages/Seen/Seen",
    })
  },
  // 展开点击方法
  toggle: function () {
    console.log(6666)
    const _this = this;
    let value = !this.data.ellipsis;
    _this.setData({
      ellipsis: value
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    // 短平
    wx.request({
      url: "https://douban.uieee.com/v2/book/" + options.newsid,
      method: "GET",
      data: {},
      header: {
        "content-type": "json"
      },
      success: (res) => {
        console.log(res.data)
        this.setData({
          list: res.data,
          // director: res.data.writers,
          // performer: res.data.casts,
          // stills: res.data.photos,
          // shortCommentary: res.data.popular_comments
        });
      }
    });
    // 短影评
    wx.request({
      url: "https://douban.uieee.com/v2/book/" + options.newsid + "/reviews",
      method: "GET",
      data: {},
      header: {
        "content-type": "json"
      },
      success: (res) => {
        console.log(res.data)
        // let temp = JSON.stringify(n.data)
        this.setData({
          shortCommentary: res.data.reviews,
        });
      }
    });
    // 长影评
    wx.request({
      url: "https://douban.uieee.com/v2/book/" + options.newsid + "/comments",
      method: "GET",
      data: {},
      header: {
        "content-type": "json"
      },
      success: (res) => {
        console.log(res.data)
        // let temp = JSON.stringify(n.data)
        this.setData({
          longCommentary: res.data.comments
        });
      }
    });
    // 喜欢这部电影的人也喜欢
    wx.request({
      url: "https://douban.uieee.com/v2/book/search?q=我是传奇",
      data: {},
      header: {
        'content-type': 'json'
      },
      success: (res) => {
        console.log(res.data)
        this.setData({
          isBooks: res.data.books
        })
      }
    })
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