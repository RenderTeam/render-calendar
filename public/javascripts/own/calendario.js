var calendarLabels = {
  "dayLabels": [     
    {"dayLabel":  "Do"},
    {"dayLabel":  "Lu"},
    {"dayLabel":  "Ma"}, 
    {"dayLabel":  "Mi"},
    {"dayLabel":  "Ju"},
    {"dayLabel":  "Vi"},
    {"dayLabel":  "Sa"}    
  ],
  "monthLabels": [    
    {"monthLabel": "Enero"},
    {"monthLabel": "Febrero"},
    {"monthLabel": "Marzo"},
    {"monthLabel": "Abril"},
    {"monthLabel": "Mayo"},
    {"monthLabel": "Junio"},
    {"monthLabel": "Julio"},
    {"monthLabel": "Agosto"},
    {"monthLabel": "Septiembre"},
    {"monthLabel": "Octubre"},
    {"monthLabel": "Noviembre"},
    {"monthLabel": "Diciembre"}    
  ]
}

function getStringDayNumberToDayLabel(dayNumber){
  //dayNumber has values from 0-6 
  return calendarLabels.dayLabels[dayNumber].dayLabel;
}

function getStringMonthNumberToMonthLabel(monthNumber){
  // monthNumber has values from 0-11
  return calendarLabels.monthLabels[monthNumber].monthLabel;
}

function getDayofTheWeekOfFirstDayOfTheMonth(month){
  //The month is a Date object

  var dayOfTheWeek = new Date();

  dayOfTheWeek.setMonth(month.getMonth() + 1);
  dayOfTheWeek.setDate(1);

  dayOfTheWeek = dayOfTheWeek.getDay();

   return dayOfTheWeek;
}

function getMonthSize(month){
  //The month is a Date object

  var  monthSize = new Date();

  monthSize.setMonth(month.getMonth() + 1);
  monthSize.setDate(0);
  monthSize = monthSize.getDate();

  return monthSize;
}

function createMonth(month){
  //month is a Date object
  var firstDayOfTheMonthNumber,
      monthSize ,
      temporalMonth,
      previousMonthSize,
      row = 0,
      column = 0;

  temporalMonth =  month;

  monthSize = getMonthSize(month);
  temporalMonth.setMonth(month.getMonth() - 1);
  previousMonthSize = getMonthSize(temporalMonth);
  firstDayOfTheMonthNumber = getDayofTheWeekOfFirstDayOfTheMonth(month);

  $('.full-month-header-container').find('.span2').find('h2').text(getStringMonthNumberToMonthLabel(month.getMonth() + 1));

  for (var i = 0; i < 7; i++) {
    $('.calendar-row-days').find('.activeHeader').text(getStringDayNumberToDayLabel(i));
    $('.calendar-row-days').find('.activeHeader').next().addClass('activeHeader');
    $('.calendar-row-days').find('.activeHeader:first').removeClass('activeHeader');
  };

  for(var i = 0;i < 7;i++){
    
  }
}

function start(){
  var month = new Date();
  createMonth(month)
}

$(document).on('ready', start);