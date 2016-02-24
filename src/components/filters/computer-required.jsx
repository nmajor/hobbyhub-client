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
      Comp
    </FilterFormButton>
  },
  isActive: function() {
    return (this.props.filter.computer === true);
  },
  handleClick: function() {
    if (this.props.filter.computer === true) {
      HobbyActions.SetFilter('computer', undefined)
    } else {
      HobbyActions.SetFilter('computer', true)
    }
  }
});
