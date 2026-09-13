import readline from 'readline';
import { listarTareasPendientes, buscarUsuarioYAlbumes } from './src/index.js';
import { listarTareasPendientes, buscarUsuarioYAlbumes, filtrarPostsYComentarios } from './src/index.js';
import { listarTareasPendientes, buscarUsuarioYAlbumes, filtrarPostsYComentarios,  modificarEstructuraUsuarios } from './src/index.js';
import { listarTareasPendientes,  buscarUsuarioYAlbumes, filtrarPostsYComentarios, modificarEstructuraUsuarios,obtenerUsuariosCompletos  } from './src/index.js';
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
 */ 5

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

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
    
    rl.question('Elige una opción: ', async (opcion) => {
        switch (opcion) {
            case '1':
                console.log('\n--- Ejecutando Ejercicio 1 ---');
                await listarTareasPendientes();
                mostrarMenu();
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
                rl.close();
                break;
            default:
                console.log('\nOpción no válida. Intenta de nuevo.');
                mostrarMenu();
                break;
        }
    });
};

mostrarMenu();