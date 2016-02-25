var React = require('react');
var YouTube = require('react-youtube').default;

var ga = require('../ga');

module.exports = React.createClass({
  getInitialState: function() {
    return { played: false }
  },
  shouldComponentUpdate: function() {
    return false;
  },
  render: function() {
    return <div className="embedded-video">
      {this.renderEmbeddedVideo()}
    </div>
  },
  renderEmbeddedVideo: function() {
    if (this.props.src) {
      return <YouTube
        videoId={this.youTubeId()}
        opts={this.opts()}
        onPlay={this.handlePlay}
      />
    }
  },
  opts: function() {
    return {
      frameBorder: "0",
      width: "560",
      height: "315"
    }
  },
  youTubeId: function() {
    var regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    return this.props.src.match(regExp)[2];
  },
  handlePlay: function() {
    if (!this.state.played) {
      if (ga) {
        ga.event({
          category: 'Hobby',
          action: 'Played Video',
          label: this.props.hobby.name,
          value: this.props.src
        });
      }
      this.setState({played: true});
    }
  }
});
