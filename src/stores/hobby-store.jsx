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
      this.trigger(this.data);
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

var demoHobbies = [
  {
    _id: 'j93fj20fj9032j0f2',
    name: 'Lockpicking',
    slug: 'lockpicking',
    imageUrl: 'http://lorempixel.com/400/200/cats',
    indoor: true,
    computer: false,
    practical: true,
    artistic: false,
    difficulty: 1,
    startingCost: [15,15],
    repeatCost: [5,10],
    desc: 'Learn to pick locks! With a set of lockpicks and some practice locks, nothing will stand in your way. Just be careful; not legal in all states!',
    affiliateLinks: [
      { text: 'Buy some lock picks', ref: 'http://amazon.com' }
    ],
    resources: [
      { text: 'lockpicking subreddit /r/lockpicking', ref: 'https://www.reddit.com/r/lockpicking/' }
    ]
  },
  {
    _id: '2903dim209is903i0',
    name: 'Geocaching',
    slug: 'geocaching',
    imageUrl: 'http://lorempixel.com/400/200/cats',
    indoor: false,
    computer: false,
    practical: true,
    artistic: false,
    difficulty: 1,
    startingCost: [15,15],
    repeatCost: [5,10],
    desc: 'Learn to pick locks! With a set of lockpicks and some practice locks, nothing will stand in your way. Just be careful; not legal in all states!',
    affiliateLinks: [
      { text: 'Buy some lock picks', ref: 'http://amazon.com' }
    ],
    resources: [
      { text: 'lockpicking subreddit /r/lockpicking', ref: 'https://www.reddit.com/r/lockpicking/' }
    ]
  },
  {
    _id: 'g5ug8594u0g9903',
    name: 'Hula Hooping',
    slug: 'hula-hooping',
    imageUrl: 'http://lorempixel.com/400/200/cats',
    indoor: false,
    computer: false,
    practical: true,
    artistic: false,
    difficulty: 1,
    startingCost: [15,15],
    repeatCost: [5,10],
    desc: 'Learn to pick locks! With a set of lockpicks and some practice locks, nothing will stand in your way. Just be careful; not legal in all states!',
    affiliateLinks: [
      { text: 'Buy some lock picks', ref: 'http://amazon.com' }
    ],
    resources: [
      { text: 'lockpicking subreddit /r/lockpicking', ref: 'https://www.reddit.com/r/lockpicking/' }
    ]
  },
  {
    _id: 'dk02kd02kd02kd02',
    name: 'Juggling',
    slug: 'juggling',
    imageUrl: 'http://lorempixel.com/400/200/cats',
    indoor: false,
    computer: false,
    practical: true,
    artistic: false,
    difficulty: 1,
    startingCost: [15,15],
    repeatCost: [5,10],
    desc: 'Learn to pick locks! With a set of lockpicks and some practice locks, nothing will stand in your way. Just be careful; not legal in all states!',
    affiliateLinks: [
      { text: 'Buy some lock picks', ref: 'http://amazon.com' }
    ],
    resources: [
      { text: 'lockpicking subreddit /r/lockpicking', ref: 'https://www.reddit.com/r/lockpicking/' }
    ]
  }
];

module.exports = CompilationStore;
