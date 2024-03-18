function Calendar(years) {

	//// "Public Properties" (just imagine that in airquotes)
	this.Months = new Array();
	this.Year = "";
	this.YearHE = "";
	this.MetonicYear = "";
	this.WinterSolstice = "";
	this.SummerSolstice = "";
	this.Holidays = new Array();
	this.IsLeapYear = true;
	this.ConvertDate = getASDate;
	this.IsBetween = dateIsBetween;

	///// "Private Variables" (still with the airquotes) \\\\\
	var _years = years;
	const _convert = new Date(1582, 9, 15);

	this.Load = function (year) {

		this.Year = year;
		this.YearHE = calculateHumanEraYear(year);
		this.MetonicYear = calculateMetonicYear(year);

		// Everything in these initial array declarations could come from a json file if you wanted

		var date = _years.find((yr) => yr.Year == this.Year - 1).WinterSolstice;
		var selectedYear = _years.find((yr) => yr.Year == this.Year);

		this.WinterSolstice = new Date(selectedYear.WinterSolstice);
		this.SummerSolstice = new Date(selectedYear.SummerSolstice);
		this.IsLeapYear = selectedYear.IsLeapYear;
		this.LastDay = calculateLastDay();

		var tempMonths = new Array();

		tempMonths.push(new Month("Æfterra Ġēola"));
		tempMonths.push(new Month("Solmōnaþ"));
		tempMonths.push(new Month("Hreðmōnaþ"));
		tempMonths.push(new Month("Ēosturmōnaþ"));
		tempMonths.push(new Month("Þrimilcemōnaþ"));
		tempMonths.push(new Month("Ærra Liða"));
		if (this.IsLeapYear) tempMonths.push(new Month("Þriliða")); // Figuring out I needed to make adding this conditional was a PITA
		tempMonths.push(new Month("Æfterra Liða"));
		tempMonths.push(new Month("Weodmōnaþ"));
		tempMonths.push(new Month("Hāliġmōnaþ"));
		tempMonths.push(new Month("Wintermōnaþ"));
		tempMonths.push(new Month("Blōtmōnaþ"));
		tempMonths.push(new Month("Ærra Ġēola"));

		this.Months = tempMonths;

		// Copied this for now, but why bother if you've already loaded the moons in the data file?
		let i = 0;
		this.Months.forEach(m => {
			if (this.Year > 1700 && this.Year < 2100) {
				m.NewMoon = new Date(selectedYear.NewMoons[i]);
				m.FullMoon = new Date(selectedYear.FullMoons[i]);
				i += 1;
			} else {
				m.NewMoon = nextNewMoon(date);
				date.setTime(date.getTime() + 36 * 1000 * 60 * 60);
				m.FullMoon = nextFullMoon(date);
			}
		});

		// I added a "type" concept to the holidays so you have the flexibility to group them however you please. 
		// It currently just makes the distinction between high holidays and the others for the existing  tables
		// but you could certainly use it to drive other display things.
		this.Holidays = [
			new Holiday("Ēosturdæġ", this.Months[3].FullMoon, "high", null),
			new Holiday("Midsumor", this.SummerSolstice, "high", null),
			new Holiday("Winterfylleþ", calculateWinterNights(), "high", null),
			new Holiday("Ġēola", this.WinterSolstice, "high", null),
			new Holiday("Sigetiber", this.Months[1].FullMoon, "minor", null),
			new Holiday("Lencten-Tīd", this.Months[2].FullMoon, "minor", null),
			new Holiday("Blōstmfrēols", calculateBlostmfreols(), "minor", new HoildayLink("(Lārhūs Fyrnsida)", "https://larhusfyrnsida.com/2017/03/18/blostmfreols/")),
			new Holiday("Bendfeorm", calculateBendeform(), "minor", null),
			new Holiday("Hærfestlīc Freōlsung", calculateHarvest(), "minor", null),
			new Holiday("Andetnes-blōt", calculateAndetnes(), "minor", null),
			new Holiday("Mōdraniht (Traditional)", calculateMothersNight(0), "minor", null),
			new Holiday("Mōdraniht (Mine Wyrtruman)", calculateMothersNight(2), "minor", null),
			new Holiday("Mōdraniht (Ingwine)", calculateMothersNight(8), "minor", null),
			new Holiday("Twelftadæg", calculateMothersNight(11), "minor", null),
		]

		return this;
	}

	return this;

	///// Methods Masquerading as Models \\\\\\

	function Month(name) {
		this.Name = name;
		this.FullMoon = '';
		this.NewMoon = '';

		return this;
	}

	function Holiday(name, date, type, link) {
		this.Name = name;
		this.Type = type;
		this.Link = link;
		this.ModernDate = date;
		this.AngloSaxonDate = getASDate(date);
	}

	function HoildayLink(text, url) {
		this.Text = text,
			this.Url = url
	}


	///// Holiday Calculations \\\\\\

	function calculateWinterNights() {
		return this.IsLeapYear ? this.Months[10].FullMoon : this.Months[9].FullMoon;
	}

	function calculateBlostmfreols() {
		return addDays(this.Months[4].NewMoon, -1);
	}

	function calculateBendeform() {
		return this.IsLeapYear ? this.Months[8].NewMoon : this.Months[7].NewMoon;
	}

	function calculateHarvest() {
		return this.IsLeapYear ? this.Months[9].FullMoon : this.Months[8].FullMoon;
	}

	function calculateAndetnes() {
		return this.IsLeapYear ? this.Months[11].FullMoon : this.Months[10].FullMoon;
	}

	function calculateMothersNight(daysFromYule) {
		var date = new Date(this.WinterSolstice);
		if (daysFromYule === 0) {
			return date;
		} else {
			return addDays(date, daysFromYule);
		}
	}

	///// Date Magic & Utility Methods \\\\\

	function calculateMetonicYear(yearCE) {
		var metonicYear = parseInt(yearCE - 3) % 19;
		if (metonicYear == 0) {
			metonicYear = 19;
		}
		return metonicYear;
	}

	// Why was this calculating BCE? Is the calendar supposed to go back that far??
	function calculateHumanEraYear(yearCE) {
		var yearHE;
		if (yearCE == 0) {
			yearHE = 10000;
		} else if (yearCE < 0) {
			yearHE = 10001 - Math.abs(yearCE);
		} else {
			yearHE = 10000 + yearCE;
		}
		return yearHE;
	}

	function nextFullMoon(date) {
		var j12000 = new Date(Date.UTC(2000, 0, 1));
		var fm2000 = new Date(2000, 0, 20, 23, 41)
		var N = Math.ceil((date.getTime() - fm2000.getTime()) / (1000 * 60 * 60 * 24) / 29.5305888610);
		var d = (20.362000 + 29.5305888610 * N + (102.026 * 10 ** -12) * N ** 2) + (-0.000739 - (235 * 10 ** -12) * N ** 2);
		date.setTime(j12000.getTime() + d * 86400000);
		if (date < _convert) {
			date = toJulian(date);
		}
		return new Date(date.toDateString()); // needed this to actually be a distinct object
	}

	function nextNewMoon(date) {
		var j12000 = new Date(Date.UTC(2000, 0, 1));
		var nm2000 = new Date(2000, 0, 6, 13, 14);
		var N = Math.ceil((date.getTime() - nm2000.getTime()) / (1000 * 60 * 60 * 24) / 29.5305888610);
		var d = (5.597661 + 29.5305888610 * N + (102.026 * 10 ** -12) * N ** 2) + (-0.000739 - (235 * 10 ** -12) * N ** 2);
		date.setTime(j12000.getTime() + d * 86400000);
		if (date < _convert) {
			date = toJulian(date);
		}
		return new Date(date.toDateString()); // needed this to actually be a distinct object
	}

	function toJulian(d) {
		yr = d.getFullYear();
		century = Math.floor(yr / 100);
		offset = Math.ceil(century * 0.75) - 2;
		var j = new Date(d);
		j.setDate(d.getDate() - offset);
		return j;
	}

	function addDays(theDate, days) {
		return new Date(theDate.setDate(theDate.getDate() + days)); // Need the new date here to keep this actually date objects
	}

	// This was a royal pain in the tookus to get working correctly with the month array
	// It probably isn't perfect since I didn't *really* know what some of the math was for.

	function getASDate(d) {
		var d = new Date(d.getFullYear(), d.getMonth(), d.getDate());
		var month;
		var newYearsDay = new Date(d.getFullYear(), 0, 1);
		if (d >= newYearsDay && d < this.Months[0].NewMoon) {
			this.Load(d.getFullYear() - 1);
		}

		for (let i = 0; i < this.Months.length; i++) {
			var isBetween = false;
			var monthStart = this.Months[i].NewMoon;
			var nextMonth = this.Months[i + 1];

			if (nextMonth != undefined) {
				isBetween = dateIsBetween(d, monthStart, nextMonth.NewMoon)
				if (isBetween) {
					month = this.Months[i];
				}
			}
		}

		var newYear = _years.find(yr => yr.Year == this.Year + 1).NewMoons[0];
		var dateStr;

		if (d >= newYear) {
			var newMoon = newYear;
			var day = ((d.getTime() - newMoon.getTime()) / (24 * 60 * 60 * 1000)) + 1;

			dateStr = getOrdinal(Math.round(day)) + " of Æfterra Ġēola";
			dateStr += ", " + (this.Year + 1).toString() + " CE";

		} else {
			if (month == undefined) {
				month = this.Months[this.Months.length - 1]; // If we somehow got this far without a month, assume End of Year
			}
			var newMoon = month.NewMoon;
			var day = ((d.getTime() - newMoon.getTime()) / (24 * 60 * 60 * 1000)) + 1;
			dateStr = getOrdinal(Math.round(day)) + " of " + month.Name;
		}
		/*if (this.Year != d.getFullYear()) {
			this.Load(d.getFullYear());
		}*/
		return dateStr;

	}

	function dateIsBetween(date, rangeStart, rangeEnd) {
		return date >= rangeStart && date < rangeEnd;
	}

	function getOrdinal(n) {
		if (n % 100 < 20 && n % 100 > 10) {
			str = String(n) + "th";
		} else if (n % 10 == 1) {
			str = String(n) + "st";
		} else if (n % 10 == 2) {
			str = String(n) + "nd";
		} else if (n % 10 == 3) {
			str = String(n) + "rd";
		} else {
			str = String(n) + "th";
		}
		return str;
	}
	
	function calculateLastDay() {
		let nextYear = _years.find((yr) => yr.Year == this.Year + 1);
		
		let newYears = new Date(nextYear.NewMoons[0]);
		let lastDay = addDays(newYears, -1);
		return lastDay;
	}
}