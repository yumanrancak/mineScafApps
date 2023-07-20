
import { Meteor } from "meteor/meteor";
import { configuration_explorer, configuration_log, configuration_type } from "../configuration";

Meteor.publish('config_explorer', function () {
    return configuration_explorer.find();
  });


Meteor.publish('config_explorer_type', function () {
    return configuration_type.find();
  });

Meteor.publish('config_explorer_history', function (id) {
  return configuration_log.find({id_configuration:id});
});
ReactiveTable.publish('config_explorer', configuration_explorer, function () {
    return {}
}, {})