---
title: Search
author: Byron Pendason
layout: page
permalink: /search
sitemap:
  exclude: 'yes'
---

{% assign categories = site.categories | sort %}

{% include search-form.html %}

## Categories
- [All Blog Posts (in Alphabetic order)](#all-blog-posts)
{% for category in categories %}
{% assign category_name = category | first %}
- [{{ category_name | capitalize }}](#{{ category_name | slugify }})
{% endfor %}
* * *
<h2 id="all-blog-posts"> All Blog Posts (in Alphabetical Order)</h2>
{% assign posts = site.posts | sort: "title" %}
{% for post in posts %}
- [{{ post.title }}]({{post.url}})
{% endfor %}
\[[Return to the Top](/site_index)\]
{% for category in categories %}

* * *

{% assign category_name = category | first %}

<h2 id="{{ category_name | slugify }}">{{ category_name | capitalize }}</h2>

{% for post in site.categories[category_name] %}

- [{{ post.title }}]({{post.url}})

{% endfor %}
\[[Return to the Top](/site_index)\]
{% endfor %}
