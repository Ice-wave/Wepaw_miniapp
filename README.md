# Wepaw_miniapp
mini-app of wechat

## 2023/1/30更新  
基础配置及五大页面确定  
Joke


## 2023/1/31更新
引入vant组件库，具体方法 https://vant-contrib.gitee.io/vant-weapp/#/home  
tabBar图标等引入  
Joke  

## 2023/2/1更新
引入iconfont字体库，位于components文件夹中，使用方法 https://www.iconfont.cn/help/detail?spm=a313x.7781069.1998910419.27&helptype=code  
相关项目链接  https://github.com/dsppman/chongjiji  
Joke

## 2023/2/2更新  
iconfont配置方法：选择项目中 收起在线链接 旁小三角 下拉框 查看json配置  
将unicode代码按照格式复制在iconfont.wxss中  
如 .icon-jiagebaohu:before {
  content: "\e603";
}  
对应的就是‘价格保护’图标  
注意iconfont项目中加入了新图标之后url也需要更新  
在项目Unicode中复制三行url  
同时在相应页面的json文件中加入 "usingComponents": {
    "iconfont":"../../components/iconfont/iconfont"
   }  
vant组件的配置也是同理，app.json中加入似乎并不起作用  
Joke   

## 2023/2/3更新  
加入购物车按钮，跳转购物车页  
加入个人中心页  
调整主题色 theme 详情参考color.wxss  
Joke


