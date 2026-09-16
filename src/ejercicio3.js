// Función auxiliar para leer consola
const preguntar = (rl, pregunta) => {
    return new Promise((resolve) => {
        rl.question(pregunta, (respuesta) => resolve(respuesta.trim()));
    });
};

export const filtrarPostsYComentarios = async (rl) => {
    try {
        // 1. Pedir dato por teclado usando readline promisificado
        const terminoBusqueda = await preguntar(rl, 'Ingrese el nombre (título) o palabra clave del post a buscar: ');

        console.log('\nConsultando posts y comentarios en la base de datos...');

        // 2. Peticiones concurrentes (optimización con Promise.all)
        const [resPosts, resComments] = await Promise.all([
            fetch('https://jsonplaceholder.typicode.com/posts'),
            fetch('https://jsonplaceholder.typicode.com/comments')
        ]);

        // Validación de respuestas HTTP
        if (!resPosts.ok || !resComments.ok) {
            throw new Error('Error al obtener los datos de la API');
        }

        const posts = await resPosts.json();
        const comments = await resComments.json();

        // 3. Filtrar posts (usando minúsculas para ignorar mayúsculas/minúsculas)
        const postsFiltrados = posts.filter(post => 
            post.title.toLowerCase().includes(terminoBusqueda.toLowerCase())
        );

        // Early return si no hay coincidencias
        if (postsFiltrados.length === 0) {
            console.log(`\nNo se encontraron posts que contengan la palabra: "${terminoBusqueda}"`);
            return;
        }

        // 4. Agregar comentarios a cada post (inmutabilidad con map y spread)
        const postsConComentarios = postsFiltrados.map(post => {
            const comentariosDelPost = comments.filter(comment => comment.postId === post.id);
            return {
                ...post,
                comentarios: comentariosDelPost
            };
        });

        // 5. Salida organizada en consola
        console.log(`\n✅ Se encontraron ${postsConComentarios.length} posts para "${terminoBusqueda}":`);
        
        postsConComentarios.forEach(post => {
            console.log(`\nPOST ID: ${post.id} | Título: ${post.title.toUpperCase()}`);
            console.log(` Contiene ${post.comentarios.length} comentarios:`);
            
            post.comentarios.forEach(comentario => {
                console.log(` [De: ${comentario.email}] - ${comentario.name}`);
            });
        });

    } catch (error) {
        // Manejo de errores sin romper la ejecución
        console.error('\n Hubo un error en la ejecución:', error.message);
    }
};