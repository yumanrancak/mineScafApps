import './truck_live_management.html';
import { Meteor } from 'meteor/meteor';

Tracker.autorun(() => {

});

var datacollapse = new ReactiveVar(true)

const funcSelect2 = ()=>{
  $('.select2').select2({width: '58%'})
  $('.select2-selection--single').css('height','36px')
  
}


Template.truck_live_management.onCreated (async function () {
  funcSelect2()
  this.isSubs = new ReactiveVar(true);
  // chartBar(this)
})

Template.truck_live_management.onRendered(async function(){
  funcSelect2()
  chartBar(this)
  chartRadar(this)
})

Template.truck_live_management.helpers({
  
  isSubscriptionR: function () {
    var subs = Template.instance().isSubs.get();
    console.log('subs ready:' + subs);
    return subs;
  },


});


Template.truck_live_management.events({
  'click .collap'(){
    var data = datacollapse.get()
    // console.log(data)
    if(data == true){
      $('#up-down').removeClass('fas fa-caret-down')
      $('#up-down').addClass('fas fa-caret-up')
      datacollapse.set(false)
      $('#divchartSummary').prop('hidden',true)
    }
    else{
      $('#up-down').removeClass('fas fa-caret-up')
      $('#up-down').addClass('fas fa-caret-down')
      datacollapse.set(true)
      $('#divchartSummary').prop('hidden',false)
    }
  }
});


const chartBar = (doc)=>{
  var container = doc.find("#chartBar");

  // Turn Meteor Collection to simple array of objects.
  var data = anychart.data.set([
    ["Jan", 3.8, 5.5, 6.9],
    ["Feb", 5.5, 7.0, 9.6],
    ["Mar", 9.9, 11.7, 13.3],
    ["Apr", 15.7, 17.6, 19.7],
    ["May", 21.5, 23.3, 25.8],
    ["Jun", 26.3, 28.5, 30.2],
    ["Jul", 29.3, 31.6, 33.5],
    ["Aug", 28.4, 30.6, 32.8],
    ["Sep", 24.4, 26.5, 28.0],
    ["Oct", 18.3, 20.6, 22.4],
    ["Nov", 12.3, 14.4, 16.5],
    ["Dec", 6.6, 8.7, 10.4]
  ]);

  // map the data
  var seriesData_1 = data.mapAs({x: 0, value: 1});
  var seriesData_2 = data.mapAs({x: 0, value: 2});
  var seriesData_3 = data.mapAs({x: 0, value: 3});

  // set the chart type
  var chart = anychart.line();

  // set the interactivity mode
  chart.interactivity().hoverMode("single");

  // create the first series (area), set the data and name
  var series1 = chart.area(seriesData_1);
  series1.name("Siwak");

  // configure the visual settings of the first series
  series1.normal().fill("#04b4ae", 0.3);
  series1.hovered().fill("#04b4ae", 0.1);
  series1.selected().fill("#04b4ae", 0.5);
  series1.normal().hatchFill("zig-zag", "#808080", 1, 15);
  series1.hovered().hatchFill("zig-zag", "#808080", 1, 15);
  series1.selected().hatchFill("zig-zag", "#808080", 1, 15);
  series1.normal().stroke("#04b4ae");
  series1.hovered().stroke("#04b4ae", 2);
  series1.selected().stroke("#04b4ae", 4);

  // create the second series (line), set the data and name  
  var series2 = chart.line(seriesData_2);
  series2.name("Terusan");

  // configure the visual settings of the second series
  series2.normal().stroke("#04b404");
  series2.hovered().stroke("#04b404", 2);
  series2.selected().stroke("#04b404", 4);

  // create the third series (line), set the data and title  
  var series3 = chart.line(seriesData_3);
  series3.name("Jembatan 1");

  // configure the visual settings of the third series
  series3.normal().stroke("#aeb404", 1, "10 5", "round");
  series3.hovered().stroke("#aeb404", 2, "10 5", "round");
  series3.selected().stroke("#aeb404", 4, "10 5",  "round");

  // turn the legend on
  chart.legend(true);

  // set the chart title
  chart.title("Water River Level");

  // set the titles of the axes
  chart.xAxis().title("Month");

  // set the container id
  chart.container(container);

  // initiate drawing the chart
  chart.draw();
}

const chartRadar = (doc)=>{
  var container = doc.find("#chartRadar");

  // Turn Meteor Collection to simple array of objects.
  var data_1 = [
    {x: "Jan", value: 102},
    {x: "Feb", value: 124},
    {x: "Mar", value: 242},
    {x: "Apr", value: 564},
    {x: "Mei", value: 9999},
    {x: "Jun", value: 8282},
    {x: "Jul", value: 1924},
    {x: "Aug", value: 4444},
    {x: "Sep", value: 9999},
    {x: "Oct", value: 8282},
    {x: "Nov", value: 1924},
    {x: "Dec", value: 4444},
  ];
  
  var data_2 = [
    {x: "Jan", value: 2024},
    {x: "Feb", value: 1233},
    {x: "Mar", value: 4214},
    {x: "Apr", value: 5152},
    {x: "Mei", value: 6611},
    {x: "Jun", value: 2222},
    {x: "Jul", value: 3333},
    {x: "Aug", value: 4444},
    {x: "Sep", value: 1211},
    {x: "Oct", value: 1212},
    {x: "Nov", value: 3232},
    {x: "Dec", value: 5252},
  ];

  var data_3 = [
    {x: "Jan", value: 2000},
    {x: "Feb", value: 3100},
    {x: "Mar", value: 1210},
    {x: "Apr", value: 666},
    {x: "Mei", value: 7701},
    {x: "Jun", value: 121},
    {x: "Jul", value: 212},
    {x: "Aug", value: 444},
    {x: "Sep", value: 552},
    {x: "Oct", value: 612},
    {x: "Nov", value: 1024},
    {x: "Dec", value: 500},
  ];
  chart = anychart.radar();

  // create the first series (line) and set the data
  var series1 = chart.area(data_1);
  
  // create the second series (area) and set the data
  var series2 = chart.area(data_2);

  var series3 = chart.area(data_3);
  series1.normal().fill("#04b4ae", 0.3);
  series1.hovered().fill("#04b4ae", 0.1);
  series1.selected().fill("#04b4ae", 0.5);
  series1.normal().hatchFill("zig-zag", "#808080", 1, 15);
  series1.hovered().hatchFill("zig-zag", "#808080", 1, 15);
  series1.selected().hatchFill("zig-zag", "#808080", 1, 15);
  series1.normal().stroke("#04b4ae");
  series1.hovered().stroke("#04b4ae", 2);
  series1.selected().stroke("#04b4ae", 4);
  

  // set the interactivity mode

  // create the first series (area), set the data and name
  series1.name("Siwak");

  // configure the visual settings of the first series

  // create the second series (line), set the data and name  
  series2.name("Terusan");

  // create the third series (line), set the data and title  
  series3.name("Jembatan 1");

  // turn the legend on
  chart.legend(true);

  // set the chart title
  chart.title("Water River Level");

  // set the titles of the axes
  // chart.xAxis().title("Month");

  // set the container id
  chart.container(container);

  // initiate drawing the chart
  chart.draw();
}
