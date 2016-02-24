var React = require('react');
var Link = require('react-router').Link;

module.exports = React.createClass({
  render: function() {
    return <div className="center page-not-found">
      <h1>404</h1>
      <p>The page you are looking for does not exist</p>
      <Link to="/" >Back to home</Link>
    </div>
  }
});
