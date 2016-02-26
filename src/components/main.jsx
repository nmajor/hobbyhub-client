var React = require('react');
var Reflux = require('reflux');
var _ = require('lodash');

var HobbyActions = require('../actions/hobby-actions');
var HobbyStore = require('../stores/hobby-store');

var Filter = require('./filter');
var Hobby = require('./hobby');
var HobbyThumbList = require('./hobby-thumb-list');
var RandomButton = require('./random-button');

module.exports = React.createClass({
  mixins: [
    Reflux.connect(HobbyStore),
  ],
  componentWillMount: function() {
    HobbyActions.GetHobbiesAndOrHobby(this.props.params.hobbySlug);
  },
  componentWillUpdate: function() {

  },
  render: function() {
    return <div className="main">
        {this.content()}
    </div>
  },
  content: function() {
    if(this.props.children) {
      return <div>
        {this.props.children}
      </div>
    } else {
      return <div>
        {this.renderFilter()}
        {this.renderRandomButton()}
        {this.renderHobbyContent()}
      </div>
    }
  },
  renderFilter: function() {
    return <div className="row">
      <div className="col-md-12">
        <Filter loadingHobbies={this.state.loadingHobbies} hobbies={this.state.filteredHobbies} filter={this.state.filter} />
      </div>
    </div>
  },
  renderRandomButton: function() {
    if (!this.state.filteredHobbies || this.state.filteredHobbies.length === 0) { return null; }

    return <div className="row">
      <div className="col-md-12">
        <RandomButton />
      </div>
    </div>
  },
  renderHobbyContent: function() {
    if (this.state.showHobbyList) {
      return <div className="row">
        <div className="col-md-3">
          <HobbyThumbList filter={this.state.filter} loading={this.state.loadingHobbies} hobbies={this.state.filteredHobbies} hobby={this.state.hobby} />
        </div>
        <div className="col-md-9">
          <Hobby hobby={this.state.hobby} loading={this.state.loadingHobby} />
        </div>
      </div>
    } else {
      return <div className="row">
        <div className="col-md-12">
          <Hobby hobby={this.state.hobby} loading={this.state.loadingHobby} />
        </div>
      </div>
    }
  }
});
