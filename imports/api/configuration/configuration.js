
import { Mongo } from 'meteor/mongo';

export const configuration_explorer = new Mongo.Collection('configuration_explorer')
export const configuration_type = new Mongo.Collection('configuration_type')
export const configuration_log = new Mongo.Collection('configuration_log')