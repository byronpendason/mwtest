# This script creates a Markdown file with the dates for my reconstructed calendar for the specified year.
# Created by Byron Pendason, 2022

from datetime import datetime
import ephem
# Be sure to install ephem with `pip install pyephem`. 

# Tamworth is used as the reference point for certain calculations like sunset time.. You should be able to get a more local calendar by changing these coordinates to your own. North and East is positive, whereas South and West is negative 
loc = ephem.Observer()
loc.lat = "52.634289"
loc.lon = "-1.690710"

class Calendar:
	def __init__(self, year):
		self.year = year
		self.leap = is_intercalary(self.year)
		self.fullMoons = []
		self.newMoons = []
		self.monthNames = ["Æfterra Ġēola", "Solmōnaþ", "Hreðmōnaþ", "Ēosturmōnaþ", "Þrimilcemōnaþ", "Ærra Liða", "Þriliða", "Æfterra Liða", "Weodmōnaþ", "Hāliġmōnaþ", "Wintermōnaþ", "Blōtmōnaþ", "Ærra Ġēola"]
		date = getWinterSolstice(self.year-1)
		self.midsummer = getSummerSolstice(self.year)
		self.yule = getWinterSolstice(self.year)
		if is_intercalary(self.year):
			m = 13
			self.leapstr = "Leap Year"
		else:
			m = 12
			self.leapstr = "Regular Year"
			self.monthNames.remove("Þriliða")
		for j in range(m):
			date = nextNewMoon(date)
			self.newMoons.append(returnDateString(date))
			date = nextFullMoon(date)
			self.fullMoons.append(returnDateString(date))
		self.easter = self.fullMoons[3]
		if is_intercalary(self.year):
			self.winterfylleth = self.fullMoons[10]
		else:
			self.winterfylleth= self.fullMoons[9]
	
def is_intercalary(year):
	M = (year -3) % 19
	if M in [0, 3, 6, 8, 11, 14, 17, 19]:
		return True
	else:
		return False
def nextNewMoon(date):
	nm = ephem.next_new_moon(date)
	nm = getSunset(nm+1)
	while getMoonIllum(nm) < 1:
		nm = getSunset(nm+1)
	nm -= 1
	return nm
	
def nextFullMoon(date):
	return ephem.next_full_moon(date)
def getWinterSolstice(year):
	date = datetime(year, 12, 1)
	return ephem.next_solstice(date)
def getSummerSolstice(year):
	date = datetime(year, 6, 1)
	return ephem.next_solstice(date)
def getM(year):
	M = (year -3) % 19
	if M==0: M=19
	return M
def convertToDatetime(date, bod = False):
	edate = ephem.Date(date)
	c = edate.tuple()
	if bod:
		dtdate = datetime(c[0], c[1], c[2], 0, 0, 0)
	else:
		dtdate = datetime(c[0], c[1], c[2], c[3], c[4], int(c[5]))
	return dtdate
def returnDateString(date):
	dtdate = convertToDatetime(date)
	return dtdate.strftime("%b %-d, %Y (%a)")
def getSunset(date):
	loc.date = convertToDatetime(date, True)
	sun = ephem.Sun(loc)
	return loc.next_setting(sun)
def getMoonIllum(date):
	loc.date = convertToDatetime(date)
	moon = ephem.Moon(loc)
	return moon.phase
	
	
if __name__== '__main__':
		print(f"Hello world!")