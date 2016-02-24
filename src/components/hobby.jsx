var React = require('react');
var Reflux = require('reflux');
var Link = require('react-router').Link;
var _ = require('lodash');

var UserStore = require('../stores/user-store');

module.exports = React.createClass({
  mixins: [
    Reflux.connect(UserStore),
  ],

  render: function() {
    return <div className="hobby">
      {this.renderHobby()}
    </div>
  },
  renderHobby: function() {
    if (!this.props.hobby) { return; }

    return <div>
      <h1>{this.props.hobby.name} {this.renderHobbyActions()}</h1>
      <div className="row">
        <div className="col-md-6">
          <img className="hobby-image" src={this.props.hobby.imageUrl} />
        </div>
        <div className="col-md-6">
          <h4>Info</h4>
          {this.renderInfo()}
        </div>
      </div>
      <div className="row">
        <div className="col-md-12">
          <h4>Description</h4>
          <p>{this.props.hobby.desc}</p>
        </div>
      </div>
      <div className="row">
        <div className="col-md-6">
          <h4>Resources</h4>
          {this.renderResources()}
        </div>
        <div className="col-md-6">
          <h4>Affiliate Links</h4>
          {this.renderAffiliateLinks()}
        </div>
      </div>
    </div>
  },
  renderHobbyActions: function() {
    if (this.state.userLoggedIn) {
      return <div className="hobby-actions">
        <Link to={'/hobbies/' + this.props.hobby.slug + '/edit'} className="edit-hobby">edit</Link>
      </div>
    }
  },

  renderInfo: function() {
    return <div>
      {this.renderIndoorInfo()}
      {this.renderComputerInfo()}
      {this.renderComputerInfo()}
    </div>
  },
  renderIndoorInfo: function() {
    if (this.props.hobby.indoor !== undefined) {
      return <div className="info-item">
        { this.props.hobby.indoor === true ? 'Indoor' : 'Outdoor' }
      </div>
    }
  },
  renderComputerInfo: function() {
    if (this.props.hobby.computer !== undefined) {
      return <div className="info-item">
        { this.props.hobby.computer === true ? 'Computer' : 'No Computer' }
      </div>
    }
  },
  renderResources: function() {
    if (!this.props.hobby.resources) {return null;}

    return this.props.hobby.resources.map(function(resource, index) {
      return <Link className="reference" key={index} to={resource.ref}>{resource.text}</Link>
    });
  },
  renderAffiliateLinks: function() {
    if (this.props.hobby.affiliateLinks) {return null;}

    return this.props.hobby.affiliateLinks.map(function(resource, index) {
      return <Link className="reference" key={index} to={resource.ref}>{resource.text}</Link>
    });
  }
});
