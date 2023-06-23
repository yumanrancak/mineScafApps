import { Mongo } from 'meteor/mongo';

// Sales Request Collections
const req_expense = new Mongo.Collection('req_expense');
const req_expense_detail = new Mongo.Collection('req_expense_detail');

const log_request = new Mongo.Collection('log_request');
const workflow = new Mongo.Collection('workflow');

const reqPurchase = new Mongo.Collection('reqPurchase');
const reqPurchaseDetails = new Mongo.Collection('reqPurchaseDetails');

const reqAds = new Mongo.Collection('reqAds')
const reqAdsDetails = new Mongo.Collection('reqAdsDetails')

const salesReport = new Mongo.Collection('salesReport')

module.exports = {
    req_expense,
    req_expense_detail,
    log_request,
    workflow,
    reqPurchase,
    reqPurchaseDetails,
    reqAds,
    reqAdsDetails,
    salesReport
}