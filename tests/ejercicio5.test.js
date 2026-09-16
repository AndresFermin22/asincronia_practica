import { obtenerUsuariosCompletos } from '../src/ejercicio5.js';

const ejecutarPrueba = async () => {
    console.log("=== INICIANDO PRUEBA: EJERCICIO 5 ===");
    try {
        await obtenerUsuariosCompletos();
        console.log("\nPrueba ejecutada sin bloqueos.");
    } catch (error) {
        console.error("\nFalla controlada en la prueba:", error.message);
    }
};

ejecutarPrueba();