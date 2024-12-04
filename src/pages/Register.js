import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebaseConfig"; // Importa la configuración de Firebase
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      alert("Cuenta creada con éxito");
      navigate("/login"); // Redirige al login después de crear la cuenta
    } catch (error) {
      alert("Error al crear cuenta: " + error.message);
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.header}>Crear Cuenta</h2>
      <form onSubmit={handleRegister}>
        <input
          type="text"
          placeholder="Nombre"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          style={styles.input}
        />
        <input
          type="text"
          placeholder="Apellido"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          style={styles.input}
        />
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
        <button type="submit" style={styles.button}>Registrarse</button>
      </form>
      <p style={styles.loginPrompt}>
        ¿Ya tienes cuenta? <a href="/login" style={styles.link}>Iniciar sesión</a>
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
  loginPrompt: {
    textAlign: 'center',
    marginTop: '10px'
  },
  link: {
    color: '#007BFF',
    textDecoration: 'none'
  }
};

export default Register;
