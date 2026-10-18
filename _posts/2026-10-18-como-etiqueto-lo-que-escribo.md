---
layout: post
title: "Cómo etiqueto lo que escribo cuando hay un modelo detrás"
description: "Un blog con IA detrás debería decirlo. Este es el sistema que uso: un nivel visible en cada entrada y una ficha que desglosa, fase por fase, qué hizo una persona y qué hizo una máquina."
date: 2026-10-18 10:00:00 +0200
permalink: /blog/como-etiqueto-lo-que-escribo/
etiqueta: Transparencia
ia_nivel: 2
ia_humano_pct: 85
ia_nota: "Los datos técnicos y el criterio son míos; el esquema inicial salió de una conversación con un modelo y la redacción final está reescrita a mano."
ia_fases:
  - fase: "💡 Idea y perspectiva"
    quien: humano
    detalle: "Decisión personal, basada en cómo trabajo a diario con modelos."
  - fase: "🏗️ Estructura"
    quien: ia
    detalle: "Esquema de la escala propuesto en una conversación con el modelo."
  - fase: "✍️ Redacción y tono"
    quien: hibrido
    detalle: "Borrador inicial con IA; reescritura completa a mano."
  - fase: "💻 Código y ejemplos"
    quien: humano
    detalle: "Frontmatter, plantillas y build probados en el repositorio real."
  - fase: "🔍 Verificación"
    quien: humano
    detalle: "Cada afirmación sobre el funcionamiento del sitio comprobada contra el repo."
---

Escribo con modelos todos los días. Me ahorran horas en borradores, en código que no me apetece
teclear y en leer documentación que no tiene piedad. Lo que no quiero es que el lector tenga que
adivinar cuánto de lo que lee lo escribió una máquina.

La mayoría de blogs que usan IA esconder ese detalle, o lo esconden tan bien que da igual. La
alternativa no es confesar culpas: es dar información. Un artículo que un modelo redactó entero y
nadie verificó no vale lo mismo que uno escrito desde la experiencia y revisado línea a línea. Si
etiqueto, el lector decide. Si no etiqueto, decido yo por él, y eso es peor.

## La etiqueta, como la de un producto

Un envase no te dice si el contenido es bueno, pero te dice qué lleva. Con un texto pasa lo mismo:
saber que un modelo propuso la estructura ya te dice algo útil sobre lo que tienes delante, sin
quitarle mérito al resultado.

Así que cada entrada lleva dos cosas. Arriba, junto a la fecha, un **nivel** de un vistazo. Al pie,
una **ficha de autoría** que desglosa el proceso fase por fase: idea, estructura, código, redacción,
verificación.

## La escala

- **Nivel 1 — humano.** La IA no participó ni en la ideación ni en la redacción.
- **Nivel 2 — co-creado.** La IA ayudó con estructura, borradores o reescritura; el control
  editorial y la validación son míos, y el texto final está reescrito a mano.
- **Nivel 3 — asistencia puntual.** El artículo es mío de principio a fin; la IA corrigió gramática,
  buscó sinónimos o tradujo un fragmento.
- **Nivel 4 — supervisado.** Redactado por un modelo y validado por mí antes de publicar.

El Nivel 2 y el Nivel 3 se confunden a menudo, y no son lo mismo. La diferencia no es cuánta IA se
usó, sino **de quién es el texto**. En el Nivel 3 la IA es una herramienta de corrección. En el
Nivel 2 la estructura del artículo nació de una conversación con el modelo, aunque después reescriba
todo lo que se publica.

## Cómo está montado, sin nada mágico

El blog es Markdown servido por Jekyll en GitHub Pages. No hay base de datos, ni panel, ni servicio
de terceros: escribir es crear un fichero y hacer `git push`. La etiqueta son cuatro campos en el
frontmatter, y la tabla se genera desde ellos.

```yaml
---
layout: post
title: "Cómo etiqueto lo que escribo cuando hay un modelo detrás"
date: 2026-10-18 10:00:00 +0200
permalink: /blog/como-etiqueto-lo-que-escribo/
ia_nivel: 2
ia_humano_pct: 85
ia_fases:
  - fase: "💡 Idea y perspectiva"
    quien: humano
    detalle: "Decisión personal, basada en cómo trabajo a diario."
  - fase: "✍️ Redacción y tono"
    quien: hibrido
    detalle: "Borrador inicial con IA; reescritura completa a mano."
---
```

La plantilla recorre `ia_fases` y pinta la tabla; el nivel se convierte en una insignia de color con
su enlace a esta explicación. Como el dato vive en los metadatos y no en el cuerpo del texto, no
puede desincronizarse de la entrada: si alguien cambia la ficha, cambia el frontmatter, y el cambio
queda en el historial de git con fecha y autor.

## Lo que esto no resuelve

La etiqueta declara un proceso, no lo garantiza. Nadie audita que mi Nivel 1 sea realmente Nivel 1.
Es un compromiso público, y por eso funciona: si mañana publico aquí un texto generado entero y lo
etiqueto como Nivel 1, cualquiera puede señalarlo. La transparencia útil no es la que se demuestra
con un sello de calidad, sino la que se puede contradecir.
