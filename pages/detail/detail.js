// pages/detail/detail.js
import {
  getDetail,
  GoodsBaseInfo,
  ShopInfo,
  ParamInfo} from '../../service/detail.js'

Page({
  /**
   * 页面的初始数据
   */
  data: {
    iid: '', 
    topImages: [],
    baseInfo: {},
    shopInfo: {},
    detailInfo: {},
    paramInfo: {},
    commentInfo: {},
    recommends: {}
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(options)
    this.setData({
      iid: options.iid
    })

    //请求数据
    this._getDetail()
    this._getRecommends()
  },
  _getDetail() {
    getDetail(this.data.iid).then(res => {
      // console.log(res)
      const data = res.data.result

      //1.取出轮播图
      const topImages = data.itemInfo.topImages
      // 2.创建BaseInfo对象
      const baseInfo = new GoodsBaseInfo(data.itemInfo, data.columns, data.shopInfo.services)
      // 3.创建ShopInfo对象
      const shopInfo = new ShopInfo(data.shopInfo)
      // 4.获取detailInfo信息
      const detailInfo = data.detailInfo
      // 5.创建ParamInfo对象
      const paramInfo = new ParamInfo(data.itemParams.info, data.itemParams.rule)
      // 6.获取评论信息
      let commentInfo = {}
      if(data.rate && data.rate.cRate > 0) {
        commentInfo = data.rate.list[0]
      }

      this.setData({
        topImages,
        baseInfo,
        shopInfo,
        detailInfo,
        paramInfo,
        commentInfo
      })
    })
  },
  _getRecommends() {

  }
})