import readline from 'readline';
import { filtrarPostsYComentarios } from '../src/ejercicio3.js';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const ejecutarPrueba = async () => {
    console.log("=== INICIANDO PRUEBA: EJERCICIO 3 ===");
    try {
        await filtrarPostsYComentarios(rl);
        console.log("\nPrueba ejecutada sin bloqueos.");
    } catch (error) {
        console.error("\nFalla controlada en la prueba:", error.message);
    } finally {
        // Cerramos el readline al terminar
        rl.close();
    }
};

ejecutarPrueba();