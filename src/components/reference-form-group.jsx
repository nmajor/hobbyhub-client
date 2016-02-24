var React = require('react');

var HobbyActions = require('../actions/hobby-actions');

module.exports = React.createClass({
  render: function() {
    return <div className="resource-form-group form-inline">
      <div className="form-group right-bumper">Url: <input
          type="text"
          className="form-control"
          onChange={this.handleRefChange}
          placeholder='http://example.com'
          value={this.props.resource.ref}
        />
      </div><div className="form-group">Text: <input
          type="text"
          className="form-control"
          onChange={this.handleTextChange}
          placeholder='text'
          value={this.props.resource.text}
        />
      </div>
      <div className="form-group left-bumper"> <button
        className="btn btn-danger"
        onClick={this.handleRemoveClick}>Remove</button>
      </div>
    </div>
  },
  handleRefChange: function(event) {
    var newResource = this.props.resource;
    newResource.ref = event.target.value;
    HobbyActions.SetResource(this.props.attr, this.props.index, newResource);
  },
  handleTextChange: function(event) {
    var newResource = this.props.resource;
    newResource.text = event.target.value;
    HobbyActions.SetResource(this.props.attr, this.props.index, newResource);
  },
  handleRemoveClick: function(event) {
    event.preventDefault();
    HobbyActions.RemoveResource(this.props.attr, this.props.index)
  }
});
