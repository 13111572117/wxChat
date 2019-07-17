Page({

  /**
   * 页面的初始数据
   */
  data: {
    active: 0,
    CustomerService: false,
    Collection: true,
    IsShow: false,
    coverlist: [],
    // image:'',
    count: 1,
    shoucang: [],
    temp: [],
    show: true,
    // id
    id: [],
  },
  // 转发/分享
  share() {
    console.log(666)
    if (res.from === 'button') {}
    return {
      title: '转发',
      path: '/pages/index/community/topic/topic?jsonStr=' + this.data.list,
      success: function(res) {
        console.log('成功', res)
      }
    }
  },
  // 跳转至购物车页面
  ShoppingCart() {
    wx.switchTab({
      url: '/pages/ShoppingCart/ShoppingCart',
    })
  },
  // 跳转至首页
  isIndex() {
    wx.switchTab({
      url: '/pages/index/index',
    })
  },
  // 电话
  phone() {
    wx.makePhoneCall({
      phoneNumber: '15176960726',
    })
  },
  // 客服
  CustomerService() {
    // console.log(666)
    const _this = this;
    let CustomerService = !_this.data.CustomerService;
    let IsShow = !_this.data.IsShow
    _this.setData({
      CustomerService: CustomerService,
      IsShow: IsShow
    })
  },
  // 收藏
  Collection(e) {
    this.setData({
      show: false,
      Collection: Collection
    })
    console.log("e.target.id", e)
    const _this = this;
    let Collection = !_this.data.Collection;
    let shoucang = _this.data.temp
    console.log("shoucang[0].id", shoucang[0].id)
    // if (shoucang[0].id == e.target.id) {
      shoucang[0].show = this.data.show;
      // 获取购物车的缓存数组（没有数据，则赋予一个空数组）
      var arr = wx.getStorageSync('addcollection') || [];
      // 如果购物车有数据
      if (arr.length > 0) {
        // 遍历购物车数组
        console.log("arr", arr.length)
        for (var j in arr) {
          // 判断购物车内的item的id，和事件传递过来的id，是否相等
          if (arr[j].id == e.target.id) {
            // 相等的话，给count+1（即再次添加入购物车，数量+1）
            arr[j].count = arr[j].count + 1;
            // 最后，把购物车数据，存放入缓存（此处不用再给购物车数组push元素进去，因为这个是购物车有的，直接更新当前数组即可）
            try {
              wx.setStorageSync('addcollection', arr)
              // this.getCurrentPages()
            } catch (e) {
              console.log(e)
            }
            wx.showToast({
              title: '已收藏该宝贝！',
              icon: 'success',
              duration: 2000
            });
            // 返回（在if内使用return，跳出循环节约运算，节约性能）
            return;
          }
        }
        // 遍历完购物车后，没有对应的item项，把goodslist的当前项放入购物车数组
        arr.push(shoucang[0]);
      }
      // 购物车没有数据，把item项push放入当前数据（第一次存放时）
      else {
        // console.log(shoucang[0])
        arr.push(shoucang[0]);
        // console.log(arr)
      }
      // 最后，把购物车数据，存放入缓存
      try {
        wx.setStorageSync('addcollection', arr)
        // 返回（在if内使用return，跳出循环节约运算，节约性能）
        wx.showToast({
          title: '加入收藏成功！',
          icon: 'success',
          duration: 2000
        });
        console.log("arrs", arr)
        console.log("111111q", wx.getStorageSync('addcollection'))
        // return;
      } catch (e) {
        console.log(e)
      }
    // }

    
  },


  // 取消收藏
  uncollection(e) {
    console.log("取消收藏")
    this.setData({
      show: true
    })
    let addcollection = wx.getStorageSync('addcollection')
    console.log(addcollection)
    let id = this.data.id
    console.log(id)
    let item = addcollection.find(item => {
      return item.id == id;
      console.log("id", id)
    });
    console.log("item", item)
    if (item) {
      console.log(item)
      addcollection.splice(item, 1)
      console.log(addcollection)
      // 最后，把购物车数据，存放入缓存
      try {
        wx.setStorageSync('addcollection', addcollection)
        // 返回（在if内使用return，跳出循环节约运算，节约性能）
        wx.showToast({
          title: '取消收藏成功！',
          icon: 'success',
          duration: 2000
        });
        return;
      } catch (e) {
        console.log(e)
      }
    } else {
      console.log('还没有收藏')
    }

  },

  // 
  onChange(event) {
    wx.showToast({
      title: `切换到标签 ${event.detail.index + 1}`,
      icon: 'none'
    });
  },

  //加入购物车
  isAddPurchase(n) {
    console.log("加购")
    wx.showToast({
      title: '添加成功',
      icon: 'success',
      duration: 1000
    })
    let shoucang = this.data.shoucang
    console.log("shoucan",shoucang)
    let temp = {
      img: this.data.image,
      name: this.data.name,
      price: this.data.promotePrice,
      count: this.data.count
    }
    console.log("temp",temp)
    // var coverList = this.data.coverlist
    var text = getApp() //定义全局变量
    text.globalData.userInfo.push(temp)
    // this.setData({})
  },
  // 跳转至提交订单
  ConfirmationOfOrders(e) {
    // 定义所需传值的变量
    let image = this.data.image;
    console.log("666", image)
    let name = this.data.name;
    console.log("666", name)
    let promote_price = this.data.promotePrice;
    let count = this.data.count
    console.log(count)
    wx.navigateTo({
      url: '/pages/ConfirmationOfOrders/ConfirmationOfOrders?image=' + image + '&name=' + name + '&promote_price=' + promote_price + '&count=' + count,
    })
    this.setData({
      isJiagou: false,
      iszhezhao: false
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // 获取列表页的传值
    let temp = [{
      g_name: options.name,
      g_img: options.image,
      shop_price: options.promoteprice,
      sale_number: options.sale_number,
      shopgnum: options.g_number,
      id: options.id
    }]
    console.log("qq", temp)
    this.setData({
      image: options.image,
      name: options.name,
      promotePrice: options.promoteprice,
      gnumber: options.g_number,
      salenumber: options.sale_number,
      id: options.id,
      temp: temp
    })
    // 判断收藏id
    // console.log(temp)
    let addcollection = wx.getStorageSync('addcollection')
    let id = this.data.id
    if (addcollection.length > 0) {
      let item = addcollection.find(item => {
        return item.id == id;
      });
      console.log(item)
      if (item) {
        console.log(item)
        this.setData({
          show: false
        })
      } else if(item==undefined) {
        console.log("没有收藏")
        this.setData({
          show: true
        })
      }
    }else{
      console.log('123')
    }
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