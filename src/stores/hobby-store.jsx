var Reflux = require('reflux');
var HobbyActions = require('../actions/hobby-actions');
var _ = require('lodash');

var Api = require('../utils/api');

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


var CompilationStore = Reflux.createStore({
  listenables: HobbyActions,
  data: {
    hobbies: demoHobbies,
    hobby: {},
    filter: {}
  },
  getInitialState: function() {
    return this.data;
  },
  onGetHobbies: function() {
  },
  onSetHobby: function(hobby) {
    console.log(hobby);
    this.data.hobby = hobby;
    this.trigger(this.data);
  },
  onSetFilter: function(attr, val) {
    if (val === undefined) {
      delete this.data.filter[attr];
    } else {
      this.data.filter[attr] = val;
    }
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
    console.log('blah');
    Api.post('hobby', this.data.hobby)
    .then(function(data) {
      if (data.error) { console.log('Something went wrong'); console.log(data.error); return; }

      this.data.hobby = data;
      this.trigger(this.data);
    }.bind(this));
  },
  onAddResource: function(attr, resource) {
    this.data.hobby[attr] = this.data.hobby[attr] || [];
    this.data.hobby[attr].push(resource);
    this.trigger(this.data);
  },
  onRemoveResource: function(attr, index) {
    if (!this.data.hobby[attr] || !this.data.hobby[attr][parseInt(index)]) { return; }

    var blah = this.data.hobby[attr].splice(parseInt(index), 1);
    console.log(blah);
    this.trigger(this.data);
  },
  onSetResource: function(attr, index, resource) {
    if (!this.data.hobby[attr] || !this.data.hobby[attr][parseInt(index)]) { return; }

    this.data.hobby[attr][parseInt(index)] = resource;
    console.log(this.data.hobby[attr]);
    this.trigger(this.data);
  },


  // Private Functions
  getHobby: function() {
    return
  }
});

module.exports = CompilationStore;
