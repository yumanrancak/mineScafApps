import './configuration_explorer.html';
import { Meteor } from 'meteor/meteor';
import { FlowRouter } from 'meteor/ostrio:flow-router-extra';

Tracker.autorun(() => {
});

const funcSelect2 = ()=>{
  $('.select2').select2({width: '58%'})
  $('.select2-selection--single').css('height','36px')
  $('.select2-container').style('width','36%')
  
}


Template.configuration_explorer.onCreated (async function () {
  funcSelect2()

})

Template.configuration_explorer.onRendered(async function(){
  funcSelect2()
})

Template.configuration_explorer.helpers({
  
  logbrands: function () {
    return {
      collection: 'logbrand',
      rowsPerPage: 20,
      showFilter: false,
      fields: [
        {
          key: 'reactive-table-sort', label: 'No', sortOrder: 0, sortDirection: 'descending',
          fn: function (datas) {

            data21 = []
            return datas + 1

          }
        },
        { key: 'comment', label: 'Comment', cellClass: 'text-xs text-success' },
        { key: 'createdAt', label: 'Created At',sortOrder: 0, sortDirection: 'descending', fn: function (date) {
          return date ?  moment(new Date(date)).format('D-MMM-YYYY, HH:mm') : ""
          }
        } ,
        { key: 'createdBy', label: 'Created By', fn: function (value) {
          if(value){
            var user = Meteor.users.findOne({ '_id': value }, { fields: { 'services': 0 } })
            if(user){
             return user.username 
            } 
          } }
        },
        
      ],
      filters: ['brand'],
      // currentPage: Template.instance().currentPage,
      ready: Template.instance().isSubs,

    };
  },

  configuration_type(){
    var data = ReactiveMethod.call('getConfiguration_typeAll')
    if(data){
      return data
    }
  }
  
});



