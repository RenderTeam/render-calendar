
YUI().use('calendar', 'datatype-date', 'cssbutton',  function(Y) {             
    var calendar = new Y.Calendar({
      contentBox: "#mycalendar",
      width:'340px',
      showPrevMonth: true,
      showNextMonth: true,
      date: new Date()}).render();    
    var dtdate = Y.DataType.Date; 

    
    // calendar.cfg.setProperty("MONTHS_SHORT",   ["Ene", "Feb", "Mar", "Abr", "Mayo", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"]);
    // calendar.cfg.setProperty("MONTHS_LONG",    ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"]);
    // calendar.cfg.setProperty("WEEKDAYS_1CHAR", ["D", "L", "Ma", "Mi", "J", "V", "S"]);
    // calendar.cfg.setProperty("WEEKDAYS_SHORT", ["Dom", "Lun", "Mar", "Mie", "Jue", "Vie", "Sab"]);
    // calendar.cfg.setProperty("WEEKDAYS_MEDIUM",["Dom", "Lun", "Mar", "Mie", "Jue", "Vie", "Sab"]);
    // calendar.cfg.setProperty("WEEKDAYS_LONG",  ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"]);
    

        
    calendar.on("selectionChange", function (ev) {     
      var newDate = ev.newSelection[0];
      Y.one("#selecteddate").setHTML(dtdate.format(newDate));
    });

});