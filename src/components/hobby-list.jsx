var React = require('react');
var Reflux = require('reflux');
var Link = require('react-router').Link;

var HobbyStore = require('../stores/hobby-store');
var HobbyActions = require('../actions/hobby-actions');

module.exports = React.createClass({
  mixins: [
    Reflux.connect(HobbyStore),
  ],
  componentWillMount: function() {
    HobbyActions.GetHobbies();
  },
  render: function() {
    return <div className="hobby-list">
      {this.renderHobbyList()}
    </div>
  },
  renderHobbyList: function() {
    if (!this.state.hobbies) {return null;}

    return this.state.hobbies.map(function(hobby) {
      return <div key={hobby._id} className="hobby-list-item">{hobby.name} <Link to={'/admin/hobbies/'+hobby.slug+'/edit'}>Edit</Link></div>
    })
  }
});
