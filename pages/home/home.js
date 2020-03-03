// pages/home/home.js
import { getMultiData, getProduct } from "../../service/home.js"

const types = ['pop', 'new', 'sell']    //下面判断currentType用
const distanceA = 1000                   //下面比较是否显示箭头用

Page({
  data: {
    banners: [],
    recommend: [],
    titles: ["流行","新款","精选"],
    goods: {
      'pop': { page: 0, list: [] },
      'new': { page: 0, list: [] },
      'sell': { page: 0, list: [] }
    },
    currentType: 'pop',
    showBack: false,
    showControl: false,
    tabControlTop: 0
  },

  //网络请求方法---------------------------------
  onLoad: function(options) {
    getMultiData().then(res => {
      // console.log(res)
      //取到轮播图和推荐数据
      const banners = res.data.data.banner.list.map(item => {
        return item.image
      });
      const recommend = res.data.data.recommend.list;
      //放到data中
      this.setData({
        banners,
        recommend
      })
    }),
    
    this._getData()
  },
  _getData() {
    this._getProduct('pop')
    this._getProduct('new')
    this._getProduct('sell')
  },
  _getProduct(type) {
    //获取当前页数
    const page = this.data.goods[type].page + 1

    getProduct(type, page).then(res => {
      // console.log(res)
      const reslist = res.data.data.list
      const list = this.data.goods[type].list
      //先定值 后push
      list.push(...reslist)

      //小程序改变data属性中的属性的方法 `` []
      const listKey = `goods.${type}.list`
      const pageKey = `goods.${type}.page`
      this.setData({
        [listKey]: list,
        [pageKey]: page
      })
    })
  },

  //事件监听方法---------------------------------
  tabClick(event) {
    const index = event.detail.index
    const type = types[index]
    this.setData({
      currentType: type
    })
  },
  //监听滚到底部的函数(上拉加载更多)
  onReachBottom() {
    this._getProduct(this.data.currentType)
  },
  imgLoad() {
    //获取tab-control距离顶部的距离
    wx.createSelectorQuery().select('.tab-control').boundingClientRect((rect) => {
      this.setData({
        tabControlTop: rect.top
      })
    }).exec()
  },
  //监听滚动距离的函数
  onPageScroll(options) {
    const scrollTop = options.scrollTop;
    // console.log(options)
    //不要再滚动的时候调用this.setData
    // this.setData({
    //   showBack: scrollTop > distance
    // })
    const flagA = scrollTop > distanceA
    if(flagA != this.data.showBack) {
      this.setData({
        showBack: scrollTop > distanceA
      })
    }
    const flagB = scrollTop > this.data.tabControlTop
    if (flagB != this.data.showControl) {
      this.setData({
        showControl: scrollTop > this.data.tabControlTop
      })
    }
  }
})