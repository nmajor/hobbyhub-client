var React = require('react');
var Reflux = require('reflux');
var Link = require('react-router').Link;
var _ = require('lodash');

var UserStore = require('../stores/user-store');
var EmbeddedVideo = require('./embedded-video');
var Resource = require('./resource');
var AffiliateLink = require('./affiliate-link');
var Loading = require('./loading');
var ImageLoader = require('./image-loader');
var HobbyTags = require('./hobby-tags');

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
    if (!this.props.hobby && this.props.loading) {
      return <div><span className="text-loader"><Loading /></span> Loading hobby</div>
    } else if (!this.props.hobby) { return null; }

    return <div>
      <h1>{this.props.hobby.name} {this.renderHobbyActions()}</h1>
      <div className="row">
        <div className="col-md-12">
          {this.renderTags()}
        </div>
      </div>
      <div className="row">
        <div className="col-md-6">
          {this.renderHobbyImage()}
        </div>
        <div className="col-md-6">
          <h4>Description</h4>
          <p>{this.props.hobby.desc}</p>
        </div>
      </div>
      <div className="row">
        <div className="col-md-12">
          {this.renderSharing()}
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
  renderTags: function() {
    return <HobbyTags hobby={this.props.hobby} />
  },
  renderSharing: function() {
    return <div className="addthis_sharing_toolbox"></div>
  },
  renderHobbyImage: function() {
    return <ImageLoader imgClassName="hobby-image" src={this.props.hobby.imageUrl} />
  },
  renderHobbyActions: function() {
    if (this.state.userLoggedIn) {
      return <div className="hobby-actions">
        <Link to={'/admin/hobbies/' + this.props.hobby.slug + '/edit'} className="edit-hobby">edit</Link>
      </div>
    }
  },
  renderResources: function() {
    if (!this.props.hobby.resources || this.props.hobby.resources.length === 0) {return null;}

    var resources = this.props.hobby.resources.map(function(resource, index) {
      return <Resource hobby={this.props.hobby} resource={resource} key={index} />
    }.bind(this));

    return  <div>
      <h4>Resources</h4>
      {resources}
    </div>
  },
  renderAffiliateLinks: function() {
    if (!this.props.hobby.affiliateLinks || this.props.hobby.affiliateLinks.length === 0) { return null; }

    var affiliateLinks = this.props.hobby.affiliateLinks.map(function(resource, index) {
      return <AffiliateLink hobby={this.props.hobby} resource={resource} key={index} />
    }.bind(this));

    return <div className="affiliate-links">
      <h4>Affiliate Links</h4>
      {affiliateLinks}
    </div>
  },
  renderVideos: function() {
    if (!this.props.hobby.videos || this.props.hobby.videos.length === 0) { return null; }

    var videos = this.props.hobby.videos.map(function(video, index, array) {
      var botmost = index === (array.length - 1);
      return <div className="col-md-6">
        <EmbeddedVideo hobby={this.props.hobby} video={video} key={index} />
      </div>
    }.bind(this));

    return <div className="videos">
      <h4>Videos</h4>
      <div className="row">
        {videos}
      </div>
    </div>
  },
  handleAffiliateLinkClick: function() {

  }

});
