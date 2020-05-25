const app = getApp();
var bmap = require('../../utils/bmap-wx.min.js');
Page({
    data: {
        weatherData: '',
        title: ''
    },
    onLoad: function() {
        var that = this;
        var BMap = new bmap.BMapWX({
          ak: app.globalData.bmap_ak
        });
        var fail = function(data) {
            console.log('fail!!!!')
        };
        var success = function(data) {
            console.log('success!!!');
            var weatherData = data.currentWeather[0];
            weatherData = '城市：' + weatherData.currentCity + '\n' + 'PM2.5：' + weatherData.pm25 + '\n' +'日期：' + weatherData.date + '\n' + '温度：' + weatherData.temperature + '\n' +'天气：' + weatherData.weatherDesc + '\n' +'风力：' + weatherData.wind + '\n';
            that.setData({
                weatherData: weatherData
            });
        }
        BMap.weather({
            fail: fail,
            success: success
        });

        var random = Math.floor(Math.random() * 10);
        var context = ["你喜欢苹果汁、葡萄汁、西瓜汁、 还是我这个精神小伙汁。", "给你科普一下辣的级别：微辣、中辣、特辣、变态辣、我想你辣。", "给你科普一下鸭子的种类、达克鸭、小黄鸭、扁嘴鸭、我想你了鸭。", "送你一个指南针，免得你被我惯得找不着北。", "你知道我为什么不上天吗？为什么？因为地上有你啊。", "我最近老是犯困。熬夜了吧。没有，是为你所困。", "悟空会七十二变而我只会变两种。哪两种？变得更爱你爱你永不变。", "其实我想做一个坏人。为什么呢？因为我只想对你一个人好。", "你喜欢吃糖吗？喜欢呀。怪不得那么甜。", "见到你之后我想成为一种人。什么人？你的人。"];
        that.setData({
            title: context[random] + '\n'
        });
    }
})