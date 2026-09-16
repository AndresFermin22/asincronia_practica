# Documentación: Menú Principal (app.js)

## Propósito
Proveer una interfaz interactiva en consola para ejecutar los ejercicios solicitados en la evaluación de saberes, permitiendo al usuario elegir qué funcionalidad disparar.

## Arquitectura y Ciclos
*   **Recursividad:** Se utiliza la técnica de recursividad (la función `mostrarMenu` se llama a sí misma al finalizar cada caso) para simular un ciclo de ejecución continuo (`while`), pero sin bloquear el hilo principal de Node.js.
*   **Condicionales:** Se implementa una estructura `switch` para dirigir el flujo lógico según la entrada capturada.

## Variables y Mutabilidad
*   Se utiliza `const` para declarar la interfaz de `readline` (`rl`), garantizando que la referencia a los canales de entrada y salida estándar del sistema (`process.stdin`, `process.stdout`) sea inmutable durante toda la ejecución.