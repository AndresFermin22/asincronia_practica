import { modificarEstructuraUsuarios } from '../src/ejercicio4.js';

const ejecutarPrueba = async () => {
    console.log("=== INICIANDO PRUEBA: EJERCICIO 4 ===");
    try {
        await modificarEstructuraUsuarios();
        console.log("\nPrueba ejecutada sin bloqueos.");
    } catch (error) {
        console.error("\nFalla controlada en la prueba:", error.message);
    }
};

ejecutarPrueba();