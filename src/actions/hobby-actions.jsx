var Reflux = require('reflux');

var Actions = Reflux.createActions([
  "GetHobbies",
  "GetHobbiesAndOrHobby",
  "GetAllHobbies",
  "SetHobbyBySlug",
  "FilterHobbies",
  "GetHobby",
  "GetRandomHobby",
  "SetHobby",
  "SetFilter",
  "LoadNewHobby",
  "SaveHobby",
  "AddResource",
  "RemoveResource"
]);


Actions.SetHobbyAttribute = Reflux.createAction({sync: true});
Actions.SetResource = Reflux.createAction({sync: true});

module.exports = Actions
