
import { Meteor } from 'meteor/meteor';
import { configuration_explorer, configuration_log, configuration_type } from '../configuration';


Meteor.methods({
    'getConfiguration_typeAll'() {
        return configuration_type.find({}).fetch()
    },

    'getConfiguration_type_by_id'(id) {
        return configuration_type.findOne({_id:id})
    },
    
    'configuration_parent_type'(){
        return configuration_type.find({is_parent:1}).fetch()
    },
    
    // Configuration Explorer
    'get_all_configuration_explorer'(){
        return configuration_explorer.find().fetch()
    },

    'get_configuration_explorer_by_parent_type'(type){
        return configuration_explorer.find({configuration_type:type}).fetch()
    },

    'get_configuration_explorer_by_id'(id){
        return configuration_explorer.findOne({_id:id})
    },

    'getConfigurationExp_Lv1'(){
        return configuration_explorer.find({'parent_configuration_type':"Main"}).fetch()
    },

    'get_configuration_explorer_by_parent'(id){
        return configuration_explorer.find({'parent_configuration_name':id}).fetch()
    },
    'save_Congfiguration_exploerer'(data){
        var exp = configuration_explorer.findOne({'name':data.name,'configuration_type':data.type})
        if(!exp){
            // console.log(data)
            var id = configuration_explorer.insert(data)
            if(id){
                configuration_log.insert({
                    id_configuration:id,
                    status:"insert",
                    createdAt:new Date,
                    user:data.createdBy
                })
                return id
            }
        }
    },
    'update_configuration_explorer'(id,data){
        var dataupdate = configuration_explorer.update({_id:id},{
            $set:{
                configuration_type:data.type,
                name:data.name,
                parent_configuration_type:data.parent_configuration_type,
                parent_configuration_name:data.parent_configuration_name,
                opening_Date:new Date(data.opening_Date),
                close_Date:data.close_Date == null ? null :new Date(data.close_Date) ,
                stockpile_type:data.stockpile_type,
                status:data.status,
                extentionID :data.extentionID,
                status:data.status,
                updatedBy:data.createdBy,
                updatedAt:data.createdAt,
            }
        })
        if(dataupdate){
            configuration_log.insert({
                id_configuration:id,
                status:"update",
                createdAt:new Date,
                user:data.createdBy
            })
            return dataupdate
        }
    }
})