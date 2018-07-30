//aboutme.js
//获取应用实例
const app = getApp()

Page({
  data: {
    info: {
      id: 1,
      title: "aaaa",
      img: "/images/weicms/1.png",
      cTime: "2018-07-25 14:50",
      content: "如在下边这个例子中，点击 inner view 会先后调用handleTap3和handleTap2(因为tap事件会冒泡到 middle view，而 middle view 阻止了 tap 事件冒泡，不再向父节点传递)，点击 middle view 会触发handleTap2，点击 outer view 会触发handleTap1。"
    }
  },

  onLoad: function(options) {
    var that = this
    console.log(options);
    wx.request({
      url: 'http://localhost/weicms/index.php?s=/addon/Cms/Cms/getDetail', //仅为示例，并非真实的接口地址
      data: { id: options.id},
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        that.setData({
          info: res.data
        })
      }
    })
  }

})