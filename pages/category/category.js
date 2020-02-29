// pages/category/category.js
import {
  getCategory,
  getSubcategory,
  getCategoryDetail
} from '../../service/category.js'

Page({
  data: {
    categories: [],
    categoryData: {},
    currentIndex: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this._getData()
  },
  _getData() {
    getCategory().then(res => {
      // 1.获取categories
      // console.log(res)
      const categories = res.data.data.category.list;

      // 2.初始化每个类别的子数据
      const categoryData = {}
      for(let i = 0; i < categories.length; i++) {
        categoryData[i] = {
          subcategories: []
        }
      }

      // 3.修改data中的数据
      this.setData({
        categories: res.data.data.category.list,
        categoryData
      })
      // console.log(categories)
      // console.log(categoryData)

      // 4.请求第一个类别的数据
      this._getSubcategory(0)
    })
  },
  _getSubcategory(currentIndex) {
    // 1.获取对应的maitkey
    const maitkey = this.data.categories[currentIndex].maitKey;

    // 2.请求的数据
    getSubcategory(maitkey).then(res => {
      // console.log(res)
      const tempCategoryData = this.data.categoryData;
      tempCategoryData[currentIndex].subcategories = res.data.data.list;
      this.setData({
        categoryData: tempCategoryData
      })
    })
  },
  menuClick(e) {
    // 1.改变当前的currentIndex
    const currentIndex = e.detail.currentIndex;
    this.setData({
      currentIndex
    })

    // 2.请求对应currentIndex的数据
    this._getSubcategory(currentIndex);
  }
})