var React = require('react');

var HobbyActions = require('../../actions/hobby-actions');
var FilterFormButton = require('./filter-form-button');

module.exports = React.createClass({
  render: function() {
    return <FilterFormButton
      extraClass='right third'
      active={this.isActive()}
      handleClick={this.handleClick}
    >
      Adv
    </FilterFormButton>
  },
  isActive: function() {
    return (this.props.filter.difficulty === 2);
  },
  handleClick: function() {
    if (this.props.filter.difficulty === 2) {
      HobbyActions.SetFilter('difficulty', undefined)
    } else {
      HobbyActions.SetFilter('difficulty', 2)
    }
  }
});
