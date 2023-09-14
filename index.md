---
title: Home
author: ByronTheFyrnsidere
excerpt: This website is dedicated to Fyrnsidu, a modern religion based upon the religion of the pre-Christian Germanic tribes that settled in Britain in the fifth century of the common era. 
permalink: /
---

# Welcome to Mīne Wyrtruman!

This website is dedicated to ***Fyrnsidu***, a modern religion based upon the religion of the
pre-Christian Germanic tribes that settled in Britain in the fifth century of the common era.
These people, commonly known as the Anglo-Saxons, brought with them a religion that is both
similar to, yet distinct from, the religion of the pre-Christian Nordic peoples. Fyrnsidu is a
religion based upon the worship of the Anglo-Saxon gods, one's ancestors, and the wights (spirits)
of the land around us and in our homes. If you're curious about Fyrnsidu, check out my slideshow [Introduction to Fyrnsidu](/fyrnsidu_intro/). The best resource to learn more about Fyrnsidu is [Fyrnsidu.faith](https://Fyrnsidu.faith).

## About the Website

*Mīne Wyrtruman* means *My Roots* in Old English. As a Fyrnsidere (Anglo-Saxon Heathen), the culture and religion of the ancient pre-Christian Anglo-Saxon peoples are the roots of my faith. I use the little that we know about them as a foundation upon which I build my religion.

Mine Wyrtruman is inclusive, believing that all who feel called are welcome to heathenry, regardless of race or ethnicity. I condemn all types of racism, including ‘folkish’ heathenry.

As the ancient Anglo-Saxon heathens were polytheistic, so is Mine Wyrtruman. I reject the monotheism of Judeo-Christian religions and the duotheism of traditional Wicca. I do not, however, have a problem with Christians or Wiccans.

I plan to cover a wide range of heathen related subjects on this blog, from heathen basics (frith, inner and outer yard, wyrd, orlæg, etc.), runes, racism within heathenry, among many other things.

## About the Author

I am an Anglo-Saxon Heathen man in my early thirties living in the Midwestern United States. My interests include studying comparative religion, history, and computer programming. I love science fiction, and playing video games. I’m currently studying the Futhorc (Anglo-Saxon) runes, both from an academic perspective as well as a more magical perspective.

I am not an expert, nor an academic. I am a blue collar worker with a passion for research and access to the internet. All my information about Fyrnsidu has been gathered from my own research and from other Heathens. Please do not take anything on this website as "the true and only way" to practice Fyrnsidu. This religion is very non-dogmatic and personal for that. If you like any ideas that I present on this website, feel free to adopt them. If you don't agree with something, feel free to not adopt it.

You can follow me on Twitter at [@ByronPendason](https://twitter.com/ByronPendason)!

## Recent Blog Posts

{% for post in site.posts limit:3 %}

{% if post.layout == "post" %}

## [{{ post.title }}]({{ post.url }}) 

<h6>Posted {% if post.author %}by {{ post.author }}{% endif %}{% if post.date %} on {{ post.date | date: "%B %-d, %Y"}}{% endif %}{% if post.categories %} in {% for category in post.categories %}<a href="/search#{{ category | slugify}}">{{ category | capitalize }}</a>{% unless forloop.last %}, {% endunless %}{% endfor %}{% endif %}</h6>

{{ post.excerpt | strip_html | strip_newlines | truncatewords: 50 }}

--------

{% endif %}

{% endfor %}

[[More Blog Posts](/blog)]
