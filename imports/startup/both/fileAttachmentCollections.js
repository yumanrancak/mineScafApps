import { Meteor } from 'meteor/meteor';
import { FilesCollection } from 'meteor/ostrio:files';

const attachmentSalesReport = new FilesCollection({
    debug: false,
    // storagePath: '/attachmentSalesReport', //mup docker
    storagePath: './public/attachment/salesReport', //dev1`
    collectionName: 'attachmentSalesReport',
    permissions: 0o755,
    allowClientCode: true, // Disallow remove files from Client

});

const attachmentSalesRequest = new FilesCollection({
    debug: false,
    // storagePath: '/attachmentSalesRequest', //mup docker
    storagePath: './public/attachment/salesRequest', //dev1`
    collectionName: 'attachmentSalesRequest',
    permissions: 0o755,
    allowClientCode: true, // Disallow remove files from Client
});

if (Meteor.isServer) {
    Meteor.publish('getAttachmentSalesRequest', function() {
        return attachmentSalesRequest.find().cursor;
    });
    Meteor.publish('getFileAttachment', function() {
        return attachmentSalesReport.find().cursor;
    });
    
} else {
    Meteor.subscribe('getAttachmentSalesRequest');
}

module.exports = {
    attachmentSalesReport,
    attachmentSalesRequest
}