var React = require('react');
var RouterContext = require('react-router').RouterContext;

module.exports = function(renderProps) {
  console.log('blah2');
  console.log(RouterContext);
  return <RouterContext {...renderProps} />
}
