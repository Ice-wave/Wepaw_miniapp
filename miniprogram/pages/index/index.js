// index.js
// 获取应用实例
const app = getApp()
/*  系统原本内容 注释掉 后期有用可使用
Page({
  data: {
    motto: 'WePaw World',
    time: (new Date()).toString(),
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    canIUseGetUserProfile: false,
    canIUseOpenData: wx.canIUse('open-data.type.userAvatarUrl') && wx.canIUse('open-data.type.userNickName') // 如需尝试获取用户信息可改为false
  },
  // 事件处理函数
  bindViewTap() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad() {
    if (wx.getUserProfile) {
      this.setData({
        canIUseGetUserProfile: true
      })
    }
  },
  getUserProfile(e) {
    // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认，开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
    wx.getUserProfile({
      desc: '展示用户信息', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        console.log(res)
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    })
  },
  getUserInfo(e) {
    // 不推荐使用getUserInfo获取用户信息，预计自2021年4月13日起，getUserInfo将不再弹出弹窗，并直接返回匿名的用户个人信息
    console.log(e)
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
*/

Page({

  data: {
    active: 1,
    pos: 0,
    scrollPos: 0,
    
    list: [
      {
        title: "市集",
        pos: -100,
      },
      {
        title: "社区",
        pos: -3,
      },
      {
        title: "Meta",
        pos: 98,
      },
    ],
    rowGridItems: [{
      imgUrl: "../../images/猫咪.png",
    },
    {
      imgUrl: "../../images/猫咪.png",
    },
    {
      imgUrl: "../../images/猫咪.png",
    },
    {
      imgUrl: "../../images/猫咪.png",
    },
    {
      imgUrl: "../../images/猫咪.png",
    }],

    rowGridItems2: [{
      imgUrl: "../../images/小狗.png",
    },
    {
      imgUrl: "../../images/小狗.png",
    },{
      imgUrl: "../../images/小狗.png",
    },
    {
      imgUrl: "../../images/小狗.png",
    }

  
  
  ]
  },

  goToSearchPage: function(param){
    wx.navigateTo({
      url: '../search/search',
      })},
  
  goToCommPage: function(param){
    wx.navigateTo({
      url: './components/community/community',
          })},


  changeNavTab(e) {
    let index
    if (e.detail.source == "touch") {
      index = e.detail.current;
    } else if (e.currentTarget.dataset.index != null) {
      index = e.currentTarget.dataset.index
    }
    if (index != null && index != this.data.active) {
      console.log("change navBar tab")
      this.setData({
        active: index,
        pos: this.data.list[index].pos,
      })
    }
  },
  onShow: function () {
    if (typeof this.getTabBar === 'function' &&
      this.getTabBar()) {
      this.getTabBar().setData({ active: 1 })
    }
  }
})