// pages/shop/goods/goods.js

const app = getApp()
var scrollTop = 0


Page({

  /**
   * 页面的初始数据
   */
  data: {
    navHeight: app.getNavHeight(),
    topBarState: "hidden",
    buyBarState: "show",
    active: null,

    isLike: true,
    // banner
    imgUrls: [
      "../../../images/猫咪.png",
      "../../../images/小狗.png",
    ],
    indicatorDots: true, //是否显示面板指示点
    autoplay: true, //是否自动切换
    interval: 3000, //自动切换时间间隔,3s
    duration: 1000, //	滑动动画时长1s

    // 商品详情介绍
    detailImg: [
      "../../../images/猫咪.png",
      "../../../images/小狗.png",
    ],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const query = wx.createSelectorQuery()
    const that = this
    query.selectAll('.demo').boundingClientRect(function(res){
      let list = []
      console.log(res)
      for (let i = 0; i < res.length; i++) {
        const el = res[i];
        list.push({
          title: el.id,
          offset: el.top - that.data.navHeight - 42
        })
      }
      that.setData({
        navList: list
      })
    }).exec()
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

  onPageScroll: function (e) {
    if (e.scrollTop > 0) {
      if (e.scrollTop > 20 && e.scrollTop < 500) {
        const bannerHeight = 300 - this.data.navHeight - 42
        if (e.scrollTop < bannerHeight) {
          const t = (e.scrollTop - 20) / bannerHeight
          if (this.data.topBarState === "hidden") {
            this.setData({
              topBarState: "show",
              topBarOpacity: t
            })
          } else {
            this.setData({
              topBarOpacity: t
            })
          }
        } else {
          this.setData({
            topBarOpacity: 1
          })
        }
      }
      if (e.scrollTop > scrollTop) {
        console.log('下划')
        if (this.data.buyBarState === "show") {
          this.setData({
            buyBarState: "hidden"
          })
        }
      } else {
        console.log('上划')
        if (this.data.buyBarState === "hidden") {
          this.setData({
            buyBarState: "show"
          })
        }
      }
      let active = null
      for (let i = 0; i < this.data.navList.length; i++) {
        const el = this.data.navList[i];
        if (e.scrollTop >= el.offset) {
          active = i
        }
      }
      if (this.data.active != active) {
        this.setData({
          active: active
        })
      }
    } else {
      if (this.data.topBarState === "show") {
        this.setData({
          topBarState: "hidden"
        })
      }
      if (this.data.buyBarState === "hidden") {
        this.setData({
          buyBarState: "show"
        })
      }
    }
    scrollTop = e.scrollTop
  },
  switchTab: function (e) {
    const index = e.currentTarget.dataset.index
    wx.pageScrollTo({
      scrollTop: this.data.navList[index].offset
    })
  },
  previewImage: function (e) {
    var current = e.target.dataset.src;

    wx.previewImage({
      current: current, // 当前显示图片的http链接  
      urls: this.data.imgUrls // 需要预览的图片http链接列表  
    })
  },
    goToCartPage(){
      wx.navigateTo({
        url: '../cart/cart',
        })
    }
  
})