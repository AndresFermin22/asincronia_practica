/**
 * DOCUMENTACIÓN DEL PROCESO: filtrarPostsYComentarios
 * Propósito: Solicitar una palabra clave por teclado, filtrar los posts cuyo 
 * título ('title') contenga dicha palabra y anexar a cada post sus comentarios.
 * 
 * Funciones empleadas y Justificación:
 * - preguntar(rl, pregunta): Promisifica rl.question para pausar la ejecución.
 * 
 * Variables y Mutabilidad:
 * - terminoBusqueda (String, const): Palabra ingresada por el usuario.
 * - resPosts, resComments (Object, const): Respuestas HTTP (inmutables).
 * - postsFiltrados (Array, const): Arreglo filtrado inmutable.
 * - postsConComentarios (Array, const): Nuevo arreglo enriquecido.
 * 
 * Procesos utilizados, Ciclos y Condicionales:
 * - fetch(), Promise.all(), async/await: Para asincronía eficiente.
 * - filter(): Para encontrar posts por título y asociar comentarios por postId.
 * - map(): Para transformar el arreglo de posts agregando los comentarios anidados.
 * - includes(): Para flexibilizar la búsqueda del título (simula un operador LIKE).
 * - Spread Operator (...post): Para inmutabilidad al crear el nuevo objeto.
 * 
 * Parámetros y Retornos:
 * - Parámetros: 'rl' (Readline Interface)
 * - Retorno: Promise<void>
 * 
 * 
 * DOCUMENTO DE EVALUACIÓN (PRUEBAS)
 *  - Datos de pruebas: Término "sunt" (existe en varios títulos), "xyz123" (no existe).
 * - Razón de elección: "sunt" probará múltiples resultados anidados; "xyz123" 
 *   probará la validación de resultados vacíos.
 * - Procedimiento: Seleccionar opción 3, ingresar término, presionar Enter.
 * - Resultados esperados: Lista de posts filtrados, cada uno con un sub-arreglo
 *   de sus respectivos comentarios.
 * - Errores controlados: try/catch capturando posibles caídas del servidor.

 */


const preguntar = (rl, pregunta) => {
    return new Promise((resolve) => {
        rl.question(pregunta, (respuesta) => resolve(respuesta.trim()));
    });
};

export const filtrarPostsYComentarios = async (rl) => {
    try {
        // 1. Pedir dato por teclado
        const terminoBusqueda = await preguntar(rl, 'Ingrese el nombre (título) o palabra clave del post a buscar: ');

        console.log('\nConsultando posts y comentarios en la base de datos...');

        // 2. Peticiones concurrentes
        const [resPosts, resComments] = await Promise.all([
            fetch('https://jsonplaceholder.typicode.com/posts'),
            fetch('https://jsonplaceholder.typicode.com/comments')
        ]);

        if (!resPosts.ok || !resComments.ok) {
            throw new Error('Error al obtener los datos de la API');
        }

        const posts = await resPosts.json();
        const comments = await resComments.json();

        // 3. Filtrar posts (usando minúsculas para ignorar mayúsculas/minúsculas)
        const postsFiltrados = posts.filter(post => 
            post.title.toLowerCase().includes(terminoBusqueda.toLowerCase())
        );

        if (postsFiltrados.length === 0) {
            console.log(`\nNo se encontraron posts que contengan la palabra: "${terminoBusqueda}"`);
            return;
        }

        // 4. Agregar comentarios a cada post
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
        console.error('\n Hubo un error en la ejecución:', error.message);
    }
};