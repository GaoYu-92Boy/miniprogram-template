// app.js
import { env, log } from '~/config/index';
import { Home } from './utils/router';
import { reLaunch } from './utils/util';

App({
  onLaunch() {
    log && console.log(`========================👇 ${env}环境 👇========================\n\n`, env, '\n\n');
    if (!wx.cloud) {
      log &&
        console.error(
          '========================👇 请使用 2.2.3 或以上的基础库以使用云能力 👇========================\n\n'
        );
    } else {
      wx.cloud.init({
        // env 参数说明：
        //   env 参数决定接下来小程序发起的云开发调用（wx.cloud.xxx）会默认请求到哪个云环境的资源
        //   此处请填入环境 ID, 环境 ID 可打开云控制台查看
        //   如不填则使用默认环境（第一个创建的环境）
        env: 'test-1g51xij1591a591a',
        traceUser: true,
      });
    }
    // 获取全局唯一的版本更新管理器，用于管理小程序更新
    const updateManager = wx.getUpdateManager();
    // 监听小程序有版本更新事件。客户端主动触发下载（无需开发者触发），下载成功后回调
    updateManager.onUpdateReady(function () {
      wx.showModal({
        title: '更新提示',
        content: '新版本已经准备好，是否重启应用？',
        showCancel: false,
        success: () => {
          // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
          updateManager.applyUpdate();
        },
      });
    });

    // 获取网络类型
    wx.getNetworkType({
      success: (value) => {
        const { networkType } = value;
        this.globalData.networkType = networkType;
        if (networkType === 'none') {
          this.globalData.isConnected = false;
        } else {
          this.globalData.isConnected = true;
        }
        log && console.log('========================👇 网路类型 👇========================\n\n', networkType, '\n\n');
      },
    });

    // 获取设备信息
    const systemInfo = wx.getSystemInfoSync();

    // 获取菜单按钮（右上角胶囊按钮）的布局位置信息。坐标信息以屏幕左上角为原点。
    const menuButton = wx.getMenuButtonBoundingClientRect();

    // 存储胶囊布局信息
    systemInfo.menuButton = menuButton;

    // 自定义navbar高度等于safeArea.top加上var-navbar固定高度46
    systemInfo.navbarHeight = systemInfo.statusBarHeight + 46;

    // 底部安全距离区域
    systemInfo.safeAreaInsetBottom = systemInfo.screenHeight - systemInfo.safeArea.height - systemInfo.safeArea.top;

    // 全局存储设备信息
    this.systemInfo = systemInfo;
  },

  onShow() {
    // 监听网络状态变化事件
    wx.onNetworkStatusChange((value) => {
      const { isConnected, networkType } = value;
      this.globalData.networkType = networkType;
      this.globalData.isConnected = isConnected;
      log && console.log('========================👇 网络类型 👇========================\n\n', networkType, '\n\n');
      log && console.log('========================👇 网络状态 👇========================\n\n', isConnected, '\n\n');
    });

    wx.onMemoryWarning(function () {
      log && console.log('========================👇 onMemoryWarningReceive 👇========================\n\n');
    });

    wx.nextTick(() => {
      // 执行一些初始化完成的请求
    });
  },

  /**
   * @method onPageNotFound 页面不存在监听函数
   */
  onPageNotFound() {
    reLaunch({
      url: Home.path,
    });
  },

  globalData: {
    networkType: '', // 网络类型
    isConnected: true, // 网络状态
    userInfo: null, // 用户信息
    mutedStatus: false, // 静音状态
    isAutoPlayVideo: false, // 非wifi网络播放状态，用于展示提示信息，提示过一次后当前小程序没有重新load不会在提示
    VideoContextComponent: null, // VideoContextComponent，VideoContext实例所在的组件，用于处理视频播放相关业务
  },
  systemInfo: null, // 设备信息
});
