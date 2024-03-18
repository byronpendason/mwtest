class ASCalBuilder {
	constructor(calendar) {
		let today = new Date();
		this.calendar = calendar;
		this.month = this.getMonth(today);
		this.lastDay = this.getLastDay();
		let months = [...this.calendar.Months];
		
		for (let month of months) { //add months to the select 
			let option = document.createElement("option");
			option.text = month.Name + " " + today.getFullYear();
			monthName.add(option);
		}
		
		this.show();
	}

	getMonth(date) {
		let d = new Date(date.toDateString());
		let months = [...this.calendar.Months];
		const monthName = document.getElementById("monthName");
		for (let i = 0; i < months.length; i++) {
			let newMoon = new Date(months[i].NewMoon);
			let nextMoon;
			try {
				nextMoon = new Date(months[i + 1].NewMoon);
			} catch {
				let lastDay = this.calendar.LastDay;
				nextMoon = new Date(lastDay.getDate() + 1);
			}
			if (date >= newMoon && date < nextMoon) {
				return months[i];
			}
		}

		return months.pop(); //if you've made it through all the months of the year, return last month
	}

	getLastDay() {
		let months = [...this.calendar.Months];
		let index = months.indexOf(this.month);

		let lastDay;
		if (index == months.length - 1) {
			lastDay = this.calendar.LastDay;
		} else {
			lastDay = months[index + 1].NewMoon;
			lastDay.setDate(lastDay.getDate() - 1);
		}
		return lastDay;
	}

	show() {
		const monthName = document.getElementById("monthName");
		const monthTable = document.getElementById("monthTable");
		monthName.value = `${this.month.Name} ${this.calendar.Year}`;
		monthTable.innerHTML = `<h4 style="text-align: center;">Sun</h4> <h4 style="text-align: center;">Mon</h4> <h4 style="text-align: center;">Tue</h4>  <h4 style="text-align: center;">Wed</h4> <h4 style="text-align: center;">Thur</h4> <h4 style="text-align: center;">Fri</h4> <h4 style="text-align: center;">Sat</h4>`;
		
		let day = new Date(this.month.NewMoon.toDateString());
		let holidays = [];
		for (let holiday of this.calendar.Holidays) {
			if (holiday.ModernDate >= this.month.NewMoon && holiday.ModernDate <= this.lastDay) {
				holidays.push(holiday);
			}
		}

		for (let i = 0; i < day.getDay(); i++) {
			monthTable.innerHTML += "<span></span>"
		}
		
		let num = 1;
		while (day <= this.lastDay) {
			let holiday = null;
			for (let h of holidays) {
				if (h.ModernDate.toDateString() === day.toDateString()) {
					holiday = h.Name;
				}
			}
			let dateStr = (day.getMonth() + 1) + "/" + day.getDate();
			let text = `<span style="text-align:right; border-style:solid; height: 7em;padding:2px;" onclick="builder.addEvent(this)"><b style="1.25em">${num}</b><br>${dateStr}`;
			if (holiday != null) {
				text += `<br><span style="font-size:0.75em;text-align:center;font-style:italic;float: bottom;">${holiday}</span>`;
			}
			text += "</span>";
			monthTable.innerHTML += text;
			num++;
			day.setDate(day.getDate() + 1);
		}
	}
	
	    
    showMonth() {
    	const monthBtn = document.getElementById("monthBtn");
    	const yearBtn = document.getElementById("yearBtn");
    	const infoBtn = document.getElementById("infoBtn");
    	const monthDiv = document.getElementById("monthDiv");
    	const yearInfo = document.getElementById("year-info");
   	 const calendarInfo = document.getElementById("calendar-info");
   	const footnotes = document.getElementsByClassName("footnotes")[0];
    
    	monthDiv.style.display = 'block';
    	yearInfo.style.display = 'none';
    	monthBtn.style.color = "white";
    	monthBtn.style.backgroundColor = "maroon";
    	monthBtn.style.border = "solid 1px black";
    	yearBtn.style.color = "black";
    	yearBtn.style.backgroundColor = "transparent";
    	yearBtn.style.border = "solid 1px black";
    	calendarInfo.style.display = "none";
    	infoBtn.style.backgroundColor = "transparent";
    	infoBtn.style.border = "solid 1px black";
    	infoBtn.style.color = "black";
    	footnotes.style.display = "none";
    }
    
    showYear() {
    	const monthBtn = document.getElementById("monthBtn");
    	const yearBtn = document.getElementById("yearBtn");
  	  const infoBtn = document.getElementById("infoBtn");
    		const monthDiv = document.getElementById("monthDiv");
 	   const yearInfo = document.getElementById("year-info");
 	   const calendarInfo = document.getElementById("calendar-info");
 		const footnotes = document.getElementsByClassName("footnotes")[0];
    
    
    	monthDiv.style.display = 'none';
    	yearInfo.style.display = 'block';
    	monthBtn.style.color = "black";
    	monthBtn.style.backgroundColor = "transparent";
    	monthBtn.style.border = "solid 1px black";
    	yearBtn.style.color = "white";
    	yearBtn.style.backgroundColor = "maroon";
    	yearBtn.style.border = "solid 1px black";
    	calendarInfo.style.display = "none";
    	infoBtn.style.backgroundColor = "transparent";
    	infoBtn.style.color = "black";
    	infoBtn.style.border = "solid 1px black";
    	footnotes.style.display = "none";
    }
    
    showInfo() {
    	const monthBtn = document.getElementById("monthBtn");
    	const yearBtn = document.getElementById("yearBtn");
  	  const infoBtn = document.getElementById("infoBtn");
    		const monthDiv = document.getElementById("monthDiv");
 	   const yearInfo = document.getElementById("year-info");
 	   const calendarInfo = document.getElementById("calendar-info");
 		const footnotes = document.getElementsByClassName("footnotes")[0];
    
    
    	monthDiv.style.display = 'none';
    	yearInfo.style.display = 'none';
    	monthBtn.style.color = "black";
    	monthBtn.style.backgroundColor = "transparent";
    	monthBtn.style.border = "solid 1px black";
    	yearBtn.style.color = "black";
    	yearBtn.style.backgroundColor = "transparent";
    	yearBtn.style.border = "solid 1px black";
    	calendarInfo.style.display = "block";
    	infoBtn.style.backgroundColor = "maroon";
    	infoBtn.style.color = "white";
    	infoBtn.style.border = "solid 1px black";
    	footnotes.style.display = "block";
    }
    
    addEvent(element) {
    	/*let datePattern = /\d+\/\d+/;
    	let text = new Date(element.innerHTML.match(datePattern)[0] + "\/" + this.lastDay.getFullYear());
    	console.log(text.toString());
		let event = prompt("Please enter your event:");
		element.innerHTML += `<br><span style="font-size:0.75em;text-align:center;font-weight: bold;float: bottom;">${event}</span>`;*/
	}
	
	monthSelect(value) {
		let date = new Date(this.calendar.Months[value].FullMoon);
		console.log(date.toDateString());
		this.month = this.getMonth(date);
		this.lastDay = this.getLastDay();
		this.show();
	}
}