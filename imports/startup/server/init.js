
import { Meteor } from 'meteor/meteor';
import { configuration_type } from '../../api/configuration/configuration';


Meteor.startup(() => {

    if(Meteor.users.find().count() < 1){
        const ownerId = Accounts.createUser({
            username: "Admin",
            password: "123456"
        });
    }
    var config = configuration_type.find({}).count()
    if(config < 1){
        configuration_type.insert({type_name:"Area",is_parent:1})
        configuration_type.insert({type_name:"Location",is_parent:1})
        configuration_type.insert({type_name:"Stockpile"})
        configuration_type.insert({type_name:"Warehouse"})
        configuration_type.insert({type_name:"Stockyard",is_parent:1})
        configuration_type.insert({type_name:"Category",is_parent:1})
        configuration_type.insert({type_name:"Truck Location",is_parent:1})
        configuration_type.insert({type_name:"Train Station",is_parent:1})
        configuration_type.insert({type_name:"Barge Terminal",is_parent:1})
        configuration_type.insert({type_name:"Port",is_parent:1})
        configuration_type.insert({type_name:"Transhipment",is_parent:1})
        configuration_type.insert({type_name:"Waste"})
        configuration_type.insert({type_name:"Mine Location",is_parent:1})
        configuration_type.insert({type_name:"Mine Source"})
    }

})