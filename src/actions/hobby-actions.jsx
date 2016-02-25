var Reflux = require('reflux');

var Actions = Reflux.createActions([
  "GetHobbies",
  "GetAllHobbies",
  "GetHobby",
  "GetRandomHobby",
  "SetHobby",
  "SetFilter",
  "LoadNewHobby",
  "SaveHobby",
  "AddResource",
  "RemoveResource",
  "SetResource"
]);


Actions.SetHobbyAttribute = Reflux.createAction({sync: true});

module.exports = Actions
