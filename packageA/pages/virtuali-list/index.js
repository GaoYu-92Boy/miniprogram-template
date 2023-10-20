// packageA/pages/virtuali-list/index.js
import Toast from '@vant/weapp/toast/toast';
import { getCustomVirtualiList } from '~/api/gitee-service';
import { addGoodsList } from '~/api/goods-service';
import { VirtualiList } from '~/utils/router';
import { Loading } from '~/components/custom-loading/loading';
import { checkNetwork, shareImageFormat } from '~/utils/util';
import { shareImage } from '~/config/index';

Page({
  /**
   * 页面的初始数据
   */
  data: {
    brokenNetwork: false,
    title: VirtualiList.name,
    readmeContent: null,
    goodsInfo: {
      empty: false,
      data: [],
      pageNum: 1,
      nomore: false,
      lowerLoading: false,
      refresherTriggered: false,
    },
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
  async onReachBottom() {
    await checkNetwork();
    const { goodsInfo } = this.data;
    const { nomore, lowerLoading, pageNum, data } = goodsInfo;
    // 没有更多或者加载中
    if (nomore || lowerLoading) return;
    this.setData({
      'goodsInfo.pageNum': pageNum + 1,
      'goodsInfo.lowerLoading': true,
    });
    const list = await this.addGoodsList();
    // 延迟 500ms mock 请求
    setTimeout(() => {
      this.setData({
        [`goodsInfo.data[${data.length}]`]: list,
        'goodsInfo.nomore': !list.length,
        'goodsInfo.lowerLoading': false,
      });
    }, 500);
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {
    const imageUrl = shareImageFormat(shareImage);
    return {
      title: 'VirtualiList组件，通过虚拟化列表渲染超大数据',
      imageUrl,
    };
  },
  getCustomVirtualiList() {
    return new Promise(async (resolve) => {
      try {
        const response = await getCustomVirtualiList();
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
  addGoodsList() {
    return new Promise(async (resolve) => {
      try {
        const response = await addGoodsList();
        resolve(response);
      } catch (error) {
        Loading.clear();
        Toast('似乎已经断开了与互联网的连接');
        console.error('========================👇 请求错误 👇========================\n\n', error, '\n\n');
      }
    });
  },
  async initData() {
    Loading.show();
    const readmeContent = await this.getCustomVirtualiList();
    const list = await this.addGoodsList();
    list.forEach((item) => (item._index = item.spuId));
    this.setData(
      {
        readmeContent,
        'goodsInfo.data': [list],
        'goodsInfo.empty': !list.length,
        'goodsInfo.nomore': !list.length,
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
