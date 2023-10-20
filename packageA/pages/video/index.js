// packageA/pages/video/index.js
import { getCustomVideo } from '~/api/gitee-service';
import { Video } from '~/utils/router';
import { Loading } from '~/components/custom-loading/loading';
import { checkNetwork, shareImageFormat } from '~/utils/util';
import { shareImage } from '~/config/index';
const { systemInfo } = getApp();

Page({
  /**
   * 页面的初始数据
   */
  data: {
    systemInfo,
    brokenNetwork: false,
    title: Video.name,
    readmeContent: null,
    videoList: [
      {
        poster:
          'https://oss.fabrique.cn/67a44967-32f3-4fa8-9481-ceb7a8fde958.mp4?x-oss-process=video/snapshot,t_0,f_jpg,w_0,h_0,m_fast,ar_auto',
        src: 'https://oss.fabrique.cn/offwebsite/mp4/%E6%B7%B7%E5%89%AA6-%E6%94%B9%E5%AD%97%E4%BD%93.mp4',
      },
      {
        poster:
          'http://oss.cogo.club/2c64c928-38db-436c-ba4f-a9307b19d489.mp4?x-oss-process=video/snapshot,t_0,f_jpg,w_0,h_0,m_fast,ar_auto',
        src: 'http://oss.cogo.club/2c64c928-38db-436c-ba4f-a9307b19d489.mp4',
      },
      {
        poster:
          'https://oss.fabrique.cn/290664dc-c0ce-4223-b8f0-24ba5aec6332.mp4?x-oss-process=video/snapshot,t_0,f_jpg,w_0,h_0,m_fast,ar_auto',
        src: 'https://oss.fabrique.cn/290664dc-c0ce-4223-b8f0-24ba5aec6332.mp4',
      },
      {
        poster: 'http://oss.cogo.club/1ea115bc-e96c-46b6-afa9-3279541ff22e.jpg',
        src: 'http://oss.cogo.club/09efa786-9fc4-4423-a715-7819b38cf354.mp4',
      },
      {
        poster: 'http://oss.cogo.club/75d2c465-7222-4c01-a3b1-f079f2e7424b.jpg',
        src: 'http://oss.cogo.club/b121ba29-f8d3-494d-87af-8458a6cb8234.mp4',
      },
      {
        poster: 'http://oss.cogo.club/ae314a60-bda7-4b4b-bcd9-843b20bfac52.jpeg',
        src: 'http://oss.cogo.club/90702d43-e74e-4604-8ac8-82ca385719ac.mp4',
      },
      {
        poster: 'http://oss.cogo.club/10654f09-76fc-4999-a94d-ba0a79a249cc.jpeg',
        src: 'http://oss.cogo.club/22ebdd3c-80ec-459b-a43c-b9c832839c70.mp4',
      },
      {
        poster: 'http://oss.cogo.club/964514df-b5bf-4fa9-82c9-a5a999913de5.jpeg',
        src: 'http://oss.cogo.club/1babb4cd-5b05-4b53-8c46-c36e2fbbc1c5.mp4',
      },
      {
        poster: 'http://oss.cogo.club/60c6c48c-f9fb-406f-ba74-9cd25b4800c5.jpeg',
        src: 'http://oss.cogo.club/692c2f7e-27a4-4efd-adc1-63e58cd7bb40.mp4',
      },
      {
        poster: 'http://oss.cogo.club/464618cf-ab8d-41b0-85e2-cd36222c1d0a.jpeg',
        src: 'http://oss.cogo.club/d4fa3732-3505-4bff-b4b8-ae38bdc6d8e2.mp4',
      },
      {
        poster: 'http://oss.cogo.club/c99ad650-b52f-462a-b859-f5082c213084.jpeg',
        src: 'http://oss.cogo.club/be0c2176-c11d-432c-866c-b21a3c27aef0.mp4',
      },
      {
        poster: 'http://oss.cogo.club/e1e77c9c-2ace-41f9-999a-6390e336d9af.jpeg',
        src: 'http://oss.cogo.club/afc77c88-3e17-4209-82a1-bb3a4264df34.mp4',
      },
      {
        poster: 'http://oss.cogo.club/ca39a743-f920-47cc-a253-a1280777b649.jpeg',
        src: 'http://oss.cogo.club/3c28270e-69ce-4ab8-abe5-d8b0dec9ea64.mp4',
      },
      {
        poster: 'http://oss.cogo.club/ac943eff-71e1-45d6-84a0-550b201860d5.jpeg',
        src: 'http://oss.cogo.club/41862eb6-88d4-4aa2-b610-8e6d70f42a82.mp4',
      },
      {
        poster: 'http://oss.cogo.club/cd8adbf9-b03e-46b7-b48b-380b2d464a8c.jpeg',
        src: 'http://oss.cogo.club/10b7df06-77d0-447f-9852-1118a9e93b12.mp4',
      },
      {
        poster: 'http://oss.cogo.club/142c1e69-d8e0-4e4b-9698-9d0e2ba63a59.jpeg',
        src: 'http://oss.cogo.club/da49325b-c048-4966-bd2a-f21f6833cf2d.mp4',
      },
      {
        poster: 'http://oss.cogo.club/60c68d46-80fc-47a8-9bda-9a7f314d3691.jpeg',
        src: 'http://oss.cogo.club/9c07dc14-e31f-454e-b9fa-0d1a9efca0d5.mp4',
      },
      {
        poster: 'http://oss.cogo.club/e7470842-357d-4c66-bfdb-2ace82b76853.jpeg',
        src: 'http://oss.cogo.club/b51ca92a-8e2c-4871-acc2-805b6bb94f25.mp4',
      },
      {
        poster: 'http://oss.cogo.club/b5287388-ce2f-4a8e-a331-f4a0cc131310.jpeg',
        src: 'http://oss.cogo.club/c6719939-9676-4457-9d66-3304e6763496.mp4',
      },
      {
        poster: 'http://oss.cogo.club/ce7e8327-e57d-44b7-87ea-1cf6b11e8ecf.jpeg',
        src: 'http://oss.cogo.club/1503371a-ce1d-41bd-85ec-67fe25813171.mp4',
      },
      {
        poster: 'http://oss.cogo.club/be469fe2-d84a-44eb-8246-549ec8f4b3d3.jpeg',
        src: 'http://oss.cogo.club/10e7edb0-f701-4ebb-9095-7349c348b036.mp4',
      },
      {
        poster: 'http://oss.cogo.club/2fac7356-cf7a-43b1-b5e1-22cc4e419a3c.jpeg',
        src: 'http://oss.cogo.club/b09158c6-0bf0-4cab-8bb3-871ee79adfe1.mp4',
      },
      {
        poster: 'http://oss.cogo.club/e4b8d589-b5fa-4df7-aece-38deedd8a77d.jpeg',
        src: 'http://oss.cogo.club/6ae59c46-974c-4c30-908e-03b6e87e108e.mp4',
      },
      {
        poster: 'http://oss.cogo.club/24c24a46-5fdb-4b3b-aa91-8ea6b0eda4cd.jpeg',
        src: 'http://oss.cogo.club/809eab49-f061-4b39-8b98-5a86f7e2fd39.mp4',
      },
      {
        poster: 'http://oss.cogo.club/f607ed7b-5171-4f20-b34a-68adbba84df3.jpg',
        src: 'http://oss.cogo.club/2a72b302-5576-4946-9fd9-aa7513aed3a7.mp4',
      },
      {
        poster: 'http://oss.cogo.club/38f76703-a7a1-4834-8942-2de115ec210f.jpg',
        src: 'http://oss.cogo.club/d7c87c66-cdf7-43ab-a32d-f9d4075344e1.mp4',
      },
      {
        poster: 'http://oss.cogo.club/f56ca429-e7a3-4c3f-8e35-2bfbed0ddd47.jpg',
        src: 'http://oss.cogo.club/3f95173c-5cb2-44db-978a-7a59d9d11883.mp4',
      },
      {
        poster:
          'https://oss.fabrique.cn/67a44967-32f3-4fa8-9481-ceb7a8fde958.mp4?x-oss-process=video/snapshot,t_0,f_jpg,w_0,h_0,m_fast,ar_auto',
        src: 'https://oss.fabrique.cn/offwebsite/mp4/%E6%B7%B7%E5%89%AA6-%E6%94%B9%E5%AD%97%E4%BD%93.mp4',
      },
      {
        poster:
          'http://oss.cogo.club/2c64c928-38db-436c-ba4f-a9307b19d489.mp4?x-oss-process=video/snapshot,t_0,f_jpg,w_0,h_0,m_fast,ar_auto',
        src: 'http://oss.cogo.club/2c64c928-38db-436c-ba4f-a9307b19d489.mp4',
      },
      {
        poster:
          'https://oss.fabrique.cn/290664dc-c0ce-4223-b8f0-24ba5aec6332.mp4?x-oss-process=video/snapshot,t_0,f_jpg,w_0,h_0,m_fast,ar_auto',
        src: 'https://oss.fabrique.cn/290664dc-c0ce-4223-b8f0-24ba5aec6332.mp4',
      },
      {
        poster: 'http://oss.cogo.club/1ea115bc-e96c-46b6-afa9-3279541ff22e.jpg',
        src: 'http://oss.cogo.club/09efa786-9fc4-4423-a715-7819b38cf354.mp4',
      },
      {
        poster: 'http://oss.cogo.club/75d2c465-7222-4c01-a3b1-f079f2e7424b.jpg',
        src: 'http://oss.cogo.club/b121ba29-f8d3-494d-87af-8458a6cb8234.mp4',
      },
      {
        poster: 'http://oss.cogo.club/ae314a60-bda7-4b4b-bcd9-843b20bfac52.jpeg',
        src: 'http://oss.cogo.club/90702d43-e74e-4604-8ac8-82ca385719ac.mp4',
      },
      {
        poster: 'http://oss.cogo.club/10654f09-76fc-4999-a94d-ba0a79a249cc.jpeg',
        src: 'http://oss.cogo.club/22ebdd3c-80ec-459b-a43c-b9c832839c70.mp4',
      },
      {
        poster: 'http://oss.cogo.club/964514df-b5bf-4fa9-82c9-a5a999913de5.jpeg',
        src: 'http://oss.cogo.club/1babb4cd-5b05-4b53-8c46-c36e2fbbc1c5.mp4',
      },
      {
        poster: 'http://oss.cogo.club/60c6c48c-f9fb-406f-ba74-9cd25b4800c5.jpeg',
        src: 'http://oss.cogo.club/692c2f7e-27a4-4efd-adc1-63e58cd7bb40.mp4',
      },
      {
        poster: 'http://oss.cogo.club/464618cf-ab8d-41b0-85e2-cd36222c1d0a.jpeg',
        src: 'http://oss.cogo.club/d4fa3732-3505-4bff-b4b8-ae38bdc6d8e2.mp4',
      },
      {
        poster: 'http://oss.cogo.club/c99ad650-b52f-462a-b859-f5082c213084.jpeg',
        src: 'http://oss.cogo.club/be0c2176-c11d-432c-866c-b21a3c27aef0.mp4',
      },
      {
        poster: 'http://oss.cogo.club/e1e77c9c-2ace-41f9-999a-6390e336d9af.jpeg',
        src: 'http://oss.cogo.club/afc77c88-3e17-4209-82a1-bb3a4264df34.mp4',
      },
      {
        poster: 'http://oss.cogo.club/ca39a743-f920-47cc-a253-a1280777b649.jpeg',
        src: 'http://oss.cogo.club/3c28270e-69ce-4ab8-abe5-d8b0dec9ea64.mp4',
      },
      {
        poster: 'http://oss.cogo.club/ac943eff-71e1-45d6-84a0-550b201860d5.jpeg',
        src: 'http://oss.cogo.club/41862eb6-88d4-4aa2-b610-8e6d70f42a82.mp4',
      },
      {
        poster: 'http://oss.cogo.club/cd8adbf9-b03e-46b7-b48b-380b2d464a8c.jpeg',
        src: 'http://oss.cogo.club/10b7df06-77d0-447f-9852-1118a9e93b12.mp4',
      },
      {
        poster: 'http://oss.cogo.club/142c1e69-d8e0-4e4b-9698-9d0e2ba63a59.jpeg',
        src: 'http://oss.cogo.club/da49325b-c048-4966-bd2a-f21f6833cf2d.mp4',
      },
      {
        poster: 'http://oss.cogo.club/60c68d46-80fc-47a8-9bda-9a7f314d3691.jpeg',
        src: 'http://oss.cogo.club/9c07dc14-e31f-454e-b9fa-0d1a9efca0d5.mp4',
      },
      {
        poster: 'http://oss.cogo.club/e7470842-357d-4c66-bfdb-2ace82b76853.jpeg',
        src: 'http://oss.cogo.club/b51ca92a-8e2c-4871-acc2-805b6bb94f25.mp4',
      },
      {
        poster: 'http://oss.cogo.club/b5287388-ce2f-4a8e-a331-f4a0cc131310.jpeg',
        src: 'http://oss.cogo.club/c6719939-9676-4457-9d66-3304e6763496.mp4',
      },
      {
        poster: 'http://oss.cogo.club/ce7e8327-e57d-44b7-87ea-1cf6b11e8ecf.jpeg',
        src: 'http://oss.cogo.club/1503371a-ce1d-41bd-85ec-67fe25813171.mp4',
      },
      {
        poster: 'http://oss.cogo.club/be469fe2-d84a-44eb-8246-549ec8f4b3d3.jpeg',
        src: 'http://oss.cogo.club/10e7edb0-f701-4ebb-9095-7349c348b036.mp4',
      },
      {
        poster: 'http://oss.cogo.club/2fac7356-cf7a-43b1-b5e1-22cc4e419a3c.jpeg',
        src: 'http://oss.cogo.club/b09158c6-0bf0-4cab-8bb3-871ee79adfe1.mp4',
      },
      {
        poster: 'http://oss.cogo.club/e4b8d589-b5fa-4df7-aece-38deedd8a77d.jpeg',
        src: 'http://oss.cogo.club/6ae59c46-974c-4c30-908e-03b6e87e108e.mp4',
      },
      {
        poster: 'http://oss.cogo.club/24c24a46-5fdb-4b3b-aa91-8ea6b0eda4cd.jpeg',
        src: 'http://oss.cogo.club/809eab49-f061-4b39-8b98-5a86f7e2fd39.mp4',
      },
      {
        poster: 'http://oss.cogo.club/f607ed7b-5171-4f20-b34a-68adbba84df3.jpg',
        src: 'http://oss.cogo.club/2a72b302-5576-4946-9fd9-aa7513aed3a7.mp4',
      },
      {
        poster: 'http://oss.cogo.club/38f76703-a7a1-4834-8942-2de115ec210f.jpg',
        src: 'http://oss.cogo.club/d7c87c66-cdf7-43ab-a32d-f9d4075344e1.mp4',
      },
      {
        poster: 'http://oss.cogo.club/f56ca429-e7a3-4c3f-8e35-2bfbed0ddd47.jpg',
        src: 'http://oss.cogo.club/3f95173c-5cb2-44db-978a-7a59d9d11883.mp4',
      },
    ],
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
      title: 'Video组件，增强版video提供多种功能',
      imageUrl,
    };
  },
  getCustomVideo() {
    return new Promise(async (resolve) => {
      try {
        const response = await getCustomVideo();
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
    const readmeContent = await this.getCustomVideo();
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
