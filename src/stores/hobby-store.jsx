var Reflux = require('reflux');
var HobbyActions = require('../actions/hobby-actions');

var demoHobbies = [
  {
    _id: 'j93fj20fj9032j0f2',
    name: 'Lockpicking',
    slug: 'lockpicking',
    imageUrl: 'http://lorempixel.com/400/200/cats',
    indoor: true,
    computer: false,
    practical: true,
    creative: false,
    difficulty: 1,
    upfrontCost: 15,
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
    creative: false,
    difficulty: 1,
    upfrontCost: 15,
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
    creative: false,
    difficulty: 1,
    upfrontCost: 15,
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
    creative: false,
    difficulty: 1,
    upfrontCost: 15,
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
    hobby: undefined,
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
  }
});

module.exports = CompilationStore;
