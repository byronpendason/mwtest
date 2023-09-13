---
title: Games Index
exclude: yes
---

# Games Index

{% for game in site.games %}

{% unless game.exclude %}
- [{{game.title}}]({{game.url}}) {% if game.done %}(***completed!***)
{% else %}(*incomplete*){% endif %}
{% endunless %}

{% endfor %}
