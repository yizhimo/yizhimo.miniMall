// components/v-back-top/v-back-top.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    //小程序回到顶部方法
    backTop() {
      wx.pageScrollTo({
        scrollTop: 0,
      })
    }
  }
})
