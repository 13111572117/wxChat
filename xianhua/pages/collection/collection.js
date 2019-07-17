// pages/collection/collection.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    addcollection:[],
     // 标题
    shopname: [],
    // 图
    shopimg: [],
    // 价格
    shopprice: [],
    // 销量
    shopnum: [],
    // 库存
    shopgnum: [],
    // id
    id: [],
    show1: false,
    // 步进器
    resulte:1
  },
  // 跳转商品详情页面
  shopdate(e) {
    // console.log(e.currentTarget.dataset.shopname)
    let shopname = e.currentTarget.dataset.shopname
    let shopimg = e.currentTarget.dataset.shopimg
    let shopprice = e.currentTarget.dataset.shopprice
    console.log(shopprice,"价格")
    let shopnum = e.currentTarget.dataset.shopnum
    let shopgnum = e.currentTarget.dataset.shopgnum
    let id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: `/pages/CommodityDetails/CommodityDetails?name=${shopname}&image=${shopimg}&promoteprice=${shopprice}&sale_number=${shopnum}&g_number=${shopgnum}&id=${id}`,
    })
  },
  // 点击购物车图标出现商品详情
  shopcar(e) {
    this.setData({
      shopname: e.currentTarget.dataset.shopname,
      shopimg: e.currentTarget.dataset.shopimg,
      shopprice: e.currentTarget.dataset.shopprice,
      shopnum: e.currentTarget.dataset.shopnum,
      shopgnum: e.currentTarget.dataset.shopgnum,
      id: e.currentTarget.dataset.id,
      show1: true
    })
  },
  close() {
    this.setData({
      show1: false
    })
  },
  onClose() {
    this.setData({
      show1: false
    })
  },
  // 点击加入购物车
  addcart(e) {
    this.setData({
      show1: false
    })
    for (var i in this.data.addcollection) {
      // 列表中某一项item的id == 点击事件传递过来的id。则是被点击的项
      if (this.data.addcollection[i].id == e.target.id) {

        // 给goodsList数组的当前项添加count元素，值为1，用于记录添加到购物车的数量
        this.data.addcollection[i].promote_status = this.data.resulte;
        // 获取购物车的缓存数组（没有数据，则赋予一个空数组）
        var arr = wx.getStorageSync('list') || [];
        // console.log(list)
        // 如果购物车有数据
        if (arr.length > 0) {
          // 遍历购物车数组
          for (var j in arr) {
            // 判断购物车内的item的id，和事件传递过来的id，是否相等
            if (arr[j].id == e.target.id) {
              // 相等的话，给count+1（即再次添加入购物车，数量+1）
              arr[j].promote_status = arr[j].promote_status + this.data.resulte;
              // 最后，把购物车数据，存放入缓存（此处不用再给购物车数组push元素进去，因为这个是购物车有的，直接更新当前数组即可）
              try {
                wx.setStorageSync('list', arr)
              } catch (e) {
                console.log(e)
              }
              wx.showToast({
                title: '加入购物车成功！',
                icon: 'success',
                duration: 2000
              });
              // 返回（在if内使用return，跳出循环节约运算，节约性能）
              return;
            }
          }
          // 遍历完购物车后，没有对应的item项，把goodslist的当前项放入购物车数组
          arr.push(this.data.addcollection[i]);
        }
        // 购物车没有数据，把item项push放入当前数据（第一次存放时）
        else {
          arr.push(this.data.addcollection[i]);
        }
        // 最后，把购物车数据，存放入缓存
        try {
          wx.setStorageSync('list', arr)
          // 返回（在if内使用return，跳出循环节约运算，节约性能）
          wx.showToast({
            title: '加入购物车成功！',
            icon: 'success',
            duration: 2000
          });
          return;
        } catch (e) {
          console.log(e)
        }
      }
    }
  },
  // 步进器
  onChange(e){
    this.setData({
      resulte: e.detail
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
    var that = this;
    // 获取产品展示页保存的缓存数据（购物车的缓存数组，没有数据，则赋予一个空数组）
    var arr = wx.getStorageSync('addcollection') || [];
    // 有数据的话，就遍历数据，计算总金额 和 总数量
    if (arr.length > 0) {
      // 更新数据
      this.setData({
        // iscart: true,
        addcollection: arr
      });
    } else {
      console.log('没有数据')
    }
    try {
      wx.setStorageSync('addcollection', arr)
    } catch (e) {
      console.log(e)
    }
    console.log(arr)
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