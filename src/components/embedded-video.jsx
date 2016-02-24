var React = require('react');

module.exports = React.createClass({
  render: function() {
    return <div className="embedded-video">
      {this.renderEmbeddedVideo()}
    </div>
  },
  renderEmbeddedVideo: function() {
    if (this.props.src) {
      return <iframe
        src={this.src()}
        frameBorder="0"
        width="560"
        height="315"
        allowFullScreen
      ></iframe>
    }
  },
  src: function() {
    var regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    var id = this.props.src.match(regExp)[2];

    return 'https://www.youtube.com/embed/' + id;
  }
});
