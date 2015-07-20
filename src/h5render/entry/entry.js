var resetViewport = require('./../../mod/renderer/resetViewport'),
  SlidePage = require('./../../mod/slide/slide')

var entry = {
  init: function() {
    // 编辑器里展现部分的待加载的图片总数（不包括H5编辑器里最后一页店铺名片页的图片）
    this.imgNum = 0
    this.loadedImgNum = 0
    resetViewport('#wrap')
    this._render()
  },
  getFragment: function() {
    // 给直出html和json解析2种方案的业务逻辑自己填充
  },
  // 如果采用服务器端parse json数据生成html，则_render方法侏罗纪不需要执行，可以修改逻辑
  _render: function() {
    // 下面documentfragment是phone-page的父节点
    var $fragment = this.getFragment(),
      bgImgArr = [],
      self = this

    $fragment.children().each(function(k, v) {
      var $phonePage = $(v),
        bgImg = $phonePage.css('background-image').match(/url\((\S+)\)/)
      // match后如果是null，转为''，如果有值，获取匹配
      bgImg = bgImg ? bgImg[1] : ''

      self.imgNum += $phonePage.find('img').not('[src=""]').length
      // 记录css background-image是否加载完
      if (bgImg) {
        // 需要监测加载情况的图片+1
        self.imgNum++
        bgImgArr.push(bgImg)
      }
    })

    // 插入真实dom、背景图片预加载操作都必须最后统一执行
    bgImgArr.forEach(function(v, k) {
      $('<img>').attr('src', v).on('load', self._updateImgLoadStatus)
    })
    $('#wrap').append($fragment).find('img').on('load', self._updateImgLoadStatus)

    // 插入其他额外元素,比如H5编辑器特有的最后一页店铺名片页
    this.appendExtraPage && this.appendExtraPage()
  },
  _updateImgLoadStatus: function(img) {
    // console.log(app.loadedImgNum + '  /  ' +app.imgNum)
    if (app.loadCompleted) return
    app.loadedImgNum++
    var progress = Math.round(app.loadedImgNum / app.imgNum * 100) + '%',
      tid
    $('#J_progress').html(progress)
    if (app.loadedImgNum >= app.imgNum) {
      app.loadCompleted = true
      tid = setTimeout(function(){
        $('#J_loading').hide()
        // 启动翻页组件
        app._initPageSlide()
        clearTimeout(tid)
      }, 200)  // 只是改善体验而已=，=
    }
  },
  _initPageSlide: function() {
    var slide = new SlidePage({
      container: "#wrap"
    })

    slide.enable()
  }
}
module.exports = entry;
