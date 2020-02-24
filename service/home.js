import request from "network.js"

//请求轮播图和推荐数据
export function getMultiData() {
  return request({
    url: '/home/multidata'
  })
} 

//请求商品数据
export function getProduct(type, page) {
  return request({
    url: '/home/data',
    data: {
      type,
      page
    }
  })
}