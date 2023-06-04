// app.js

App({
  onLaunch() {
    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
  },
  getNavHeight: function () {
    let height = wx.getMenuButtonBoundingClientRect().top
    if (!height) {
      let sysinfo = wx.getSystemInfoSync()
      let statusBarHeight = sysinfo.statusBarHeight
      let isiOS = sysinfo.system.indexOf('iOS') > -1
      if (!isiOS) {
        height = statusBarHeight + 6;
      } else {
        height = statusBarHeight + 8;
      }
    }
    return height
  },
  globalData: {
    userInfo: null
  }

})
