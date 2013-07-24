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

  var dayOfTheWeek = new Date(month.getFullYear(),month.getMonth());

  dayOfTheWeek.setDate(1);

  dayOfTheWeek = dayOfTheWeek.getDay();

  return dayOfTheWeek;
}

function getMonthSize(month){
  //The month is a Date object

  var  monthSize = new Date(month.getFullYear(),(month.getMonth() + 1));

  monthSize.setDate(0);
  monthSize = monthSize.getDate();

  return monthSize;
}

function createMonth(month){
  //month is a Date object
  var firstDayOfTheMonthNumber,
      i, 
      remainingCellsCounter = 0,
      monthNumber = month.getMonth(),
      monthSize,
      previousMonthSize,
      temporalDate,
      temporalPreviousMonth,
      temporalNextMonth,
      temporalDayNumber,
      yearNumber = month.getFullYear();

  $('.notThisMonth').removeClass('notThisMonth');
  
  temporalPreviousMonth = new Date(yearNumber,monthNumber -1);
  temporalNextMonth = new Date(yearNumber,monthNumber +1);
  
  monthSize = getMonthSize(month);
  previousMonthSize = getMonthSize(temporalPreviousMonth);
  firstDayOfTheMonthNumber = getDayofTheWeekOfFirstDayOfTheMonth(month);

  $('.full-month-header-container').find('.span2').find('h2').text(getStringMonthNumberToMonthLabel(monthNumber));
  $('.day-preview-header').find('.year').text(month.getFullYear());
  $('.day-preview-header').find('.month').text(getStringMonthNumberToMonthLabel(monthNumber));

  $('.full-month-header-container').find('.arrow-left').attr({
      'previousMonth': temporalPreviousMonth.getMonth(),
      'previousMonthYear': temporalPreviousMonth.getFullYear()
  });

  $('.full-month-header-container').find('.arrow-right').attr({
      'nextMonth': temporalNextMonth.getMonth(),
      'nextMonthYear': temporalNextMonth.getFullYear()
  });

  for (i = 0; i < 7; i++) {
    $('.calendar-row-days').find('.activeHeader').text(getStringDayNumberToDayLabel(i));
    $('.calendar-row-days').find('.activeHeader').next().addClass('activeHeader');
    $('.calendar-row-days').find('.activeHeader:first').removeClass('activeHeader');
  };

  temporalDayNumber = previousMonthSize - firstDayOfTheMonthNumber + 1;

  for(i = previousMonthSize; i > (previousMonthSize - firstDayOfTheMonthNumber); i--){
    $('.activeCell').removeClass($('.activeCell').attr('date'));
    $('.activeCell').addClass('notThisMonth');
    temporalDate = 'd'+temporalDayNumber + '-m' + (temporalPreviousMonth.getMonth() + 1) + '-y' +temporalPreviousMonth.getFullYear();
    
    $('.activeCell').text(temporalDayNumber);
    $('.activeCell').attr('date', temporalDate);
    $('.activeCell').addClass(temporalDate);
    $('.activeCell').next().addClass('activeCell');
    $('.activeCell:first').removeClass('activeCell');
    temporalDayNumber++;
    remainingCellsCounter++;
  }

  for(i = 1;i <= monthSize;i++){
    //no se porque es menos 2
    $('.activeCell').removeClass($('.activeCell').attr('date'));

    temporalDate = 'd'+i + '-m' + (month.getMonth() + 1) + '-y' +month.getFullYear();
    $('.activeCell').text(i);
    $('.activeCell').attr('date', temporalDate);
    $('.activeCell').addClass(temporalDate);
    $('.activeCell').next().addClass('activeCell');
    $('.activeCell:first').removeClass('activeCell');
    remainingCellsCounter++;
  }

  for(i = 1;i <= (42 - remainingCellsCounter);i++){
    $('.activeCell').removeClass($('.activeCell').attr('date'));
    $('.activeCell').addClass('notThisMonth');
    temporalDate = 'd'+i + '-m' + (temporalNextMonth.getMonth() + 1) + '-y' +temporalNextMonth.getFullYear();
    $('.activeCell').text(i);
    $('.activeCell').attr('date', temporalDate);
    $('.activeCell').addClass(temporalDate);
    $('.activeCell').next().addClass('activeCell');
    $('.activeCell:first').removeClass('activeCell');
  }

  $('.full-month-header-container').next().addClass('activeCell');
}

function previousMonth(){
  var month = new Date($(this).attr('previousMonthYear'),$(this).attr('previousMonth'));
  createMonth(month);
}

function nextMonth(){
  var month = new Date($(this).attr('nextMonthYear'),$(this).attr('nextMonth'));
  createMonth(month);
}

function start(){
  var month = new Date();
  createMonth(month);
  $('.arrow-left').on('click', previousMonth);
  $('.arrow-right').on('click', nextMonth);
}

$(document).on('ready', start);