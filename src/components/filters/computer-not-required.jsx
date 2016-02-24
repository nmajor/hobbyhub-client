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
      No Comp
    </FilterFormButton>
  },
  isActive: function() {
    return (this.props.filter.computer === false);
  },
  handleClick: function() {
    if (this.props.filter.computer === false) {
      HobbyActions.SetFilter('computer', undefined)
    } else {
      HobbyActions.SetFilter('computer', false)
    }
  }
});
