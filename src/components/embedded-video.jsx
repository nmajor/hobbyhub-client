var React = require('react');
var YouTube = require('react-youtube').default;

var ga = require('../ga');

module.exports = React.createClass({
  getInitialState: function() {
    return {
      played: false,
      clicked: false
    }
  },
  componentWillReceiveProps: function(newProps) {
    if ( newProps.video.src !== this.props.video.src ) {
      this.setState({
        played: false,
        clicked: false
      });
    }
  },
  render: function() {
    return <div className="embedded-video-wrapper">
      <h5>{this.props.video.text}</h5>
      {this.renderEmbeddedVideo()}
    </div>
  },
  renderEmbeddedVideo: function() {
    if (this.props.video.src && this.state.clicked) {
      return <div className="embedded-video">
        <YouTube
          videoId={this.youTubeId()}
          opts={this.opts()}
          onPlay={this.handlePlay}
        />
      </div>
    } else if (this.props.video.src) {
      return <div className="embedded-video-image">
        <img onClick={this.handleImageClick} src={this.hqdefaultImage()} />
      </div>
    }
  },
  opts: function() {
    return {
      frameBorder: "0",
      width: "560",
      height: "315",
      playerVars: {
        autoplay: 1
      }
    }
  },
  youTubeId: function() {
    var regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    return this.props.video.src.match(regExp)[2];
  },
  defaultImage: function() {
    return 'http://img.youtube.com/vi/'+this.youTubeId()+'/default.jpg'
  },
  mqdefaultImage: function() {
    return 'http://img.youtube.com/vi/'+this.youTubeId()+'/mqdefault.jpg'
  },
  hqdefaultImage: function() {
    return 'http://img.youtube.com/vi/'+this.youTubeId()+'/hqdefault.jpg'
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
  },
  handleImageClick: function() {
    this.setState({clicked: true});
  }
});
