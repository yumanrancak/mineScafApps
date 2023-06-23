
import { Mongo } from 'meteor/mongo';

export const stockpile = new Mongo.Collection('stockpile')
export const configuration_type = new Mongo.Collection('configuration_type')