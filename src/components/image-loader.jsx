// Inspired by https://github.com/hzdg/react-imageloader

var React = require('react');
var Loading = require('./loading');

module.exports = React.createClass({
  getInitialState: function() {
    return { status: null }
  },
  componentDidMount: function() {
    this.createLoader();
  },
  componentWillUnmount: function() {
    this.destroyLoader();
  },
  componentWillReceiveProps: function(nextProps) {
    if (this.props.src !== nextProps.src) {
      this.setState({
        status: 'loading',
      });
      this.createLoader();
    }
  },
  render: function() {
    return <span className={this.getClassName()}>{this.renderImg()}</span>
  },
  renderImg: function() {
    if (this.state.status === 'loaded') {
      return <img className={this.props.imgClassName} src={this.props.src} />
    } else {
      return <span className="img-loading"><Loading /> Loading image</span>
    }
  },

  createLoader: function() {
    this.destroyLoader();

    this.img = new Image();
    this.img.onload = this.handleLoad;
    this.img.onerror = this.handleError;
    this.img.src = this.props.src;
  },
  destroyLoader: function() {
    if (this.img) {
      this.img.onload = null;
      this.img.onerror = null;
      this.img = null;
    }
  },
  getClassName: function() {
    return 'image-loader ' + (this.props.className ? this.props.className : '')
  },

  handleLoad: function() {
    this.setState({status: 'loaded'});
  }
});
