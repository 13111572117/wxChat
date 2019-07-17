// pages/ConfirmationOfOrders/ConfirmationOfOrders.js
var util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 配送
    isShow: false,
    // 取货
    isShow2: true,
    // 姓名、电话
    isShow3: false,
    // 点单编号
    orderNumber: '',
    // 电话
    iphone: '',
    // 当前系统时间
    // time:'',
    // 遮罩
    isShow4: false,
    // 下单窗口
    // isShow5:false,
    // 全局变量
    ordersList: [],
    // 接受到的购物车页的全局变量
    oncarinfo:[],
    // 价格
    prices: "",
    // 随机订单编号
    ordernumber: '',
    promotePrice:''
  },
  // 配送
  peisong() {
    // let isShow = !this.data.isShow
    this.setData({
      isShow: false,
      isShow2: true,
      isShow3: false
    })
  },
  // 取货
  quhuo() {
    // let isShow2 = !this.data.isShow2
    this.setData({
      isShow: true,
      isShow2: false,
      isShow3: true
    })
  },
  // 绑定电话
  isIphone(e) {
    let iphone = this.data.iphone
    this.setData({
      iphone: e.detail.value
    })
  },
  // 提交订单
  addOrder() {
    // 调用函数时，传入new Date()参数，返回值是日期和时间
    var time = util.formatTime(new Date());
    // 再通过setData更改Page()里面的data，动态更新页面的数据
    // let ordernumber = this.data.orderNumber
    // 点击生成随机订单编号
    var code;
    //首先默认code为空字符串
    code = '';
    //设置长度，这里看需求，我这里设置了4
    var codeLength = 16;
    //设置随机字符
    var random = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9)
    console.log(random)
    //循环codeLength 我设置的4就是循环4次
    for (var i = 0; i < codeLength; i++) {
      //设置随机数范围,这设置为0 ~ 36
      var index = Math.floor(Math.random() * 10);
      //字符串拼接 将每次随机的字符 进行拼接
      code += random[index];
    }
    this.setData({
      time: time,
      isShow4: true,
      //将拼接好的字符串赋值给展示的code
      orderNumber: code,
    })
    console.log("订单", this.data.orderNumber)
  },
  // 关闭下单窗口
  switch () {
    this.setData({
      isShow4: false
    })
  },
  // 确认下单
  ConfirmTheOrder(e) {
    // wx.requestPayment({
    //   timeStamp: '',
    //   nonceStr: '',
    //   package: '',
    //   signType: 'MD5',
    //   paySign: '',
    //   success(res) { },
    //   fail(res) { }
    // })
    wx.showToast({
      title: '成功下单',
      icon: 'success',
      duration: 1000
    })
    // let ordersList = this.data.ordersList
    // let temp = {
    //   image: e.currentTarget.dataset.image,
    //   name: e.currentTarget.dataset.name,
    //   price: this.data.prices,
    //   ordernumber: e.currentTarget.dataset.ordernumber,
    // }
    // ordersList.push(temp)
    // console.log(ordersList)
    // let text = getApp()
    // text.globalData.orderslist = ordersList
    // console.log(text.globalData.orderslist)
    this.setData({
      isShow4: false,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // 获取列表页的传值
    let promotePrice = this.data.promotePrice
    let prices = this.data.prices
    // console.log(options.image, options.name, options.prices)
    // let prices = options.promote_price * options.count
    prices = options.prices * 0.02
    console.log("运费", prices)
    // let promotePrices = options.promote_price * 0.02
    // promotePrices = promotePrices.toFixed(2)
    this.setData({
      image: options.image,
      name: options.name,
      promotePrice: options.prices,
      // promotePrices: promotePrices,
      count: options.count,
      prices: prices
    })
    // console.log("运费", promotePrice)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    /**
     * 接收全局变量
     */
    console.log("result", this.data.result)
    let allgoods = []

    // for (let i = 0; i < getApp().globalData.userInfo.length;i++){
    //   allgoods[i] = ''
    // }
    this.setData({
      oncarinfo: getApp().globalData.ordersCarts,
    })
    console.log(getApp().globalData.ordersCarts)
    console.log(this.data.oncarinfo)
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function(options) {},

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