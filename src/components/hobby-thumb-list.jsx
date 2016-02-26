var React = require('react');
var _ = require('lodash');

var HobbyThumb = require('./hobby-thumb');
var Loading = require('./loading');

module.exports = React.createClass({
  render: function() {
    return <div className="hobby-thumb-list">
      {this.renderList()}
    </div>
  },
  renderList: function() {
    if (this.props.hobbies) {
      return this.props.hobbies.map(function(hobby, index) {
        return <HobbyThumb key={hobby._id} hobby={hobby} active={_.get(this.props.hobby, 'slug') === hobby.slug} />
      }.bind(this));
    }
  }
});
