export default function request(options) {
  const baseUrl = 'http://106.54.54.237:8000/api/hy'
  // const baseUrl = 'http://123.207.32.32:8000/api/hy'
  return new Promise((resolve,reject) => {
    wx.request({
      url: baseUrl + options.url,
      timeout: 5000,
      data: options.data || {},
      success: function(res) {
        resolve(res)
      },
      fail: reject
    })
  })
}