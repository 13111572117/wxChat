//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: '2018 分 类 榜 单',
    classification:[
      { bgcolor: 'red', title1: '评分最高', title2: '华语电影' },
      { bgcolor: 'red', title1: '评分最高', title2: '外语电影' },
      { bgcolor: 'red', title1: '最受关注', title2: '院线电影' },
      { bgcolor: 'red', title1: '最受关注', title2: '非院线电影' },
      { bgcolor: 'red', title1: '最受期待', title2: '华语佳片' },
      { bgcolor: 'red', title1: '最受期待', title2: '冷门佳片' },
      { bgcolor: 'red', title1: '评分最高', title2: '韩国电影' },
      { bgcolor: 'red', title1: '评分最高', title2: '日本电影' },
      { bgcolor: 'red', title1: '评分最高', title2: '欧洲电影' },
      { bgcolor: 'red', title1: '评分最高', title2: 'LGBT电影' },
      { bgcolor: 'red', title1: '评分最高', title2: '喜剧片' },
      { bgcolor: 'red', title1: '评分最高', title2: '爱情片' },
      { bgcolor: 'red', title1: '评分最高', title2: '科幻片' },
      { bgcolor: 'red', title1: '评分最高', title2: '惊悚片' },
      { bgcolor: 'red', title1: '评分最高', title2: '动画片' },
      { bgcolor: 'red', title1: '评分最高', title2: '纪录片' },
      { bgcolor: 'red', title1: '评分最高', title2: '短片' },
      { bgcolor: 'red', title1: '每月热门', title2: '每月热门' },
    ],
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //跳转至榜单评分最高电影
  highestScore: function() {
    wx.navigateTo({
      url: '/pages/highestScore/highestScore'
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
