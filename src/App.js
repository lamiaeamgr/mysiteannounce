import React, { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Content from "./Content";
import AddAnnonce from "./AddAnnonce";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import Header from "./Header";
import Footer from "./Footer";
import { Navigate } from "react-router-dom";
import "./i18n";
import Dashboard from "./Dashboard";
import { useSelector } from "react-redux";


function App() {
  
  const [annonces, setAnnonces] = useState([]);
  const [user, setUser] = useState(null);
  const theme = useSelector((state) => state.theme.theme);
  const navigate = useNavigate();

  // Charger l'utilisateur connecté au démarrage depuis sessionStorage
  useEffect(() => {
    const savedUser = sessionStorage.getItem("currentUser");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  // Appliquer le thème clair/sombre
  useEffect(() => {
    document.body.classList.toggle("dark-mode", theme === "dark");
  }, [theme]);

  // Fonction de connexion
  const handleSignIn = (userData) => {
    setUser(userData);
    sessionStorage.setItem("currentUser", JSON.stringify(userData));
    navigate("/content");
  };

  // Fonction de déconnexion
  const handleSignOut = () => {
    setUser(null);
    sessionStorage.removeItem("currentUser");
    navigate("/signin");
  };

  // Fonction pour supprimer une annonce
  const handleDelete = (id, index) => {
    console.log("Tentative de suppression pour l'ID:", id, "et index:", index);  // Debugger les ID et index

    // Mettre à jour les annonces en supprimant l'annonce correspondante
    setAnnonces((prevAnnonces) => {
      const updatedAnnonces = prevAnnonces.map((categorie) => {
        console.log("Catégorie avant modification:", categorie);  // Log de la catégorie avant la modification
        if (categorie.id === id) {
          const updatedImages = categorie.images.filter((_, idx) => idx !== index);
          const updatedTitres = categorie.titresAnnonces.filter((_, idx) => idx !== index);
          const updatedDescriptions = categorie.description 
            ? categorie.description.filter((_, idx) => idx !== index)  // Assure-toi que description est un tableau
            : [];
          
          console.log("Catégorie après modification:", { ...categorie, images: updatedImages, titresAnnonces: updatedTitres, description: updatedDescriptions });  // Log de la catégorie après modification
          
          return { 
            ...categorie, 
            images: updatedImages, 
            titresAnnonces: updatedTitres, 
            description: updatedDescriptions 
          };
        }
        return categorie;  // Si l'ID ne correspond pas, retourner la catégorie inchangée
      }).filter((categorie) => categorie.images.length > 0 || categorie.titresAnnonces.length > 0 || categorie.description.length > 0);  // Si la catégorie ne contient plus rien, la supprimer

      console.log("Annonces après suppression:", updatedAnnonces);  // Log des annonces après la suppression
      return updatedAnnonces;
    });
  };

  // Vérifier l'accès à la page d'ajout d'annonce
  const ProtectedAddAnnonce = () => {
    if (!user) {
      return <Navigate to="/signin" />;
    }
    return <AddAnnonce setAnnonces={setAnnonces} user={user} />;
  };

  return (
    
      <div className={`app-container ${theme}`}>
        <Header user={user} onSignOut={handleSignOut} />
        <Routes>
          <Route
            path="/"
            element={<Content annonces={annonces} theme={theme} user={user} onDelete={handleDelete} />}
          />
          <Route
            path="/content"
            element={<Content annonces={annonces} theme={theme} user={user} onDelete={handleDelete} />}
          />
          <Route path="/add-annonce" element={<ProtectedAddAnnonce />} />
          <Route path="/signin" element={<SignIn onSignIn={handleSignIn} />} />
          <Route path="/sign-up" element={<SignUp onSignIn={handleSignIn} />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
        <Footer />
      </div>
  
  );
}

export default App;
