function showMonth(date) {
	showTab("month");
	let monthName = document.getElementById("monthName");
	let monthTable = document.getElementById("monthTable");
	let months = [...calendar.Months];
	let x = 0;
	for (let m of months) {
		let option = document.createElement("option");
		option.text = m.Name + " " + calendar.Year;
		monthName.add(option);
		if (calendar.IsBetween(date, m.NewMoon, m.DarkMoon)) {
			monthName.value = option.text;
			x = monthName.selectedIndex;
		}
	}

	monthTable.innerHTML = `<h4 style="text-align: center;">Sun</h4> <h4 style="text-align: center;">Mon</h4> <h4 style="text-align: center;">Tue</h4>  <h4 style="text-align: center;">Wed</h4> <h4 style="text-align: center;">Thur</h4> <h4 style="text-align: center;">Fri</h4> <h4 style="text-align: center;">Sat</h4>`;

	let holidays = calendar.Holidays;
	let day = new Date(months[x].NewMoon);
	let num = 1;
	for (let i = 0; i < day.getDay(); i++) {
		monthTable.innerHTML += "<span></span>"
	}
	while (day <= months[x].DarkMoon) {
		let holiday = null;
		for (let h of holidays) {
			if (h.ModernDate.toDateString() === day.toDateString()) {
				holiday = h.Name;
			}
		}
		let dateStr = (day.getMonth() + 1) + "/" + day.getDate();
		let text = `<span style="text-align:right; border-style:solid; height: 7em;padding:2px;"><b style="1.25em">${num}</b><br>${dateStr}`;
		if (holiday != null) {
			text += `<br><span style="font-size:0.75em;text-align:center;font-style:italic;float: bottom;">${holiday}</span>`;
		}
		text += "</span>";
		monthTable.innerHTML += text;
		num++;
		day.setDate(day.getDate() + 1);
	}
}

function monthSelect(num) {
	let monthName = document.getElementById("monthName");
	let monthTable = document.getElementById("monthTable");
	let months = [...calendar.Months];

	monthName.innerHTML = "";
	showMonth(months[num].FullMoon);
}

function showTab(div) {
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
	calendarInfo.style.display = "none";
	infoBtn.style.backgroundColor = "transparent";
	infoBtn.style.border = "solid 1px black";
	infoBtn.style.color = "black";
	footnotes.style.display = "none";
	
	let tab;
	let btn;
	if (div === "month") {
		tab = monthDiv;
		btn = monthBtn;
	} else if (div === "year") {
		tab = yearInfo;
		btn = yearBtn;
	} else if (div === "info") {
		tab = calendarInfo;
		btn = infoBtn;
		footnotes.style.display = "block";
	}
	tab.style.display = "block";
	btn.style.color = "white";
	btn.style.backgroundColor = "maroon";
}
