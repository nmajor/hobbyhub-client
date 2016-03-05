var React = require('react');

module.exports = React.createClass({
  render: function() {
    return <div className="hobby-tags">{this.renderTags()}</div>
  },
  renderTags: function() {
    return <div>
      {this.renderIndoorTag()}
      {this.renderComputerTag()}
      {this.renderPracticalTag()}
      {this.renderArtisticTag()}
      {this.renderDifficultyTag()}
      {this.renderStartingCostTag()}
      {this.renderRepeatCostTag()}
    </div>
  },
  renderIndoorTag: function() {
    if (this.props.hobby.indoor !== undefined) {
      return <div className="hobby-tag indoor">
        { this.props.hobby.indoor === true ? 'Indoor' : 'Outdoor' }
      </div>
    }
  },
  renderComputerTag: function() {
    if (this.props.hobby.computer !== undefined) {
      return <div className="hobby-tag computer">
        { this.props.hobby.computer === true ? 'Computer' : 'No Computer' }
      </div>
    }
  },
  renderPracticalTag: function() {
    if (this.props.hobby.practical !== undefined && this.props.hobby.practical === true) {
      return <div className="hobby-tag practical">Practical</div>
    }
  },
  renderArtisticTag: function() {
    if (this.props.hobby.artistic !== undefined && this.props.hobby.artistic === true) {
      return <div className="hobby-tag artistic">Artistic</div>
    }
  },
  renderDifficultyTag: function() {
    if (this.props.hobby.difficulty !== undefined) {
      var difficultyString = '';
      switch(this.props.hobby.difficulty) {
        case 0:
          difficultyString = 'Beginner';
          break;
        case 1:
          difficultyString = 'Intermediate';
          break;
        case 2:
          difficultyString = 'Advanced';
          break;
      }
      return <div className="hobby-tag difficulty">{difficultyString}</div>
    }
  },
  renderStartingCostTag: function() {
    if (this.props.hobby.startingCost !== undefined) {
      if (this.props.hobby.startingCost[0] === this.props.hobby.startingCost[1]) {
        return <div className="hobby-tag starting-cost">Start Cost ${this.props.hobby.startingCost[0]}</div>
      } else {
        return <div className="hobby-tag starting-cost">Start Cost ${this.props.hobby.startingCost[0]}-${this.props.hobby.startingCost[1]}</div>
      }
    }
  },
  renderRepeatCostTag: function() {
    if (this.props.hobby.repeatCost !== undefined) {
      if (this.props.hobby.repeatCost[0] === this.props.hobby.repeatCost[1]) {
        return <div className="hobby-tag repeat-cost">Repeat Cost ${this.props.hobby.repeatCost[0]}</div>
      } else {
        return <div className="hobby-tag repeat-cost">Repeat Cost ${this.props.hobby.repeatCost[0]}-${this.props.hobby.repeatCost[1]}</div>
      }
    }
  },
});
