var React = require('react');

var HobbyActions = require('../actions/hobby-actions');

module.exports = React.createClass({
  render: function() {
    return <div
      className={'hobby-thumb ' + (this.props.active ? 'active' : '')}
      onClick={this.handleClick}
    >
      {this.props.hobby.name}
    </div>
  },
  renderActiveClass: function() {
  },
  handleClick: function() {
    HobbyActions.SetHobby(this.props.hobby);
  }
});
