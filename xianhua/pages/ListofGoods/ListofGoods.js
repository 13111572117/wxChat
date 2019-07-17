Page({

  /**
   * 页面的初始数据
   */
  data: {
    res: '',
    isShow: true,
    ellipsis: false,
    ellipsis2: true,
    ellipsis3: true,
    ellipsis4: true,
    ellipsis5: true,
    layout: true,
    height: '',
    isJiagou: false,
    order: "up",
    iszhezhao: false,
    // 购物车定义全局变量
    coverlist: [],
    addmall: {},
    count: 1
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
    console.log("res", this.data.res)
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

    console.log("res", this.data.res)
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
  // 页面布局格式
  changeStyle() {
    const _this = this;
    let value = !this.data.isShow;
    let value2 = !this.data.layout;
    _this.setData({
      isShow: value,
      layout: value
    })
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
    // console.log(coverList)
    // console.log(this.data.coverlist)
    let temp = {
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
    console.log(this.data.addmall)
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
    coverList.push(temp)
    console.log(coverList)
    var text = getApp() //定义全局变量
    text.globalData.userInfo = coverList //拼接好的数据赋值给全局
    // console.log(text.globalData.userInfo)
    this.setData({
      isJiagou: false,
      iszhezhao: false
    })
  },

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
  // 滚动无限加载事件
  lower() {
    var result = this.data.res;

    var resArr = [];
    for (let i = 0; i < 10; i++) {
      let n = Math.floor(Math.random() * Math.floor(i))
      resArr.push(this.data.res[n]);
    };
    var cont = result.concat(resArr);
    // console.log(resArr.length);
    if (cont.length >= 40) {
      wx.showToast({ //如果全部加载完成了也弹一个框
        title: '我也是有底线的',
        icon: 'success',
        duration: 300
      });
      return false;
    } else {
      wx.showLoading({ //期间为了显示效果可以添加一个过度的弹出框提示“加载中”  
        title: '加载中',
        icon: 'loading',
      });
      setTimeout(() => {
        // console.log("cont", cont)
        this.setData({
          res: cont
        });
        wx.hideLoading();
      }, 1500)
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    const _this = this;
    let url = ''
    if (options.listid == '157986') {
      url = 'https://604660.ixiaochengxu.cc/index.php?s=/addon/DuoguanShop/Api/getGoodsList&searchData=%7B%22cid%22%3A%22157986%22%2C%22pagesize%22%3A1%2C%22pagenum%22%3A10%2C%22stype%22%3A%22%22%2C%22stype_jiage%22%3A%22%22%2C%22keywords%22%3A%22%22%7D&utoken=&token=gh_d83bbebf45cc'
    } else if (options.listid == '160029') {
      url = 'https://604660.ixiaochengxu.cc/index.php?s=/addon/DuoguanShop/Api/getGoodsList&searchData=%7B%22cid%22%3A%22157986%22%2C%22pagesize%22%3A1%2C%22pagenum%22%3A10%2C%22stype%22%3A%22%22%2C%22stype_jiage%22%3A%22%22%2C%22keywords%22%3A%22%22%7D&utoken=&token=gh_d83bbebf45cc'
    } else if (options.listid == '161029') {
      url = 'https://604660.ixiaochengxu.cc/index.php?s=/addon/DuoguanShop/Api/getGoodsList&searchData=%7B%22cid%22%3A%22161029%22%2C%22pagesize%22%3A1%2C%22pagenum%22%3A10%2C%22stype%22%3A%22%22%2C%22stype_jiage%22%3A%22%22%2C%22keywords%22%3A%22%22%7D&utoken=&token=gh_d83bbebf45cc'
    } else if (options.listid == '230350') {
      url = 'https://604660.ixiaochengxu.cc/index.php?s=/addon/DuoguanShop/Api/getGoodsList&searchData=%7B%22cid%22%3A%22230350%22%2C%22pagesize%22%3A1%2C%22pagenum%22%3A10%2C%22stype%22%3A%22%22%2C%22stype_jiage%22%3A%22%22%2C%22keywords%22%3A%22%22%7D&utoken=&token=gh_d83bbebf45cc&tdsourcetag=s_pcqq_aiomsg'
    } else if (options.listid == '197367') {
      url = 'https://604660.ixiaochengxu.cc/index.php?s=/addon/DuoguanShop/Api/getGoodsList&searchData=%7B%22cid%22%3A%22197367%22%2C%22pagesize%22%3A1%2C%22pagenum%22%3A10%2C%22stype%22%3A%22%22%2C%22stype_jiage%22%3A%22%22%2C%22keywords%22%3A%22%22%7D&utoken=&token=gh_d83bbebf45cc'
    } else if (options.listid == '172364') {
      url = 'https://604660.ixiaochengxu.cc/index.php?s=/addon/DuoguanShop/Api/getGoodsList&searchData=%7B%22cid%22%3A%22172364%22%2C%22pagesize%22%3A1%2C%22pagenum%22%3A10%2C%22stype%22%3A%22%22%2C%22stype_jiage%22%3A%22%22%2C%22keywords%22%3A%22%22%7D&utoken=&token=gh_d83bbebf45cc'
    } else if (options.listid == '198628') {
      url = 'https://604660.ixiaochengxu.cc/index.php?s=/addon/DuoguanShop/Api/getGoodsList&searchData=%7B%22cid%22%3A%22198628%22%2C%22pagesize%22%3A1%2C%22pagenum%22%3A10%2C%22stype%22%3A%22%22%2C%22stype_jiage%22%3A%22%22%2C%22keywords%22%3A%22%22%7D&utoken=&token=gh_d83bbebf45cc'
    } else if (options.listid == '197365') {
      url = 'https://604660.ixiaochengxu.cc/index.php?s=/addon/DuoguanShop/Api/getGoodsList&searchData=%7B%22cid%22%3A%22197365%22%2C%22pagesize%22%3A1%2C%22pagenum%22%3A10%2C%22stype%22%3A%22%22%2C%22stype_jiage%22%3A%22%22%2C%22keywords%22%3A%22%22%7D&utoken=&token=gh_d83bbebf45cc'
    } else if (options.listid == '221551') {
      url = 'https://604660.ixiaochengxu.cc/index.php?s=/addon/DuoguanShop/Api/getGoodsList&searchData=%7B%22cid%22%3A%22221551%22%2C%22pagesize%22%3A1%2C%22pagenum%22%3A10%2C%22stype%22%3A%22%22%2C%22stype_jiage%22%3A%22%22%2C%22keywords%22%3A%22%22%7D&utoken=&token=gh_d83bbebf45cc'
    }
    // 商品列表
    wx.request({
      url: url,
      data: {},
      header: {
        'content-type': 'json'
      },
      success: function(res) {
        for (let i = 0; i < res.data.info.length; i++) {
          let qwe = res.data.info[i].shop_price;
        }
        _this.setData({
          res: res.data.info,
        })
      }
    });
    // 滚动加载- 生命周期函数--监听页面加载
    wx.getSystemInfo({
      success: (res) => {
        this.setData({
          height: res.windowHeight
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
    var goodslists = wx.getStorageSync('hosList')
    this.setData({
      res: goodslists
    })
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
  //下拉刷新
  onPullDownRefresh: function() {
    wx.showNavigationBarLoading() //在标题栏中显示加载
    //模拟加载
    wx.startPullDownRefresh(

    ) //开始下拉 触发动画
    setTimeout(function() {
      wx.hideNavigationBarLoading() //完成停止加载
      wx.stopPullDownRefresh() //停止下拉刷新
    }, 1500);
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