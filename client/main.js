// Client entry point, imports all client code

import '/imports/startup/client';
import '/imports/startup/both';

// Additional Import
import '@fortawesome/fontawesome-free/js/all.js'
import { $ } from 'meteor/jquery';
import 'toastr/build/toastr.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './registerHelper.js';

// import dataTablesBootstrap from 'datatables.net-bs4';
// import 'datatables.net-bs4/css/dataTables.bootstrap4.css';
// dataTablesBootstrap(window, $);

Meteor.startup(function () {
    $('body').addClass('hold-transition sidebar-mini text-sm');
    $(".select2").select2({ width: '100%' });
    $('.select2-selection--single').css('height','36px')
});



// import { Template } from 'meteor/templating';
// import { ReactiveVar } from 'meteor/reactive-var';

// import './main.html';

// Template.hello.onCreated(function helloOnCreated() {
//   // counter starts at 0
//   this.counter = new ReactiveVar(0);
// });

// Template.hello.helpers({
//   counter() {
//     return Template.instance().counter.get();
//   },
// });

// Template.hello.events({
//   'click button'(event, instance) {
//     // increment the counter when button is clicked
//     instance.counter.set(instance.counter.get() + 1);
//   },
// });
