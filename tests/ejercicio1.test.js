import { listarTareasPendientes } from '../src/ejercicio1.js';

const ejecutarPrueba = async () => {
    console.log("=== INICIANDO PRUEBA: EJERCICIO 1 ===");
    try {
        await listarTareasPendientes();
        console.log("\n✅ Prueba ejecutada sin bloqueos.");
    } catch (error) {
        console.error("\nFalla controlada en la prueba:", error.message);
    }
};

ejecutarPrueba();