// Función auxiliar para convertir el callback de readline en una Promesa asíncrona
const preguntar = (rl, pregunta) => {
    return new Promise((resolve) => {
        rl.question(pregunta, (respuesta) => resolve(respuesta.trim()));
    });
};

export const buscarUsuarioYAlbumes = async (rl) => {
    try {
        // 1. Pedir dato por teclado usando readline promisificado para pausar la ejecución
        const usernameIngresado = await preguntar(rl, 'Ingrese el username a buscar (ej. Bret, Antonette): ');

        console.log('\nBuscando información en la base de datos...');

        // 2. Traer todos los usuarios para poder aplicar métodos de arreglos puros
        const resUsers = await fetch('https://jsonplaceholder.typicode.com/users');
        if (!resUsers.ok) throw new Error('Error al conectar con el servidor de usuarios');
        const users = await resUsers.json();

        // 3. Buscar coincidencia usando .find() y .toLowerCase() para evitar errores de tipeo de mayúsculas/minúsculas
        const usuarioEncontrado = users.find(u => u.username.toLowerCase() === usernameIngresado.toLowerCase());

        // Validación temprana (Early Return): Si no existe, cortamos la ejecución para no gastar recursos
        if (!usuarioEncontrado) {
            console.log(`\n¡Búsqueda fallida! No existe un usuario con el username: "${usernameIngresado}"`);
            return; 
        }

        // 4. Imprimir los datos principales del usuario encontrado
        console.log(`\nUsuario encontrado: ${usuarioEncontrado.name} (Alias: ${usuarioEncontrado.username})`);
        console.log(`Email: ${usuarioEncontrado.email} | Tel: ${usuarioEncontrado.phone}`);
        console.log(`Cargando álbumes y fotografías...`);

        // 5. Peticiones concurrentes (Promise.all) para optimizar la descarga de álbumes del usuario y fotos
        const [resAlbums, resPhotos] = await Promise.all([
            fetch(`https://jsonplaceholder.typicode.com/albums?userId=${usuarioEncontrado.id}`),
            fetch('https://jsonplaceholder.typicode.com/photos')
        ]);

        if (!resAlbums.ok || !resPhotos.ok) throw new Error('Error al obtener álbumes o fotos');

        const albums = await resAlbums.json();
        const photos = await resPhotos.json();

        // 6. Manipulación con map() para generar un nuevo arreglo inmutable que incluya las fotos
        const albumesCompletos = albums.map(album => {
            // Filtramos las fotos que corresponden al ID del álbum actual
            const fotosDelAlbum = photos.filter(photo => photo.albumId === album.id);
            // Retornamos un nuevo objeto usando Spread Operator (...) para preservar la inmutabilidad
            return {
                ...album,
                fotografias: fotosDelAlbum
            };
        });

        // 7. Recorrer y mostrar en consola la estructura anidada de forma limpia
        console.log(`\n======================================================`);
        console.log(`   ÁLBUMES DE ${usuarioEncontrado.username.toUpperCase()}`);
        console.log(`======================================================`);
        
        albumesCompletos.forEach(album => {
            console.log(`\nÁLBUM: ${album.title} (ID: ${album.id})`);
            console.log(`   Contiene ${album.fotografias.length} fotografías:`);
            
            // Limitamos a 3 fotos usando .slice() para no saturar la salida en terminal
            const fotosMuestra = album.fotografias.slice(0, 3); 
            fotosMuestra.forEach(foto => {
                console.log(` [Foto ID: ${foto.id}] - ${foto.title}`);
            });
            console.log(`     ... y ${album.fotografias.length - 3} fotos más.`);
        });

    } catch (error) {
        // Captura y control de errores para evitar que la aplicación de Node.js se caiga
        console.error('\nHubo un error en la ejecución:', error.message);
    }
};