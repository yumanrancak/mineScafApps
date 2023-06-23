import './home.html';
import { Meteor } from 'meteor/meteor';

Tracker.autorun(() => {
});

Template.App_home.created = function () {

}
Template.App_home.helpers({
  user(){
      return Meteor.user()
  }
});
