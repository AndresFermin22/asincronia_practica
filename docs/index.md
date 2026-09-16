# Documentación: Archivo Barril (src/index.js)

## Propósito
Actuar como un "Barrel File" para centralizar las exportaciones de todos los módulos (ejercicios) de la evaluación.

## Justificación Técnica
Cumple con el patrón de diseño de fachada y buenas prácticas de arquitectura de software. Permite al archivo principal (`app.js`) importar múltiples funciones asíncronas desde una única ruta, manteniendo las dependencias organizadas y el código limpio.

## Mutabilidad
No se declaran variables dentro de este archivo. Únicamente se manejan referencias inmutables (módulos ES6) para proteger la lógica de negocio de cada ejercicio.