var React = require('react');

var HobbyActions = require('../actions/hobby-actions');

module.exports = React.createClass({
  render: function() {
    return <div className="btn btn-md btn-block btn-primary random-button" onClick={this.handleClick}>Random</div>
  },
  handleClick: function(event) {
    HobbyActions.GetRandomHobby();
  }
});
