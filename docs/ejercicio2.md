# Ejercicio 2: Búsqueda de Usuario y Álbumes Anidados

## Propósito
Solicitar un `username` por teclado, buscarlo en la API y listar sus datos junto con sus álbumes, anidando las fotografías correspondientes mediante estructuración de objetos.

## Funciones empleadas y Justificación
*   **`preguntar(rl, pregunta)`**: Función auxiliar que envuelve `rl.question` en una Promesa. 
    *   *Justificación:* Permite usar `await` para pausar el hilo hasta que el usuario escriba en consola, evitando que el código asíncrono avance descontroladamente.

## Variables y Mutabilidad
*   **`rl` (Object, const):** Interfaz de lectura recibida por parámetro.
*   **`usernameIngresado` (String, const):** Almacena la entrada del usuario.
*   **`usuarioEncontrado` (Object, const):** Resultado inmutable del método `.find()`.
*   **`albumesCompletos` (Array, const):** Nuevo arreglo generado inmutablemente con `.map()`.

## Procesos, Ciclos y Condicionales
*   **`find()`**: Localiza el primer usuario que coincida, ignorando mayúsculas.
*   **`filter()` y `map()`**: Para relacionar las fotos con su álbum correspondiente, generando un nuevo arreglo sin mutar el original.
*   **Spread Operator (`...album`)**: Copia inmutablemente las propiedades del álbum y le agrega el arreglo de fotos.
*   **Condicionales**: Uso de *Early Return* (`if (!usuarioEncontrado)`) para detener el flujo si el usuario no existe.

## Parámetros y Retornos
*   **Parámetros:** `rl` (Interfaz de Readline de Node.js).
*   **Retorno:** `Promise<void>`.

## Evaluación y Pruebas
*   **Datos de pruebas:** Username "Bret" (válido), "Admin" (inválido).
*   **Resultados esperados:** Datos de Bret seguidos de sus álbumes y un extracto de fotos. Para "Admin", un mensaje de búsqueda fallida.