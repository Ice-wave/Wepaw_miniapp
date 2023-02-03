// pages/shop/shop.js

//const app = getApp()
//var scrollTop = 0

Page({

  /**
   * 页面的初始数据
   */
  data: {
    active: 0,
    scrollPos: 0,
    navList: [
      {
        id: 12580,
        title: "健康"
      },
      {
        id: 12580,
        title: "主食"
      },
      {
        id: 12580,
        title: "零食"
      },
      {
        id: 12580,
        title: "玩具"
      },
      {
        id: 12580,
        title: "服饰"
      },
      {
        id: 12580,
        title: "日用"
      },
    ]
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
    if (typeof this.getTabBar === 'function' &&
      this.getTabBar()) {
      this.getTabBar().setData({ active: 1 })
    }
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
    
  },
  switchTab: function (e) {
    const index = e.currentTarget.dataset.index
      if (index != this.data.active) {
        this.setData({
          active: index
        })
      }
  },
  backTop() {
    this.setData({
      scrollPos: 0
    })
  },
  goToCartPage(){
    wx.navigateTo({
      url: './cart/cart',
      })
  },
  goToGoodsPage(){
    wx.navigateTo({
      url: './goods/goods',
      })
  },
  autoImage : function(e) {
    var that = this;
    var  originalWidth  = e.detail.width;
    var originalHeight = e.detail.height;
    var imageWidth = 0;
    var imageHeight = 0;
    wx.getSystemInfo({
      complete: (res) => {
        var winWidth = res.windowWidth;
        if (originalWidth > winWidth) {
          var autoWidth = winWidth;
          var autoHeight = originalHeight * ratio;
          var ratio = 375.2 / 150; // banner ratio
          imageWidth = autoWidth + 'px';
         imageHeight = autoHeight + 'px';
        } else {
          imageWidth = originalWidth + 'px';
          imageHeight = originalHeight + 'px';
        }
        that.setData({
          imageWidth: imageWidth,
          imageHeight: imageHeight
        });
      }
    })
  }
})