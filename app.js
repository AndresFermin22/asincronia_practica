  import readline from 'readline';
// Aquí importaremos TODO desde el archivo barril
import { listarTareasPendientes } from './src/index.js';

/**
 * ============================================================================
 * DOCUMENTACIÓN DEL PROCESO: app.js (Menú Principal)
 * ============================================================================
 * Propósito: Proveer una interfaz interactiva en consola para ejecutar los ejercicios.
 * Mutabilidad e Inmutabilidad: 'const' para la interfaz de readline (inmutable).
 * Procesos y Ciclos: Se utiliza recursividad (llamar a mostrarMenu dentro de sí misma)
 * para simular un ciclo de ejecución continuo sin bloquear el hilo principal.
 * Condicionales: Estructura 'switch' para dirigir el flujo según la entrada del usuario.
 * ============================================================================
 */

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const mostrarMenu = () => {
    console.log('\n=======================================');
    console.log('   EVALUACIÓN DE SABERES - MENÚ PRINCIPAL');
    console.log('=======================================');
    console.log('1. Listar tareas pendientes por usuario');
    console.log('0. Salir');
    console.log('=======================================');
    
    rl.question('Elige una opción: ', async (opcion) => {
        // El switch evalúa la variable 'opcion'
        switch (opcion) {
            case '1':
                console.log('\n--- Ejecutando Ejercicio 1 ---');
                await listarTareasPendientes();
                mostrarMenu(); // Volvemos a mostrar el menú al terminar
                break;
            case '0':
                console.log('\nCerrando el programa. ¡Hasta pronto!');
                rl.close(); // Rompe el ciclo y cierra el programa
                break;
            default:
                console.log('\nOpción no válida. Intenta de nuevo.');
                mostrarMenu();
                break;
        }
    });
};

// Iniciar el programa
mostrarMenu();