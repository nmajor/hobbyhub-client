var React = require('react');

var IndoorFilter = require('./filters/indoor');
var OutdoorFilter = require('./filters/outdoor');
var ComputerRequiredFilter = require('./filters/computer-required');
var ComputerNotRequiredFilter = require('./filters/computer-not-required');
var ArtisticFilter = require('./filters/artistic');
var PracticalFilter = require('./filters/practical');
var BeginnerFilter = require('./filters/beginner');
var IntermediateFilter = require('./filters/intermediate');
var AdvancedFilter = require('./filters/advanced');
var StartingCostFilter = require('./filters/starting-cost');

module.exports = React.createClass({
  render: function() {
    console.log(this.props.filter);
    return <div className="filter">
      <div className="row">
        <div className="col-md-12">
          <h2>Filter</h2>
        </div>
      </div>
      <div className="row">
        {this.renderIndoorFilter()}
        {this.renderComputerFilter()}
        {this.renderArtisticFilter()}
        {this.renderPracticalFilter()}
        {this.renderDifficultyFilter()}
        {this.renderStartingCostFilter()}
      </div>
    </div>
  },
  renderIndoorFilter: function() {
    return <div className="col-md-3">
      <IndoorFilter filter={this.props.filter} />
      <OutdoorFilter filter={this.props.filter} />
    </div>
  },
  renderComputerFilter: function() {
    return <div className="col-md-3">
      <ComputerRequiredFilter filter={this.props.filter} />
      <ComputerNotRequiredFilter filter={this.props.filter} />
    </div>
  },
  renderArtisticFilter: function() {
    return <div className="col-md-3">
      <ArtisticFilter filter={this.props.filter} />
    </div>
  },
  renderPracticalFilter: function() {
    return <div className="col-md-3">
      <PracticalFilter filter={this.props.filter} />
    </div>
  },
  renderDifficultyFilter: function() {
    return <div className="col-md-3">
      <BeginnerFilter filter={this.props.filter} />
      <IntermediateFilter filter={this.props.filter} />
      <AdvancedFilter filter={this.props.filter} />
    </div>
  },
  renderStartingCostFilter: function() {
    return <div className="col-md-3">
      <StartingCostFilter filter={this.props.filter} />
    </div>
  }
});

// indoor: true,
// computer: false,
// practical: true,
// creative: false,
// difficulty: 1,
// upfrontCost: 15,
// repeatCost: [5,10],
