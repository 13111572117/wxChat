//logs.js
const util = require('../../utils/util.js')

Page({
  data: {
    logs: []
  },
  Isbangdan(){
    wx:wx.navigateTo({
      url: '/pages/index/index',
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  },
  onLoad: function() {
    this.setData({
      logs: (wx.getStorageSync('logs') || []).map(log => {
        return util.formatTime(new Date(log))
      })
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // 外语电影
    const _this = this;
    wx.request({
      url: "https://douban.uieee.com/v2/movie/top250",
      data: {},
      header: {
        'content-type': 'json'
      },
      success: function(res) {
        console.log(res.data)
        _this.setData({
          bangdanCont: res.data.subjects
        })
      }
    });
    // 话语电影
    wx.request({
      url: "https://douban.uieee.com/v2/movie/in_theaters",
      data: {},
      header: {
        'content-type': 'json'
      },
      success: function (res) {
        console.log(res.data)
        _this.setData({
          bangdanCont1: res.data.subjects
        })
      }
    });
    // 科幻片
    wx.request({
      url: "https://douban.uieee.com/v2/movie/coming_soon",
      data: {},
      header: {
        'content-type': 'json'
      },
      success: function (res) {
        console.log(res.data)
        _this.setData({
          bangdanCont2: res.data.subjects
        })
      }
    });
    // 热门剧集
    wx.request({
      url: "https://douban.uieee.com/v2/book/search?q=虚构类&count=8",
      data: {},
      header: {
        'content-type': 'json'
      },
      success: function (res) {
        console.log(res.data)
        _this.setData({
          bangdanCont3: res.data.books
        })
      }
    });
    // 热门单曲榜
    wx.request({
      url: "https://douban.uieee.com/v2/music/search?q=欧美&count=15?",
      data: {},
      header: {
        'content-type': 'json'
      },
      success: function (res) {
        console.log(res.data)
        _this.setData({
          bangdanCont4: res.data.musics
        })
      }
    });
  }
})