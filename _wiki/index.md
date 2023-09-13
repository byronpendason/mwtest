---
title: Index
exclude: 'yes'
---

# Welcome to the *Fyrnsidu Wiki*!

In the *Fyrnsidu Wiki*, you will find pages for different things of importance for [[Fyrnsidu]]. Feel free to browse the pages, and learn how to [contribute](contribute) if you'd like to help!

## Pages

<div markdown=1 style="columns:auto auto">

{% for page in site.wiki %}

{% unless page.exclude %}- [{{page.title}}]({{page.url}}){% endunless %}

{% endfor %}

</div>
