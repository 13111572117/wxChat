//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    height: '',
    res: '',
    goods: '',
    lists: '',
    imgUrls: [
      '../../images/download.png',
      '../../images/banner3.jpg',
      '../../images/download.jpg',
      '../../images/banner1.jpg',
    ],
    indicatorDots: true,
    indicatorActiveColor: '#ff4f4c',
    vertical: true,
    autoplay: true,
    interval: 3500,
    duration: 1000,
    isJiagou: false,
    iszhezhao: false,
    // 购物车定义全局变量
    coverlist: [],
    addmall: {},
    count: 1,
    // 订单
    orders: [],
    modelimage: '',
    modelname: '',
    modelpromoteprice: ''
  },
  // 扫一扫
  Scan() {
    wx.scanCode({
      success(res) {
        console.log(res)
      }
    })
  },

  // 搜索

  input1(e) { //输入实时调用搜索方法
    this.search(e.detail.value)
  },
  confirm1(e) { //软键盘搜索按钮调用
    this.search(e.detail.value)
    wx.navigateTo({
      url: '/pages/ListofGoods/ListofGoods',
    })
  },
  search(key) { //搜索方法 key 用户输入的关键字
    console.log(key)
    const list = this.data.res
    var arr = []; //定义一个空数组 用于临时存放查找到的数据
    for (var i in list) {
      // console.log(list[i].g_name)
      if (list[i].g_name.indexOf(key) >= 0) { //判断数组中是否有用户输入的内容
        arr.push(list[i])
      }
    }
    // 创建一个缓存
    var hosList = wx.getStorageSync('hosList') || []
    // 把查询出来的数据存入缓存
    try {
      wx.setStorageSync('hosList', arr)
    } catch (e) {
      console.log(e)
    }
  },

  // 商品列表
  ListofGoods(list) {
    let listid = list.currentTarget.dataset.listid;
    console.log(listid)
    wx: wx.navigateTo({
      url: `/pages/ListofGoods/ListofGoods?listid=${listid}`,
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  },
  // 公告
  Notice() {
    wx.showModal({
      title: '公告',
      content: '请在备注中填写卡片内容和配送日期，不可指定送达时间（节日期间订单太多，专业配送人员会联系收花人方便的时间尽快配送，保证当天送达，敬请谅解）',
      showCancel: false,
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
    // console.log(this.data.count)
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

    // 成功加购提示
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
    // coverList.push(temp)
    console.log(coverList)
    var text = getApp() //定义全局变量
    text.globalData.userInfo.push(temp) //拼接好的数据赋值给全局
    // console.log(text.globalData.userInfo)
    this.setData({
      isJiagou: false,
      iszhezhao: false,
    })
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
  },
  // 跳转至提交订单
  ConfirmationOfOrders(e) {
    // 定义所需传值的变量
    let image = this.data.modelimage;
    // console.log(image)
    let name = this.data.modelname;
    // console.log(name)
    let promote_price = this.data.modelpromoteprice;
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
  // 跳转至商品详情
  CommodityDetails(details) {
    // 定义所需传值的变量
    let id = details.currentTarget.dataset.id;
    let image = details.currentTarget.dataset.image;
    console.log(image)
    let name = details.currentTarget.dataset.name;
    let promote_price = details.currentTarget.dataset.promote_price;
    let g_number = details.currentTarget.dataset.g_number;
    let sale_number = details.currentTarget.dataset.sale_number;
    wx.navigateTo({
      // 将所定义变量传入详情页
      url: `/pages/CommodityDetails/CommodityDetails?id=${id}&image=${image}&name=${name}&promoteprice=${promote_price}&g_number=${g_number}&sale_number=${sale_number}`
    })
  },
  // 跳转至购物车页面
  ShoppingCart() {
    wx.switchTab({
      url: '/pages/ShoppingCart/ShoppingCart',
    })
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
    if (cont.length >= 100) {
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
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function() {
    // 轮播
    const _this = this;
    wx.request({
      url: "https://604660.ixiaochengxu.cc/index.php?s=/addon/DuoguanShop/Api/getIndexDataList&other_openid=&user_openid=undefined&version=108&utoken=&token=gh_d83bbebf45cc",
      data: {},
      header: {
        'content-type': 'json'
      },
      success: function(res) {
        console.log(res.data)
        _this.setData({
          goods: res.data.info,
          lists: res.data.info.index_cate_list,
          res: res.data.info.index_new_list
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
  getUserInfo: function(e) {

  },
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
})