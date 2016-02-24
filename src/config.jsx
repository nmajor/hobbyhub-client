module.exports = function() {
  var domain = window.location.host;

  if ( domain === 'localhost:8000') {
    // return 'http://dockerhost/'
    return 'http://localhost:3000/'
  } else {
    return 'http://api.dathobby.com/';
  }
}();
