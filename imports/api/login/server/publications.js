/* eslint-disable import/no-unresolved */
import { Meteor } from "meteor/meteor";
// import { Movement, Stock, Warehouse } from "../warehouse.js";



Meteor.publish('userList', function () {
    return Meteor.users.find({});
  });