var Fetch = require('whatwg-fetch');
var rootUrl = require('../config');

module.exports = {
  get: function(url) {
    return fetch(rootUrl + url, {
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'get',
    })
    .then(function(response) {
      if (response.status !== 200) {
        throw {
          error: 'Non 200 response',
          response: response
        };
      }

      return response.json();
    });
  },
  post: function(url, data) {
    return fetch(rootUrl + url, {
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'post',
      body: JSON.stringify(data)
    })
    .then(function(response) {
      if (response.status !== 200) {
        throw {
          error: 'Non 200 response',
          response: response
        };
      }

      return response.json();
    });
  },
  put: function(url, data) {
    return fetch(rootUrl + url, {
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'put',
      body: JSON.stringify(data)
    })
    .then(function(response) {
      if (response.status !== 200) {
        throw {
          error: 'Non 200 response',
          response: response
        };
      }

      return response.json();
    });
  },
  delete: function(url) {
    return fetch(rootUrl + url, {
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'delete'
    })
    .then(function(response) {
      if (response.status !== 200) {
        throw {
          error: 'Non 200 response',
          response: response
        };
      }

      return response.json();
    });
  }
};
