var React = require('react');

var HobbyThumb = require('./hobby-thumb');

module.exports = React.createClass({
  render: function() {
    return <div className="hobby-thumb-list">
      {this.renderList()}
    </div>
  },
  renderList: function() {
    return this.props.hobbies.map(function(hobby, index) {
      return <HobbyThumb key={hobby._id} hobby={hobby} active={this.props.hobby === hobby} />
    }.bind(this));
  }
});
