var Reflux = require('reflux');
var HobbyActions = require('../actions/hobby-actions');
var _ = require('lodash');
var history = require('../history');

var Api = require('../utils/api');

var CompilationStore = Reflux.createStore({
  listenables: HobbyActions,
  data: {
    hobbies: undefined,
    hobby: undefined,
    filter: {}
  },
  getInitialState: function() {
    return this.data;
  },
  onGetHobbies: function() {
    this.data.loadingHobbies = true;
    this.trigger(this.data);

    Api.get('hobbies')
    .then(function(data) {
      if (data.error) { console.log('Something went wrong'); console.log(data.error); return; }

      this.data.hobbies = data;
      this.data.loadingHobbies = false;
      HobbyActions.FilterHobbies();
    }.bind(this));
  },
  onGetAllHobbies: function() {
    this.data.loadingHobbies = true;
    this.trigger(this.data);

    Api.get('hobbies/all')
    .then(function(data) {
      if (data.error) { console.log('Something went wrong'); console.log(data.error); return; }

      this.data.hobbies = data;
      this.data.loadingHobbies = false;
      this.trigger(this.data);
    }.bind(this));
  },
  onFilterHobbies: function() {
    var filter = this.data.filter;

    this.data.filteredHobbies = _.filter(this.data.hobbies, function(hobby) {
      return (
        (filter.indoor === undefined || filter.indoor === hobby.indoor)
        && ( filter.computer === undefined || filter.computer === hobby.computer )
        && ( filter.artistic === undefined || filter.artistic === hobby.artistic )
        && ( filter.practical === undefined || filter.practical === hobby.practical )
        && ( filter.difficulty === undefined || filter.difficulty.indexOf(hobby.difficulty) > -1 )
      )
    });

    this.trigger(this.data);
  },
  onGetHobby: function(hobbySlug) {
    var hobby = _.find(this.data.hobbies, {slug: hobbySlug});

    if (hobby) {
      HobbyActions.SetHobby(hobby);
    } else {
      this.data.loadingHobby = true;
      this.trigger(this.data);

      Api.get('hobbies/'+hobbySlug)
      .then(function(data) {
        if (data === null) { history.push('/404'); return; }
        if (data.error) { console.log('Something went wrong'); console.log(data.error); return; }

        this.data.loadingHobby = false;
        HobbyActions.SetHobby(data);
      }.bind(this));
    }
  },
  onGetRandomHobby: function() {
    var currentHobby = this.data.hobby || {};
    var hobby = _.sample(
      _.reject(this.data.filteredHobbies, function(hobby) {
        return hobby.slug === currentHobby.slug
      })
    );
    history.push('/hobbies/'+hobby.slug);
    this.data.hobby = hobby;
    this.trigger(this.data);
  },
  onSetHobby: function(hobby) {
    this.data.hobby = hobby;
    this.trigger(this.data);
  },
  onSetFilter: function(attr, val) {
    if (val === undefined) {
      delete this.data.filter[attr];
    } else {
      this.data.filter[attr] = val;
    }
    console.log('Filter: '+JSON.stringify(this.data.filter));
    HobbyActions.FilterHobbies();
    this.trigger(this.data);
  },
  onLoadNewHobby: function() {
    this.data.hobby = {};
    this.trigger(this.data);
  },
  onSetHobbyAttribute: function(attr, val) {
    this.data.hobby[attr] = val;
    this.trigger(this.data);
  },
  onSaveHobby: function() {
    this.data.savingHobby = true;
    this.trigger(this.data);

    if (this.data.hobby._id) {
      Api.put('hobbies/'+this.data.hobby.slug, this.data.hobby)
      .then(function(data) {
        if (data.error) { console.log('Something went wrong'); console.log(data.error); return; }

        this.data.hobby = data;
        this.data.savingHobby = false;
        this.trigger(this.data);
      }.bind(this));
    } else {
      Api.post('hobbies', this.data.hobby)
      .then(function(data) {
        if (data.error) { console.log('Something went wrong'); console.log(data.error); return; }

        this.data.hobby = data;
        this.data.savingHobby = false;
        this.trigger(this.data);
      }.bind(this));
    }
  },
  onAddResource: function(attr, resource) {
    this.data.hobby[attr] = this.data.hobby[attr] || [];
    this.data.hobby[attr].push(resource);
    this.trigger(this.data);
  },
  onRemoveResource: function(attr, index) {
    if (!this.data.hobby[attr] || !this.data.hobby[attr][parseInt(index)]) { return; }

    this.data.hobby[attr].splice(parseInt(index), 1);

    console.log(attr);
    console.log(this.data.hobby[attr]);

    this.trigger(this.data);
  },
  onSetResource: function(attr, index, resource) {
    if (!this.data.hobby[attr] || !this.data.hobby[attr][parseInt(index)]) { return; }

    this.data.hobby[attr][parseInt(index)] = resource;
    this.trigger(this.data);
  },


  // Private Functions
  getHobby: function() {
    return
  }
});

module.exports = CompilationStore;
