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
    this.goToGuessCity();
    this.goToHotCity();
    this.goToSortCity();
  },
  goToGuessCity () {
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
  goToHotCity () {
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
  goToSortCity () {
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
