var React = require('react');

var HobbyActions = require('../../actions/hobby-actions');
var FilterFormButton = require('./filter-form-button');

module.exports = React.createClass({
  render: function() {
    return <FilterFormButton
      extraClass='left half'
      active={this.isActive()}
      handleClick={this.handleClick}
    >
      Indoor
    </FilterFormButton>
  },
  isActive: function() {
    return (this.props.filter.indoor === true);
  },
  handleClick: function() {
    if (this.props.filter.indoor === true) {
      HobbyActions.SetFilter('indoor', undefined)
    } else {
      HobbyActions.SetFilter('indoor', true)
    }
  }
});
