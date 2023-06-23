// Methods related to counseling

import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { HTTP } from 'meteor/http';
import { userDev } from '../login';

Meteor.methods({
    'checkToken'(email, password) {
        console.log('check api login');
        console.log(email,password)
        var url = 'https://erp.egogohub.com/api/index.php/login?login=' + email + '&password=' + password + '&reset=0'
        console.log('url',url)
        var ctk = HTTP.call('GET',url, {}, (err, res) => {
        // setTimeout(function () {
        if (err) {
            console.log('timeout', err)
            return err;
        } else {
            var resdata = res.data.success;
            const ownerId = Accounts.createUser({
            username: email,
            password: password
            });
            console.log('login: ', resdata.firstname,ownerId)
            let updateprofile = Meteor.users.update({_id:ownerId},{
                $set:{
                profile:{
                    "rowid": resdata.rowid,
                    "entity": resdata.entity,
                    "api_key": resdata.api_key,
                    "firstname": resdata.firstname,
                    "lastname": resdata.lastname,
                    "address": resdata.address,
                    "civility": resdata.civility,
                    "gender": resdata.gender,
                    "birth": resdata.birth,
                    "note_public": resdata.note_public,
                    "office_phone": resdata.office_phone,
                    "user_mobile": resdata.user_mobile,
                    "email": resdata.email,
                    "fk_user": resdata.fk_user,
                    "photo": resdata.photo,
                    "barcode": resdata.barcode,
                    "probation": resdata.probation,
                    "job": resdata.job,
                    "employee":resdata.employee,
                    "is_client": resdata.is_client,
                    "is_management": resdata.is_management,
                    "is_absen": resdata.is_absen,
                }
                }
            })
            return resdata;
        }
        // }, 3000)
        })
    },

    
    'updateProfile'(userid,email,password) {
        console.log('check api login');
        var ctk = HTTP.call('GET', 'https://erp.egogohub.com/api/index.php/login?login=' + email + '&password=' + password + '&reset=0', {}, (err, res) => {
        // setTimeout(function () {
        if (err) {
            console.log('timeout', err)
            return err;
        } else {
            var resdata = res.data.success;
            console.log('Update Profile User login: ', resdata.firstname,userid)
            let updateprofile = Meteor.users.update({_id:userid},{
            $set:{
                profile:{
                "rowid": resdata.rowid,
                "entity": resdata.entity,
                "api_key": resdata.api_key,
                "firstname": resdata.firstname,
                "lastname": resdata.lastname,
                "address": resdata.address,
                "civility": resdata.civility,
                "gender": resdata.gender,
                "birth": resdata.birth,
                "note_public": resdata.note_public,
                "office_phone": resdata.office_phone,
                "user_mobile": resdata.user_mobile,
                "email": resdata.email,
                "fk_user": resdata.fk_user,
                "photo": resdata.photo,
                "barcode": resdata.barcode,
                "probation": resdata.probation,
                "job": resdata.job,
                "employee":resdata.employee,
                "is_client": resdata.is_client,
                "is_management": resdata.is_management,
                "is_absen": resdata.is_absen,
                }
            }
            })
        }
        });
    },

    
    'getUsersDev' : async(id)=>{
        const data = await userDev.findOne({_id: id})
        return data
    }
});
