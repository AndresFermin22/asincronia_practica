# Ejercicio 1: Listar Tareas Pendientes

## Propósito y Variables
*   **Propósito:** Listar las tareas con estado `completed: false` agrupadas por usuario.
*   **urlUsers, urlTodos (const):** URLs de los endpoints (Inmutables).
*   **resUsers, resTodos (const):** Respuesta HTTP de fetch.
*   **users, todos (const):** Datos parseados en formato JSON.

## Validaciones y Procesos
*   **Validación:** `if (!resUsers.ok || !resTodos.ok)` verifica el código HTTP.
*   **Asincronía:** Uso de `fetch()` y `async/await` mediante `Promise.all` para evitar cuellos de botella.
*   **Ciclos:** `forEach()` para iterar usuarios y `filter()` para extraer inmutablemente las tareas pendientes.
*   **Retorno:** Función tipo `Promise<void>`, imprime resultados en consola.

## Documento de Evaluación (Pruebas)
*   **Datos y Procedimiento:** Peticiones GET a `/users` y `/todos`. Se ejecuta desde la opción 1 del menú o desde el archivo `tests/ejercicio1.test.js`.
*   **Resultados Esperados:** Lista en consola de usuarios seguidos de sus tareas pendientes.
*   **Errores Controlados:** Bloque `try/catch` captura fallos de red sin romper la aplicación.