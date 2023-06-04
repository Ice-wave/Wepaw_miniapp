// pages/ugc/pet/pet.js
Page({
  data: {
    albumName: '',
    checked: false,
    state: "",
    show: false,
    showID: "",
    inputValue: "",
    label: [],
    content:"",
    location: "",
    imageList: [],
    video:{},
    theme: {
      color: '#1890FF',
      tabColor: '#BF8600',
    },
    obtnArry: [
      {
        name: "#爱宠",
        num: 0,
        selected: false,
      },
      {
        name: "#猫猫",
        num: 1,
        selected: false,
      },
      {
        name: "#狗狗",
        num: 2,
        selected: false,
      },
      {
        name: "#喵星人",
        num: 3,
        selected: false,
      },
    ]
  },
//同步输入框内容
  bindKeyInput(e) {
      this.setData({
        albumName: e.detail.value
      })
  },
// 选择标签并输入到label数组中
  dealTap:function(e){  
    let string = "obtnArry[" + e.target.dataset.index + "].selected";
    // const checkedicon = "obtnArry[" + e.target.dataset.index + "].selected"; 
    console.log(!this.data.obtnArry[e.target.dataset.index].selected);
    this.setData({
      [string]: !this.data.obtnArry[e.target.dataset.index].selected
    })
    let detailValue = this.data.obtnArry.filter(it => it.selected).map(it => it.name)
    this.setData({
      label: detailValue
    })
    console.log(this.data.label)
  },
 
//实时获取输入框的值
  bindValue(e){
    this.setData({
      inputValue: e.detail.value
    })
  },
//确定按钮，添加数组达到添加标签的作用
  onInputValue(){
    this.setData({ 
      show: false ,
      inputValue: this.data.inputValue
    });
    const inputValue = this.data.inputValue.trim();
  if (!inputValue) {
    // 如果输入的标签为空，不进行添加操作
    return;
  }
    const obtnArry = this.data.obtnArry;
    const exists = obtnArry.some((item) => item.name ===inputValue);
    if (exists) {
      // 如果输入的标签已经存在，不进行添加操作
      return;
    }
    const newData = { num: obtnArry.length, name: this.data.inputValue, selected: false };
    obtnArry.push(newData);//实质是添加lists数组内容，使for循环多一次
    this.setData({
      obtnArry,
      inputValue: '' // 添加成功后，清空输入框中的内容
    })
    console.log(this.data.inputValue)
  },

  // openImagePicker() {
  //   wx.showActionSheet({
  //     itemList: ['从相册中选择', '拍照'],
  //     success: (res) => {
  //       switch (res.tapIndex) {
  //         case 0:
  //           this.chooseImage('album');
  //           break;
  //         case 1:
  //           this.chooseImage('camera');
  //           break;
  //       }
  //     },
  //   });
  // },
  // chooseImage(sourceType) {
  //   wx.chooseMedia({
  //     count: 9,
  //     mediaType: ['image'],
  //     sourceType: [sourceType],
  //     camera: "back",
  //     success(res) {
  //       const tempFilePaths = res.tempFilePaths; // 获取到选中的图片路径
  //       console.log(res.tempFiles.size)
  //       this.setDate({
  //         imagePath: tempFilePaths[0], // 将路径更新到页面数据中
  //       })
  //     }
  //   })
  // },

  
  bindContent: function(e) {
    this.setData({content: e.detail.value})
  },

  // 清空照片或者图片
  clearInput: function(name){
    if (name != 'imageList') {
      this.setData({ imageList: [] })
    }
    if (name != 'video') {
      this.setData({ video: {} })
    }
  },

  // 选择照片
  chooseImage: function(e){
    var that = this;
    let surplus = 9 - this.data.imageList.length
    wx.chooseImage({
      count: surplus,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success: function(res){
        that.clearInput("imageList");
        that.addNewImage(res.tempFilePaths);
        wx.showToast({
          title: '上传成功！',
        })
      }
    })
  },

  addNewImage(imagePath){
    var list = this.data.imageList
    list = list.concat(imagePath)
    this.setData({
      imageList: list
    })
  },

  thisImage:function(e){
    let index = e.currentTarget.dataset.imageid;
    let list = this.data.imageList;
    wx.previewImage({
      urls: list,
      current: list[index]
    })
  },

  deleteImage: function(e){
    let index = e.currentTarget.dataset.imageid;
    let list = this.data.imageList;
    list.splice(index, 1)
    this.setData({
      imageList: list
    })
  },

  // 视频相关
  chooseVideo: function(e){
    wx.chooseVideo({
      sourceType: ['album', 'camera'],
      maxDuration: 60,
      camera: 'back',
      success:(res)=>{
        this.clearInput("video")
        this.setData({
          video:res
        });
        wx.showToast({
          title: '上传成功！',
        })
      }
    })
  },

  deleteVideo: function(e){
    this.setData({
      video:{}
    })
  },

  // 获取地理位置

  getCityName(address) {
    let city = undefined
    if (address) {
      let index0 = address.indexOf('省')
      let index1 = address.indexOf('市')
      if (index0 > 0 && index1 > 0 && index1 > index0 ) {
        city = address.substring(index0+1, index1+1)
      } else if (address.includes('北京市')) {
        city = '北京市'
      } else if (addr.includes('上海市')) {
        city = '上海市'
      } else if (addr.includes('天津市')) {
        city = '天津市'
      } else if (addr.includes('重庆市')) {
        city = '重庆市'
      }
    }
    return city
  },

  chooseLocation:function(e){
    wx.showLoading({
      title: '正在加载',
    })
    wx.chooseLocation({
      success:(res)=>{
        wx.hideLoading({
          success: (res) => {},
        })
        let address = ''; 
        let locName = res.name;
        let city = this.getCityName(res.address)
        if(city){
          address = city + '·' + locName
        }else{
          address = locName
        }
        this.setData({
          location: address
        })
      },
      fail:(res)=>{
        wx.hideLoading({
          success: (res) => {},
        })
      }
    })
  },

  deleteLocation:function(e){
    this.setData({
      location: ''
    })
  },
})