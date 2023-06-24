
import './view_config_explorer.html';
import { FlowRouter } from 'meteor/ostrio:flow-router-extra';
import { funcSelect2,createTransID } from '../../../../module/helper/index';
// import { asset_request_log } from '../../../../api/inventoryAset/inventoryAsset';
import { ready } from 'jquery';
import { configuration_explorer, configuration_type } from '../../../../api/configuration/configuration';


toastr.options = {
  "closeButton": true,
  "debug": true,
  "newestOnTop": false,
  "progressBar": true,
  "positionClass": "toast-top-full-width",
  "preventDuplicates": false,
  "onclick": null,
  "showDuration": "300",
  "hideDuration": "1000",
  "timeOut": "5000",
  "extendedTimeOut": "1000",
  "showEasing": "swing",
  "hideEasing": "linear",
  "showMethod": "fadeIn",
  "hideMethod": "fadeOut"
}
Tracker.autorun(() => {

  
});


let dataPush = []
var countreturn = 0

const dataTypeConfig = new ReactiveVar([]);
const dataParentConfig = new ReactiveVar([]);
const dataConfig = new ReactiveVar([]);



Template.view_config_explorer.onCreated(function () {
  funcSelect2()
  // getdataTypeConfig()
  var id =FlowRouter.getParam('id')
  this.isSubs = new ReactiveVar(true);

  var init = this
  if(id){
    Meteor.call("get_configuration_explorer_by_id", id, (error, res) => {
      if(res){
        $('#configurationname').val(res.name);
        $("#configurationname").attr('disabled', true);
        $("#configurationtype").attr('disabled', true);
        $("#parenttype").attr('disabled', true);
        $("#parentconfiguration").attr('disabled', true);
        $("#typeStockpile").attr('disabled', true);
        $("#status").attr('disabled', true);
        console.log(res)
        dataConfig.set(res)
        $('#parentconfiguration').val(res._id).trigger('change');
        
        $('#status').val(res.status).trigger('change');
        $('#openingDate').val(moment(res.opening_Date).format('YYYY-MM-DD'))
        if( res.extentionID == 'MineScaf.Extention.Stockpile'){
          $('#divStockpiletype').attr('hidden',false)
        }
        else{
          $('#divStockpiletype').attr('hidden',true)
        }
        $('#typeStockpile').val(res.stockpile_type).trigger('change');
        res.closedate ? $('#closingDate').val(moment(res.close_Date).format('YYYY-MM-DD')) : null
      }
    })
  }
});
  

Template.view_config_explorer.onRendered(async function(){
  funcSelect2()
  // getdataTypeConfig()
  
})

Template.view_config_explorer.events({
 
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

  "click .btnSave": function (event, template) {
    var type = $('#configurationtype').val()
    var name = $('#configurationname').val()
    var parentype = $('#parenttype').val()
    var openingDate = $('#openingDate').val()
    var closeDate = $('#closingDate').val() ? $('#closingDate').val() : null
    var typeStockpile = $('#typeStockpile').val()
    var status = $('#status').val()
    var parentype = parentype ? parentype : "Main"
    var parentConfig = $('#parentconfiguration').val()
    
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

  "click .editForm": function (event, template) {
    $("#configurationname").attr('disabled', false);
    $("#configurationtype").attr('disabled', false);
    $("#parenttype").attr('disabled', false);
    $("#parentconfiguration").attr('disabled', false);
    $("#typeStockpile").attr('disabled', false);
    $("#status").attr('disabled', false);
    $("#closingDate").attr('readonly', false);
    $("#openingDate").attr('readonly', false);
    $("#savebtn").attr('hidden', false);
    $("#editform").attr('hidden', true);
  },

  "change #selectItem": function (event, template) {
    var item = $(event.target).val()
    $('#serialnumber').val('')
    $('#assettype').val('')
    Meteor.call("getAssetbyId_onSerial_number", item, (error, res) => {
      if(res){
        Session.set('dataItem',res)
      }
    })
  }, 
  
})

Template.view_config_explorer.helpers({
  
  configuration_type(){
    var data = ReactiveMethod.call('getConfiguration_typeAll')
    if(data){
      dataTypeConfig.set(data)
      return data
    }
  },

  configuration_parent(){
    var data = dataParentConfig.get()
    if(data ){
      return data
    }
  },

  configuration_parent_type(){
    var data = ReactiveMethod.call('configuration_parent_type')
    if(data){
      return data
    }
  },

  selectCon_type:function(optionText){
    datacon = dataConfig.get()
    if(optionText === datacon.configuration_type){
      return 'selected'
    }
  },

  selectparent_type:function(optionText){
    datacon = dataConfig.get()
    var data = ReactiveMethod.call('get_configuration_explorer_by_parent_type',datacon.parent_configuration_type)
    if(optionText === datacon.parent_configuration_type){
      dataParentConfig.set(data)
      return 'selected'
    }
  },


  selectparent:function(optionText){
    datacon = dataConfig.get()
    if(optionText == datacon.parent_configuration_name){
      return 'selected'
    }
  }
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


const parseHistoryList = (data)=>{
  for (let i = 0; i < data.length; i++) {
      const el = data[i];
      const { title, description } = getDescription(el)
      let idCurrent = ``
      if (i+1 == data.length) {
          idCurrent = 'active'
      }
      const history = `<li id="${idCurrent}">
                          <p class="text-bold">${title}</p> 
                          <div class="content">
                              <span class="text-dark font-italic ">${description}</span>
                          </div>
                      </li>`
      $('#historyContent').append(history)
  }
}


const getDescription = (data)=>{
  let result = {}
  let user = getUser(data.createdBy)

  if (data.logtype == 'insert') {
      result.title = `Form Request Asset <u>Created</u>  `
      result.description = `This form request created on <span class="text-bold">${moment(data.createdAt).format('dddd, DD MMMM YYYY, HH:mm')}</span> by <span class="text-bold">${user}.</span>`
  } 
  else if (data.logtype == 'update') {
    result.title = `Form Request Asset <u>Updated</u> `
    result.description = `This form request update on <span class="text-bold">${moment(data.createdAt).format('dddd, DD MMMM YYYY, HH:mm')}</span> by <span class="text-bold">${user}.</span>`
  } 
  return result
}


const getUser = (user)=>{
  var user = Meteor.users.findOne({_id:user})
  return user.username
}