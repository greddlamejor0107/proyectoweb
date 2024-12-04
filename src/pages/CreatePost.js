import React, { useState } from "react";
import { db } from "../firebaseConfig"; // Firebase Firestore
import { addDoc, collection } from "firebase/firestore";
import { auth } from "../firebaseConfig"; // Firebase Auth

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handlePostSubmit = async (e) => {
    e.preventDefault();
    if (auth.currentUser) {
      const postsCollection = collection(db, "posts");
      await addDoc(postsCollection, {
        title: title,
        content: content,
        user: auth.currentUser.email,  // Guardamos el correo del usuario como referencia
        createdAt: new Date()
      });
      alert("Publicación creada con éxito");
      setTitle(""); // Limpiar formulario
      setContent("");
    } else {
      alert("Por favor, inicia sesión para publicar.");
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.header}>Crear Publicación</h2>
      <form onSubmit={handlePostSubmit}>
        <input
          type="text"
          placeholder="Título"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={styles.input}
        />
        <textarea
          placeholder="Contenido"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          style={styles.textarea}
        ></textarea>
        <button type="submit" style={styles.button}>Publicar</button>
      </form>
    </div>
  );
};

const styles = {
  container: {
    padding: '20px',
    maxWidth: '800px',
    margin: '0 auto'
  },
  header: {
    textAlign: 'center',
    marginBottom: '20px'
  },
  input: {
    width: '100%',
    padding: '10px',
    marginBottom: '10px',
    borderRadius: '5px',
    border: '1px solid #ccc'
  },
  textarea: {
    width: '100%',
    height: '150px',
    padding: '10px',
    marginBottom: '10px',
    borderRadius: '5px',
    border: '1px solid #ccc'
  },
  button: {
    width: '100%',
    padding: '10px',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer'
  }
};

export default CreatePost;
