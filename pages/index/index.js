//index.js
import config from '../../config/index.js';
//获取应用实例
const app = getApp();

const handler = {
  data: {
    baseUrl: config.baseUrl,
    guessCityId: '',
    guessCity: '西安',
    hotCities: [],
    sortGroupCites: []
  },
  onLoad (options) {
    this.goToGuessCity();
  },
  goToGuessCity () {
    wx.request({
      url: this.data.baseUrl + '/v1/cities', 
      data: {
        type: 'guess'
      },
      success (res) {
        console.log(res);
      }
    })
  },
  goToHotCity () {},
  goToSortCity () {}
};
Page(handler);
