//lists.js
//获取应用实例
const app = getApp()

Page({
  data: {
    newsList: [],
    lastid: 0
  },
  
  loadData: function (lastid) {
    var limit = 2
    var that = this
    wx.request({
      url: 'http://localhost/weicms/index.php?s=/addon/Cms/Cms/getList', //仅为示例，并非真实的接口地址
      data: { lastid: lastid, limit: limit },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        if(!res.data){
          thar.setData({
            toastHidden:false
          })
          return false
        }
        var len = res.data.length
        that.setData({ lastid: res.data[len - 1].id })

        var dataArr = that.data.newsList
        var newData = dataArr.concat(res.data);

        that.setData({
          newsList: newData
        })
      }
    })
  },
  loadMore: function (event) {
    var id = event.currentTarget.dataset.lastid
    this.loadData(id);
    wx.showToast({
      title: '加载中',
      icon: 'loading',
      duration: 100
    })
  },
  onLoad: function () {
    var that = this
    // getList
    this.loadData(0);
  },
  alertbtn: function () {
    wx.showToast({
      title: '没有更多文章了',
      icon: 'success',
      duration: 1200
    })
  },
  morebtn: function () {
    wx.showToast({
      title: '加载中',
      icon: 'loading',
      duration: 1200
    })
  }

})