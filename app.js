import readline from 'readline';
import { listarTareasPendientes, buscarUsuarioYAlbumes, filtrarPostsYComentarios, modificarEstructuraUsuarios, obtenerUsuariosCompletos } from './src/index.js';

// Creamos la interfaz de lectura inmutable (const) para capturar datos por teclado
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Función para simular un ciclo de ejecución continuo mediante recursividad
const mostrarMenu = () => {
    console.log('\n=======================================');
    console.log('   EVALUACIÓN DE SABERES - MENÚ PRINCIPAL');
    console.log('=======================================');
    console.log('1. Listar tareas pendientes por usuario');
    console.log('2. Buscar usuario, álbumes y fotos');
    console.log('3. Buscar posts y agregar comentarios'); 
    console.log('4. Modificar estructura de usuarios (Nombre y Teléfono)');
    console.log('5. Generar y estructurar usuarios completos (Posts, Comments, Albums, Photos)');
    console.log('0. Salir');
    console.log('=======================================');
    
    // Solicitamos la opción sin bloquear el hilo principal usando asincronía
    rl.question('Elige una opción: ', async (opcion) => {
        // Estructura condicional para dirigir el flujo según la entrada
        switch (opcion) {
            case '1':
                console.log('\n--- Ejecutando Ejercicio 1 ---');
                await listarTareasPendientes();
                mostrarMenu(); // Llamada recursiva para volver al menú
                break;
            case '2': 
                console.log('\n--- Ejecutando Ejercicio 2 ---');
                await buscarUsuarioYAlbumes(rl); 
                mostrarMenu();
                break;
            case '3':
                console.log('\n--- Ejecutando Ejercicio 3 ---');
                await filtrarPostsYComentarios(rl);
                mostrarMenu();
                break;
            case '4':
                console.log('\n--- Ejecutando Ejercicio 4 ---');
                await modificarEstructuraUsuarios();
                mostrarMenu();
                break;
            case '5':
                console.log('\n--- Ejecutando Ejercicio 5 ---');
                await obtenerUsuariosCompletos();
                mostrarMenu();
                break;
            case '0':
                console.log('\nCerrando el programa. ¡Hasta pronto!');
                rl.close(); // Cerramos la interfaz para finalizar el proceso
                break;
            default:
                console.log('\nOpción no válida. Intenta de nuevo.');
                mostrarMenu();
                break;
        }
    });
};

// Invocación inicial para arrancar la aplicación
mostrarMenu();