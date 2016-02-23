var React = require('react');

var HobbyActions = require('../../actions/hobby-actions');
var FilterFormButton = require('./filter-form-button');

module.exports = React.createClass({
  render: function() {
    return <FilterFormButton
      extraClass=''
      active={this.isActive()}
      handleClick={this.handleClick}
    >
      Practical
    </FilterFormButton>
  },
  isActive: function() {
    return (this.props.filter.practical === true);
  },
  handleClick: function() {
    if (this.props.filter.practical === true) {
      HobbyActions.SetFilter('practical', undefined)
    } else {
      HobbyActions.SetFilter('practical', true)
    }
  }
});
