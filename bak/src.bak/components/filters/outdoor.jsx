var React = require('react');

var HobbyActions = require('../../actions/hobby-actions');
var FilterFormButton = require('./filter-form-button');

module.exports = React.createClass({
  render: function() {
    return <FilterFormButton
      extraClass='right half'
      active={this.isActive()}
      handleClick={this.handleClick}
    >
      Outdoor
    </FilterFormButton>
  },
  isActive: function() {
    return this.props.filter.indoor === false;
  },
  handleClick: function() {
    if (this.props.filter.indoor === false) {
      HobbyActions.SetFilter('indoor', undefined)
    } else {
      HobbyActions.SetFilter('indoor', false)
    }
  }
});
