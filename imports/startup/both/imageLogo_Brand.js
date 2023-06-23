import { Meteor } from 'meteor/meteor';
import { FilesCollection } from 'meteor/ostrio:files';
// import { CGImage, CommunityGame } from '../../api/mCommunityGames/communityGames';
import toastr from 'toastr';


const imagesBrand = new FilesCollection({
    debug: false,
    // storagePath: '/imagesBrand', //mup docker
    storagePath: './public/img/brand/images', //dev1`
    collectionName: 'imagesBrand',
    permissions: 0o777,
    allowClientCode: true, // Disallow remove files from Client
    onBeforeUpload: function(file) {
        // Allow upload files under 10MB, and only in png/jpg/jpeg formats
        if (file.size <= 1024 * 1024 * 10 && /png|jpe?g/i.test(file.extension)) {
            return true;
        }
        return 'Please upload image, with size equal or less than 10MB';
    }
});

//Methode for Insert/Remove Images
Meteor.methods({
    // imagesInsert: function (cgId, fileId,) {
    //     // check(Meteor.userId(), String);
    //     if (cgId) {
    //         req_expense_detail.update({ _id: cgId }, {
    //             $addToSet: {
    //                 invoiceImg: fileId
    //             }
    //         });
    //     } else {
    //         // throw new Meteor.Error("event-does-not-exist", "This Event doesn't exist in the database");
    //         toastr.error('Image Fail..!!', 'Please Try Again!')
    //     }
    //     ;
    // },
    imagesBrandRemove: function(gambarsId, brand) {
        // check(Meteor.userId(), String);
        // check(gambarsId, String);
        if (gambarsId) {

            imagesBrand.remove({ _id: gambarsId });
        }
    },
});
if (Meteor.isServer) {
    imagesBrand.denyClient();
    Meteor.publish('files.imagesBrand.all', function() {
        return imagesBrand.find().cursor;
    });
} else {
    Meteor.subscribe('files.imagesBrand.all');
}

export default imagesBrand;