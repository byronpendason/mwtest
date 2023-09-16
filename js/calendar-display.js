function btnGetCalendar_click() {
    var selectedYear = parseInt($('#txt-input-year').val());
    getCalendar(selectedYear);
}

function getCalendar(year) {
    calendar.Load(year);
    buildTables();
    $('#lbl-intercalary-year').html(calendar.IsLeapYear ? "Intercalary Year" : "Regular Year");
    $('#lbl-metonic-year').html(calendar.MetonicYear);
}

function btnConvertDate_click() {
/*    var date = new Date(document.getElementById('txt-date-to-convert').value);

    date = new Date(
        date.getUTCFullYear(),
        date.getUTCMonth(),
        date.getUTCDate(),
        date.getUTCHours(),
        date.getUTCMinutes(),
        date.getUTCSeconds(),
        date.getUTCMilliseconds());
    selectedDate = new Date(date.toString());*/
    var dateStr = $('#txt-date-to-convert').val();
    var selectedDate = new Date(dateStr.substring(0,4), parseInt(dateStr.substring(5,7)) -1, dateStr.substring(8,10));
    var dateYear = selectedDate.getFullYear();
    if(dateYear != calendar.Year) {
        getCalendar(dateYear);
    }
    var asDate = calendar.ConvertDate(selectedDate);      
    $('#converted-date').html(asDate);
}

function buildTables() {
    $('#lbl-selected-year').html(calendar.Year);
    $('#lbl-selected-year-he').html(calendar.YearHE);
    buildMonthTable("months", calendar.Months);
    buildHolidayTable("holiday-high", calendar.Holidays, "high");     
    buildHolidayTable("holiday-minor", calendar.Holidays, "minor");       
}

function buildHolidayTable(id, holidays, filter){

    // Set up
    var headerRow = $('<tr>');
    headerRow.append($('<th class="holiday-name">').html("Holiday"));
    headerRow.append($('<th>').html("Date"));
    headerRow.append($('<th>').html("Anglo-Saxon Date"));

    var tbody = $('<tbody>');
    holidays.forEach(holiday => {
        var row = $('<tr>');
        if(holiday.Type == filter) {
            var col = $('<td>').html(holiday.Name);
            if(holiday.Link != undefined && holiday.Link != null) {
                col.append('<a href="' + holiday.Link.Url + '" target="_blank">' + holiday.Link.Text + "</a>");
            } 
            row.append(col);
            row.append($('<td>').html(prettyDate(holiday.ModernDate)));
            row.append($('<td>').html(holiday.AngloSaxonDate));            
        }
        tbody.append(row);
    });

    // manipulate table in DOM
    var table = $('#'+id);
    table.html(''); // clear anything already there
    table.append($('<thead>').append(headerRow));
    table.append(tbody);
}

function buildMonthTable(id, months) {
    // Set up
    var headerRow = $('<tr>');
    headerRow.append($('<th class="holiday-name">').html("Month"));
    headerRow.append($('<th>').html("Starts"));
    headerRow.append($('<th>').html("Full Moon"));

    var tbody = $('<tbody>');
    months.forEach(month => {
        var row = $('<tr>');
        row.append($('<td>').html(month.Name));
        row.append($('<td>').html(prettyDate(month.NewMoon)));
        row.append($('<td>').html(prettyDate(month.FullMoon)));            
        tbody.append(row);
    });

    // manipulate table in DOM
    var table = $('#'+id);
    table.html(''); // clear anything already there
    table.append($('<thead>').append(headerRow));
    table.append(tbody);       
}

// Just for my sanity. 
function prettyDate(date) {
    if (date === null || date === "")
        return "";
    var weekdays = ['Sun','Mon','Tues','Wed','Thurs','Fri','Sat'];
    var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    return weekdays[date.getDay()] + " " + months[date.getMonth()] + " " + date.getDate() + ", " + date.getFullYear() + " CE";
}