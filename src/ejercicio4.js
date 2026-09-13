/**
 * DOCUMENTACIÓN DEL PROCESO: modificarEstructuraUsuarios

 * Propósito: Consultar todos los usuarios de la API y transformar la respuesta
 * para generar un nuevo arreglo que contenga únicamente el nombre y el teléfono.
 * 
 * Variables y Mutabilidad:
 * - resUsers (Object, const): Respuesta HTTP inmutable.
 * - users (Array, const): Arreglo original de usuarios parseado de JSON.
 * - usuariosModificados (Array, const): Nuevo arreglo resultante de la 
 *   transformación. Se usa const para garantizar la inmutabilidad de la referencia.
 * 
 * Procesos utilizados, Ciclos y Condicionales:
 * - fetch() y async/await: Para la obtención de datos asíncronos.
 * - map(): Ciclo funcional que itera sobre el arreglo original y retorna un 
 *   nuevo arreglo modificado, cumpliendo con el principio de inmutabilidad.
 * - Desestructuración ({ name, phone }): Operador moderno utilizado en los 
 *   parámetros del map para extraer solo las propiedades necesarias del objeto.
 * - if (!resUsers.ok): Condicional de validación para el estado HTTP.
 * 
 * Parámetros y Retornos:
 * - Parámetros: Ninguno.
 * - Retorno: Promise<void>
 * 
 *  * DOCUMENTO DE EVALUACIÓN (PRUEBAS)
 * - Datos de pruebas: Petición GET al endpoint /users.
 * - Razón de elección: Se requiere el listado completo para transformar la data.
 * - Procedimiento: Seleccionar la opción 4 en el menú interactivo.
 * - Resultados esperados: Un nuevo arreglo de objetos impreso en consola, donde 
 *   cada objeto solo tiene las claves 'nombre' y 'telefono'.
 * - Errores controlados: Bloque try/catch para manejar excepciones de red.
 * 
 */

export const modificarEstructuraUsuarios = async () => {
    try {
        console.log('\nObteniendo y transformando datos de usuarios...');

        // 1. Petición a la API
        const resUsers = await fetch('https://jsonplaceholder.typicode.com/users');
        
        if (!resUsers.ok) {
            throw new Error('Error al conectar con el servidor de usuarios');
        }

        const users = await resUsers.json();

        // 2. Modificar la respuesta usando map y destructuración
        const usuariosModificados = users.map(({ name, phone }) => {
            return {
                nombre: name,
                telefono: phone
            };
        });

        // 3. Salida de resultados
        console.log(`\nTransformación exitosa. Se generó un nuevo arreglo con ${usuariosModificados.length} registros:`);
        console.log(`======================================================`);
        
        console.table(usuariosModificados);

    } catch (error) {
        console.error('\nHubo un error en la ejecución:', error.message);
    }
};