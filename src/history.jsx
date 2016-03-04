var history = require('./utils/is-browser')() ? require('history').createHashHistory({ queryKey: false }) : undefined;

module.exports = history;
