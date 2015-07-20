var factory = require('./../../mod/elements/factory'),
  entry = require('./entry'),
  lastpage = require('./lastpage.json')

console.log(lastpage)
entry.getFragment = function() {
  return factory.parse(window.data)
}
entry.appendExtraPage = function() {
  var $lastPageFragment = factory.parse(lastpage)
  $('#wrap').append($lastPageFragment.$el)
}

module.exports = entry
