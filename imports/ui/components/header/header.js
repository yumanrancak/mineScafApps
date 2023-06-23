import './header.html';
import { Meteor } from 'meteor/meteor';
import { $ } from 'meteor/jquery';
// import { Roles } from 'meteor/alanning:roles';
import { FlowRouter } from 'meteor/ostrio:flow-router-extra';
// import { Notification } from '../../../api/notification/notification';
import toastr from "toastr";
// import { Messages } from '../../../api/messages/messages.js';


Tracker.autorun(function () {
    Meteor.subscribe("counts-notif");
    Meteor.subscribe('notification');
});
Template.header.onRendered(function () {
    Meteor.call('getUserApp', (err, data)=>{
        if (!err) {
            let show = false
            for (let i = 0; i < data.length; i++) {
                const el = data[i];
                if (el.userId === Meteor.userId()) {
                    show = true
                }
            }
            if (show) {
                $('.menuReportOTP').attr('hidden', false)
            } else {
                if (Meteor.userId() === 'uMCiGrPLmxfmittn9') {
                    $('.menuReportOTP').attr('hidden', false)
                } else {
                    $('.menuReportOTP').attr('hidden', true)
                }
            }
        }
    })
    
    // $(".dropdown-button").dropdown();
    // $(".dropdown-img").dropdown();
});
Template.header.onCreated(function () {
    

});
Template.header.helpers({
    usersOnline() {
        return Meteor.users.find({ "status.online": true })
    },
    onlineCount() {
        return Meteor.users.find({ "status.online": true }).count();
    },
    // messages() {
    //     // var idCounseling = FlowRouter.getParam("_id");

    //     return Messages.find({}, {
    //         sort: {
    //             createdAt: 1,
    //         },
    //     });
    // },
    ownText(idUser) {
        if (idUser == Meteor.userId()) {
            console.log('true');
            return true;
        } else {
            console.log('false')
            return false;
        }
        // return Meteor.userId();
    },
    username() {
        return Meteor.user();
    },
    user(idUser) {
        return Meteor.users.findOne(idUser);
    },
    // notifications() {

    //     // console.log('notification');
    //     // var uid = Meteor.userId();
    //     // return Notification.find({ 'to': uid });
    //     return Notification.find({});

    //     // if (Roles.userIsInRole(uid, ['admin'])) {
    //     //     return Notification.find({ 'statusAdmin': true, 'statusRead': false }, { sort: { createdAt: 1 } });
    //     // } else {
    //     //     return Notification.find({ 'to': uid });
    //     // }

    // },
    // notificationCount() {
    //     // console.log('notification.count');
    //     // var uid = Meteor.userId();
    //     return Notification.find({}).count();
    //     // if (Roles.userIsInRole(uid, ['admin'])) {
    //     //     return Notification.find({ 'statusAdmin': true, 'statusRead': false }, { sort: { createdAt: 1 } }).count();
    //     // } else {
    //     //     return Notification.find({ 'to': uid }).count();
    //     // }

    // },
    // notifapprove() {
    //     return Counts.find()
    // },

    // oId() {
    //     var user = Meteor.user();
    //     var oId = user && user.profile && user.profile.organizationId;
    //     return oId;
    // },
    // org(id) {
    //     // var user = Meteor.user();
    //     // var oId = user && user.profile && user.profile.organizationId;
    //     var orgName = Organization.findOne(id);
    //     var oName = orgName && orgName.organizationName;
    //     return oName
    // },
    // settingMaster() {
    //     var sm = SettingMaster.findOne({});
    //     // console.log('sm:' + sm);
    //     return sm;
    // },
    // sumSurvey() {
    //     var survey = ReactiveMethod.call('survey.count.total');
    //     return survey;
    // },
    // sumQuestioner() {
    //     return ReactiveMethod.call('questioner.count.all');
    // },
    // sumAps() {
    //     return ReactiveMethod.call('aps.count.all');
    // },
    // sumAspek() {
    //     return ReactiveMethod.call('aspek.count.all');
    // },
    // sumStandart() {
    //     return ReactiveMethod.call('standart.count.all');
    // },
    // sumOrg() {
    //     return ReactiveMethod.call('organization.count.all');
    // },
});
Template.header.events({
    'click .btnSend'(event, template) {
        const msg = template.$('.txtMessage').val();
        // var idCounseling = FlowRouter.getParam("_id");
        Meteor.call('sendMessage', msg, (err, res) => {
            template.$('.txtMessage').val('');
        });
        const element = $('.direct-chat-messages');
        element.animate({
            scrollTop: element.prop("scrollHeight")
        }, 500);
    },
    'click .btnClearAll'() {
        if (confirm('Do you want to delete all chat message?')) {
            Meteor.call('clearAllMessages');
        }
    },
    'click .markRead': function (event) {
        console.log('markread');
        event.preventDefault();
        var notifId = this.inboundId;
        var id = this._id;
        console.log('id', id)
        Meteor.call('markRead', id);
        var notif = Notification.findOne({ '_id': this._id }, {})
        // Meteor.logout();
        console.log('notif', notif)
        if (notif.categoryNotification == 'inbound') {
            FlowRouter.go('/inbound/approve_list/' + notifId);
        }
        // toastr.warning('Logged Out!');
    },
    'click .markReadAll': function (event) {
        console.log('mark read all');
        event.preventDefault();
        var uid = Meteor.userId();
        Meteor.call('markReadAll', uid);
        // Meteor.logout();
        // FlowRouter.go('/login');
        toastr.success('All Notification Mark as Read!');
    },
    'click .logout': function (event) {
        event.preventDefault();
        Meteor.logout();
        FlowRouter.go('/login');
        toastr.warning('Logged Out!');
    },
    'click .login-page': function (event) {
        event.preventDefault();
        // Meteor.logout();
        FlowRouter.go('/home');

    },


});
