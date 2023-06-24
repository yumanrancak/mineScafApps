import { FlowRouter } from 'meteor/ostrio:flow-router-extra';

// Import needed templates

import '../../ui/layouts/body/body';
import '../../ui/layouts/body/blank.js';
//login etc
import '../../ui/pages/login/login';
// //pages

import '../../ui/pages/home/home.js';
import '../../ui/pages/configuration/explorer/configuration_explorer.js';
import '../../ui/pages/configuration/explorer/view_config_explorer';


// Set up all routes in the app
FlowRouter.route('*', {
    action() {
        if (!Meteor.userId()) {
            FlowRouter.go('/login');
        } else {
            this.render('App_body', 'App_notFound');
        }
    },
});

const exposed = FlowRouter.group();
exposed.route('/', {
    name: 'App.home',
    action() {
        if (!Meteor.userId()) {
            FlowRouter.go('/login');
        } else {
            FlowRouter.go('/home');
        }
        // this.render('App_body', 'App_home');
    },
});
exposed.route('/login', {
    name: 'App.App_login',
    action() {
        this.render('App_blank', 'login');
    }
});
exposed.route('/testing', {
    name: 'App.testing',
    action() {
        this.render('App_body', 'testing');
    }

});
exposed.route('/otp/approval/:idReq', {
    name: 'App.otp.approval',
    action() {
        this.render('App_body', 'otpApproval');
    }

});

const userRoutes = FlowRouter.group({
    prefix: '',
    name: 'user',
    triggersEnter: [function(context, redirect) {
        if (!Meteor.userId()) {
            FlowRouter.go('/login');
            // redirect('/login');
        }
    }]
});

userRoutes.route('/home', {
    name: 'App.home',
    action() {
        this.render('App_body', 'App_home');
        $('.nav-item .nav-link').removeClass('active');
        $('#menuDash').addClass('active');
        $('#menuDashOrders').addClass('active');
    },
});

userRoutes.route('/dashboard/sales_per_sku', {
    name: 'App.dashboard.sales_per_sku',
    action() {
        this.render('App_body', 'dashboard_sales_per_sku');
        $('.nav-item .nav-link').removeClass('active');
        $('#menuDash').addClass('active');
        $('#menuDashOrders').addClass('active');
    },
});

userRoutes.route('/dashboard/shopMp', {
    name: 'App.dashboard.shopMp',
    action() {
        this.render('App_body', 'shopMp');
        $('.nav-item .nav-link').removeClass('active');
        $('#menuDash').addClass('active');
        $('#menuDashOrders').addClass('active');
    },
});

// Configuration 
userRoutes.route('/configuration/explorer', {
    name: 'App.configuration.explorer',
    action() {
        this.render('App_body', 'configuration_explorer');
        $('.nav-item .nav-link').removeClass('active');
        // $('#menuConfiguration').addClass('active');
        $('#MenuExplorer').addClass('active');
    },
});


userRoutes.route('/configuration/explorer/view/:id', {
    name: 'App.configuration.explorer.view_config_explorer',
    action() {
        this.render('App_body', 'view_config_explorer');
        $('.nav-item .nav-link').removeClass('active');
    },
});



module.exports = {
    userRoutes,
    exposed
}