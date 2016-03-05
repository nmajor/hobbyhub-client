var React = require('react');
var Link = require('react-router').Link;

module.exports = React.createClass({
  render: function() {
    return <footer id="footer">
      <div className="container">
        <div className="footer-nav">
          <Link to="/about">About</Link>
          <span className="dot">&middot;</span>
          <Link to="/contact">Contact</Link>
          <span className="dot">&middot;</span>
          <Link to="/affiliates">Affiliates</Link>
        </div>
      </div>
    </footer>
  }
});
