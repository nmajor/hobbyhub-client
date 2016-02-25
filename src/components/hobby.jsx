var React = require('react');
var Reflux = require('reflux');
var Link = require('react-router').Link;
var _ = require('lodash');

var UserStore = require('../stores/user-store');
var EmbeddedVideo = require('./embedded-video');
var Loading = require('./loading');

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
        <Link to={'/admin/hobbies/' + this.props.hobby.slug + '/edit'} className="edit-hobby">edit</Link>
      </div>
    }
  },
  renderInfo: function() {
    return <div>
      <h4>Info</h4>
      {this.renderIndoorInfo()}
      {this.renderComputerInfo()}
      {this.renderPracticalInfo()}
      {this.renderArtisticInfo()}
      {this.renderDifficultyInfo()}
      {this.renderStartingCostInfo()}
      {this.renderRepeatCostInfo()}
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
  renderPracticalInfo: function() {
    if (this.props.hobby.practical !== undefined && this.props.hobby.indoor === true) {
      return <div className="info-item">Practical</div>
    }
  },
  renderArtisticInfo: function() {
    if (this.props.hobby.artistic !== undefined && this.props.hobby.artistic === true) {
      return <div className="info-item">Artistic</div>
    }
  },
  renderDifficultyInfo: function() {
    if (this.props.hobby.difficulty !== undefined) {
      var difficultyString = '';
      switch(this.props.hobby.difficulty) {
        case 0:
          difficultyString = 'Beginner';
          break;
        case 1:
          difficultyString = 'Intermediate';
          break;
        case 1:
          difficultyString = 'Advanced';
          break;
      }
      return <div className="info-item">{difficultyString}</div>
    }
  },
  renderStartingCostInfo: function() {
    if (this.props.hobby.startingCost !== undefined) {
      if (this.props.hobby.startingCost[0] === this.props.hobby.startingCost[1]) {
        return <div className="info-item">Start ${this.props.hobby.startingCost[0]}</div>
      } else {
        return <div className="info-item">Start ${this.props.hobby.startingCost[0]}-${this.props.hobby.startingCost[1]}</div>
      }
    }
  },
  renderRepeatCostInfo: function() {
    if (this.props.hobby.repeatCost !== undefined) {
      if (this.props.hobby.repeatCost[0] === this.props.hobby.repeatCost[1]) {
        return <div className="info-item">Repeat ${this.props.hobby.repeatCost[0]}</div>
      } else {
        return <div className="info-item">Repeat ${this.props.hobby.repeatCost[0]}-${this.props.hobby.repeatCost[1]}</div>
      }
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
