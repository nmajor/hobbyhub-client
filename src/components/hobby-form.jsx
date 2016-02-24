var React = require('react');
var Reflux = require('reflux');
var _ = require('lodash');

var HobbyActions = require('../actions/hobby-actions');
var HobbyStore = require('../stores/hobby-store');

var ReferenceFormGroup = require('./reference-form-group');

module.exports = React.createClass({
  mixins: [
    Reflux.connect(HobbyStore),
  ],
  componentWillMount: function() {
    if (this.props.params.hobbySlug) {
      HobbyActions.GetHobby(this.props.params.hobbySlug);
    } else {
      HobbyActions.LoadNewHobby();
    }
  },

  render: function() {
    return <div className="new-hobby row">
      <div className="col-md-8 col-md-offset-2">
        <h1>{this.renderHeaderText()}</h1>
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
  renderForm: function() {
    if (this.state.hobby) {
      return <form onSubmit={this.handleFormSubmit}>
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
        <button onClick={this.handleFormSubmit} className="btn btn-success btn-block">Save</button>
      </form>
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

  // Event Handlers
  handleNameChange: function(event) { HobbyActions.SetHobbyAttribute('name', event.target.value); },
  handleDescChange: function(event) { HobbyActions.SetHobbyAttribute('desc', event.target.value); },
  handleIndoorChange: function(event) { HobbyActions.SetHobbyAttribute('indoor', !this.state.hobby.indoor); },
  handleComputerChange: function(event) { HobbyActions.SetHobbyAttribute('computer', !this.state.hobby.computer); },
  handlePracticalChange: function(event) { HobbyActions.SetHobbyAttribute('practical', !this.state.hobby.practical); },
  handleArtisticChange: function(event) { HobbyActions.SetHobbyAttribute('artistic', !this.state.hobby.artistic); },
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
  handleFormSubmit: function(event) {
    event.preventDefault();
    HobbyActions.SaveHobby();
  }
});
