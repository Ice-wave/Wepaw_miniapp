const app = getApp()
Page({
  data: {
    latitude: 26.07421,
    longitude: 119.29647
  },
  /*
  onLoad: function(options) {
    let that = this
    wx.getLocation({
      type: 'gcj02',
      success: function(res) {
        var latitude = res.latitude
        var longitude = res.longitude
        that.setData({
          latitude: latitude,
          longitude: longitude
        })}
      })},*/
  myLocation(e){
    let that = this
    wx.getLocation({
      type: 'gcj02',
      success: function(res) {
        var latitude = res.latitude
        var longitude = res.longitude
        console.log(latitude+","+longitude)
        that.setData({
          latitude: latitude,
          longitude: longitude
        })}
      })
      },

  buttonSearch(e){
    var _this = this
    var allMarkers = []
    //通过wx.request发起HTTPS接口请求
    wx.request({
      //地图WebserviceAPI地点搜索接口请求路径及参数（具体使用方法请参考开发文档）
      url: 'https://apis.map.qq.com/ws/place/v1/search?page_index=1&page_size=20&boundary=region(福州市,0)&keyword=宠物&key=SOSBZ-BZQCG-KS4QU-Q7TGY-W664H-4TFHP',
      success(res){
        var result = res.data
        var pois = result.data
        for(var i = 0; i< pois.length; i++){
          var title = pois[i].title
          var info = pois[i].tel
          var lat = pois[i].location.lat
          var lng = pois[i].location.lng
  
          console.log(title+info+"\n"+lat+","+lng)
          var marker = {
            id: i,
            latitude: lat,
            longitude: lng,
            width:20,
            height:20,
            callout: {
              // 点击marker展示title
              content: title+"\n"+info+"\n",
              display: 'ALWAYS',
              color: '#333333',
              bgColor: '#E6E8FA',
              padding: 3,
              borderRadius: 10,
              borderColor: '#333333 ',
              fontSize: 10,
              borderWidth: 1,
              textAlign: 'center',
            }
          }
          allMarkers.push(marker)
          marker = null
        }
        
        _this.setData({
          latitude: allMarkers[0].latitude,
          longitude: allMarkers[0].longitude,
          markers: allMarkers
        })
      }
    })
  },

  buttonSearch2(e){
    var _this = this
    var allMarkers2 = []
    //通过wx.request发起HTTPS接口请求
    wx.request({
      //地图WebserviceAPI地点搜索接口请求路径及参数（具体使用方法请参考开发文档）
      url: 'https://apis.map.qq.com/ws/place/v1/search?page_index=1&page_size=20&boundary=region(福州市,0)&keyword=公园&key=SOSBZ-BZQCG-KS4QU-Q7TGY-W664H-4TFHP',
      success(res){
        var result = res.data
        var pois = result.data
        for(var i = 0; i< pois.length; i++){
          var title = pois[i].title
          var lat = pois[i].location.lat
          var lng = pois[i].location.lng
          console.log(title+","+lat+","+lng)
          var marker = {
            id: i,
            latitude: lat,
            longitude: lng,
            width:20,
            height:20,
            callout: {
              // 点击marker展示title
              content: title,
              display: 'ALWAYS',
              color: '#333333',
              bgColor: '#E6E8FA',
              padding: 3,
              borderRadius: 10,
              borderColor: '#333333 ',
              fontSize: 10,
              borderWidth: 1,
              textAlign: 'center',
            }
          }
          allMarkers2.push(marker)
          marker = null
        }
        
        _this.setData({
          latitude: allMarkers2[0].latitude,
          longitude: allMarkers2[0].longitude,
          markers: allMarkers2
        })
      }
    })
  },

  buttonDriving(e){
    var _this = this
    //通过wx.request发起HTTPS接口请求
    wx.request({
      //地图WebserviceAPI驾车路线规划接口 请求路径及参数（具体使用方法请参考开发文档）
      url: 'https://apis.map.qq.com/ws/direction/v1/driving/?key=SOSBZ-BZQCG-KS4QU-Q7TGY-W664H-4TFHP&from=26.07421,119.29647&to=26.060542,119.288969',
      success(res){
        var result = res.data.result
        var route = result.routes[0]
        
        var coors = route.polyline, pl = [];
          //坐标解压（返回的点串坐标，通过前向差分进行压缩）
          var kr = 1000000;
          for (var i = 2; i < coors.length; i++) {
            coors[i] = Number(coors[i - 2]) + Number(coors[i]) / kr;
          }
          //将解压后的坐标放入点串数组pl中
          for (var i = 0; i < coors.length; i += 2) {
            pl.push({ latitude: coors[i], longitude: coors[i + 1] })
          }
          _this.setData({
            // 将路线的起点设置为地图中心点
            latitude:pl[0].latitude,
            longitude:pl[0].longitude,
            // 绘制路线
            polyline: [{
              points: pl,
              color: '#056608',
              width: 5,
              borderColor: '#2f693c',
              borderWidth: 1
            }]
          })
      }
    })
  },

  weather(e){
    wx.navigateTo({
      url: 'https://weathernew.pae.baidu.com/weathernew/pc?query=%E7%A6%8F%E5%BB%BA%E7%A6%8F%E5%B7%9E%E5%A4%A9%E6%B0%94&srcid=4982'
    });
  }

})