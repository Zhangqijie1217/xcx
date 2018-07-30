//lists.js
//获取应用实例
const app = getApp()

Page({
  data: {
    newsList: [],
    lastid: 0
  },
  loadData: function (lastid){
    var limit = 2
    var that = this
    wx.request({
      url: 'http://localhost/weicms/index.php?s=/addon/Cms/Cms/getList', //仅为示例，并非真实的接口地址
      data: {lastid: lastid,limit: limit},
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        var len = res.data.length
        that.setData({lastid: res.data[len-1].id})

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
  },
  onLoad: function() {
    var that = this

    // getList
    this.loadData(0);
    
  },
  toastChange: function() {
    this.setData({toastHidden:true})
    console.log('123');
  }
})