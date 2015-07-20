/**
 * @brief SlidePage实例（以ins为例） 对外暴露的接口
 * @param ins.init() slide场景初始化和每次点预览之后调用
 * @param ins.enable()  init之后执行，激活slide功能
 * @param ins.disable()  enable的逆向操作，禁用slide功能
 * @param ins.goPage(index)  无动画直接跳去slide中的某页，index为页码，从0开始
 * @param ins.nextPage()  动画切至下一页
 * @param ins.prePage()  动画切至上一页
 */

var SlidePage = require('./slide'),
  events = require('../../external/events'),
  p;

// 禁用slide功能
SlidePage.prototype.disable = function() {
  // 在H5编辑器的某些状态，不需要阻止touchmove的默认行为
  document.removeEventListener('touchmove', this.preventDefault, false)

  this.$container.off('swipeUp', this.pageSelector).off('swipeDown', this.pageSelector)
  return this
}

// 直接跳转到某页
SlidePage.prototype.goPage = function(index){
  this.index = index
  this.pageArray.filter('.active').removeClass('active')
  this.pageArray.eq(index).addClass('active')
};

p = $.extend(SlidePage.prototype, events.prototype);

// p.prePage = function () {
//   SlidePage.prototype.prePage.call(this);
//   this.idxUpdated();
// };

// p.nextPage = function () {
//   SlidePage.prototype.prePage.call(this);
//   this.idxUpdated()
// };

p.idxUpdated = function (curIdx, preIdx) {
    var evtName = curIdx > preIdx ? 'nextPageEnd' : 'prePageEnd';

    this.fire(evtName);
    this.fire('idxUpdated', curIdx, preIdx);
};

module.exports = SlidePage;
