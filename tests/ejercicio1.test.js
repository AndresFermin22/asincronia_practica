import readline from 'readline';
import { buscarUsuarioYAlbumes } from '../src/ejercicio2.js';

// Instanciamos readline exclusivamente para la prueba aislada
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const ejecutarPrueba = async () => {
    console.log("=== INICIANDO PRUEBA: EJERCICIO 2 ===");
    try {
        await buscarUsuarioYAlbumes(rl);
        console.log("\nPrueba ejecutada sin bloqueos.");
    } catch (error) {
        console.error("\nFalla controlada en la prueba:", error.message);
    } finally {
        // Cerramos el readline al terminar para que el test no se quede colgado
        rl.close();
    }
};

ejecutarPrueba();