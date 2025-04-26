import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SignUp.css";

function SignUp({ onSignIn }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Récupérer la liste des utilisateurs enregistrés
    let users = JSON.parse(localStorage.getItem("users")) || [];

    // Vérifier si l'utilisateur existe déjà
    if (users.some((u) => u.email === email)) {
      setError("Cet email est déjà utilisé.");
      return;
    }

    // Ajouter le nouvel utilisateur
    const newUser = { email, password, role: "user" };
    users.push(newUser);

    // Sauvegarder la nouvelle liste des utilisateurs
    localStorage.setItem("users", JSON.stringify(users));

    // Déclencher la connexion
    onSignIn(newUser);

    // Rediriger vers la page de connexion
    navigate("/content");
  };

  return (
    <div className="sign-up">
      <h2>Inscription</h2>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Mot de passe</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn-sign-up">S'inscrire</button>
      </form>
    </div>
  );
}

export default SignUp;
