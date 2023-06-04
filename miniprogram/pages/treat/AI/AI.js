const app = getApp();
var arr = [];

Page({
  data: {
    value: "",
    array: []
  },

  oninput: function (e) {
    this.setData({
      value: e.detail.value
    });
  },

  scroll: function () {
    wx.pageScrollTo({
      selector: '.scro',
      duration: 300,
      success: (res) => {
        console.log(res);
      },
      fail: (res) => {
        console.log(res);
      }
    });
  },

  finish: function (e) {
    if (e.detail.value) {
      arr.push(e.detail.value);
      this.gptAPI(e.detail.value);
      this.setData({
        array: arr,
        value: ''
      });
      this.scroll();
    }
  },

  cut: function () {
    wx.showToast({
      title: '注意',
      icon: 'none',
      duration: 2000
    });
  },

  click: function () {
    if (this.data.value.length !== 0) {
      arr.push(this.data.value);
      this.gptAPI(this.data.value);
      this.setData({
        array: arr,
        value: ''
      });
      this.scroll();
    }
  },

  gptAPI: function (input) {
    var _this = this;
    var apiKey = "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"; // 替换为您的OpenAI API密钥

    wx.request({
      url: 'https://api.openai.com/v1/engines/davinci-codex/completions',
      method: 'POST',
      header: {
        'Authorization': 'Bearer ' + apiKey,
        'Content-Type': 'application/json'
      },
      data: JSON.stringify({
        'model': 'davinci-codex',
        'prompt': input,
        'max_tokens': 100,
        'temperature': 0.8,
        'top_p': 1.0,
        'frequency_penalty': 0.0,
        'presence_penalty': 0.0
      }),
      success: function (res) {
        var gptResponse = res.data.choices[0].text.trim();
        arr.push(gptResponse);
        _this.setData({
          array: arr
        });
        _this.scroll();
      },
      fail: function (err) {
        console.log(err);
      }
    });
  }
});
