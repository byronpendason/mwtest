---
title: Home
author: ByronTheFyrnsidere
excerpt: This website is dedicated to Fyrnsidu, a modern religion based upon the religion of the pre-Christian Germanic tribes that settled in Britain in the fifth century of the common era. 
permalink: /
---

## Welcome to Mīne Wyrtruman!

This website is dedicated to ***Fyrnsidu***, a modern religion based upon the religion of the
pre-Christian Germanic tribes that settled in Britain in the fifth century of the common era.
These people, commonly known as the Anglo-Saxons, brought with them a religion that is both
similar to, yet distinct from, the religion of the pre-Christian Nordic peoples. Fyrnsidu is a
religion based upon the worship of the Anglo-Saxon gods, one's ancestors, and the wights (spirits)
of the land around us and in our homes. If you're curious about Fyrnsidu, check out my slideshow [Introduction to Fyrnsidu](/fyrnsidu_intro/). The best resource to learn more about Fyrnsidu is [Fyrnsidu.faith](https://Fyrnsidu.faith).

# Recent Blog Posts

{% for post in site.posts limit:3 %}

{% if post.layout == "post" %}

## [{{ post.title }}]({{ post.url }}) 

<h6>Posted {% if post.author %}by {{ post.author }}{% endif %}{% if post.date %} on {{ post.date | date: "%B %-d, %Y"}}{% endif %}{% if post.categories %} in {% for category in post.categories %}<a href="/search#{{ category | slugify}}">{{ category | capitalize }}</a>{% unless forloop.last %}, {% endunless %}{% endfor %}{% endif %}</h6>

{{ post.excerpt | strip_html | strip_newlines | truncatewords: 50 }}

--------

{% endif %}

{% endfor %}

[[More Blog Posts](/blog)]
