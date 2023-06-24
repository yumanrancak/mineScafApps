
import { Meteor } from "meteor/meteor";
import { configuration_explorer, configuration_type } from "../configuration";

Meteor.publish('config_explorer', function () {
    return configuration_explorer.find();
  });


Meteor.publish('config_explorer_type', function () {
    return configuration_type.find();
  });


ReactiveTable.publish('config_explorer', configuration_explorer, function () {
    return {}
}, {})