import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebaseConfig"; // Importa la configuración de Firebase
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert("Inicio de sesión exitoso");
      navigate("/home"); // Redirige a la página principal después de iniciar sesión
    } catch (error) {
      alert("Error al iniciar sesión: " + error.message);
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.header}>Iniciar Sesión</h2>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={styles.input}
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={styles.input}
        />
        <button type="submit" style={styles.button}>Iniciar sesión</button>
      </form>
      <p style={styles.registerPrompt}>
        ¿No tienes cuenta? <a href="/register" style={styles.link}>Crear cuenta</a>
      </p>
    </div>
  );
};

// Estilos en línea
const styles = {
  container: {
    maxWidth: '400px',
    margin: '0 auto',
    padding: '20px',
    backgroundColor: '#f4f4f4',
    borderRadius: '10px'
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
  button: {
    width: '100%',
    padding: '10px',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer'
  },
  registerPrompt: {
    textAlign: 'center',
    marginTop: '10px'
  },
  link: {
    color: '#007BFF',
    textDecoration: 'none'
  }
};

export default Login;
