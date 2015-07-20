var entry = require('./entry')

entry.getFragment = function() {
  return $(document.createRange().createContextualFragment($('#J_sections').text()))
}

module.exports = entry
