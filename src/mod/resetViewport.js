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
