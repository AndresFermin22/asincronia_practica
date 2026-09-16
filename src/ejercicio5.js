// Exportamos la función asíncrona para que pueda ser importada desde el archivo barril
export const obtenerUsuariosCompletos = async () => {
    // Iniciamos el bloque try para capturar cualquier error en las promesas y evitar que la app colapse
    try {
        // Imprimimos un aviso en consola para que el usuario sepa que el proceso inició
        console.log('\nDescargando y cruzando toda la base de datos (esto puede tardar un momento)...');

        // Usamos Promise.all con destructuring para lanzar las 5 peticiones HTTP de forma concurrente
        const [resUsers, resPosts, resComments, resAlbums, resPhotos] = await Promise.all([
            // Petición de usuarios (Soluciona: Obtener la entidad principal)
            fetch('https://jsonplaceholder.typicode.com/users'),
            // Petición de posts (Soluciona: Obtener las publicaciones para asociarlas luego)
            fetch('https://jsonplaceholder.typicode.com/posts'),
            // Petición de comentarios (Soluciona: Evitar hacer un fetch por cada post)
            fetch('https://jsonplaceholder.typicode.com/comments'),
            // Petición de álbumes (Soluciona: Obtener contenedores de fotos por usuario)
            fetch('https://jsonplaceholder.typicode.com/albums'),
            // Petición de fotos (Soluciona: Tener el nivel más profundo de la estructura multimedia)
            fetch('https://jsonplaceholder.typicode.com/photos')
        ]);

        // Validamos si ALGUNA de las 5 respuestas falló para detener la ejecución tempranamente
        if (!resUsers.ok || !resPosts.ok || !resComments.ok || !resAlbums.ok || !resPhotos.ok) {
            // Lanzamos un error intencional para que el bloque catch lo capture
            throw new Error('Error de conexión al descargar la base de datos completa.');
        }

        // Convertimos las respuestas a objetos JSON mediante await
        const users = await resUsers.json();
        const posts = await resPosts.json();
        const comments = await resComments.json();
        const albums = await resAlbums.json();
        const photos = await resPhotos.json();

        // Utilizamos map sobre users para recorrer cada usuario y retornar un NUEVO objeto enriquecido
        const usuariosEnriquecidos = users.map(usuario => {
            
            // Filtramos los posts que pertenezcan a este usuario específico comparando los IDs
            const postsDelUsuario = posts.filter(post => post.userId === usuario.id);
            
            // Usamos map sobre los posts filtrados para agregarles sus respectivos comentarios
            const postsConComentarios = postsDelUsuario.map(post => {
                // Filtramos los comentarios que tengan el mismo postId
                const comentariosDelPost = comments.filter(comment => comment.postId === post.id);
                // Retornamos un nuevo objeto usando spread (...) copiando el post original
                return { ...post, comentarios: comentariosDelPost };
            });

            // Filtramos los álbumes que pertenezcan a este usuario específico
            const albumesDelUsuario = albums.filter(album => album.userId === usuario.id);
            
            // Usamos map sobre los álbumes para agregarles sus respectivas fotos anidadas
            const albumesConFotos = albumesDelUsuario.map(album => {
                // Filtramos el array de fotos para sacar las que correspondan al albumId
                const fotosDelAlbum = photos.filter(photo => photo.albumId === album.id);
                // Retornamos el álbum inmutable sumando el nuevo arreglo de fotografías
                return { ...album, fotografías: fotosDelAlbum };
            });

            // Finalmente, retornamos el objeto de usuario copiando sus datos y adjuntando las nuevas estructuras
            return {
                ...usuario,
                posts: postsConComentarios,
                albumes: albumesConFotos
            };
        });

        // Mostramos el éxito de la operación calculando la longitud del arreglo final
        console.log(`\nProceso completado. Se estructuraron ${usuariosEnriquecidos.length} usuarios con toda su información.`);
        
        // Imprimimos el primer usuario formateado con JSON.stringify para visualizar la jerarquía anidada
        console.log('\nVista previa de la estructura del primer usuario (resumida):');
        console.log(JSON.stringify(usuariosEnriquecidos[0], null, 2));

    // Capturamos cualquier error de red o parseo JSON
    } catch (error) {
        // Mostramos el mensaje de error de forma controlada
        console.error('\nHubo un error en la construcción de los datos:', error.message);
    }
};