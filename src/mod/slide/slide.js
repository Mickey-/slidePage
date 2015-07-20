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
