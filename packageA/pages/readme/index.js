// packageA/pages/readme/index.js
import { getMiniprogramTemplate } from '~/api/gitee-service';
import { Readme } from '~/utils/router';
import { Loading } from '~/components/custom-loading/loading';
import { checkNetwork, shareImageFormat } from '~/utils/util';
import { shareImage } from '~/config/index';

Page({
  /**
   * 页面的初始数据
   */
  data: {
    brokenNetwork: false,
    title: Readme.name,
    verticalCenter: false,
    message: '似乎已断开与互联网的连接',
    buttonText: '刷新',
    readmeContent: null,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    this.initData();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {},

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {},

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {},

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {
    const imageUrl = shareImageFormat(shareImage);
    return {
      title: '只需一分钟下载即可敏捷开发小程序、基础配置完善',
      imageUrl,
    };
  },
  getMiniprogramTemplate() {
    return new Promise(async (resolve) => {
      try {
        const response = await getMiniprogramTemplate();
        resolve(response);
      } catch (error) {
        this.setData(
          {
            brokenNetwork: true,
          },
          () => {
            Loading.clear();
          }
        );
        console.error('========================👇 请求错误 👇========================\n\n', error, '\n\n');
      }
    });
  },
  async initData() {
    Loading.show();
    const readmeContent = await this.getMiniprogramTemplate();
    this.setData(
      {
        readmeContent,
      },
      () => {
        Loading.clear();
      }
    );
  },
  /**
   * @method refresh 断网刷新
   */
  async refresh() {
    await checkNetwork();

    this.initData();

    this.setData({
      brokenNetwork: false,
    });
  },
});
