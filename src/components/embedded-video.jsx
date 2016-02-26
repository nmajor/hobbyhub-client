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
    return <div className={'embedded-video-wrapper ' + this.props.className}>
      <h5>{this.props.video.text}</h5>
      {this.renderEmbeddedVideo()}
    </div>
  },
  renderEmbeddedVideo: function() {
    if (this.props.video.src) {
      return <div className="embedded-video">
        <YouTube
          videoId={this.youTubeId()}
          opts={this.opts()}
          onPlay={this.handlePlay}
        />
      </div>
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
    return this.props.video.src.match(regExp)[2];
  },
  handlePlay: function() {
    if (!this.state.played) {
      if (ga) {
        ga.event({
          category: 'Hobby',
          action: 'Played Video',
          label: this.props.hobby.name,
          value: this.props.video.text + ' - ' + this.props.video.src
        });
      }
      this.setState({played: true});
    }
  }
});
