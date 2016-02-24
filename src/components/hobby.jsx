var React = require('react');
var Reflux = require('reflux');
var Link = require('react-router').Link;
var _ = require('lodash');

var UserStore = require('../stores/user-store');
var EmbeddedVideo = require('./embedded-video');

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
          {this.renderResources()}
        </div>
        <div className="col-md-6">
          {this.renderAffiliateLinks()}
        </div>
      </div>
      <div className="row">
        <div className="col-md-12">
          {this.renderVideos()}
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
      <h4>Info</h4>
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
    if (!this.props.hobby.resources || this.props.hobby.resources.length === 0) {return null;}

    var resources = this.props.hobby.resources.map(function(resource, index) {
      return <Link className="reference" key={index} to={resource.ref}>{resource.text}</Link>
    });

    return  <div>
      <h4>Resources</h4>
      {resources}
    </div>
  },
  renderAffiliateLinks: function() {
    if (!this.props.hobby.affiliateLinks || this.props.hobby.affiliateLinks.length === 0) { return null; }

    var affiliateLinks = this.props.hobby.affiliateLinks.map(function(resource, index) {
      return <Link className="reference" key={index} to={resource.ref}>{resource.text}</Link>
    });

    return  <div>
      <h4>Affiliate Links</h4>
      {affiliateLinks}
    </div>
  },
  renderVideos: function() {
    if (!this.props.hobby.videos || this.props.hobby.videos.length === 0) { return null; }

    var videos = this.props.hobby.videos.map(function(video, index) {
      return <EmbeddedVideo src={video.src} key={index} />
    });

    return <div>
      <h4>Videos</h4>
      {videos}
    </div>
  },

});
