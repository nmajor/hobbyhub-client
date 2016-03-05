var React = require('react');

var HobbyForm = require('./hobby-form');
var HobbyActions = require('../actions/hobby-actions');

module.exports = React.createClass({
  componentWillMount: function() {
    HobbyActions.LoadNewHobby();
  },
  render: function() {
    return <div className="new-hobby">
      <HobbyForm />
    </div>
  }
});
