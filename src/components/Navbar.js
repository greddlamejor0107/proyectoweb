// src/components/Navbar.js
// src/components/Navbar.js
import React from "react";
import { Link } from "react-router-dom";
import { auth } from "../firebaseConfig";
import { signOut } from "firebase/auth";


const Navbar = () => {
  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        alert("Has cerrado sesión correctamente");
      })
      .catch((error) => {
        alert("Error al cerrar sesión: " + error.message);
      });
  };

  return (
    <div className="navbar">
      <nav>
        <ul>
          <li>
            <Link to="/home">Inicio</Link>
          </li>
          {!auth.currentUser ? (
            <>
              <li>
                <Link to="/register">Registrarse</Link>
              </li>
              <li>
                <Link to="/login">Iniciar sesión</Link>
              </li>
            </>
          ) : (
            <>
              <li>
                <button onClick={handleSignOut} className="signout-button">
                  Cerrar sesión
                </button>
              </li>
            </>
          )}
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;

