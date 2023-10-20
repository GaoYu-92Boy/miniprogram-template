// packageA/pages/image/index.js
import { getCustomImage } from '~/api/gitee-service';
import { Image } from '~/utils/router';
import { Loading } from '~/components/custom-loading/loading';
import { checkNetwork, shareImageFormat } from '~/utils/util';
import { shareImage } from '~/config/index';

Page({
  /**
   * 页面的初始数据
   */
  data: {
    brokenNetwork: false,
    title: Image.name,
    readmeContent: null,
    src: 'https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c46317ddada24e0c9662fe62845b7439~tplv-k3u1fbpfcp-zoom-crop-mark:3024:3024:3024:1702.awebp?',
    width: '100vw',
    height: '100vw',
    mode: 'aspectFill',
    radius: '0rpx',
    round: false,
    showMenuByLongpress: false,
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
  onReady() {
    this.initData();
  },

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
      title: 'Image组件，增强版image提供多种功能',
      imageUrl,
    };
  },
  getCustomImage() {
    return new Promise(async (resolve) => {
      try {
        const response = await getCustomImage();
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
    const readmeContent = await this.getCustomImage();
    this.setData(
      {
        readmeContent,
      },
      () => {
        Loading.clear();
      }
    );
  },
  handleSettingChange(e) {
    const { type } = e.currentTarget.dataset;
    const value = e.detail;
    this.setData({
      [`${type}`]: value,
    });
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
