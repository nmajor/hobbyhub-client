import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import _ from 'lodash'


import state from './state'
console.log(state);

class MainContainer extends Component {
  render() {
    return <div id="wrapper">
      <div className="container">
        <FilterOptionsContainer />
        <FilterCountContainer />
        <HobbyContainer />
      </div>
    </div>
  }
}

class FilterOptionsContainer extends Component {
  render() {
    return <FilterOptions filter={state.filter} />
  }
}

class FilterOptions extends Component {
  render() {
    return <div className="filter-options row">
      <FilterButton attr='indoor' />
      <FilterButton attr='outdoor' />
      <FilterButton attr='practical' />
      <FilterButton attr='artistic' />
      <FilterButton attr='computer' />
      <FilterButton attr='noComputer' />
    </div>
  }
}

class FilterCountContainer extends Component {
  render() {
    return <FilterCountPresentation hobbiesLength={state.hobbies.length} />
  }
}

class FilterCountPresentation extends Component {
  render() {
    return <div className="filter-count row">
      <div className="col-md-12">
        {this.props.hobbiesLength} Hobbies
      </div>
    </div>
  }
}

class FilterButton extends Component {
  render() {
    return <div className="col-md-3">
      <div className="filter-form-button">
        {_.words(_.capitalize(this.props.attr))}
      </div>
    </div>
  }
}

class HobbyContainer extends Component {
  render() {
    return <HobbyPresentation hobby={state.hobby} />
  }
}

class HobbyPresentation extends Component {
  render() {
    return <div className="hobby">
      <HobbyHeader name={this.props.hobby.name} />
      <HobbyTags hobby={this.props.hobby} />
      <HobbyImage imageUrl={this.props.hobby.imageUrl} />
      <HobbyDesc desc={this.props.hobby.desc} />
      <HobbyResourceList resources={this.props.hobby.resources} />
      <HobbyAffiliateLinkList affiliateLinks={this.props.hobby.affiliateLinks} />
      <HobbyVideoList videos={this.props.hobby.videos} />
    </div>
  }
}

class HobbyHeader extends Component {
  render() {
    return <div className="hobby-header row">
      <div className="col-md-12">
        <h1>{this.props.name}</h1>
      </div>
    </div>
  }
}

class HobbyTags extends Component {
  render() {
    return <div className="hobby-tags row">
      <div className="col-md-12">
        <HobbyTag attr="indoor" />
        <HobbyTag attr="outdoor" />
        <HobbyTag attr="computer" />
        <HobbyTag attr="no_computer" />
        <HobbyTag attr="indoor" />
      </div>
    </div>
  }
}

class HobbyTag extends Component {
  render() {
    return <span className={"hobby-tag "+this.props.attr}>{_.words(_.capitalize(this.props.attr))}</span>
  }
}

class HobbyImage extends Component {
  render() {
    return <div className="hobby-image row">
      <div className="col-md-6">
        <img src={this.props.imageUrl} />
      </div>
    </div>
  }
}

class HobbyDesc extends Component {
  render() {
    return <div className="hobby-desc row">
      <div className="col-md-12">
        <h3>Description</h3>
        <p>{this.props.desc}</p>
      </div>
    </div>
  }
}


class HobbyResourceList extends Component {
  render() {
    return <div className="hobby-reference-list row">
      <div className="col-md-12">
        <h3>Resources</h3>
        <ul>
          {this.renderResources()}
        </ul>
      </div>
    </div>
  }
  renderResources() {
    return this.props.resources.map(function(resource) {
      return <HobbyResource key={resource._id} resource={resource} />
    })
  }
}

class HobbyResource extends Component {
  render() {
    return <li><a href={this.props.resource.ref}>{this.props.resource.text}</a></li>
  }
}

class HobbyAffiliateLinkList extends Component {
  render() {
    return <div className="hobby-affiliate-link-list row">
      <div className="col-md-12">
        <h3>Affiliate Links</h3>
        <ul>
          {this.renderAffiliateLinks()}
        </ul>
      </div>
    </div>
  }
  renderAffiliateLinks() {
    return this.props.affiliateLinks.map(function(affiliateLink) {
      return <HobbyAffiliateLink key={affiliateLink._id} affiliateLink={affiliateLink} />
    })
  }
}

class HobbyAffiliateLink extends Component {
  render() {
    return <li><a href={this.props.affiliateLink.ref}>{this.props.affiliateLink.text}</a></li>
  }
}

class HobbyVideoList extends Component {
  render() {
    return <div className="hobby-video-list row">
      <h3>Videos</h3>
      {this.renderVideos()}
    </div>
  }
  renderVideos() {
    return this.props.videos.map(function(video) {
      return <HobbyVideo key={video._id} video={video} />
    })
  }
}

class HobbyVideo extends Component {
  render() {
    return <div className="col-md-6">
      <img src={this.hqDefaultImage()} />
    </div>
  }
  youTubeId() {
    var regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    return this.props.video.src.match(regExp)[2];
  }
  hqDefaultImage() {
    return 'http://img.youtube.com/vi/' + this.youTubeId() + '/hqdefault.jpg'
  }
}

module.exports = MainContainer;
