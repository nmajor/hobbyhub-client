var React = require('react');
var ga = require('../ga');

module.exports = React.createClass({
  render: function() {
    return <a className="reference" href={this.props.resource.ref} onClick={this.handleClick}>{this.props.resource.text}</a>
  },
  handleClick: function() {
    if (ga) {
      ga({
        category: 'Hobby',
        action: 'Clicked Affiliate Link',
        label: this.props.hobby.name,
        value: this.props.resource.ref
      });
    }
  }
});
