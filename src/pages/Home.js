import React, { useState, useEffect } from "react";
import { addDoc, collection, Timestamp, onSnapshot } from "firebase/firestore";
import { db, auth } from "../firebaseConfig"; // Importa Firestore y Auth
import { onAuthStateChanged } from "firebase/auth"; // Para escuchar el estado de autenticación

const Home = () => {
  const [newPost, setNewPost] = useState(""); // El contenido de la nueva publicación
  const [posts, setPosts] = useState([]); // Las publicaciones para mostrar
  const [user, setUser] = useState(null); // Usuario autenticado

  // Escuchar el estado de autenticación
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser); // Si el usuario está autenticado, actualizar el estado
      } else {
        setUser(null); // Si no hay usuario autenticado, establecer en null
      }
    });

    return () => unsubscribe(); // Limpiar la suscripción al cambiar de componente
  }, []);

  // Efecto para escuchar cambios en las publicaciones en tiempo real
  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "posts"), (querySnapshot) => {
      const postsData = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setPosts(postsData); // Actualizar el estado con las publicaciones
    });

    return () => unsubscribe(); // Detener la escucha cuando el componente se desmonte
  }, []);

  const handlePost = async (e) => {
    e.preventDefault();

    if (!newPost.trim()) {
      alert("El contenido de la publicación no puede estar vacío.");
      return;
    }

    if (user) {
      try {
        // Guardar la publicación en Firestore
        await addDoc(collection(db, "posts"), {
          content: newPost,
          createdAt: Timestamp.fromDate(new Date()), // Fecha y hora de la publicación
          userId: user.uid, // ID del usuario que publica
          email: user.email, // Correo electrónico del usuario que publica
        });
        setNewPost(""); // Limpiar el campo de entrada después de publicar
      } catch (error) {
        console.error("Error al agregar publicación: ", error.message);
      }
    } else {
      alert("Por favor, inicia sesión para publicar.");
    }
  };

  return (
    <div style={styles.homeContainer}>
      {/* Sección de crear publicación */}
      <div style={styles.createPostContainer}>
        <h2 style={styles.title}>Crea una publicación</h2>
        <form onSubmit={handlePost} style={styles.createPostForm}>
          <textarea
            style={styles.postInput}
            placeholder="Escribe algo..."
            value={newPost}
            onChange={(e) => setNewPost(e.target.value)}
          />
          <button type="submit" style={styles.publishButton}>
            Publicar
          </button>
        </form>
      </div>

      {/* Mostrar publicaciones */}
      <div style={styles.postsContainer}>
        <h2 style={styles.title}>Publicaciones recientes</h2>
        {posts.length === 0 ? (
          <p>No hay publicaciones todavía.</p>
        ) : (
          posts.map((post) => (
            <div key={post.id} style={styles.post}>
              <p>{post.content}</p>
              <small style={styles.timestamp}>
                Publicado por: {post.email} - {new Date(post.createdAt.seconds * 1000).toLocaleString()}
              </small>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

const styles = {
  homeContainer: {
    textAlign: 'center',
    padding: '20px',
  },
  createPostContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '30px',
  },
  createPostForm: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    maxWidth: '600px',
    margin: '20px 0',
  },
  postInput: {
    width: '100%',
    height: '100px',
    padding: '10px',
    fontSize: '16px',
    borderRadius: '5px',
    border: '1px solid #ddd',
    marginBottom: '10px',
    boxSizing: 'border-box',
  },
  publishButton: {
    width: '150px',
    padding: '10px',
    backgroundColor: '#007bff',
    color: 'white',
    fontSize: '16px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  publishButtonHover: {
    backgroundColor: '#0056b3',
  },
  postsContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '30px',
    width: '100%',
  },
  post: {
    backgroundColor: '#f8f9fa',
    padding: '20px',
    marginBottom: '20px',
    width: '100%',
    maxWidth: '600px',
    borderRadius: '8px',
    boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.1)',
  },
  timestamp: {
    fontSize: '14px',
    color: '#6c757d',
  },
  title: {
    fontFamily: 'Arial, sans-serif',
    color: '#333',
  },
};

export default Home;
