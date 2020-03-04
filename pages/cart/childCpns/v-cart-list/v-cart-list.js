// pages/cart/childCpns/v-cart-list/v-cart-list.js
const app = getApp()

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    goods: {
      type: Object,
      value: {}
    },
    index: {
      type: Number
    }
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
    onCheckClick(e) {
      // 1.查找到对应的商品
      // console.log(app.globalData.cartList)
      const goods = app.globalData.cartList.find(item => item.iid == this.properties.goods.iid)
      // console.log(goods)
      goods.checked = !goods.checked

      // 2.获取当前商品的index
      const index = e.currentTarget.dataset.index;

      // 3.回调,修改item选中状态
      // console.log(index)
      app.changeGoodsState(index, goods)
    }
  }
})
