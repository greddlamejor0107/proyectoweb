import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { auth } from "./firebaseConfig"; // Importa el archivo de configuración de Firebase
import { signOut } from "firebase/auth";


// Páginas
import Register from "./pages/Register";
import Login from "./pages/Login";
import Home from "./pages/Home";
import CreatePost from "./pages/CreatePost";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(setUser);
    return () => unsubscribe();
  }, []);

  const handleSignOut = () => {
    signOut(auth).then(() => {
      alert("Has cerrado sesión correctamente");
    }).catch((error) => {
      alert("Error al cerrar sesión: " + error.message);
    });
  };

  return (
    <Router>
      <div style={styles.navbar}>
        <nav>
          <ul style={styles.navList}>
            <li style={styles.navItem}>
              <Link to="/home" style={styles.navLink}>Inicio</Link>
            </li>
            {!user ? (
              <>
                <li style={styles.navItem}>
                  <Link to="/register" style={styles.navLink}>Registrarse</Link>
                </li>
                <li style={styles.navItem}>
                  <Link to="/login" style={styles.navLink}>Iniciar sesión</Link>
                </li>
              </>
            ) : (
              <>
                <li style={styles.navItem}>
                  <button onClick={handleSignOut} style={styles.signOutButton}>Cerrar sesión</button>
                </li>
              </>
            )}
          </ul>
        </nav>
      </div>
      
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/create-post" element={<CreatePost />} />
      </Routes>
    </Router>
  );
}

// Estilos en línea
const styles = {
  navbar: {
    backgroundColor: '#333',
    padding: '10px',
    color: 'white'
  },
  navList: {
    display: 'flex',
    listStyleType: 'none',
    margin: 0,
    padding: 0
  },
  navItem: {
    marginRight: '20px'
  },
  navLink: {
    color: 'white',
    textDecoration: 'none',
    fontSize: '16px',
    padding: '10px 15px',
    borderRadius: '5px',
    transition: 'background-color 0.3s'
  },
  signOutButton: {
    backgroundColor: '#d9534f',
    color: 'white',
    border: 'none',
    cursor: 'pointer',
    padding: '10px 15px',
    borderRadius: '5px'
  }
};

export default App;
