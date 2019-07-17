// 默认声明一个函数记录list显示的数据---删除状态
var initdata = function(that) {}
var app = new getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    checked: false,
    result: [],
    value1: 1,
    prices: 0,
    // oncarinfo: [{
    //     id: 1,
    //     name: 'safasfasfasfgaskfgaskfga',
    //     price: '111'
    //   },
    //   {
    //     id: 2,
    //     name: 'afadgadghadhadgadgadhah',
    //     price: '171'
    //   },
    //   {
    //     id: 3,
    //     name: 'zbzbzbzx',
    //     price: '161'
    //   },
    //   {
    //     id: 4,
    //     name: 'safasfasfasfgaskfgaskfga',
    //     price: '121'
    //   },
    //   {
    //     id: 5,
    //     name: 'bdhsfhs',
    //     price: '141'
    //   },
    // ],
    position: 'left',
    addOrminus: "",
    oncarinfo: [],
  },
  // 全选
  onChange1(event) {
    console.log(event)
    // let results = !this.data.results
    console.log("this.data.oncarinfo", this.data.oncarinfo.length)
    let temp = []
    let tempprices = 0;
    console.log(temp)
    if (event.detail === true) {
      console.log("this.data.oncarinfo", this.data.oncarinfo.length)
      for (let i = 0; i < this.data.oncarinfo.length; i++) {
        temp.push(`${i}`)
      }
      // 价格
      temp.forEach(item => {
        console.log(item)
        tempprices += Number(this.data.oncarinfo[item].price)
      })
      tempprices = tempprices * 100
      console.log(tempprices)
      this.setData({
        prices: tempprices
      })
      console.log(this.data.prices)
    }
    this.setData({
      checked: event.detail,
      result: temp,
      prices: tempprices
      // results: results
    });
  },
  // 复选框-当前商品选中事件
  onChange(event) {


    var detail = JSON.parse(JSON.stringify(event.detail))
    var a = detail
    var b = getApp().globalData.userInfo
    var c = []
    // if (a.length > b.length) {
    a = a.filter(item => item !== '')
    // }
    console.log("a", a)
    for (var i = 0; i < b.length; i++) {
      c[i] = ''
      for (var j = 0; j < a.length; j++) {
        if (i === Number(a[j])) {
          console.log(i, Number(a[j]))
          c[i] = a[j]
        } else {
          // console.log(i)
        }
      }
    }
    console.log("c", c, event.detail)

    for (var i = 0; i < c.length; i++) {
      if (c[i] === '') {
        console.log(i)
        c[i] = `goods${i}`
      }
    }


    // let result = event.detail.sort()
    console.log(event)
    this.setData({
      result: c //选中的商品
      // result: this.data.result
    });
    /**
     * 如果所有取消 全选取消
     */
    if (event.detail.filter(item => !item.includes("goods")).length != this.data.oncarinfo.length) {
      this.setData({
        checked: false
      })
    }
    /**
     * 如果 选中数组长度 等于 渲染列表长度 全选
     */
    console.log("this.data.oncarinfo", this.data.oncarinfo.length, "event.detail", event.detail)
    /**
     * 全选
     */
    if (event.detail.filter(item => !item.includes("goods")).length === this.data.oncarinfo.length) {
      this.setData({
        checked: true
      })
    }
    if (event.detail) {
      let temp = 0;
      event.detail.forEach(item => {
        console.log(item)
        if (!item.includes('goods')) {
          temp += Number(this.data.oncarinfo[item].price)
        }
      })
      temp = temp * 100
      this.setData({
        prices: temp,
        result: c
        // result: event.detail
      })
      // console.log(temp)
    }
  },
  // 计数器
  /**
   * 添加商品数量
   */
  onChange2(event) {
    console.log(event, event.detail, event.currentTarget.dataset.index)
    // let index = event.currentTarget.dataset.index
    // let temp = this.data.oncarinfo
    // temp[index].price = event.detail * temp[index].price
    // this.setData({
    //   oncarinfo: temp
    // })

    // return false
  },
  /**
   * 点击增加按钮
   */
  plus(event) {
    console.log(event)
    let index = event.currentTarget.dataset.index
    let temp = this.data.oncarinfo
    console.log(temp[index].price)
    temp[index].count = event.detail
    console.log(temp[index].price / (event.detail - 1), event.detail, temp[index].price)
    temp[index].price = temp[index].price + temp[index].price / (event.detail - 1)
    console.log(temp[index].price)
    /**
     * 改变提交订单金额
     */
    if (this.data.result) {
      let temp = 0;
      this.data.result.forEach(item => {
        console.log(item)
        temp += Number(this.data.oncarinfo[item].price)
      })
      temp = temp * 100
      this.setData({
        prices: temp
      })
      // console.log(temp)
    }
    this.setData({
      oncarinfo: temp
    })
  },
  /**
   * 点击减少按钮
   */
  minus(event) {
    // console.log(event)
    let index = event.currentTarget.dataset.index
    let temp = this.data.oncarinfo
    // console.log(temp[index].price)
    temp[index].count = event.detail
    // console.log(temp[index].price / (event.detail + 1))
    temp[index].price = temp[index].price - temp[index].price / (event.detail + 1)
    // console.log(temp[index].price)
    /**
     * 改变提交订单金额
     */
    if (this.data.result) {
      let temp = 0;
      this.data.result.forEach(item => {
        // console.log(item)
        temp += Number(this.data.oncarinfo[item].price)
      })
      temp = temp * 100
      this.setData({
        prices: temp
      })
      // console.log(temp)
    }
    this.setData({
      oncarinfo: temp
    })
    console.log(this.data.oncarinfo)
  },
  //点击删除按钮事件 
  delItem: function(event) {
    var that = this;
    let index = event.currentTarget.dataset.index
    // console.log(this.data.oncarinfo)
    let temp = this.data.oncarinfo[index].price
    // console.log(temp)
    let prices = this.data.prices
    // console.log(prices)
    prices = prices - temp * 100
    // console.log(prices)
    // 打印出当前选中的index
    // console.log(event.currentTarget.dataset.index);
    console.log("result", this.data.result)
    // 获取到列表数据
    var oncarinfo = that.data.oncarinfo;
    var text = getApp() //定义全局变量
    console.log(text.globalData)
    let alllist = text.globalData.userInfo
    // alllist[event.currentTarget.dataset.index].
    let resultindex = this.data.result.indexOf(this.data.result[event.currentTarget.dataset.index])
    console.log("删除序列号index", resultindex, event.currentTarget.dataset.index)
    // if(resultindex === -1){
    //   for (let i = 0; i < this.data.result.length; i++) {
    //     console.log("i>resultindex", i > resultindex)
    //     if (i > resultindex) {
    //       console.log(i, this.data.result[i], `${Number(this.data.result[i]) - 1}`)
    //       this.data.result[i] = `${Number(this.data.result[i]) - 1}`
    //     }
    //   }
    //   oncarinfo.splice(event.currentTarget.dataset.index, 1);
    // }else{
    for (let i = 0; i < this.data.result.length; i++) {
      console.log("i>resultindex", i > resultindex)
      if (i > resultindex) {
        console.log(i, this.data.result[i], `${Number(this.data.result[i]) - 1}`)
        this.data.result[i] = `${Number(this.data.result[i]) - 1}`
        console.log("this.data.result", this.data.result)
      } else {

      }
    }
    this.data.result.splice(resultindex, 1)
    oncarinfo.splice(event.currentTarget.dataset.index, 1);
    console.log("this.data.oncarinfo", this.data.oncarinfo)
    // }
    console.log("resultindex", resultindex)
    // this.data.result.splice(resultindex,1)

    // console.log(oncarinfo)
    /**
     * 如果删除所有 全选取消
     */
    // console.log("event.detail",event.detail)
    if (this.data.oncarinfo.length === 0) {
      this.setData({
        checked: false
      })
    }
    // 重新渲染
    that.setData({
      oncarinfo: oncarinfo,
      prices: prices,
      result: this.data.result,
      checked: this.data.checked
    })
    var oncarinfo = that.data.oncarinfo
    // console.log("list", list)
    for (var i = 0; i < oncarinfo.length; i++) {
      oncarinfo[i].shows = ""
    }
    // initdata(that)
  },
  // 提交订单
  onClickButtons() {
    let oncarinfo = this.data.oncarinfo
    let result = this.data.result.filter(item => !item.includes("goods")) //获取result值并过滤掉result中的goods值
    console.log("qqq111",result)
    let prices = this.data.prices / 100
    if (oncarinfo === null) {
      wx.showToast({
        title: '还没有订单！',
        icon: 'loading',
        duration: 2000
      });
    } else {
      console.log("有订单")
      if (prices == 0) {
        console.log("没选订单")
        wx.showToast({
          title: '请选择商品！',
          icon: 'none',
          duration: 2000
        });
      } else {
        console.log("选订单")
        wx.navigateTo({
          url: '/pages/ConfirmationOfOrders2/ConfirmationOfOrders2?prices=' + prices,
        })
        let aaa = []
        var text = getApp() //定义全局变量
        result.forEach(function(item,index){
          aaa.push(oncarinfo[item])
          console.log("www",item)
        })
        text.globalData.ordersCarts = aaa //拼接好的数据赋值给全局
        console.log(text.globalData.ordersCarts)
      }
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

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
    /**
     * 接收全局变量
     */
    console.log("result", this.data.result)
    let allgoods = []

    // for (let i = 0; i < getApp().globalData.userInfo.length;i++){
    //   allgoods[i] = ''
    // }
    this.setData({
      oncarinfo: getApp().globalData.userInfo,
      result: this.data.result,
      checked: this.data.checked
    })
    console.log(getApp().globalData.userInfo)
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