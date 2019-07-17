//logs.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    ellipsis: false,
    ellipsis2: true,
    ellipsis3: true,
    ellipsis4: true,
    ellipsis5: true,
    untitleL: false,
    currenData: '0',
    res: '',
    urls: '',
    qqq: '',
    order: "up",
    isJiagou: false,
    iszhezhao: false,
    coverlist: [],
    addmall: [],
    count: 1
  },
  // 跳转至购物车
  ShoppingCart() {
    wx.switchTab({
      url: '/pages/ShoppingCart/ShoppingCart'
    })
  },
  getfile() {
    // console.log("getfile qqq",this.data.qqq)
    wx.request({
      url: this.data.qqq,
      data: {},
      header: {
        'content-type': 'json'
      },
      success: (res) => {
        for (let i = 0; i < res.data.info.length; i++) {
          let qwe = res.data.info[i].shop_price;
        }
        this.setData({
          res: res.data.info,
        })
      }
    })
  },
  // 代码封装
  setUrl(index, url, ttlL) {
    if (ttlL == index) { //判断index值
      this.urls = url
      // console.log(this.urls, this)
      this.setData({
        qqq: this.urls
      })
      this.getfile()
      // console.log(this.data.qqq)
    }
  },
  // 左侧标题栏点击高亮
  titleL(e, index) {
    // console.log("e index",e,index)
    let that = this
    let ttlL;

    if (e) {
      ttlL = e.currentTarget.dataset.index
    } else {
      ttlL = index
    }
    // console.log(ttlL)
    that.setData({
      currenData: ttlL,
    })

    this.setUrl(0, 'https://604660.ixiaochengxu.cc/index.php?s=/addon/DuoguanShop/Api/getGoodsList&searchData=%7B%22cid%22%3A%22157986%22%2C%22pagesize%22%3A1%2C%22pagenum%22%3A10%2C%22stype%22%3A%22%22%2C%22stype_jiage%22%3A%22%22%2C%22keywords%22%3A%22%22%7D&utoken=&token=gh_d83bbebf45cc', ttlL)
    this.setUrl(1, 'https://604660.ixiaochengxu.cc/index.php?s=/addon/DuoguanShop/Api/getGoodsList&searchData=%7B%22cid%22%3A%22157986%22%2C%22pagesize%22%3A1%2C%22pagenum%22%3A10%2C%22stype%22%3A%22%22%2C%22stype_jiage%22%3A%22%22%2C%22keywords%22%3A%22%22%7D&utoken=&token=gh_d83bbebf45cc', ttlL)
    this.setUrl(2, 'https://604660.ixiaochengxu.cc/index.php?s=/addon/DuoguanShop/Api/getGoodsList&searchData=%7B%22cid%22%3A%22161029%22%2C%22pagesize%22%3A1%2C%22pagenum%22%3A10%2C%22stype%22%3A%22%22%2C%22stype_jiage%22%3A%22%22%2C%22keywords%22%3A%22%22%7D&utoken=&token=gh_d83bbebf45cc', ttlL)
    this.setUrl(3, 'https://604660.ixiaochengxu.cc/index.php?s=/addon/DuoguanShop/Api/getGoodsList&searchData=%7B%22cid%22%3A%22230350%22%2C%22pagesize%22%3A1%2C%22pagenum%22%3A10%2C%22stype%22%3A%22%22%2C%22stype_jiage%22%3A%22%22%2C%22keywords%22%3A%22%22%7D&utoken=&token=gh_d83bbebf45cc&tdsourcetag=s_pcqq_aiomsg', ttlL)
    this.setUrl(4, 'https://604660.ixiaochengxu.cc/index.php?s=/addon/DuoguanShop/Api/getGoodsList&searchData=%7B%22cid%22%3A%22197367%22%2C%22pagesize%22%3A1%2C%22pagenum%22%3A10%2C%22stype%22%3A%22%22%2C%22stype_jiage%22%3A%22%22%2C%22keywords%22%3A%22%22%7D&utoken=&token=gh_d83bbebf45cc', ttlL)
    this.setUrl(5, 'https://604660.ixiaochengxu.cc/index.php?s=/addon/DuoguanShop/Api/getGoodsList&searchData=%7B%22cid%22%3A%22172364%22%2C%22pagesize%22%3A1%2C%22pagenum%22%3A10%2C%22stype%22%3A%22%22%2C%22stype_jiage%22%3A%22%22%2C%22keywords%22%3A%22%22%7D&utoken=&token=gh_d83bbebf45cc', ttlL)
    this.setUrl(6, 'https://604660.ixiaochengxu.cc/index.php?s=/addon/DuoguanShop/Api/getGoodsList&searchData=%7B%22cid%22%3A%22198628%22%2C%22pagesize%22%3A1%2C%22pagenum%22%3A10%2C%22stype%22%3A%22%22%2C%22stype_jiage%22%3A%22%22%2C%22keywords%22%3A%22%22%7D&utoken=&token=gh_d83bbebf45cc', ttlL)
    this.setUrl(7, 'https://604660.ixiaochengxu.cc/index.php?s=/addon/DuoguanShop/Api/getGoodsList&searchData=%7B%22cid%22%3A%22197365%22%2C%22pagesize%22%3A1%2C%22pagenum%22%3A10%2C%22stype%22%3A%22%22%2C%22stype_jiage%22%3A%22%22%2C%22keywords%22%3A%22%22%7D&utoken=&token=gh_d83bbebf45cc', ttlL)
    this.setUrl(8, 'https://604660.ixiaochengxu.cc/index.php?s=/addon/DuoguanShop/Api/getGoodsList&searchData=%7B%22cid%22%3A%22221551%22%2C%22pagesize%22%3A1%2C%22pagenum%22%3A10%2C%22stype%22%3A%22%22%2C%22stype_jiage%22%3A%22%22%2C%22keywords%22%3A%22%22%7D&utoken=&token=gh_d83bbebf45cc', ttlL)

  },
  // 综合
  toggle() {
    const _this = this;
    let value = false;
    let value2 = true;
    _this.setData({
      ellipsis: value,
      ellipsis2: value2,
      ellipsis3: value2,
      ellipsis4: value2,
      ellipsis5: value2,
    });
    // 指定排序的比较函数
    // console.log("res", this.data.res)
    var sortObj = this.data.res.sort(this.compare("id"));
    // console.log(sortObj);
    this.setData({
      res: sortObj,
    })
  },
  // 销量
  toggle2() {
    const _this = this;
    let value = false;
    let value2 = true;
    _this.setData({
      ellipsis2: value,
      ellipsis3: value2,
      ellipsis: value2,
      ellipsis4: value2,
      ellipsis5: value2,
    });
    // 指定排序的比较函数
    // console.log("res", this.data.res)
    var sortObj = this.data.res.sort(this.compare("sale_number"));
    // console.log(sortObj);
    this.setData({
      res: sortObj,
    })
  },
  // 价格
  toggle3() {
    const _this = this;
    let value = false;
    let value2 = true;
    let value3 = !this.data.ellipsis4
    _this.setData({
      ellipsis3: value,
      ellipsis2: value2,
      ellipsis: value2,
      ellipsis4: value3,
      ellipsis5: !value3,
    });
    // 指定排序的比较函数

    // console.log("res", this.data.res)
    var sortObj = this.data.res.sort(this.compare("promote_price"));
    // console.log(sortObj);
    if (this.data.order === "up") {
      this.setData({
        res: sortObj,
        order: "down"
      })
    } else if (this.data.order === "down") {
      this.setData({
        res: sortObj,
        order: "up"
      })
    }

  },
  compare(property) {
    return (obj1, obj2) => {
      var value1 = obj1[property];
      var value2 = obj2[property];
      if (this.data.order === "up") {
        return value1 - value2; // 升序
      } else if (this.data.order === "down") {
        return value2 - value1; // 降序
      }
    }
  },
  // 跳转至商品详情
  CommodityDetails(details) {
    // 定义所需传值的变量
    let image = details.currentTarget.dataset.image;
    // console.log(image)
    let name = details.currentTarget.dataset.name;
    let promote_price = details.currentTarget.dataset.promote_price;
    let g_number = details.currentTarget.dataset.g_number;
    let sale_number = details.currentTarget.dataset.sale_number;
    wx.navigateTo({
      // 将所定义变量传入详情页
      url: `/pages/CommodityDetails/CommodityDetails?image=${image}&name=${name}&promoteprice=${promote_price}&g_number=${g_number}&sale_number=${sale_number}`
    })
  },
  //购物车遮罩关闭
  zhezhao() {
    this.setData({
      isJiagou: false,
      iszhezhao: false
    })
  },

  //增加商品数量
  onChange(event) {
    console.log(event.detail, this.data.coverlist)
    this.setData({
      count: event.detail
    })
    console.log(this.data.count)
  },

  // 点击图标加入购物车
  jiagou(e) {
    const _this = this;
    let isJiagou = !_this.data.isJiagou;
    var coverList = this.data.coverlist
    /**
     * 重置 count 
     */
    this.setData({
      count: 1
    })
    /**
     * 添加到购物车的数据
     */
    let temp = {
      id: e.currentTarget.dataset.id,
      img: e.currentTarget.dataset.g_img,
      name: e.currentTarget.dataset.g_name,
      price: e.currentTarget.dataset.promote_price,
    }
    _this.setData({
      addmall: temp,
      isJiagou: isJiagou,
      iszhezhao: true,
      modelimage: e.currentTarget.dataset.g_img,
      modelname: e.currentTarget.dataset.g_name,
      modelpromoteprice: e.currentTarget.dataset.promote_price,
      modelGNumber: e.currentTarget.dataset.g_number,
      modelSaleNumber: e.currentTarget.dataset.sale_number,
    })
    // console.log(this.data.addmall)
  },
  //加入购物车
  isAddPurchase(n) {
    wx.showToast({
      title: '添加成功',
      icon: 'success',
      duration: 1000
    })


    var coverList = this.data.coverlist
    let count = this.data.count
    let temp = this.data.addmall
    temp = Object.assign({}, temp, {
      count: count
    })
    console.log(coverList, n)
    temp.price = temp.price * temp.count
    // console.log(this.data.g_img)
    // coverList.push(temp)
    // console.log(coverList)
    var text = getApp() //定义全局变量
    console.log(text.globalData)
    text.globalData.userInfo.push(temp)
    // text.globalData.userInfo = coverList //拼接好的数据赋值给全局
    // console.log(text.globalData.userInfo)
    this.setData({
      isJiagou: false,
      iszhezhao: false
    })

    console.log(this.data.addmall)
  },
  // 关闭加购窗口
  unisJiagou() {
    const _this = this;
    _this.isJiagou = !_this.isJiagou;
    let isJiagou = !_this.isJiagou;
    _this.setData({
      isJiagou: isJiagou,
      iszhezhao: false
    })
    // console.log(!isJiagou)
  },
  /**
   * 生命周期函数--监听页面加载
   */

  onLoad: function(options) {
    const _this = this;
    _this.titleL(undefined, 0);
    // console.log(qqq);
    const data = _this.data
    wx.request({
      url: 'https://604660.ixiaochengxu.cc/index.php?s=/addon/DuoguanShop/Api/getIndexDataList&other_openid=&user_openid=undefined&version=108&utoken=&token=gh_d83bbebf45cc',
      data: {},
      header: {
        'content-type': 'json'
      },
      success: function(res) {
        // console.log(res.data)
        _this.setData({
          goods: res.data.info,
          lists: res.data.info.index_cate_list,
          // res: res.data.info.index_new_list
        })
        // console.log(res.data.info)
      }
    })
    wx.request({
      url: data.qqq,
      data: {},
      header: {
        'content-type': 'json'
      },
      success: function(res) {
        for (let i = 0; i < res.data.info.length; i++) {
          let qwe = res.data.info[i].shop_price;
        }
        // console.log(res.data.info)
        _this.setData({
          res: res.data.info,
        })
        // console.log(res)
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

  }
})