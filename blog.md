---
title: Blog
author: Byron Pendason
permalink: /blog
sitemap:
  exclude: 'yes'
---

{% for post in site.posts %}

{% if post.layout == "post" %}

### [{{ post.title }}]({{ post.url }}) 

<h6>Posted {% if post.author %}by {{ post.author }}{% endif %}{% if post.date %} on {{ post.date | date: "%B %-d, %Y"}}{% endif %}{% if post.categories %} in {% for category in post.categories %}<a href="/search#{{ category | slugify}}">{{ category | capitalize }}</a>{% unless forloop.last %}, {% endunless %}{% endfor %}{% endif %}</h6>

{{ post.excerpt | strip_html | strip_newlines | truncatewords: 50 }}

-------

{% endif %}

{% endfor %}
