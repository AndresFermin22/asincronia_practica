export const modificarEstructuraUsuarios = async () => {
    try {
        console.log('\nObteniendo y transformando datos de usuarios...');

        // 1. Petición a la API
        const resUsers = await fetch('https://jsonplaceholder.typicode.com/users');
        
        // Condicional de validación para el estado HTTP
        if (!resUsers.ok) {
            throw new Error('Error al conectar con el servidor de usuarios');
        }

        const users = await resUsers.json();

        // 2. Modificar la respuesta usando map y destructuración
        // Se extrae directamente name y phone cumpliendo la inmutabilidad
        const usuariosModificados = users.map(({ name, phone }) => {
            return {
                nombre: name,
                telefono: phone
            };
        });

        // 3. Salida de resultados en formato tabla
        console.log(`\nTransformación exitosa. Se generó un nuevo arreglo con ${usuariosModificados.length} registros:`);
        console.log(`======================================================`);
        
        console.table(usuariosModificados);

    } catch (error) {
        // Bloque catch para manejar excepciones de red
        console.error('\nHubo un error en la ejecución:', error.message);
    }
};