import './configuration_explorer.html';
import { Meteor } from 'meteor/meteor';
import { FlowRouter } from 'meteor/ostrio:flow-router-extra';
import { configuration_explorer } from '../../../../api/configuration/configuration';

Tracker.autorun(() => {

  Meteor.subscribe('config_explorer');
});

const dataTypeConfig = new ReactiveVar([]);
const dataParentConfig = new ReactiveVar([]);
const dataTreeview = new ReactiveVar([]);
let sessionType = ''

const funcSelect2 = ()=>{
  $('.select2').select2({width: '58%'})
  $('.select2-selection--single').css('height','36px')
  
}

// const expand = (result)=>{
  
//   var toggler = document.getElementsByClassName("caret");
//   var i;
//   console.log('test',toggler.length)

//   for (i = 0; i < toggler.length; i++) {
//     console.log('test1')
//       toggler[i].parentElement.querySelector(".nested").classList.toggle("active");
//       toggler[i].classList.toggle("caret-down");
//   }
//   for (i = 0; i < toggler.length; i++) {
//     toggler[i].addEventListener("click", function() {
//       this.parentElement.querySelector(".nested").classList.toggle("active");
//       this.classList.toggle("caret-down");
//     });
//   }
// }


Template.configuration_explorer.onCreated (async function () {
  funcSelect2()
  // expand()
  this.isSubs = new ReactiveVar(true);

  this.filterConf = new ReactiveTable.Filter('searchname', ['name']);
  this.filterType = new ReactiveTable.Filter('searchtype', ['name']);
  this.filterParent = new ReactiveTable.Filter('searchparent', ['name']);
  this.filterParentType = new ReactiveTable.Filter('searchparenttype', ['name']);
})

Template.configuration_explorer.onRendered(async function(){
  funcSelect2()
  // expand()
})

Template.configuration_explorer.helpers({
  
  configuration_type(){
    var data = ReactiveMethod.call('getConfiguration_typeAll')
    if(data){
      dataTypeConfig.set(data)
      return data
    }
  },

  configuration_parent_type(){
    var data = ReactiveMethod.call('configuration_parent_type')
    if(data){
      return data
    }
  },

  configuration_parent(){
    var data = dataParentConfig.get()
    if(data.length > 0){
      console.log(data)
      return data
    }
  },

  isSubscriptionR: function () {
    var subs = Template.instance().isSubs.get();
    console.log('subs ready:' + subs);
    return subs;
  },

  configExplorer: function () {
    return {
      collection: configuration_explorer,
      rowsPerPage: 10,
      showFilter: false,
      fields: [
        { key: 'name', label: 'Configuration Name', cellClass: 'text-bold mr-1'},
        { key: 'configuration_type', label: 'Type' , fn: function (data) {
            var datas = ReactiveMethod.call('getConfiguration_type_by_id',data);
            if(datas){
              return datas.type_name
            }
          } 
        },
        { key: 'parent_configuration_name', label: 'Parent Name' , fn: function (data) {
            var datas = ReactiveMethod.call('get_configuration_explorer_by_id',data);
            if(datas){
              return datas.name
            }
            else{
              return '-'
            }
          } 
        },
        { key: 'parent_configuration_type', label: 'Parent Type' , fn: function (data) {
            var datas = ReactiveMethod.call('getConfiguration_type_by_id',data);
            if(datas){
              return datas.type_name
            }
            else{
              return data
            }
          } 
        },
        { key: 'opening_Date', label: 'Applicable Date',
          fn: function (date) {
            return moment(new Date(date)).format('MMMM Do YYYY')
          } 
        },
        
        { key: 'close_Date', label: 'Close Date',
          fn: function (date) {
            if(date != null){
              return moment(new Date(date)).format('MMMM Do YYYY, h:mm:ss a')
            }
            else{
              return '-'
            }
          } 
        },
        { key: 'status', label: 'Status'},
        { key: 'createdBy', label: 'Created By' , fn: function (data) {
            var datas = Meteor.users.findOne({_id:data})
            if(datas){
              return datas.username
            }
          } 
        },
        { key: 'createdAt', label: 'Created At',sortOrder: 1, sortDirection: 'descending',
          fn: function (date) {
            return moment(new Date(date)).format('MMMM Do YYYY, h:mm:ss a')
          } 
        },
        {
          label: 'ACTION', tmpl: Template.detail_config, sortable: false,
          headerClass: 'col-md-1 text-center', cellClass: 'text-center'
        },
        
      ],
      filters: ['searchname', 'searchparent', 'searchtype','searchparenttype'],
      currentPage: Template.instance().currentPage,
      ready: Template.instance().isSubs,

    };
  },

  lv1(){
    console.log('this',this)
    var count = 1;
    var config_explorer = configuration_explorer.find({'parent_configuration_type':"Main"}).fetch()
    if(config_explorer.length > 0){
      config_explorer.forEach(function(doc){
        doc.rowCount = count;
        count++;
      });
      return config_explorer
    }  
  },

  getChild(id){
    var config_explorer = configuration_explorer.find({'parent_configuration_name':id}).fetch()
    if(config_explorer.length > 0){
      return config_explorer
    }
  }

});


Template.configuration_explorer.events({
  
  'change #configurationtype'(e,tpl){
    var id = $(e.target).val()
    const asset = dataTypeConfig.get()
    if(asset.length > 0){
      for(let data of asset){
        if(id == data._id){
          sessionType = data.type_name
          if( data.type_name == 'Stockpile'){
            $('#divStockpiletype').prop('hidden',false)
            break;
          }
          else{
            $('#divStockpiletype').prop('hidden',true)
          }
        }
      }
    }
  },

  'change #parenttype'(e,tpl){
    var id = $(e.target).val()
    if(id){
      Meteor.call('get_configuration_explorer_by_parent_type',id,(err,res) => {
        // console.log(res)
        dataParentConfig.set(res)
      });
    }
  },

  'click .btnSave'(e,tpl){
    var type = $('#configurationtype').val()
    var name = $('#configurationname').val()
    var parentype = $('#parenttype').val()
    var parentConfig = $('#parentconfiguration').val()
    var openingDate = $('#openingDate').val()
    var closeDate = $('#closingDate').val() ? $('#closingDate').val() : null
    var typeStockpile = $('#typeStockpile').val()
    var status = $('#status').val()
    var parentype = parentype ? parentype : "Main"
    var ext = initTypeConfigurationID()
    
    const data = {
      configuration_type:type,
      name:name,
      parent_configuration_type:parentype,
      parent_configuration_name:parentConfig,
      opening_Date:new Date(openingDate),
      close_Date:closeDate,
      stockpile_type:typeStockpile,
      status:status,
      extentionID :ext,
      status:status,
      createdBy:Meteor.userId(),
      createdAt:new Date()
    }
    var checkform = validationForm(data)
    if(checkform == true){
      Meteor.call('save_Congfiguration_exploerer',data, (error, result) => {
        if(result){
          toastr.success('Success to save configuration explorer' , 'Successfully!')
          $('#modalNewExplorer').modal('hide')
          $('#modalNewExplorer').removeAttr('data-dismiss');
        }
        else{
          toastr.error('Failed to save ', 'Error !')
        }
      })

    }
  },

  'click .caret'(e,tpl){
    var toggler = document.getElementsByClassName("caret");
    var i;
    var id = e.currentTarget.id
    Meteor.call('get_configuration_explorer_by_parent',id,(err,res)=>{
        for (i = 0; i < toggler.length; i++) {
          toggler[i].addEventListener("click", function() {
              if(res.length > 0){
                this.parentElement.querySelector(".nested").classList.toggle("active");
                this.classList.toggle("caret-down");
              }
              else{
                var caretElement = document.querySelector('.caret');
                var caretBeforeStyle = window.getComputedStyle(caretElement, '::before');
              }
          });
        }
    })
  },

  "change #searchname": function (event, template) {
    var input = $(event.target).val()
    if (input) {
      console.log(input)
      template.filterConf.set(input);
    } else {
      template.filterConf.set("");
    }
  },

  "change #searchtype": function (event, template) {
    var input = $(event.target).val()
    if (input) {
      console.log(input)
      template.filterType.set(input);
    } else {
      template.filterType.set("");
    }
  },

  "change #searchparent": function (event, template) {
    var input = $(event.target).val()
    if (input) {
      console.log(input)
      template.filterParent.set(input);
    } else {
      template.searchparent.set("");
    }
  },

  "change #searchparenttype": function (event, template) {
    var input = $(event.target).val()
    if (input) {
      console.log(input)
      template.filterParentType.set(input);
    } else {
      template.filterParentType.set("");
    }
  },
});


const validationForm = (data)=>{
  if(data.configuration_type){
    if(data.name){
      if(data.opening_Date){
        if(data.parent_configuration_type != "Main"){
          if(data.parent_configuration_name){
            return true
          }
          else{
            toastr.error('Please fill field Parent Configuration', 'Error')
          }
        }
        else{
          return true
        }
      }
      else{
        toastr.error('Please fill field Opening Date', 'Error')
      }
    }
    else{
      toastr.error('Please fill field Configuration Name', 'Error')
    }
  }
  else{
    toastr.error('Please fill field Configuration Type', 'Error')
  }
}

const initTypeConfigurationID = ()=>{
  if(sessionType == 'Area'){
    return 'MineScaf.Extention.Area'
  }
  else if(sessionType == 'Stockpile'){
    return 'MineScaf.Extention.Stockpile'
  }
  else if(sessionType == 'Location'){
    return 'MineScaf.Extention.Location'
  }
  else if(sessionType == 'Warehouse'){
    return 'MineScaf.Extention.Warehouse'
  }
  else if(sessionType == 'Stockyard'){
    return 'MineScaf.Extention.Stockyard'
  }
  else if(sessionType == 'Category'){
    return 'MineScaf.Extention.Category'
  }
  else if(sessionType == 'Truck Location'){
    return 'MineScaf.Extention.TruckLocation'
  }
  else if(sessionType == 'Train Station'){
    return 'MineScaf.Extention.TrainStation'
  }
  else if(sessionType == 'Barge Terminal'){
    return 'MineScaf.Extention.BargeTerminal'
  }
  else if(sessionType == 'Port'){
    return 'MineScaf.Extention.Port'
  }
  else if(sessionType == 'Transhipment'){
    return 'MineScaf.Extention.Transhipment'
  }
  else if(sessionType == 'Waste'){
    return 'MineScaf.Extention.Waste'
  }
  else if(sessionType == 'Mine Location'){
    return 'MineScaf.Extention.MineLocation'
  }
  else if(sessionType == 'Mine Source'){
    return 'MineScaf.Extention.MineSource'
  }
}

