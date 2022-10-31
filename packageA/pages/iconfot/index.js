// packageA/pages/iconfot/index.js
import { getCustomIconfont } from '~/api/gitee-service';
import { Iconfont } from '~/utils/router';
import { Loading } from '~/components/custom-loading/loading';
import { checkNetwork } from '~/utils/util';

Page({
  /**
   * 页面的私有数据，不涉及到页面渲染的数据
   */
  _data: {
    _refreshInfo: null, // 刷新详情
  },
  /**
   * 页面的初始数据
   */
  data: {
    brokenNetwork: false,
    title: Iconfont.name,
    icon: 'icon-xiaochengxu',
    size: '80rpx',
    color: '#031c24',
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
  onShareAppMessage() {},
  getCustomIconfont() {
    return new Promise(async (resolve) => {
      try {
        const response = await getCustomIconfont();
        resolve(response);
      } catch (error) {
        // 正常加载
        this._data._refreshInfo = {
          method: 'initData',
          params: {},
        };
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
    const readmeContent = await this.getCustomIconfont();
    this.setData(
      {
        readmeContent,
      },
      () => {
        Loading.clear();
      }
    );
  },
  handleIconChange(e) {
    this.setData({
      icon: e.detail,
    });
  },
  handleSizeChange(e) {
    this.setData({
      size: e.detail,
    });
  },
  handleColorChange(e) {
    this.setData({
      color: e.detail,
    });
  },
  /**
   * @method refresh 断网刷新
   */
  async refresh() {
    await checkNetwork();
    const { _refreshInfo } = this._data;
    // 刷新详情，方法和参数
    const { method, params } = _refreshInfo;
    this.setData({
      brokenNetwork: false,
    });
    this[method](params);
  },
});
