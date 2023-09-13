---
layout: default
---

{% if page.title != "Games Index" %}

        {{ content }}

    <div id='game'></div>

<hr />

<h6>This game was written using <a href="https://www.ficdown.com">Ficdown</a>, and is displayed on this page using <a href="https://github.com/rudism/ficdown.js/">Ficdown.js</a>.</h6>

    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.0/jquery.min.js"></script>
    <script src='/js/ficdown.js'></script>
    <script>
      var player = new Ficdown({
        id: 'game',
        source: document.getElementById('source').value,
        scroll: true,
      });
      player.play();

    </script>

{% else %}

    {{ content }}

{% endif %}
