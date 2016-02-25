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
      return this.filteredHobbies().map(function(hobby, index) {
        return <HobbyThumb key={hobby._id} hobby={hobby} active={_.get(this.props.hobby, 'slug') === hobby.slug} />
      }.bind(this));
    }
  },
  filteredHobbies: function() {
    var filter = this.props.filter;

    return _.filter(this.props.hobbies, function(hobby) {
      return (
        (filter.indoor === undefined || filter.indoor === hobby.indoor)
        && ( filter.computer === undefined || filter.computer === hobby.computer )
        && ( filter.artistic === undefined || filter.artistic === hobby.artistic )
        && ( filter.practical === undefined || filter.practical === hobby.practical )
        && ( filter.difficulty === undefined || filter.difficulty.indexOf(hobby.difficulty) > -1 )
      )
    });
  }
});
