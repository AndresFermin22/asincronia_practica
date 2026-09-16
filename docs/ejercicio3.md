# Ejercicio 3: Filtrar Posts y Anexar Comentarios

## Propósito
Solicitar una palabra clave por teclado, filtrar los posts cuyo título (`title`) contenga dicha palabra y anexar a cada post sus comentarios correspondientes.

## Funciones empleadas y Justificación
*   **`preguntar(rl, pregunta)`**: Promisifica `rl.question` para pausar la ejecución de la consola hasta que el usuario escriba su respuesta.

## Variables y Mutabilidad
*   **`terminoBusqueda` (String, const):** Palabra clave ingresada por el usuario.
*   **`resPosts`, `resComments` (Object, const):** Respuestas HTTP (inmutables).
*   **`postsFiltrados` (Array, const):** Arreglo filtrado inmutable.
*   **`postsConComentarios` (Array, const):** Nuevo arreglo enriquecido con `.map()`.

## Procesos, Ciclos y Condicionales
*   **`fetch()`, `Promise.all()`, `async/await`**: Para asincronía eficiente, realizando descargas concurrentes.
*   **`filter()`**: Para encontrar posts por título y asociar comentarios por `postId`.
*   **`map()`**: Para transformar el arreglo de posts agregando los comentarios anidados inmutablemente.
*   **`includes()`**: Para flexibilizar la búsqueda del título (simula un operador `LIKE` de SQL).
*   **Spread Operator (`...post`)**: Para inmutabilidad al crear el nuevo objeto.

## Parámetros y Retornos
*   **Parámetros:** `rl` (Readline Interface).
*   **Retorno:** `Promise<void>`.

## Documento de Evaluación (Pruebas)
*   **Datos de pruebas:** Término "sunt" (existe en varios títulos), "xyz123" (no existe).
*   **Razón de elección:** "sunt" probará múltiples resultados anidados; "xyz123" probará la validación de resultados vacíos.
*   **Procedimiento:** Ejecutar la opción 3 del menú o el archivo `tests/ejercicio3.test.js`.
*   **Resultados esperados:** Lista de posts filtrados, cada uno con un sub-arreglo de sus respectivos comentarios.
*   **Errores controlados:** Bloque `try/catch` capturando posibles caídas del servidor.