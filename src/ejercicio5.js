/**
 * ============================================================================
 * DOCUMENTACIÓN DEL PROCESO: obtenerUsuariosCompletos
 * ============================================================================
 * Propósito: Construir una estructura de datos compleja ("Mega Objeto") que 
 * consolide usuarios con sus posts (y los comentarios de estos) y sus álbumes 
 * (con sus fotografías), realizando una única descarga masiva de datos.
 * 
 * Procesos y Complejidad: Se emplea un algoritmo de complejidad O(N*M) filtrando
 * en memoria, lo cual es mucho más rápido que hacer cientos de peticiones fetch
 * individuales dentro de un ciclo (lo cual bloquearía el servidor o la red).
 * ============================================================================
 * DOCUMENTO DE EVALUACIÓN (PRUEBAS)
 * ============================================================================
 * - Datos de pruebas: Llamadas a los 5 endpoints base de JSONPlaceholder.
 * - Razón de elección: Se requiere cruzar toda la base de datos relacional.
 * - Resultados esperados: Un arreglo de 10 usuarios, donde cada uno tiene 
 *   propiedades 'posts' y 'albumes' completamente enriquecidas.
 * ============================================================================
 */

// Exportamos la función asíncrona para que pueda ser importada desde el archivo barril
export const obtenerUsuariosCompletos = async () => {
    // Iniciamos el bloque try para capturar cualquier error en las promesas y evitar que la app colapse
    try {
        // Imprimimos un aviso en consola para que el usuario sepa que el proceso inició, ya que tomará unos segundos
        console.log('\nDescargando y cruzando toda la base de datos (esto puede tardar un momento)...');

        // Usamos Promise.all con destructuring de arreglos para lanzar las 5 peticiones HTTP de forma concurrente (al mismo tiempo)
        const [resUsers, resPosts, resComments, resAlbums, resPhotos] = await Promise.all([
            // Petición de la base de usuarios (Soluciona: Obtener la entidad principal)
            fetch('https://jsonplaceholder.typicode.com/users'),
            // Petición de todos los posts (Soluciona: Obtener las publicaciones para asociarlas luego)
            fetch('https://jsonplaceholder.typicode.com/posts'),
            // Petición de todos los comentarios (Soluciona: Evitar hacer un fetch por cada post individual)
            fetch('https://jsonplaceholder.typicode.com/comments'),
            // Petición de todos los álbumes (Soluciona: Obtener contenedores de fotos por usuario)
            fetch('https://jsonplaceholder.typicode.com/albums'),
            // Petición de todas las fotos (Soluciona: Tener el nivel más profundo de la estructura multimedia)
            fetch('https://jsonplaceholder.typicode.com/photos')
        ]);

        // Validamos si ALGUNA de las 5 respuestas falló (código HTTP distinto a 200-299) para detener la ejecución tempranamente
        if (!resUsers.ok || !resPosts.ok || !resComments.ok || !resAlbums.ok || !resPhotos.ok) {
            // Lanzamos un error intencional para que el bloque catch lo capture y muestre el problema
            throw new Error('Error de conexión al descargar la base de datos completa.');
        }

        // Convertimos el ReadableStream de usuarios a un objeto JavaScript (JSON) mediante await
        const users = await resUsers.json();
        // Convertimos los posts a JSON para poder manipularlos en memoria
        const posts = await resPosts.json();
        // Convertimos los comentarios a JSON para prepararlos para el filtrado
        const comments = await resComments.json();
        // Convertimos los álbumes a JSON asegurando que los datos estén listos
        const albums = await resAlbums.json();
        // Convertimos las miles de fotos a JSON en una sola operación
        const photos = await resPhotos.json();

        // Utilizamos map sobre users para recorrer cada usuario y retornar un NUEVO objeto enriquecido (garantizando inmutabilidad)
        const usuariosEnriquecidos = users.map(usuario => {
            
            // Filtramos los posts que pertenezcan a este usuario específico comparando los IDs
            const postsDelUsuario = posts.filter(post => post.userId === usuario.id);
            
            // Usamos map sobre los posts filtrados para agregarles sus respectivos comentarios
            const postsConComentarios = postsDelUsuario.map(post => {
                // Filtramos los comentarios que tengan el mismo postId que el post actual
                const comentariosDelPost = comments.filter(comment => comment.postId === post.id);
                // Retornamos un nuevo objeto usando spread (...) para copiar el post original y añadirle la propiedad 'comentarios'
                return { ...post, comentarios: comentariosDelPost };
            });

            // Filtramos los álbumes que pertenezcan a este usuario específico usando su userId
            const albumesDelUsuario = albums.filter(album => album.userId === usuario.id);
            
            // Usamos map sobre los álbumes para agregarles sus respectivas fotos anidadas
            const albumesConFotos = albumesDelUsuario.map(album => {
                // Filtramos el array masivo de fotos para sacar solo las que correspondan al albumId actual
                const fotosDelAlbum = photos.filter(photo => photo.albumId === album.id);
                // Retornamos el álbum inmutable sumando el nuevo arreglo de fotografías
                return { ...album, fotografías: fotosDelAlbum };
            });

            // Finalmente, retornamos el objeto de usuario íntegro copiando sus datos originales y adjuntando las dos nuevas estructuras
            return {
                ...usuario,
                posts: postsConComentarios,
                albumes: albumesConFotos
            };
        });

        // Mostramos el éxito de la operación calculando la longitud del arreglo final resultante
        console.log(`\nProceso completado. Se estructuraron ${usuariosEnriquecidos.length} usuarios con toda su información.`);
        
        // Imprimimos el primer usuario formateado con JSON.stringify (parámetros nulos y 2 espacios) para visualizar la jerarquía anidada sin desbordar la consola
        console.log('\nVista previa de la estructura del primer usuario (resumida):');
        console.log(JSON.stringify(usuariosEnriquecidos[0], null, 2));

    // Capturamos cualquier error de red o de parseo JSON que haya ocurrido en el bloque try
    } catch (error) {
        // Mostramos el mensaje de error de forma controlada sin interrumpir el ciclo del menú principal
        console.error('\nHubo un error en la construcción de los datos:', error.message);
    }
};