// components/custom-virtuali-list/index.js
Component({
  externalClasses: ['external-list-wrapper'],
  pureDataPattern: /^_/,
  /**
   * 组件的属性列表
   */
  properties: {
    // 二维数组，一维数组的长度最好是ui展示区域的1.5倍以上
    virtualiList2d: {
      type: Array,
      value: [],
    },
  },

  observers: {
    virtualiList2d() {
      this.getVirtualiListHeight();
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    virtualHeight: [], // 虚拟列表高度数组
    virtualValue: [-1, 0, 1], // 虚拟列表展示数组
    _virtualListObserve: null, // IntersectionObserver 对象
  },

  /**
   * 组件的方法列表
   */
  methods: {
    getVirtualiListHeight() {
      this.createSelectorQuery()
        .selectAll('#virtuali-list')
        .boundingClientRect()
        .exec((value) => {
          if (value.length) {
            const virtualHeight = [];
            value[0].forEach((item) => {
              virtualHeight.push(item.height);
            });
            this.setData(
              {
                virtualHeight,
              },
              () => {
                this.observeVirtualList();
              }
            );
          }
        });
    },
    observeVirtualList() {
      const _virtualListObserve = this.createIntersectionObserver({ observeAll: true });
      _virtualListObserve.relativeToViewport().observe('#virtuali-list', (value) => {
        const { intersectionRatio, dataset } = value;
        if (intersectionRatio) {
          const { virtualIndex } = dataset;
          this.setData({
            virtualValue: [virtualIndex - 1, virtualIndex, virtualIndex + 1],
          });
        }
      });
      this.setData({
        _virtualListObserve,
      });
    },
  },
  pageLifetimes: {
    show() {
      const { _virtualListObserve } = this.data;
      _virtualListObserve && _virtualListObserve.disconnect();
      this.getVirtualiListHeight();
    },
    hide() {
      const { _virtualListObserve } = this.data;
      _virtualListObserve && _virtualListObserve.disconnect();
    },
  },
});
