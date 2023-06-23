
import { Meteor } from 'meteor/meteor';
import { configuration_type } from '../configuration';


Meteor.methods({
    'getConfiguration_typeAll'() {
        return configuration_type.find({}).fetch()
    }

})