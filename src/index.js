/**
 * ============================================================================
 * DOCUMENTACIÓN DEL PROCESO: ARCHIVO BARRIL (src/index.js)
 * ============================================================================
 * Propósito del archivo: Actuar como un "Barrel File" para centralizar las 
 * exportaciones de todos los ejercicios de la evaluación.
 * 
 * Procesos utilizados: Exportación e importación de módulos (ES Modules).
 * 
 * Justificación: Cumplir con buenas prácticas de arquitectura de software. 
 * Permite a app.js importar múltiples funciones desde una única ruta.
 * 
 * Mutabilidad e Inmutabilidad: No se declaran variables, únicamente se 
 * manejan referencias inmutables (módulos) para proteger la lógica.
 * ============================================================================
 */

// ZONA DE EXPORTACIONES
export { listarTareasPendientes } from './ejercicio1.js';