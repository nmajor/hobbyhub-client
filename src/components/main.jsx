var React = require('react');
var Reflux = require('reflux');

var HobbyActions = require('../actions/hobby-actions');
var HobbyStore = require('../stores/hobby-store');

var Filter = require('./filter');
var Hobby = require('./hobby');
var HobbyThumbList = require('./hobby-thumb-list');

module.exports = React.createClass({
  mixins: [
    Reflux.connect(HobbyStore),
  ],
  componentWillMount: function() {
    HobbyActions.GetHobbies();
  },
  render: function() {
    return <div className="main">
      <div className="container-fluid">
        {this.content()}
      </div>
    </div>
  },
  content: function() {
    if(this.props.children) {
      return <div className="container">
        {this.props.children}
      </div>
    } else {
      return <div className="container">
        <div className="row">
          <div className="col-md-12">
            <Filter filter={this.state.filter} />
          </div>
        </div>
        <div className="row">
          <div className="col-md-3">
            <HobbyThumbList hobbies={this.state.hobbies} hobby={this.state.hobby} />
          </div>
          <div className="col-md-9">
            <Hobby hobby={this.state.hobby} />
          </div>
        </div>
      </div>
    }
  }
});
