// pages/cart/cart.js
const app = getApp()

Page({
  /**
   * 页面的初始数据
   */
  data: {
    cartList: [],
    isSelectAll: true,
    totalPrice: 0,
    totalCounter: 0
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    // 第一次加载数据
    this.setData({
      cartList: app.globalData.cartList
    })
    this.changeData()

    //动态修改properties里传入goods的值
    app.changeGoodsState = (index, goods) => {
      // 1.修改某一项的选中状态
      this.setData({
        [`cartList[${index}]`]: goods
      })
      // 2.修改item全部选中的状态
      const selectAll = !this.data.cartList.find(item => !item.checked)
      this.setData({
        isSelectAll: selectAll
      })
      this.changeData()
    }
  },
  onSelectAll() {
    // 1.判断是否是全部选中
    if(this.data.isSelectAll) {           // 目前全部选中
      this.data.cartList.forEach(item => {
        item.checked = false
      })
      this.changeData()
      this.setData({
        cartList: this.data.cartList,
        isSelectAll: false
      })
    }else{                               // 某些没选中
      this.data.cartList.forEach(item => {
        item.checked = true
      })
      this.changeData()
      this.setData({
        cartList: this.data.cartList,
        isSelectAll: true
      })
    }
  },
  changeData() {
    // 1.获取所有选中数据
    let totalPrice = 0;
    let counter = 0;

    for (let item of this.data.cartList) {
      if (item.checked) {
        counter += item.count
        totalPrice += item.price * item.count
      }
    }
    // console.log(counter, totalPrice)
    // 2.修改数据
    this.setData({
      totalCounter: counter,
      totalPrice: totalPrice
    })
  }
})