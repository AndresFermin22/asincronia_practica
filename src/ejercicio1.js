/**
 * ============================================================================
 * DOCUMENTACIÓN DEL PROCESO: listarTareasPendientes
 * ============================================================================
 * Propósito: Listar las tareas con estado "completed: false" agrupadas por usuario.
 * 
 * Variables y Tipo de Datos:
 * - urlUsers, urlTodos (String, const): URLs de los endpoints. (Inmutables)
 * - resUsers, resTodos (Object, const): Respuesta HTTP de fetch. (Inmutables)
 * - users, todos (Array, const): Datos parseados en formato JSON. (Inmutables)
 * 
 * Validaciones aplicadas:
 * - if (!resUsers.ok || !resTodos.ok): Verifica que el código HTTP sea 200-299.
 * 
 * Procesos utilizados, Ciclos y Condicionales:
 * - fetch() y async/await: Para asincronía (promesas) sin anidar .then().
 * - forEach() y filter(): Ciclos funcionales modernos para recorrer usuarios y 
 *   filtrar las tareas correspondientes que sean falsas en la propiedad 'completed'.
 * 
 * Parámetros y Retornos:
 * - Parámetros: Ninguno.
 * - Retorno: Void (Promise<void>), solo imprime en consola.
 * ============================================================================
 * DOCUMENTO DE EVALUACIÓN (PRUEBAS)
 * ============================================================================
 * - Datos de pruebas: Peticiones GET a /users y /todos de JSONPlaceholder.
 * - Razón de elección: Son los datos estándar requeridos para esta evaluación.
 * - Procedimiento: Seleccionar opción 1 en el menú interactivo.
 * - Resultados esperados: Lista en consola de nombres de usuarios seguidos de 
 *   los títulos de sus tareas pendientes (false).
 * - Errores controlados: try/catch captura fallos de red (ej. sin internet) o 
 *   caídas del servidor, notificando al usuario sin romper la aplicación.
 * ============================================================================
 */

export const listarTareasPendientes = async () => {
    const urlUsers = 'https://jsonplaceholder.typicode.com/users';
    const urlTodos = 'https://jsonplaceholder.typicode.com/todos';

    try {
        // Peticiones asíncronas concurrentes (mejora el rendimiento)
        const [resUsers, resTodos] = await Promise.all([
            fetch(urlUsers),
            fetch(urlTodos)
        ]);

        // Validación de respuestas
        if (!resUsers.ok || !resTodos.ok) {
            throw new Error('Error al obtener los datos de la API');
        }

        const users = await resUsers.json();
        const todos = await resTodos.json();

        // Ciclo principal para procesar los datos
        users.forEach(user => {
            console.log(`\nUsuario: ${user.name}`);
            
            // Filtramos usando programación funcional e inmutabilidad
            const tareasPendientes = todos.filter(todo => todo.userId === user.id && !todo.completed);
            
            if (tareasPendientes.length > 0) {
                tareasPendientes.forEach(tarea => {
                    console.log(`   [ ] ${tarea.title}`);
                });
            } else {
                console.log(`   ¡No tiene tareas pendientes!`);
            }
        });

    } catch (error) {
        // Error controlado sin romper la ejecución
        console.error('\n❌ Hubo un error en la ejecución:', error.message);
    }
};