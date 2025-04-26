import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SignIn.css";

function SignIn({ onSignIn }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Vérification des identifiants pour l'admin  
    if (email === "admin@example.com" && password === "admin") {
      const adminUser = { email: "admin@example.com", role: "admin" };

      // Sauvegarde de la session de l'admin
      sessionStorage.setItem("currentUser", JSON.stringify(adminUser));

      // Déclenche la connexion
      onSignIn(adminUser);

      // Redirection vers content
      navigate("/content");
      return;
    }

    // Récupérer la liste des utilisateurs enregistrés
    let users = JSON.parse(localStorage.getItem("users")) || [];

    // Vérifier si l'utilisateur existe avec les bons identifiants
    const user = users.find((u) => u.email === email && u.password === password);

    if (user) {
      // Sauvegarde de la session de l'utilisateur
      sessionStorage.setItem("currentUser", JSON.stringify(user));

      // Déclenche la connexion
      onSignIn(user);

      // Redirection vers content
      navigate("/content");
    } else {
      setError("Email ou mot de passe incorrect");
    }
  };

  return (
    <div className="sign-in">
      <h2>Connexion</h2>
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
        <button type="submit" className="btn-sign-in">Se connecter</button>
      </form>
      <p className="sign-up-link">
        Première fois ici ? <a href="/sign-up">Inscris-toi</a>
      </p>
    </div>
  );
}

export default SignIn;
