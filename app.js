App({
  globalData: {
    userInfoAuth: 0,//0无状态，1用户已经授权用户信息，2用户拒绝授权用户信息
    // 用户信息
    userInfo: null,
    // 百度地图提供的AK串
    bmap_ak: '你的ak',
    // cur_city_id: '' // 用于记录城市ID，在切换城市时，将目标城市ID记录，需要时读取
  },

  // 监听初始化
  onLaunch: function () {

  },

  onShow: function () { },//监听显示（进入前台）
  onHide: function () { },//监听隐藏（进入后台：按home离开微信）

  // 设置所在地（城市）
  // setLocal: function (id, val) {
  //   wx.setStorageSync(id, val);//API：设置本地缓存，将数据存储在本地缓存中
  // },

  // 用户位置授权验证及操作
  checkUserLocation: function () {
    var that = this;
    // 获取授权信息
    wx.getSetting({
      success: function (res) {
        // 判断是否已经操作过授权操作
        if (res.authSetting.hasOwnProperty("scope.userLocation")) {
          if (res.authSetting["scope.userLocation"] == true) {
            // 已经授权位置信息，暂时无操作
          } else {
            // 没有授权位置信息，弹出选择框提示用户选择操作
            wx.showModal({
              title: '信息授权',
              content: '提示：位置授权暂未开启，无法获取相关信息',
              confirmText: '开启授权', 
              cancelText: '仍然拒绝',
              // confirmColor: '#345391',
              cancelColor: '#666',
              success: function (res) {
                if (res.confirm) {
                  // 用户选择“允许”，则开启授权页面
                  wx.openSetting({
                    fail: function () {
                      wx.showModal({
                        title: '操作失败',
                        content: '请到微信中自行设置授权操作',
                        confirmText: '知道了',
                        confirmColor: '#345391',
                        showCancel: false
                      })
                    }
                  })
                }
                // 用户选择“拒绝”，则弹层提示无法获取数据
                if (res.cancel) {
                  wx.showModal({
                    title: '授权失败',
                    content: '无法使用定位权限，不能获取到数据',
                    confirmText: '知道了',
                    confirmColor: '#345391',
                    showCancel: false
                  })
                }
              }
            })
          }
        } else {
          // 还没有操作位置授权，暂时不做处理
        }
      }
    })
  }

})