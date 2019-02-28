//index.js
import config from '../../config/index.js';
//获取应用实例
const app = getApp();

const handler = {
  data: {
    guessCityId: '',
    guessCity: '西安',
    hotCities: [],
    sortGroupCites: []
  },
  onLoad (options) {
    this.getGuessCity();
    this.getHotCity();
    this.getSortCity();
  },
  // 获取city信息
  getGuessCity () {
    wx.request({
      url: `${config.baseUrl}/v1/cities`, 
      data: {
        type: 'guess'
      },
      success: (res) => {
        let data = res.data;
        this.setData({
          guessCityId: data.id || ''
        });
      }
    })
  },
  getHotCity () {
    wx.request({
      url: `${config.baseUrl}/v1/cities`,
      data: {
        type: 'hot'
      },
      success: (res) => {
        let data = res.data;
        this.setData({
          hotCities: data || []
        });
      }
    })
  },
  getSortCity () {
    wx.request({
      url: `${config.baseUrl}/v1/cities`,
      data: {
        type: 'group'
      },
      success: (res) => {
        let data = res.data;
        this.setData({
          sortGroupCites: this.sortGroupCities(data) || []
        });
      }
    })
  },
  // 跳转至city页
  goToCity (e) {
    let cityId = e.currentTarget.dataset && e.currentTarget.dataset.item;
    wx.navigateTo({
      url: `../city/city?cityId=${cityId}`
    });
  },
  // city排序
  sortGroupCities (data) {
    let sortobj = {};
    for (let i = 65; i <= 90; i++) {
      if (data[String.fromCharCode(i)]) {
        sortobj[String.fromCharCode(i)] = data[String.fromCharCode(i)];
      }
    }
    return sortobj
  }
};
Page(handler);
