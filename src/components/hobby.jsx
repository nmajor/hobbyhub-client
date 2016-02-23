var React = require('react');
var Link = require('react-router').Link;

module.exports = React.createClass({
  render: function() {
    return <div className="hobby">
      {this.renderHobby()}
    </div>
  },
  renderHobby: function() {
    if (!this.props.hobby) { return; }

    return <div>
      <h1>{this.props.hobby.name}</h1>
      <div className="row">
        <div className="col-md-6">
          <img src={this.props.hobby.imageUrl} />
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

  // indoor: true,
  // computer: false,
  // practical: true,
  // creative: false,
  // difficulty: 1,
  // upfrontCost: 15,
  // repeatCost: [5,10],
  renderResources: function() {
    return this.props.hobby.resources.map(function(resource, index) {
      return <Link key={index} to={resource.ref}>{resource.text}</Link>
    });
  },
  renderAffiliateLinks: function() {
    return this.props.hobby.resources.map(function(resource, index) {
      return <Link key={index} to={resource.ref}>{resource.text}</Link>
    });
  }
});
