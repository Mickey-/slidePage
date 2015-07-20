require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"Fx/fZf":[function(require,module,exports){
var resetViewport = require('./../../mod/renderer/resetViewport'),
  SlidePage = require('./../../mod/slide/slide')

var entry = {
  curPage: 1,
  init: function() {
    this.imgNum = 0
    this.loadedImgNum = 0
    resetViewport('#wrap')
    this._render()
  },
  _getFragment: function() {
    // 给直出html和json解析2种方案的业务逻辑自己填充
  },
  // 如果采用服务器端parse json数据生成html，则_render方法侏罗纪不需要执行，可以修改逻辑
  _render: function() {
    // 下面documentfragment是phone-page的父节点
    var $fragment = this._getFragment(),
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
      }, 400)  // 只是改善体验而已=，=
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

},{"./../../mod/renderer/resetViewport":3,"./../../mod/slide/slide":4}],"h5render":[function(require,module,exports){
module.exports=require('Fx/fZf');
},{}],3:[function(require,module,exports){
/**
 * @file resetViewport.js
 * @brief 重设viewport，适应不同屏幕
 * @param container{string} 容器选择器
 * @param viewport{string} viewport meta元素的选择器
 * @author banbian, zangtao.zt@alibaba-inc.com
 * @version 1.0.0
 * @date 2015-06-26
 */

function resetViewport(container, viewport) {
  var vp = viewport || '#J_viewport',
    $wrap = $(container), sh, sw, dr, nr, sc;
  sh = $wrap.height()
  sw = $wrap.width()
  dr = 320 / 486
  //dr = 320 / 568
  nr = sw / sh
  sc = (nr >= dr ? sh / 486 : sw / 320)
  //sc = (nr >= dr ? sh / 568 : sw / 320)
  if (sc != 1) {
    $(vp).attr("content", "width=320, initial-scale=" + sc + ", maximum-scale=" + sc + ", user-scalable=no");
  }
}

module.exports = resetViewport;

},{}],4:[function(require,module,exports){
/*浏览器支持的动画事件*/
var transitionEvent = (function(){
  var t,
      el = document.createElement('fakeelement'),
      transitions = {
        'WebkitAnimation' : 'webkitAnimationEnd',
        'OAnimation' : 'oAnimationEnd',
        'msAnimation' : 'MSAnimationEnd',
        'animation' : 'animationend'
      };

  for(t in transitions){
    if( el.style[t] !== undefined ){
      return transitions[t];
    }
  }
})();

/*
*@param options(obj)
*@param option.container 容器的选择器
*@param option.page 容器里每一页的选择器,默认是'.phone-page'
*@param option.currentPageClass 当前页的的标志class，默认是'active'
*@param option.attr 标签中data-**的属性名，定义动画名字默认是'animate'
*@param option.delay 标签中默认延迟动画的名字data-*，默认是delay
*@param option.preLoadNum 惰性加载的控制数量
*/
var SlidePage = function(options){
  this.$container = $(options.container)
  this.pageSelector = options.page || '.phone-page'

  /*缓存所有的页面DOM节点*/
  this.pageArray = this.$container.find(this.pageSelector);

  this.currentPageClass = options.currentPageClass || 'active';

  this.attr = options.attr || 'animate';
  this.preLoadNum = options.preLoadNum || 3;

  this.listenPostMessage()
  this.init();
}

SlidePage.prototype.listenPostMessage = function() {
  var self = this
  window.addEventListener('message', function(e){
    //TODO e.origin来源判断、过滤
    if ('nextPage' == e.data) {
      self.nextPage()
    } else if ('prePage' == e.data) {
      self.prePage()
    }
  }, false);
}

SlidePage.prototype.init = function() {

  // 针对页数变化的情况，需要重新获取pageArray
  this.pageArray = this.$container.find(this.pageSelector);
  this.index = 0 ;
  /*缓存子页面的数量*/
  this.pageLength = this.pageArray.length;
  /*标识页面切换的过程中是否正在进行动画*/
  this.isAnimating  = false;
  /*存放所有页面节点的动画队列*/
  this.animationArray = [];
  /*存放所有页面中开启了延迟加载的动画队列*/
  this.childrenNodes = [];
  /*存放页面之中延迟加载的背景图*/
  //this.lazyArray =[];

  var self = this,
      attr = this.attr;

  $.each(this.pageArray,function(index,item){
    var $item = $(item);
    self.animationArray.push($item.data(attr) || 'fadeUp');
    self.childrenNodes.push($item.children(".removeable"));
    //self.lazyArray.push(0);
    $item.css("z-index",index);
  });

  /**首页的动画*/
  this.pageArray.removeClass(this.currentPageClass).eq(this.index).addClass(this.currentPageClass);
  this._showPage(this.index);
};

SlidePage.prototype.preventDefault = function(e) {
  e.preventDefault()
}

// 启用slide功能
SlidePage.prototype.enable = function() {
  var self = this

  // 解决部分Android机型的滑动事件问题,同时阻止拉出白页. 必须用原生写法
  document.addEventListener('touchmove',  this.preventDefault, false)

  this.$container.on('swipeDown', this.pageSelector, function(e){
    e.preventDefault();
    self.prePage();
  })

  this.$container.on('swipeUp', this.pageSelector, function(e){
    e.preventDefault();
    self.nextPage();
  })
  return this
}

// 上翻一页或下翻一页
SlidePage.prototype.flipPage = function(isNextPage) {
  var dirStep = [-1, 1],
      outIndex = this.index,
      inIndex = isNextPage ? (++this.index) : (--this.index),
      outClass = this.animationArray[outIndex] + (isNextPage ? '' : ' out animated'),
      $outNode = this.pageArray.eq(outIndex),
      inClass = this.animationArray[inIndex] + (isNextPage ? ' animated' : ''),
      $inNode = this.pageArray.eq(inIndex),
      self = this;
  this.isAnimating = true;

  // 往前翻时，为了防止本页隐藏的时候出现白屏，先将上一页显示
  !isNextPage && $inNode.addClass(this.currentPageClass);

  if (isNextPage) {
    $inNode.addClass(inClass + ' ' + self.currentPageClass).one(transitionEvent, movePageEnd)
  } else {
    $outNode.addClass(outClass).one(transitionEvent, movePageEnd)
  }

  // 转场动画执行完后的回调
  function movePageEnd(e) {
    // 如果不是翻页动画触发的transitionEvent (比如之前一页里的组件动画执行完触发的) ,则延迟翻页逻辑，等待动画做完
    if (e.animationName == 'slideInUp' || e.animationName == 'slideOutDown') {
      doneAni()
    } else {
      setTimeout(doneAni, 700)
    }

    function doneAni() {
      $outNode.removeClass((isNextPage ? '' : outClass + ' ') + self.currentPageClass);
      // 往下翻时才需要执行
      isNextPage && $inNode.removeClass(inClass);
      self._showPage(inIndex, outIndex);
      self.isAnimating = false;
      self.idxUpdated && self.idxUpdated(inIndex, outIndex);
    }
  }
}
SlidePage.prototype.nextPage = function() {
  if(!this.isAnimating && this.index != this.pageLength -1){
    this.flipPage(true)
  }
};

SlidePage.prototype.prePage = function() {
  if(!this.isAnimating  && this.index != 0){
    this.flipPage(false)
  }
};

SlidePage.prototype._showPage = function(inIndex, outIndex){
  var $childIn = this.childrenNodes[inIndex],
    $childOut = this.childrenNodes[outIndex],
    animateIn = ($childIn.data("animate") || 'fadeUp') + ' animated';
  $childIn.removeClass("removeable").addClass(animateIn);
  if(outIndex!= void 0){
    var animateOut = ($childOut.data('animate') || 'fadeUp') + ' animated';
    $childOut.addClass("removeable").removeClass(animateOut);
  }
};

module.exports = SlidePage;

},{}]},{},["Fx/fZf"])