var React = require('react');
var Reflux = require('reflux');
var Link = require('react-router').Link;
var _ = require('lodash');

var HobbyActions = require('../actions/hobby-actions');
var HobbyStore = require('../stores/hobby-store');

var ReferenceFormGroup = require('./reference-form-group');
var VideoFormGroup = require('./video-form-group');
var Loading = require('./loading');

module.exports = React.createClass({
  mixins: [
    Reflux.connect(HobbyStore),
  ],
  render: function() {
    return <div className="hobby-form row">
      <div className="col-md-8">
        <h1>{this.renderHeaderText()} {this.renderViewLink()}</h1>
        {this.renderForm()}
      </div>
    </div>
  },
  renderHeaderText: function() {
    if (!this.state.hobby) {return null;}

    if (this.state.hobby._id) {
      return 'Edit Hobby';
    } else {
      return 'New Hobby'
    }
  },
  renderViewLink: function() {
    if (!this.state.hobby) {return null;}

    if (this.state.hobby._id) {
      return <Link className="view-link" to={'/hobbies/'+this.state.hobby.slug}>view</Link>;
    }
  },
  renderForm: function() {
    if (this.state.hobby) {
      return <form onSubmit={this.handleFormSubmit}>
        {this.renderImageUrlFormGroup()}
        {this.renderNameFormGroup()}
        {this.renderDescFormGroup()}
        {this.renderIndoorCheckbox()}
        {this.renderComputerCheckbox()}
        {this.renderPracticalCheckbox()}
        {this.renderArtisticCheckbox()}
        {this.renderDifficultyFormGroup()}
        {this.renderStartingCostFormGroup()}
        {this.renderRepeatCostFormGroup()}
        {this.renderResourcesFormGroup()}
        {this.renderAffiliateLinkFormGroup()}
        {this.renderVideosFormGroup()}
        {this.renderPublicCheckbox()}
        {this.renderUpdatedAt()}
        <button onClick={this.handleFormSubmit} className="btn btn-success btn-block">Save</button>
      </form>
    }
  },
  renderImageUrlFormGroup: function() {
    return <div className="form-group">
      <label htmlFor="hobby-image-url">Image Url</label>
      {this.renderImagePreview()}
      <input
        type="text"
        className="form-control"
        id="hobby-image-url"
        placeholder="http://example.com/image.jpeg"
        value={this.state.hobby.imageUrl}
        onChange={this.handleImageUrlChange}
        />
    </div>
  },
  renderImagePreview: function() {
    if (this.state.hobby.imageUrl) {
      return <div className="image-preview bottom-bumper">
        <img src={this.state.hobby.imageUrl} />
      </div>
    }
  },
  renderNameFormGroup: function() {
    return <div className="form-group">
      <label htmlFor="hobby-name">Name</label>
      <input
        type="text"
        className="form-control"
        id="hobby-name"
        placeholder="Name"
        value={this.state.hobby.name}
        onChange={this.handleNameChange}
        />
    </div>
  },
  renderDescFormGroup: function() {
    return <div className="form-group">
      <label htmlFor="hobby-desc">Description</label>
      <textarea
        className="form-control"
        id="hobby-desc"
        onChange={this.handleDescChange}
        value={this.state.hobby.desc}
      ></textarea>
    </div>
  },
  renderIndoorCheckbox: function() {
    return <div className="checkbox">
      <label>
        <input type="checkbox" id="hobby-indoor" onChange={this.handleIndoorChange} checked={this.state.hobby.indoor} /> Indoor
      </label>
    </div>
  },
  renderComputerCheckbox: function() {
    return <div className="checkbox">
      <label>
        <input type="checkbox" id="hobby-computer" onChange={this.handleComputerChange} checked={this.state.hobby.computer} /> Computer
      </label>
    </div>
  },
  renderPracticalCheckbox: function() {
    return <div className="checkbox">
      <label>
        <input type="checkbox" id="hobby-practical" onChange={this.handlePracticalChange} checked={this.state.hobby.practical} /> Practical
      </label>
    </div>
  },
  renderArtisticCheckbox: function() {
    return <div className="checkbox">
      <label>
        <input type="checkbox" id="hobby-artistic" onChange={this.handleArtisticChange} checked={this.state.hobby.artistic} /> Artistic
      </label>
    </div>
  },
  renderDifficultyFormGroup: function() {
    return <div className="form-group">
      <label htmlFor="hobby-defficulty">Difficulty</label>
      <select
        value={this.state.hobby.difficulty}
        className="form-control"
        id="hobby-defficulty"
        onChange={this.handleDifficultyChange}
      >
        <option value='0'>Beg</option>
        <option value='1'>Int</option>
        <option value='2'>Adv</option>
      </select>
    </div>
  },
  renderStartingCostFormGroup: function() {
    return <div className="form-group">
      <label htmlFor="hobby-starting-cost">Starting Cost</label>
        <div className="form-inline">
          <div className="form-group">
          <input
            type="number"
            className="form-control"
            id="hobby-starting-cost-low"
            placeholder="Low"
            value={_.get(this.state.hobby, 'startingCost[0]')}
            onChange={this.handleStartingCostLowChange}
            />
        </div> to <div className="form-group">
          <input
            type="number"
            className="form-control"
            id="hobby-starting-cost-low"
            placeholder="High"
            value={_.get(this.state.hobby, 'startingCost[1]')}
            onChange={this.handleStartingCostHighChange}
            />
        </div>
      </div>
    </div>
  },
  renderRepeatCostFormGroup: function() {
    return <div className="form-group">
      <label htmlFor="hobby-starting-cost">Repeat Cost</label>
        <div className="form-inline">
          <div className="form-group">
          <input
            type="number"
            className="form-control"
            id="hobby-repeat-cost-low"
            placeholder="Low"
            value={_.get(this.state.hobby, 'repeatCost[0]')}
            onChange={this.handleRepeatCostLowChange}
            />
        </div> to <div className="form-group">
          <input
            type="number"
            className="form-control"
            id="hobby-repeat-cost-low"
            placeholder="High"
            value={_.get(this.state.hobby, 'repeatCost[1]')}
            onChange={this.handleRepeatCostHighChange}
            />
        </div>
      </div>
    </div>
  },
  renderResourcesFormGroup: function() {
    var referenceFormGroups = _.map(this.state.hobby.resources, function(resource, index) {
      return <ReferenceFormGroup key={index} resource={resource} index={index} attr='resources' />
    });

    return <div>
      <label htmlFor="hobby-resources">Resources</label>
      {referenceFormGroups}
      <div className="form-group">
        <button className="btn btn-success" onClick={this.handleAddResourceClick}>Add Resource</button>
      </div>
    </div>
  },
  renderAffiliateLinkFormGroup: function() {
    var affiliateLinkFormGroups = _.map(this.state.hobby.affiliateLinks, function(resource, index) {
      return <ReferenceFormGroup key={index} resource={resource} index={index} attr='affiliateLinks' />
    });

    return <div>
      <label htmlFor="hobby-resources">Affiliate Links</label>
      {affiliateLinkFormGroups}
      <div className="form-group">
        <button className="btn btn-success" onClick={this.handleAddAffiliateLinkClick}>Add Affiliate Link</button>
      </div>
    </div>
  },
  renderVideosFormGroup: function() {
    var videos = _.map(this.state.hobby.videos, function(video, index) {
      return <VideoFormGroup key={index} video={video} index={index} />
    });

    return <div>
      <label htmlFor="hobby-resources">Youtube Videos</label>
      {videos}
      <div className="form-group">
        <button className="btn btn-success" onClick={this.handleAddVideoClick}>Add Video</button>
      </div>
    </div>
  },
  renderPublicCheckbox: function() {
    return <div className="checkbox">
      <label>
        <input type="checkbox" id="hobby-indoor" onChange={this.handlePublicChange} checked={this.state.hobby.public} /> Public
      </label>
    </div>
  },
  renderUpdatedAt: function() {
    if (this.state.savingHobby) {
      return <div><span className="text-loader"><Loading /></span> Saving</div>
    } else if (this.state.hobby.updatedAt) {
      var updatedTimestamp = Date.parse(this.state.hobby.updatedAt);
      var secondsAgo = parseInt( (Date.now() - updatedTimestamp) / 1000 );
      return <div className="updated-at">Updated {secondsAgo} seconds ago</div>
    }
  },

  // Event Handlers
  handleImageUrlChange: function(event) { HobbyActions.SetHobbyAttribute('imageUrl', event.target.value); },
  handleNameChange: function(event) { HobbyActions.SetHobbyAttribute('name', event.target.value); },
  handleDescChange: function(event) { HobbyActions.SetHobbyAttribute('desc', event.target.value); },
  handleIndoorChange: function(event) { HobbyActions.SetHobbyAttribute('indoor', !this.state.hobby.indoor); },
  handleComputerChange: function(event) { HobbyActions.SetHobbyAttribute('computer', !this.state.hobby.computer); },
  handlePracticalChange: function(event) { HobbyActions.SetHobbyAttribute('practical', !this.state.hobby.practical); },
  handleArtisticChange: function(event) { HobbyActions.SetHobbyAttribute('artistic', !this.state.hobby.artistic); },
  handlePublicChange: function(event) { HobbyActions.SetHobbyAttribute('public', !this.state.hobby.public); },
  handleDifficultyChange: function(event) { HobbyActions.SetHobbyAttribute('difficulty', parseInt(event.target.value)); },
  handleStartingCostLowChange: function(event) {
    HobbyActions.SetHobbyAttribute('startingCost', [parseInt(event.target.value), _.get(this.state.hobby, 'startingCost[1]')]);
  },
  handleStartingCostHighChange: function(event) {
    HobbyActions.SetHobbyAttribute('startingCost', [_.get(this.state.hobby, 'startingCost[0]'), parseInt(event.target.value)]);
  },
  handleRepeatCostLowChange: function(event) {
    HobbyActions.SetHobbyAttribute('repeatCost', [parseInt(event.target.value), _.get(this.state.hobby, 'repeatCost[1]')]);
  },
  handleRepeatCostHighChange: function(event) {
    HobbyActions.SetHobbyAttribute('repeatCost', [_.get(this.state.hobby, 'repeatCost[0]'), parseInt(event.target.value)]);
  },
  handleAddResourceClick: function(event) {
    event.preventDefault();
    HobbyActions.AddResource('resources', {ref: '', text: ''});
  },
  handleAddAffiliateLinkClick: function(event) {
    event.preventDefault();
    HobbyActions.AddResource('affiliateLinks', {ref: '', text: ''});
  },
  handleAddVideoClick: function(event) {
    event.preventDefault();
    HobbyActions.AddResource('videos', {ref: ''});
  },
  handleFormSubmit: function(event) {
    event.preventDefault();
    HobbyActions.SaveHobby();
  }
});
