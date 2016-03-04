function isBrowser() {try {return this===window;}catch(e){ return false;}}

module.exports = isBrowser;
