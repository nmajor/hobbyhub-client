var React = require('react');

var HobbyForm = require('./hobby-form');
var HobbyActions = require('../actions/hobby-actions');

module.exports = React.createClass({
  componentWillMount: function() {
    HobbyActions.GetHobby(this.props.params.hobbySlug);
  },
  render: function() {
    return <div className="edit-hobby">
      <HobbyForm />
    </div>
  }
});
