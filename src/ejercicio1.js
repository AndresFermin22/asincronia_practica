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
        console.error('\nHubo un error en la ejecución:', error.message);
    }
};