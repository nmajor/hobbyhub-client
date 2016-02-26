var React = require('react');

var HobbyActions = require('../actions/hobby-actions');

module.exports = React.createClass({
  render: function() {
    return <div className="video-form-group bottom-bumper form-inline">
      <div className="form-group right-bumper">Url: <input
          type="text"
          className="form-control"
          onChange={this.handleSrcChange}
          placeholder='http://example.com'
          value={this.props.video.src}
        />
      </div><div className="form-group">Text: <input
          type="text"
          className="form-control"
          onChange={this.handleTextChange}
          placeholder='text'
          value={this.props.video.text}
        />
      </div>
      <div className="form-group"> <button
        className="btn btn-danger"
        onClick={this.handleRemoveClick}>Remove</button>
      </div>
    </div>
  },
  handleSrcChange: function(event) {
    var video = this.props.video;
    video.src = event.target.value;
    HobbyActions.SetResource('videos', this.props.index, video);
  },
  handleTextChange: function(event) {
    var video = this.props.video;
    video.text = event.target.value;
    HobbyActions.SetResource('videos', this.props.index, video);
  },
  handleRemoveClick: function(event) {
    event.preventDefault();
    HobbyActions.RemoveResource('videos', this.props.index)
  }
});
