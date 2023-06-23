import './login.html';
import { Meteor } from 'meteor/meteor';
import { FlowRouter } from 'meteor/ostrio:flow-router-extra';
import toastr, { success } from "toastr";
import { Session } from 'meteor/session';
import { Roles } from 'meteor/alanning:roles';

Tracker.autorun(() => {

    Meteor.subscribe('userList');
});



Template.login.helpers({
    // var $ = require('jquery');
    loginInSession: function () {
        return Session.get('loginIn');
    },
    loginUser: function () {

    }
});



Template.login.events({

    "click .btnlogin": function (e, tpl) {
        var email = $('#myemail').val();
        var password = $('#password').val();

        ////////////SET DATA///////

        const getUser = Meteor.users.findOne({ 'username': email })
        console.log('USERDATA', getUser);
        let userData = {}
        if (getUser) {
            userData = getUser
        }
        localStorage.setItem('user-data', JSON.stringify(userData))
        /////END SET DATA///////


        console.log(email);
        // console.log(password);
        Session.set('loginIn', true);
        // var user = Meteor.users.findOne({ 'username': email });
        var user = Meteor.users.find({ 'username': email }).fetch()
        console.log(user);
        // User not-exist
        if (user.length > 0) {
            if(user[0].profile){

                logingInUser(email, password);
                Session.set('loginIn', false);
            }
            else{
                Meteor.call('updateProfile',user[0]._id, email, password, (err, res) => {
                    console.log('status erp: ' + res);  
                    // if (res) {
                    // toastr.success('login Sucess');
                    logingInUser(email, password);
    
                    // }
                })
                console.log('profile kosong');
            }
            //go to login
            
        } 
        else {
                toastr.error('Your username & password is not valid, Please Try Again');
                Session.set('loginIn', false);
        }

        function logingInUser(email, password) {
            console.log('logingInUser');
            // console.log(email);
            // console.log(password);
            Meteor.loginWithPassword(email, password, function (err) {
                // console.log(email);
                // console.log(password);
                if (err) {
                    console.log(err.message);
                    FlowRouter.redirect('/login');
                    toastr.success('Wrong Credential!');
                    Session.set('loginIn', false);
                } else {
                    Session.set('loginIn', false);
                    toastr.success('Logged In!');

                    const nextUrlPath = localStorage.getItem('nextUrl')
                    if (nextUrlPath) {
                        const parsePathUrl = JSON.parse(nextUrlPath)
                        localStorage.removeItem('nextUrl')
                        FlowRouter.redirect(`${parsePathUrl.nextPath}`);
                    }else {
                        FlowRouter.redirect('/');
                    }
                }
            });
        };
    },
});