var React = require('react');

module.exports = React.createClass({
  render: function() {
    return <div
      className={'filter-form-button ' + this.props.extraClass + (this.props.active ? ' active' : '')}
      onClick={this.props.handleClick}
    >
      {this.props.children}
    </div>
  }
});
