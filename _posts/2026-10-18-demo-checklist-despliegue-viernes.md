---
layout: post
title: "La checklist que salvó un despliegue de viernes"
description: "Un despliegue de viernes por la tarde dejó de dar miedo cuando dejamos de fiarnos de la memoria y empezamos a fiarnos de una lista. Esta es la que corre antes de cada release."
date: 2026-10-18 12:30:00 +0200
permalink: /blog/demo-checklist-despliegue-viernes/
etiqueta: Demo
noindex: true
ia_nivel: 3
ia_humano_pct: 96
ia_nota: "Texto íntegramente mío. La IA solo pasó el corrector gramatical y me sugirió dos sinónimos que no usé."
ia_fases:
  - fase: "💡 Idea y perspectiva"
    quien: humano
    detalle: "Sale de una revisión post-incidente del equipo."
  - fase: "✍️ Redacción y tono"
    quien: humano
    detalle: "Escrito de principio a fin por mí."
  - fase: "🔤 Corrección"
    quien: ia
    detalle: "Gramática y sinónimos puntuales; ninguna frase reescrita por el modelo."
---

<div class="nota">
  <p><b>Entrada de demostración.</b> Está publicada para ver cómo queda el blog con contenido real:
  tabla, código, listas y cita. Se borra cuando ya no haga falta. Lleva <code>noindex</code> y no
  aparece en el <code>sitemap</code>.</p>
</div>

Los despliegues de viernes tienen mala fama por una razón que casi nunca se dice en voz alta: no
falla el código, falla la memoria de quien despliega. A las seis de la tarde, con prisa por cerrar,
nadie recuerda si el `feature flag` está apagado, si la migración es reversible o si el backup de
las cuatro es el bueno.

Así que dejamos de confiar en que alguien se acordara y escribimos la lista. No es una lista de
deseos: cada punto es una comprobación que devuelve `sí` o `no`, y un `no` detiene el despliegue sin
discusión.

## La lista, en orden

1. **El cambio está detrás de un flag** y el flag está apagado en producción.
2. **La migración tiene `down`** y se ha probado en el entorno de staging de esta semana, no del mes
   pasado.
3. **El SLO tiene presupuesto** para el error que vamos a introducir. Si el presupuesto del mes ya
   está gastado, no se despliega: se arregla primero la estabilidad.
4. **El rollback está ensayado** al menos una vez, y sabemos cuánto tarda (no «debería ser rápido»).
5. **Alguien mira el dashboard** durante los veinte minutos siguientes, con nombre y apellidos.

## Por qué el punto 3 es el que más discusiones ahorra

El presupuesto de error convierte una discusión de opiniones en una resta. Antes de la lista,
decidir si un despliegue «urgía» dependía de quién hablaba más alto en el canal. Ahora es un número:

| Situación | Presupuesto | Decisión |
|---|---|---|
| Mes tranquilo, sin incidentes | 100 % disponible | Se despliega |
| Un incidente Sev-2 ya consumido | ~35 % | Se despliega con vigilancia |
| Dos incidentes y un Sev-1 | 0 % | Se congela todo hasta cerrar la causa |

Nadie discute una tabla. Y cuando alguien quiere saltársela, la conversación ya no es «creo que
podemos», es «¿qué vas a quitar de la tabla y por qué?», que es una pregunta mucho más incómoda de
responder.

## El chequeo, automatizado

La lista vive en el repositorio y corre sola antes de cada release. Lo importante no es el script:
es que si falla, el despliegue no sigue.

```python
def listo_para_desplegar(slo, flags, migracion):
    """Devuelve (bool, motivos). Un solo 'no' bloquea el release."""
    motivos = []

    if slo["presupuesto_restante"] <= 0:
        motivos.append("sin presupuesto de error: se congela el release")

    if not flags["apagados_en_produccion"]:
        motivos.append("hay flags activos: el cambio no es reversible al instante")

    if not migracion["tiene_down"] or not migracion["probada_esta_semana"]:
        motivos.append("migración sin 'down' probado esta semana")

    return (len(motivos) == 0, motivos)
```

Cuarenta líneas y un `if`. No hace falta una plataforma: hace falta que el `if` esté en el camino
crítico y no en un wiki que nadie abre.

> Una checklist no existe para que la gente se acuerde de las cosas. Existe para que no pueda
> fingir que se acordó.

## Lo que la lista no arregla

No arregla el código malo, ni la falta de tests, ni que el equipo vaya con prisa porque el backlog
está mal priorizado. Lo que hace es que el error se cometa con los ojos abiertos y quede en el
registro: quién desplegó, a qué hora y con qué comprobaciones en verde. Cuando algo se tuerce, la
revisión empieza por datos y no por recuerdos.

---

*Este texto es una demostración del formato del blog: tabla, código con resaltado, cita y lista
numerada. El contenido es inventado para la prueba.*
