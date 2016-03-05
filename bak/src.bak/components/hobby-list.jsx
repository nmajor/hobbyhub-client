var React = require('react');
var Reflux = require('reflux');
var Link = require('react-router').Link;

var HobbyStore = require('../stores/hobby-store');
var HobbyActions = require('../actions/hobby-actions');
var Loading = require('./loading');

module.exports = React.createClass({
  mixins: [
    Reflux.connect(HobbyStore),
  ],
  componentWillMount: function() {
    HobbyActions.GetAllHobbies();
  },
  render: function() {
    return <div className="hobby-list">
      {this.renderHobbyList()}
    </div>
  },
  renderHobbyList: function() {
    if (this.state.loadingHobbies) {
      return <div><span className="text-loader"><Loading /></span> Loading hobbies</div>
    }

    if (this.state.hobbies) {
      return this.state.hobbies.map(function(hobby) {
        return <div key={hobby._id} className="hobby-list-item">
            {this.renderPublicIcon(hobby.public)}
            <span className="hobby-name mid-bumper">{hobby.name}</span>
            <Link className="right-bumper" to={'/hobbies/'+hobby.slug} >View</Link>
            <Link to={'/admin/hobbies/'+hobby.slug+'/edit'} >Edit</Link>
        </div>
      }.bind(this));
    }
  },
  renderPublicIcon: function(pub) {
    if (pub) {
      return <span className="public text-success"><span className="glyphicon glyphicon-ok" aria-hidden="true"></span></span>
    } else {
      return <span className="public text-muted"><span className="glyphicon glyphicon-minus" aria-hidden="true"></span></span>
    }
  }
});
