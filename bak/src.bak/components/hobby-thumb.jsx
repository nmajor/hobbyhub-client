var React = require('react');
var Link = require('react-router').Link;

var HobbyActions = require('../actions/hobby-actions');
var history = require('../history');

module.exports = React.createClass({
  render: function() {
    return <Link
      className={'hobby-thumb ' + (this.props.active ? 'active' : '')}
      to={'hobbies/'+this.props.hobby.slug}
    >
      {this.props.hobby.name}
    </Link>
  }
});
