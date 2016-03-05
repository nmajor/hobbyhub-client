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
      Artistic
    </FilterFormButton>
  },
  isActive: function() {
    return (this.props.filter.artistic === true);
  },
  handleClick: function() {
    if (this.props.filter.artistic === true) {
      HobbyActions.SetFilter('artistic', undefined)
    } else {
      HobbyActions.SetFilter('artistic', true)
    }
  }
});
