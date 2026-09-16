/**
 * DOCUMENTACIÓN DEL PROCESO: buscarUsuarioYAlbumes
 * Propósito: Solicitar un username, buscarlo en la API y listar sus álbumes 
 * anidando las fotografías correspondientes mediante estructuración de objetos.
 * 
 * Funciones empleadas y Justificación:
 * - preguntar(rl, pregunta): Función auxiliar que envuelve rl.question en una 
 *   Promesa. Justificación: Permite usar 'await' para pausar el hilo hasta 
 *   que el usuario escriba, evitando asincronía descontrolada.
 * 
 * Variables y Mutabilidad:
 * - rl (Object, const): Interfaz de lectura inmutable recibida por parámetro.
 * - usernameIngresado (String, const): Almacena la entrada del usuario.
 * - usuarioEncontrado (Object, const): Resultado inmutable del método .find().
 * - albumesCompletos (Array, const): Nuevo arreglo generado inmutablemente.
 * 
 * Procesos utilizados, Ciclos y Condicionales:
 * - find(): Para localizar el primer usuario que coincida (ignorando mayúsculas).
 * - filter() y map(): Para relacionar las fotos con su álbum correspondiente.
 * - Spread Operator (...album): Para copiar inmutablemente las propiedades del 
 *   álbum original y agregarle el nuevo arreglo de fotos.
 * - if (!usuarioEncontrado): Condicional para validación temprana (Early Return).
 * 
 * Parámetros y Retornos:
 * - Parámetros: 'rl' (Readline Interface)
 * - Retorno: Promise<void>

 * DOCUMENTO DE EVALUACIÓN (PRUEBAS)
 * - Datos de pruebas: Username "Bret" (válido), "Admin" (inválido).
 * - Razón de elección: Probar tanto el flujo ideal de datos anidados como la 
 *   validación de usuario inexistente.
 * - Procedimiento: Elegir opción 2, escribir el username y presionar Enter.
 * - Resultados esperados: Datos personales de Bret seguidos de la lista de sus
 *   álbumes y las fotos de cada uno.
 * - Errores controlados: try/catch envolviendo todo el proceso fetch.
 */

const preguntar = (rl, pregunta) => {
    return new Promise((resolve) => {
        rl.question(pregunta, (respuesta) => resolve(respuesta.trim()));
    });
};

export const buscarUsuarioYAlbumes = async (rl) => {
    try {
        // 1. Pedir dato por teclado (espera respuesta)
        const usernameIngresado = await preguntar(rl, 'Ingrese el username a buscar (ej. Bret, Antonette): ');

        console.log('\nBuscando información en la base de datos...');

        // 2. Traer todos los usuarios para aplicar métodos de arreglos
        const resUsers = await fetch('https://jsonplaceholder.typicode.com/users');
        if (!resUsers.ok) throw new Error('Error al conectar con el servidor de usuarios');
        const users = await resUsers.json();

        // 3. Buscar coincidencia exacta (pasando a minúsculas para evitar errores de tipeo)
        const usuarioEncontrado = users.find(u => u.username.toLowerCase() === usernameIngresado.toLowerCase());

        // Validación: Si no existe, cortamos la ejecución (Early Return)
        if (!usuarioEncontrado) {
            console.log(`\n¡Búsqueda fallida! No existe un usuario con el username: "${usernameIngresado}"`);
            return; 
        }

        // 4. Mostrar datos del usuario
        console.log(`\nUsuario encontrado: ${usuarioEncontrado.name} (Alias: ${usuarioEncontrado.username})`);
        console.log(`Email: ${usuarioEncontrado.email} | Tel: ${usuarioEncontrado.phone}`);
        console.log(`Cargando álbumes y fotografías...`);

        // 5. Peticiones concurrentes optimizadas para los recursos del usuario encontrado
        const [resAlbums, resPhotos] = await Promise.all([
            fetch(`https://jsonplaceholder.typicode.com/albums?userId=${usuarioEncontrado.id}`),
            fetch('https://jsonplaceholder.typicode.com/photos') // Traemos fotos generales
        ]);

        if (!resAlbums.ok || !resPhotos.ok) throw new Error('Error al obtener álbumes o fotos');

        const albums = await resAlbums.json();
        const photos = await resPhotos.json();

        // 6. Manipulación de objetos y arreglos (agregando las fotos al álbum correspondiente)
        const albumesCompletos = albums.map(album => {
            const fotosDelAlbum = photos.filter(photo => photo.albumId === album.id);
            // Uso del operador Spread (...) para inmutabilidad
            return {
                ...album,
                fotografias: fotosDelAlbum
            };
        });

        // 7. Salida organizada en consola
        console.log(`\n======================================================`);
        console.log(`   ÁLBUMES DE ${usuarioEncontrado.username.toUpperCase()}`);
        console.log(`======================================================`);
        
        albumesCompletos.forEach(album => {
            console.log(`\nÁLBUM: ${album.title} (ID: ${album.id})`);
            console.log(`   Contiene ${album.fotografias.length} fotografías:`);
            
            const fotosMuestra = album.fotografias.slice(0, 3); 
            fotosMuestra.forEach(foto => {
                console.log(`[Foto ID: ${foto.id}] - ${foto.title}`);
            });
            console.log(`     ... y ${album.fotografias.length - 3} fotos más.`);
        });

    } catch (error) {
        console.error('\nHubo un error en la ejecución:', error.message);
    }
};