module.exports = function() {
  if (!require('./utils/is-browser')()) {return 'http://localhost:3000/api'}
  var domain = window.location.host;
  // return 'http://api.dathobby.com/api/';

  if ( domain === 'localhost:8000') {
    // return 'http://dockerhost/'
    return 'http://localhost:3000/api/'
  } else {
    return 'http://api.dathobby.com/api/';
  }
}();
