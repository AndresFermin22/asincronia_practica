# Ejercicio 4: Modificar Estructura de Usuarios

## Propósito
Consultar todos los usuarios de la API y transformar la respuesta para generar un nuevo arreglo que contenga únicamente el nombre y el teléfono.

## Variables y Mutabilidad
*   **`resUsers` (Object, const):** Respuesta HTTP inmutable.
*   **`users` (Array, const):** Arreglo original de usuarios parseado de JSON.
*   **`usuariosModificados` (Array, const):** Nuevo arreglo resultante de la transformación. Se usa `const` para garantizar la inmutabilidad de la referencia.

## Procesos, Ciclos y Condicionales
*   **`fetch()` y `async/await`:** Para la obtención de datos asíncronos.
*   **`map()`:** Ciclo funcional que itera sobre el arreglo original y retorna un nuevo arreglo modificado, cumpliendo con el principio de inmutabilidad.
*   **Desestructuración (`{ name, phone }`):** Operador moderno utilizado en los parámetros del map para extraer solo las propiedades necesarias del objeto.
*   **`if (!resUsers.ok)`:** Condicional de validación para el estado HTTP.

## Parámetros y Retornos
*   **Parámetros:** Ninguno.
*   **Retorno:** `Promise<void>`.

## Documento de Evaluación (Pruebas)
*   **Datos de pruebas:** Petición GET al endpoint `/users`.
*   **Razón de elección:** Se requiere el listado completo para transformar la data.
*   **Procedimiento:** Seleccionar la opción 4 en el menú interactivo o ejecutar `tests/ejercicio4.test.js`.
*   **Resultados esperados:** Un nuevo arreglo de objetos impreso en consola (usando `console.table`), donde cada objeto solo tiene las claves `nombre` y `telefono`.
*   **Errores controlados:** Bloque `try/catch` para manejar excepciones de red.