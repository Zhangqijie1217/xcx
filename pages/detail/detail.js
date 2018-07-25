
//aboutme.js
//获取应用实例
const app = getApp()

Page({
    data: {
      img: '/images/weicms/logo.png',
      title: '圆梦云科技有限公司',
      intro: '深圳市圆梦云科技有限公司是一家具有创新思维的互联网公司，主要提供的服务有互联网软件开发，包括微信公众平台服务，企业社区，商城产品，教育培训等。公司由有多年互联网经验的人员组成，致力于提供优质的互联网产品和服务，是国内最具实力的微信开发商、社区开发商。旗下主要开源产品WeiPHP下载量达百万级别，被众多开发者安装使用。',
      contab: '联系方式',
      address: '北京市苏州街3号',
      mobile: '18311023927',
      email: '978323313@qq.com'
    },
    //事件处理函数
    bindViewTap: function () {
        wx.navigateTo({
            url: '../logs/logs'
        })
    },
    onLoad: function () {
        if (app.globalData.userInfo) {
            this.setData({
                userInfo: app.globalData.userInfo,
                hasUserInfo: true
            })
        } else if (this.data.canIUse) {
            // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
            // 所以此处加入 callback 以防止这种情况
            app.userInfoReadyCallback = res => {
                this.setData({
                    userInfo: res.userInfo,
                    hasUserInfo: true
                })
            }
        } else {
            // 在没有 open-type=getUserInfo 版本的兼容处理
            wx.getUserInfo({
                success: res => {
                    app.globalData.userInfo = res.userInfo
                    this.setData({
                        userInfo: res.userInfo,
                        hasUserInfo: true
                    })
                }
            })
        }
    },
    getUserInfo: function (e) {
        console.log(e)
        app.globalData.userInfo = e.detail.userInfo
        this.setData({
            userInfo: e.detail.userInfo,
            hasUserInfo: true
        })
    }
})
