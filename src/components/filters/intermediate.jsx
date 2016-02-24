var React = require('react');

var HobbyActions = require('../../actions/hobby-actions');
var FilterFormButton = require('./filter-form-button');

module.exports = React.createClass({
  render: function() {
    return <FilterFormButton
      extraClass='mid third'
      active={this.isActive()}
      handleClick={this.handleClick}
    >
      Int
    </FilterFormButton>
  },
  val: 1,
  isActive: function() {
    var difficulty = this.props.filter.difficulty || [];
    return (difficulty.indexOf(this.val) > -1);
  },
  handleClick: function() {
    var difficulty = this.props.filter.difficulty || [];
    var val = this.val;

    if (difficulty.indexOf(val) > -1) {
      _.remove(difficulty, function(d) { return d === val })
    } else {
      difficulty.push(val)
    }

    if (difficulty.length === 0) {
      difficulty = undefined;
    }

    HobbyActions.SetFilter('difficulty', difficulty);

    // HobbyActions.SetFilter('difficulty', difficulty);
    // if (this.props.filter.difficulty === 1) {
    //   HobbyActions.SetFilter('difficulty', undefined)
    // } else {
    //   HobbyActions.SetFilter('difficulty', 1)
    // }
  }
});
