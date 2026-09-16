# Ejercicio 5: Generar Estructura de Usuarios Completa

## Propósito
Construir una estructura de datos compleja ("Mega Objeto") que consolide usuarios con sus posts (y los comentarios de estos) y sus álbumes (con sus fotografías), realizando una única descarga masiva de datos.

## Procesos y Complejidad
Se emplea un algoritmo filtrando en memoria mediante métodos funcionales puros (`map`, `filter`). Esto es sustancialmente más rápido y eficiente que realizar cientos de peticiones `fetch` individuales dentro de un ciclo, lo cual bloquearía la red.

## Variables y Mutabilidad
Se utilizan variables constantes (`const`) para almacenar las respuestas de la API y los arreglos generados. La estructuración final se realiza devolviendo objetos nuevos mediante el **Spread Operator** (`...`), garantizando el principio de inmutabilidad en todo el ciclo de transformación de datos.

## Evaluación y Pruebas
*   **Datos de pruebas:** Llamadas concurrentes a los 5 endpoints base de JSONPlaceholder (`/users`, `/posts`, `/comments`, `/albums`, `/photos`).
*   **Razón de elección:** Se requiere cruzar toda la base de datos relacional para armar la estructura completa.
*   **Procedimiento:** Seleccionar la opción 5 en el menú o ejecutar el script `tests/ejercicio5.test.js`.
*   **Resultados esperados:** Un arreglo final de 10 usuarios, donde cada objeto contiene las propiedades `posts` y `albumes` enriquecidas con sus respectivos datos anidados. El primer usuario se imprime en formato JSON para verificar la jerarquía.