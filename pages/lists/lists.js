//lists.js
//获取应用实例
const app = getApp()

Page({
  data: {
    newsList: [],
    lastid: 0, //每条数据对应的索引
    isfirst: 1, //只让提示wifi弹窗显示第一次
    moreHidden: 'none'
  },

  loadData: function(lastid) {
    var limit = 5
    var that = this
    wx.request({
      url: 'http://localhost/weicms/index.php?s=/addon/Cms/Cms/getList', //仅为示例，并非真实的接口地址
      data: {
        lastid: lastid,
        limit: limit
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function(res) {
        if (!res.data) {
          that.setData({ moreHidden:'none' })
          wx.showToast({
            title: '没有更多了',
            icon: 'success',
            duration: 2000
          })
          return false
        }
        var len = res.data.length
        that.setData({
          lastid: res.data[len - 1].id //给lastid赋值
        })

        var dataArr = that.data.newsList
        var newData = dataArr.concat(res.data); //数据合并

        that.setData({ newsList: newData })
        that.setData({ moreHidden: '' })
      }
    })
  },
  loadMore: function(event) {
    var id = event.currentTarget.dataset.lastid
    var isfirst = event.currentTarget.dataset.isfirst

    wx.getNetworkType({
      success: function(res) {
        // 返回网络类型, 有效值：
        // wifi/2g/3g/4g/unknown(Android下不常见的网络类型)/none(无网络)
        var networkType = res.networkType
        if (networkType != 'wifi' && isfirst == '1') {
          wx.showModal({
            title: '温馨提示',
            content: '您当前使用的是流量',
            showCancel: false,
            confirmText: 'ok',
            success: function(res) {

            }
          })
        }
      },
      complete: function(res) {
        wx.showLoading({
          title: '加载中',
        })
        setTimeout(function() {
          wx.hideLoading()
        }, 1000)
      }
    })
    this.setData({
      isfirst: 0
    })
    this.loadData(id);
  },
  onLoad: function() {
    var that = this
    wx.showNavigationBarLoading()
    this.loadData(0);
  },
  onReady: function () {
    var that = this

    wx.setNavigationBarTitle({
      title: '文章列表'
    })
    wx.hideNavigationBarLoading()
  }
})