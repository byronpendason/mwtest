---
layout: post
title: The Anglo-Saxon Calendar page has been updated with a new algorithm
date: 2022-08-03
author: Byron Pendason
comments: true
categories: [Heathenry, anglo-saxon calendar, updates, tech]
---

I have updated my [Anglo-Saxon Calendar page](https://www.minewyrtruman.com/anglosaxoncalendar) to use a new algorithm that determines the beginning of the month. Comparing my results with [a moon sighting website](https://yrm.org/new-moon-network/)[^1], the old algorithm had a 50% accuracy (every other month was a day off). Using the new algorithm, it appears to have a 100% accuracy. 

The old algorithm simply added 36 hours to the new moon to estimate the first sliver of the moon being visible [^2]. This was the best option that I could think of at the time, but was only about 50% accurate and every other month was a day off.

The new algorithm appears to provide 100% accuracy. The idea came to me during a discussion on the Fyrnsidu Discord server. Beginning the day of the new moon (astronomically known as the conjunction), my algorithm calculates the illumination of the moon at sunset. If the illumination is less than 1%, it checks the next day. The day where the moon's illumination is over 1% is the beginning of the month.

(This paragraph is mostly technical information. If that's not your jam, feel free to skip this paragraph.) Unfortunately, I had issues with implementing this algorithm in the JavaScript of my Anglo-saxon Calendar page. It gave inaccurate results, sometimes with the day being up to two days off, whereas my implementation of this algorithm into Python provided 100% accuracy. So I came up with an unconventional solution. I created a data file using Python[^3], uploaded it to my website, and had the data hard coded into the HTML of that page (take a look at the source of that page, if you want to see what I'm talking about). I doubt it was a problem with JavaScript itself, but rather a problem with the JavaScript library I was using. But I couldn't find another library to use, so I went with the data file route.

The new algorithm only works for the years 1700 to 2200. Dates outside this range use the old algorithm, so the beginning of months may be up to a day off.

* * *

[^1]: Trigger warning: This website is a Christian website from the Hebraic roots movement. It is possible this site can trigger some individuals who has had trauma inflicted by Christianity.

[^2]: Almost every ancient culture that began their month with the "new moon" used the day in which the first sliver of the moon was visible as the beginning of their months. What we call the new moon today is the conjunction, which is the moment the moon is exactly between the sun and the earth. The ancients called this the dark moon.

[^3]: If you're interested in seeing how I generate a year's calendar using this new algorithm, I have uploaded it to a Github repository. Check out [ascal-md.py](https://github.com/byronpendason/ascal-md.py).
